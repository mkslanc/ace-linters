import { LanguageService as JsonLanguageService, SchemaConfiguration } from "vscode-json-languageservice";
import { BaseService } from "../base-service";
import * as lsp from "vscode-languageserver-protocol";
import * as jsonService from 'vscode-json-languageservice';
import { TextDocumentIdentifier, TextDocumentItem } from "vscode-languageserver-protocol";
import { JsonServiceOptions, LanguageService } from "../../types/language-service";
export declare class JsonService extends BaseService<JsonServiceOptions> implements LanguageService {
    $service: JsonLanguageService;
    schemas: {
        [schemaUri: string]: string;
    };
    serviceCapabilities: {
        completionProvider: {
            triggerCharacters: string[];
        };
        diagnosticProvider: {
            interFileDependencies: boolean;
            workspaceDiagnostics: boolean;
        };
        documentRangeFormattingProvider: boolean;
        documentFormattingProvider: boolean;
        hoverProvider: boolean;
    };
    constructor(mode: string);
    private $getJsonSchemaUri;
    addDocument(document: TextDocumentItem): void;
    getSchemaOption(documentUri?: string): {
        uri: string;
        fileMatch?: string[];
        schema?: string;
    }[] | undefined;
    private $configureService;
    $configureJsonService(schemas: SchemaConfiguration[]): void;
    removeDocument(document: TextDocumentIdentifier): void;
    setOptions(documentUri: string, options: JsonServiceOptions, merge?: boolean): void;
    setGlobalOptions(options: JsonServiceOptions): void;
    format(document: lsp.TextDocumentIdentifier, range: lsp.Range, options: lsp.FormattingOptions): Promise<jsonService.TextEdit[]>;
    doHover(document: lsp.TextDocumentIdentifier, position: lsp.Position): Promise<lsp.Hover | null>;
    doValidation(document: lsp.TextDocumentIdentifier): Promise<lsp.Diagnostic[]>;
    doComplete(document: lsp.TextDocumentIdentifier, position: lsp.Position): Promise<lsp.CompletionItem[] | lsp.CompletionList | null>;
    doResolve(item: lsp.CompletionItem): Promise<lsp.CompletionItem>;
}
