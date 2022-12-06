import {LanguageService, ServiceOptions} from "./language-service";
import {FormattingOptions, JSONSchema, LanguageService as VSLanguageService} from "vscode-json-languageservice";
import {Ace} from "ace-code";
import {fromPoint, fromRange, toAnnotations, toTooltip} from "../type-converters";
import {TextEdit} from "vscode-languageserver-types";
import {BaseService} from "./base-service";
import {CompletionList} from "vscode-json-languageservice/lib/umd/jsonLanguageTypes";

var jsonService = require('vscode-json-languageservice');

export class JsonService extends BaseService {
    $service: VSLanguageService;
    private $jsonSchema: JSONSchema;
    $formatConfig: FormattingOptions = {tabSize: 4, insertSpaces: true};

    constructor(doc: Ace.Document, options: ServiceOptions) {
        super(doc, options);
        this.$jsonSchema = options?.other?.jsonSchema;
        this.$formatConfig = options.format;
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

    format(range: Ace.Range): TextEdit[] {
        let document = this.$getDocument();
        if (!document) {
            return [];
        }
        let textEdits = this.$service.format(document, fromRange(range), this.$formatConfig);
        return textEdits;
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

    async doComplete(position: Ace.Point): Promise<CompletionList> {
        let document = this.$getDocument();
        if (!document) {
            return null;
        }
        let jsonDocument = this.$service.parseJSONDocument(document);
        let completions = await this.$service.doComplete(document, fromPoint(position), jsonDocument);
        return completions;
    }

    setSchema(schema: JSONSchema) {
        this.$jsonSchema = schema;
    }

    resetSchema(uri: string): boolean {
        return this.$service.resetSchema(uri);
    }
}