import {BaseService} from "../base-service";
import * as lsp from "vscode-languageserver-protocol";
import {getLanguageService} from "./lib";
import {TextDocumentIdentifier, TextDocumentItem} from "vscode-languageserver-protocol";
import {LanguageService, YamlServiceOptions} from "../../types/language-service";
import {filterDiagnostics} from "../../type-converters/lsp-converters";

export class YamlService extends BaseService<YamlServiceOptions> implements LanguageService {
    $service;
    schemas: { [schemaUri: string]: string } = {};

    serviceCapabilities = {
        completionProvider: {
            resolveProvider: true
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

        this.$service = getLanguageService((uri) => {
            uri = uri.replace("file:///", "");
            let jsonSchema = this.schemas[uri];
            if (jsonSchema)
                return Promise.resolve(jsonSchema);
            return Promise.reject(`Unable to load schema at ${uri}`);
            //@ts-ignore
        }, null, null, null, null);
    }

    private $getYamlSchemaUri(sessionID): string | undefined {
        return this.getOption(sessionID, "schemaUri");
    }

    addDocument(document: TextDocumentItem) {
        super.addDocument(document);
        this.$configureService(document.uri);
    }

    private $configureService(sessionID: string) {
        let schemas = this.getOption(sessionID, "schemas");
        schemas?.forEach((el) => {
            if (el.uri === this.$getYamlSchemaUri(sessionID)) {
                el.fileMatch ??= [];
                el.fileMatch.push(sessionID);
            }
            let schema = el.schema ?? this.schemas[el.uri];
            if (schema)
                this.schemas[el.uri] = schema;
            this.$service.resetSchema(el.uri);
            el.schema = undefined;
        });

        this.$service.configure({
            schemas: schemas,
            hover: true,
            validate: true,
            completion: true,
            format: true,
            customTags: false
        });
    }

    removeDocument(document: TextDocumentIdentifier) {
        super.removeDocument(document);
        let schemas = this.getOption(document.uri, "schemas");
        schemas?.forEach((el) => {
            if (el.uri === this.$getYamlSchemaUri(document.uri)) {
                el.fileMatch = el.fileMatch?.filter((pattern) => pattern != document.uri);
            }
        });
        this.$service.configure({
            schemas: schemas
        });
    }

    setOptions(sessionID: string, options: YamlServiceOptions, merge = false) {
        super.setOptions(sessionID, options, merge);
        this.$configureService(sessionID);
    }

    setGlobalOptions(options: YamlServiceOptions) {
        super.setGlobalOptions(options);
        this.$configureService("");
    }

    format(document: lsp.TextDocumentIdentifier, range: lsp.Range, options: lsp.FormattingOptions) {
        let fullDocument = this.getDocument(document.uri);
        if (!fullDocument)
            return Promise.resolve([]);

        return Promise.resolve(this.$service.doFormat(fullDocument, {})); //TODO: options?
    }

    async doHover(document: lsp.TextDocumentIdentifier, position: lsp.Position): Promise<lsp.Hover | null> {
        let fullDocument = this.getDocument(document.uri);
        if (!fullDocument)
            return null;
        return this.$service.doHover(fullDocument, position);
    }

    async doValidation(document: lsp.TextDocumentIdentifier): Promise<lsp.Diagnostic[]> {
        let fullDocument = this.getDocument(document.uri);
        if (!fullDocument)
            return [];

        return filterDiagnostics(await this.$service.doValidation(fullDocument, false), this.optionsToFilterDiagnostics);
    }

    async doComplete(document: lsp.TextDocumentIdentifier, position: lsp.Position): Promise<lsp.CompletionItem[] | lsp.CompletionList | null> {
        let fullDocument = this.getDocument(document.uri);
        if (!fullDocument)
            return null;

        return this.$service.doComplete(fullDocument, position, false);
    }

    async doResolve(item: lsp.CompletionItem): Promise<lsp.CompletionItem> {
        return item;
    }
}
