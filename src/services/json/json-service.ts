import {FormattingOptions, JSONSchema, LanguageService as VSLanguageService} from "vscode-json-languageservice";
import {Ace} from "ace-code";
import {fromPoint, fromRange, toAceTextEdits, toAnnotations, toCompletions, toTooltip} from "../../type-converters/vscode-converters";
import {BaseService} from "../base-service";
import {CompletionList} from "vscode-json-languageservice/lib/umd/jsonLanguageTypes";
import {AceLinters} from "../language-service";
import ServiceOptions = AceLinters.ServiceOptions;

var jsonService = require('vscode-json-languageservice');

export class JsonService extends BaseService {
    $service: VSLanguageService;
    private $jsonSchema: JSONSchema;

    constructor(doc: Ace.Document, options: ServiceOptions) {
        super(doc, options);
        this.$jsonSchema = options?.other?.jsonSchema;
        this.$service = jsonService.getLanguageService({
            schemaRequestService: (uri) => {
                if (this.$jsonSchema) //TODO: make it with url resolving?
                    return Promise.resolve(JSON.stringify(this.$jsonSchema));
                return Promise.reject(`Unabled to load schema at ${uri}`);
            }
        });
        this.$service.configure({allowComments: false, schemas: [{fileMatch: ["test.json"], uri: "schema.json"}]})
    }

    $getDocument() {
        var doc = this.doc.getValue(); //TODO: update
        return jsonService.TextDocument.create("test.json", "json", 1, doc);
    }

    format(range: Ace.Range, format: FormattingOptions) {
        let document = this.$getDocument();
        if (!document) {
            return [];
        }
        let textEdits = this.$service.format(document, fromRange(range), format);
        return toAceTextEdits(textEdits);
    }

    async doHover(position: Ace.Point) {
        let document = this.$getDocument();
        if (!document) {
            return null;
        }
        let jsonDocument = this.$service.parseJSONDocument(document);
        let hover = await this.$service.doHover(document, fromPoint(position), jsonDocument);
        return toTooltip(hover);
    }

    async doValidation(): Promise<Ace.Annotation[]> {
        let document = this.$getDocument();
        if (!document) {
            return [];
        }
        let jsonDocument = this.$service.parseJSONDocument(document);

        let diagnostics = this.$service.doValidation(document, jsonDocument, null, this.$jsonSchema);
        return toAnnotations(await diagnostics);
    }

    async doComplete(position: Ace.Point) {
        let document = this.$getDocument();
        if (!document) {
            return null;
        }
        let jsonDocument = this.$service.parseJSONDocument(document);
        let completions = await this.$service.doComplete(document, fromPoint(position), jsonDocument);
        return toCompletions(completions);
    }

    setSchema(schema: JSONSchema) {
        this.$jsonSchema = schema;
    }

    resetSchema(uri: string): boolean {
        return this.$service.resetSchema(uri);
    }
}