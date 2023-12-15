import {
    LanguageService as VSLanguageService,
    SchemaConfiguration
} from "vscode-json-languageservice";
import {BaseService} from "../base-service";
import * as lsp from "vscode-languageserver-protocol";

import * as jsonService from 'vscode-json-languageservice';
import {TextDocumentIdentifier, TextDocumentItem} from "vscode-languageserver-protocol";
import {JsonServiceOptions, LanguageService} from "../../types/language-service";
import {filterDiagnostics} from "../../type-converters/lsp-converters";

export class JsonService extends BaseService<JsonServiceOptions> implements LanguageService {
    $service: VSLanguageService;
    schemas: { [schemaUri: string]: string } = {};

    serviceCapabilities = {
        completionProvider: {
            triggerCharacters: ['"', ':']
        },
        diagnosticProvider: {
            interFileDependencies: true,
            workspaceDiagnostics: true
        }
    }

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

    private $getJsonSchemaUri(sessionID): string | undefined {
        return this.getOption(sessionID, "schemaUri");
    }

    addDocument(document: TextDocumentItem) {
        super.addDocument(document);
        this.$configureService(document.uri);
    }

    private $configureService(sessionID?: string) {
        let schemas = this.getOption(sessionID ?? "", "schemas");
        let sessionIDs = sessionID ? [] : Object.keys(this.documents);
        schemas?.forEach((el) => {
            if (sessionID) {
                if (this.$getJsonSchemaUri(sessionID) == el.uri) {
                    el.fileMatch ??= [];
                    el.fileMatch.push(sessionID);
                }
            } else {
                el.fileMatch = sessionIDs.filter(sessionID => this.$getJsonSchemaUri(sessionID) == el.uri);
            }
            let schema = el.schema ?? this.schemas[el.uri];
            if (schema)
                this.schemas[el.uri] = schema;
            this.$service.resetSchema(el.uri);
            el.schema = undefined;
        });

        this.$service.configure({
            schemas: schemas as SchemaConfiguration[],
            allowComments: this.mode === "json5"
        });

    }

    removeDocument(document: TextDocumentIdentifier) {
        super.removeDocument(document);
        let schemas = this.getOption(document.uri, "schemas");
        schemas?.forEach((el) => {
            if (el.uri === this.$getJsonSchemaUri(document.uri)) {
                el.fileMatch = el.fileMatch?.filter((pattern) => pattern != document.uri);
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

    format(document: lsp.TextDocumentIdentifier, range: lsp.Range, options: lsp.FormattingOptions) {
        let fullDocument = this.getDocument(document.uri);
        if (!fullDocument)
            return Promise.resolve([]);

        return Promise.resolve(this.$service.format(fullDocument, range, options));
    }

    async doHover(document: lsp.TextDocumentIdentifier, position: lsp.Position): Promise<lsp.Hover | null> {
        let fullDocument = this.getDocument(document.uri);
        if (!fullDocument)
            return null;

        let jsonDocument = this.$service.parseJSONDocument(fullDocument);
        return this.$service.doHover(fullDocument, position, jsonDocument);
    }

    async doValidation(document: lsp.TextDocumentIdentifier): Promise<lsp.Diagnostic[]> {
        let fullDocument = this.getDocument(document.uri);
        if (!fullDocument)
            return [];

        let jsonDocument = this.$service.parseJSONDocument(fullDocument);
        let diagnostics = await this.$service.doValidation(fullDocument, jsonDocument, {trailingCommas: this.mode === "json5" ? "ignore" : "error"});
        return filterDiagnostics(diagnostics, this.optionsToFilterDiagnostics);
    }

    async doComplete(document: lsp.TextDocumentIdentifier, position: lsp.Position): Promise<lsp.CompletionItem[] | lsp.CompletionList | null> {
        let fullDocument = this.getDocument(document.uri);
        if (!fullDocument)
            return null;

        let jsonDocument = this.$service.parseJSONDocument(fullDocument);
        return this.$service.doComplete(fullDocument, position, jsonDocument);
    }

    async doResolve(item: lsp.CompletionItem): Promise<lsp.CompletionItem> {
        return this.$service.doResolve(item);
    }
}
