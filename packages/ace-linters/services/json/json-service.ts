import {
    LanguageService as VSLanguageService,
    SchemaConfiguration
} from "vscode-json-languageservice";
import {BaseService} from "../base-service";
import JsonServiceOptions = AceLinters.JsonServiceOptions;
import {AceLinters} from "../../types";
import {TextDocument} from "vscode-languageserver-textdocument";
import * as lsp from "vscode-languageserver-protocol";

import * as jsonService from 'vscode-json-languageservice';
import {TextDocumentItem} from "vscode-languageserver-protocol";

export class JsonService extends BaseService<JsonServiceOptions> implements AceLinters.LanguageService {
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

    addDocument(document: TextDocument | TextDocumentItem) {
        super.addDocument(document);
        this.$configureService(document.uri);
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

    removeDocument(document: TextDocument) {
        super.removeDocument(document);
        let schemas = this.getOption(document.uri, "jsonSchemas");
        schemas?.forEach((el) => {
            if (el.uri === this.$getJsonSchemaUri(document.uri)) {
                el.fileMatch = el.fileMatch.filter((pattern) => pattern != document.uri);
            }
        });
        this.$service.configure({
            schemas: schemas as SchemaConfiguration[],
            allowComments: this.mode === "json5"
        });
    }

    setOptions(sessionID: string, options: JsonServiceOptions, merge = false) {
        super.setOptions(sessionID, options, merge);
        this.$configureService(sessionID);
    }

    setGlobalOptions(options: JsonServiceOptions) {
        super.setGlobalOptions(options);
        this.$configureService();
    }

    format(document: lsp.TextDocumentIdentifier, range: lsp.Range, options: lsp.FormattingOptions): lsp.TextEdit[] | null {
        let fullDocument = this.getDocument(document.uri);
        if (!fullDocument) {
            return [];
        }
        let textEdits = this.$service.format(fullDocument, range, options);
        return textEdits;
    }

    async doHover(document: lsp.TextDocumentIdentifier, position: lsp.Position): Promise<lsp.Hover | null> {
        let fullDocument = this.getDocument(document.uri);
        if (!fullDocument) {
            return null;
        }
        let jsonDocument = this.$service.parseJSONDocument(fullDocument);
        let hover = this.$service.doHover(fullDocument, position, jsonDocument);
        return hover;
    }

    async doValidation(document: lsp.TextDocumentIdentifier): Promise<lsp.Diagnostic[]> {
        let fullDocument = this.getDocument(document.uri);
        if (!fullDocument) {
            return [];
        }
        let jsonDocument = this.$service.parseJSONDocument(fullDocument);
        let diagnostics = await this.$service.doValidation(fullDocument, jsonDocument, {trailingCommas: this.mode === "json5" ? "ignore" : "error"});
        return diagnostics;
    }

    async doComplete(document: lsp.TextDocumentIdentifier, position: lsp.Position): Promise<lsp.CompletionItem[] | lsp.CompletionList | null> {
        let fullDocument = this.getDocument(document.uri);
        if (!fullDocument) {
            return null;
        }
        let jsonDocument = this.$service.parseJSONDocument(fullDocument);
        let completions = await this.$service.doComplete(fullDocument, position, jsonDocument);

        return completions;
    }

    async doResolve(item: lsp.CompletionItem): Promise<lsp.CompletionItem> {
        let resolvedCompletion = await this.$service.doResolve(item);

        return resolvedCompletion;
    }
}
