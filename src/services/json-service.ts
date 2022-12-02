import {LanguageService} from "./language-service";
import {FormattingOptions, JSONSchema, LanguageService as VSLanguageService} from "vscode-json-languageservice";
import {Ace} from "ace-code";
import {fromPoint, fromRange, toAnnotations, toCompletions, toTooltip} from "../type-converters";
import {TextEdit} from "vscode-languageserver-types";

var jsonService = require('vscode-json-languageservice');

export class JsonService implements LanguageService {
    $service: VSLanguageService;
    doc: Ace.Document;
    private $jsonSchema: JSONSchema;
    $formatConfig: FormattingOptions = {tabSize: 4, insertSpaces: true};

    constructor(doc: Ace.Document, jsonSchema?: JSONSchema, configuration?: FormattingOptions) {
        this.$jsonSchema = jsonSchema;
        this.$service = jsonService.getLanguageService({
            schemaRequestService: (uri) => {
                if (this.$jsonSchema) //TODO: make it with url resolving?
                    return Promise.resolve(JSON.stringify(this.$jsonSchema));
                return Promise.reject(`Unabled to load schema at ${uri}`);
            }
        });
        this.$service.configure({allowComments: false, schemas: [{fileMatch: ["test.json"], uri: "schema.json"}]})
        this.doc = doc;
        this.$setFormatConfiguration(configuration);
    }

    $setFormatConfiguration(configuration?: FormattingOptions) {
        this.$formatConfig.tabSize ??= configuration?.tabSize;
        this.$formatConfig.insertSpaces ??= configuration?.insertSpaces;
    }

    $getDocument() {
        var doc = this.doc.getValue(); //TODO: update
        return jsonService.TextDocument.create("test.json", "json", 1, doc);
    }

    //TODO:
    setValue(value) {
        this.doc.setValue(value);
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

    async doComplete(position: Ace.Point) {
        let document = this.$getDocument();
        if (!document) {
            return null;
        }
        let jsonDocument = this.$service.parseJSONDocument(document);
        let completions = await this.$service.doComplete(document, fromPoint(position), jsonDocument);
        return completions;
    }

    resetSchema(uri: string): boolean {
        return this.$service.resetSchema(uri);
    }
}