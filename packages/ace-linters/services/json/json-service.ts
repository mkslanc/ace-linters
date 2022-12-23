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
    toCompletions, toResolvedCompletion,
    toTooltip
} from "../../type-converters/vscode-converters";
import {BaseService} from "../base-service";
import JsonServiceOptions = AceLinters.JsonServiceOptions;
import {AceLinters} from "../language-service";

let jsonService = require('vscode-json-languageservice');

export class JsonService extends BaseService<JsonServiceOptions> {
    $service: VSLanguageService;
    schemas: { [schemaUri: string]: string } = {};

    constructor(mode: string) {
        super(mode);
        this.$service = jsonService.getLanguageService({
            schemaRequestService: (uri) => {
                uri = uri.replace("file:///", "");
                let jsonSchema = this.schemas[uri];
                if (jsonSchema)
                    return Promise.resolve(jsonSchema);
                return Promise.reject(`Unable to load schema at ${uri}`);
            }
        });
    }

    private $getJsonSchemaUri(sessionID): string {
        return this.getOption(sessionID, "jsonSchemaUri");
    }

    addDocument(sessionID: string, document: Ace.Document, options?: JsonServiceOptions) {
        super.addDocument(sessionID, document, options);
        this.$configureService(sessionID);
    }

    private $configureService(sessionID?: string) {
        if (!sessionID)
            sessionID = "";
        let schemas = this.getOption(sessionID, "jsonSchemas");
        schemas?.forEach((el) => {
            if (el.uri === this.$getJsonSchemaUri(sessionID)) {
                el.fileMatch ??= [];
                el.fileMatch.push(sessionID);
            }
            this.schemas[el.uri] = (el.schema) ? el.schema : (this.schemas[el.uri]) ? this.schemas[el.uri] : undefined;
            this.$service.resetSchema(el.uri);
            el.schema = undefined;
        });

        this.$service.configure({
            schemas: schemas as SchemaConfiguration[],
            allowComments: this.mode === "json5"
        });

    }

    removeDocument(sessionID: string) {
        super.removeDocument(sessionID);
        let schemas = this.getOption(sessionID, "jsonSchemas");
        schemas?.forEach((el) => {
            if (el.uri === this.$getJsonSchemaUri(sessionID)) {
                el.fileMatch = el.fileMatch.filter((pattern) => pattern != sessionID);
            }
        });
        this.$service.configure({
            schemas: schemas as SchemaConfiguration[],
            allowComments: this.mode === "json5"
        });
    }

    setOptions(sessionID: string, options: JsonServiceOptions) {
        super.setOptions(sessionID, options);
        this.$configureService(sessionID);
    }

    setGlobalOptions(options: JsonServiceOptions) {
        super.setGlobalOptions(options);
        this.$configureService();
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

        let diagnostics = this.$service.doValidation(document, jsonDocument, {trailingCommas: this.mode === "json5" ? "ignore" : "error"});
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

    async resolveCompletion(sessionID: string, completion: Ace.Completion): Promise<Ace.Completion> {
        let resolvedCompletion = await this.$service.doResolve(completion["item"]);

        return toResolvedCompletion(completion, resolvedCompletion);
    }
}