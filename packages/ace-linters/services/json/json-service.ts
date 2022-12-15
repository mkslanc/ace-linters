import {
    FormattingOptions,
    LanguageService as VSLanguageService,
    SchemaConfiguration
} from "vscode-json-languageservice";
import {Ace} from "ace-code";
import {
    fromPoint,
    fromRange,
    toAceTextEdits,
    toAnnotations,
    toCompletions,
    toTooltip
} from "../../type-converters/vscode-converters";
import {BaseService} from "../base-service";
import {AceLinters} from "../../index";
import JsonServiceOptions = AceLinters.JsonServiceOptions;

let jsonService = require('vscode-json-languageservice');

export class JsonService extends BaseService<JsonServiceOptions> {
    $service: VSLanguageService;
    schemas: SchemaConfiguration[] = [];

    constructor(mode: string) {
        super(mode);
        this.$service = jsonService.getLanguageService({
            schemaRequestService: (uri) => {
                uri = uri.replace("file:///", "");
                let jsonSchema = this.$getJsonSchema(uri);
                if (jsonSchema)
                    return Promise.resolve(jsonSchema);
                return Promise.reject(`Unable to load schema at ${uri}`);
            }
        });
    }

    private $getJsonSchema(sessionID): string {
        return this.getOption(sessionID, "jsonSchema");
    }

    addDocument(sessionID: string, document: Ace.Document, options?: JsonServiceOptions) {
        super.addDocument(sessionID, document, options);
        this.schemas.push({uri: sessionID, fileMatch: [sessionID]});
        this.$service.configure({schemas: this.schemas, allowComments: options.allowComments ?? false});
    }

    removeDocument(sessionID: string) {
        super.removeDocument(sessionID);
        this.schemas = this.schemas.filter((schema) => schema.uri != sessionID);
    }

    setOptions(sessionID: string, options: JsonServiceOptions) {
        super.setOptions(sessionID, options);
        this.$service.resetSchema(sessionID);
    }

    $getDocument(sessionID: string) {
        let documentValue = this.getDocumentValue(sessionID);
        return jsonService.TextDocument.create(sessionID, "json", 1, documentValue);
    }

    format(sessionID: string, range: Ace.Range, format: FormattingOptions) {
        let document = this.$getDocument(sessionID);
        if (!document) {
            return [];
        }
        let textEdits = this.$service.format(document, fromRange(range), format);
        return toAceTextEdits(textEdits);
    }

    async doHover(sessionID: string, position: Ace.Point) {
        let document = this.$getDocument(sessionID);
        if (!document) {
            return null;
        }
        let jsonDocument = this.$service.parseJSONDocument(document);
        let hover = await this.$service.doHover(document, fromPoint(position), jsonDocument);
        return toTooltip(hover);
    }

    async doValidation(sessionID: string): Promise<Ace.Annotation[]> {
        let document = this.$getDocument(sessionID);
        if (!document) {
            return [];
        }
        let jsonDocument = this.$service.parseJSONDocument(document);

        let diagnostics = this.$service.doValidation(document, jsonDocument, {trailingCommas: this.getOption(sessionID, "trailingCommas") ? "ignore" : "error"});
        return toAnnotations(await diagnostics);
    }

    async doComplete(sessionID: string, position: Ace.Point) {
        let document = this.$getDocument(sessionID);
        if (!document) {
            return null;
        }
        let jsonDocument = this.$service.parseJSONDocument(document);
        let completions = await this.$service.doComplete(document, fromPoint(position), jsonDocument);
        return toCompletions(completions);
    }
}