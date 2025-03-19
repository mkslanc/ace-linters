import {
    LanguageService as JsonLanguageService,
    SchemaConfiguration
} from "vscode-json-languageservice";
import {BaseService} from "../base-service";
import * as lsp from "vscode-languageserver-protocol";

import * as jsonService from 'vscode-json-languageservice';
import {TextDocumentIdentifier, TextDocumentItem} from "vscode-languageserver-protocol";
import {JsonServiceOptions, LanguageService} from "../../types/language-service";
import {filterDiagnostics} from "../../type-converters/lsp/lsp-converters";
import {URI, Utils} from "vscode-uri";

export class JsonService extends BaseService<JsonServiceOptions> implements LanguageService {
    private $service: JsonLanguageService;
    schemas: { [schemaUri: string]: string } = {};

    serviceCapabilities = {
        completionProvider: {
            triggerCharacters: ['"', ':']
        },
        diagnosticProvider: {
            interFileDependencies: true,
            workspaceDiagnostics: true
        },
        documentRangeFormattingProvider: true,
        documentFormattingProvider: true,
        hoverProvider: true
    }

    constructor(mode: string) {
        super(mode);
        this.$service = jsonService.getLanguageService({
            schemaRequestService: (uri) => {
                uri = uri.replace("file:///", "");
                let jsonSchema = this.schemas[uri];
                if (jsonSchema)
                    return Promise.resolve(jsonSchema);
                if (typeof fetch !== 'undefined' && /^https?:\/\//.test(uri)) {
                    return fetch(uri).then((response) => response.text());
                }
                
                return Promise.reject(`Unable to load schema at ${uri}`);
            },
            workspaceContext: {
                resolveRelativePath: (relativePath: string, resource: string) => {
                    const base = resource.substr(0, resource.lastIndexOf('/') + 1);
                    return Utils.resolvePath(URI.parse(base), relativePath).toString();
                }
            },
        });
    }

    private $getJsonSchemaUri(documentUri: string): string | undefined {
        return this.getOption(documentUri, "schemaUri");
    }

    addDocument(document: TextDocumentItem) {
        super.addDocument(document);
        this.$configureService(document.uri);
    }
    
    getSchemaOption(documentUri?: string) {
        return this.getOption(documentUri ?? "", "schemas");
    }
    
    private $configureService(documentUri?: string) {
        let schemas = this.getSchemaOption(documentUri);
        let sessionIDs = documentUri ? [] : Object.keys(this.documents);
        schemas?.forEach((el) => {
            if (documentUri) {
                if (this.$getJsonSchemaUri(documentUri) == el.uri) {
                    el.fileMatch ??= [];
                    el.fileMatch.push(documentUri);
                }
            } else {
                el.fileMatch = sessionIDs.filter(documentUri => this.$getJsonSchemaUri(documentUri) == el.uri);
            }
            let schema = el.schema ?? this.schemas[el.uri];
            if (schema)
                this.schemas[el.uri] = schema;
            this.$service.resetSchema(el.uri);
            el.schema = undefined;
        });

        this.$configureJsonService(schemas as SchemaConfiguration[]);

    }
    
    $configureJsonService(schemas: SchemaConfiguration[]) {
        this.$service.configure({
            schemas: schemas as SchemaConfiguration[],
            allowComments: this.mode === "json5",
            validate: true
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
        this.$configureJsonService(schemas as SchemaConfiguration[]);
    }

    setOptions(documentUri: string, options: JsonServiceOptions, merge = false) {
        super.setOptions(documentUri, options, merge);
        this.$configureService(documentUri);
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
        const completions = await this.$service.doComplete(fullDocument, position, jsonDocument);
        return completions;
    }

    async doResolve(item: lsp.CompletionItem): Promise<lsp.CompletionItem> {
        return this.$service.doResolve(item);
    }
}
