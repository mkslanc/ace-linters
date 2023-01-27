import {BaseService} from "../base-service";
import {AceLinters} from "../../types";
import * as lsp from "vscode-languageserver-protocol";
import {getLanguageService} from "@ace-linters/yaml-language-server-esbuild";
import {TextDocumentIdentifier, TextDocumentItem} from "vscode-languageserver-protocol";

type YamlServiceOptions = AceLinters.YamlServiceOptions;

export class YamlService extends BaseService<YamlServiceOptions> implements AceLinters.LanguageService {
    $service;
    schemas: { [schemaUri: string]: string } = {};

    constructor(mode: string) {
        super(mode);

        this.$service = getLanguageService((uri) => {
            uri = uri.replace("file:///", "");
            let jsonSchema = this.schemas[uri];
            if (jsonSchema)
                return Promise.resolve(jsonSchema);
            return Promise.reject(`Unable to load schema at ${uri}`);
        }, null, null, null, null);
    }

    private $getYamlSchemaUri(sessionID): string | undefined {
        return this.getOption(sessionID, "yamlSchemaUri");
    }

    addDocument(document: TextDocumentItem) {
        super.addDocument(document);
        this.$configureService(document.uri);
    }

    private $configureService(sessionID: string) {
        let schemas = this.getOption(sessionID, "yamlSchemas");
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
        let schemas = this.getOption(document.uri, "yamlSchemas");
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

    format(document: lsp.TextDocumentIdentifier, range: lsp.Range, options: lsp.FormattingOptions): lsp.TextEdit[] {
        let fullDocument = this.getDocument(document.uri);
        if (!fullDocument)
            return [];

        return this.$service.doFormat(fullDocument, {}); //TODO: options?
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

        return this.$service.doValidation(fullDocument, false);
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
