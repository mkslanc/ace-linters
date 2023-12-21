import { BaseService } from "../base-service";
import * as lsp from "vscode-languageserver-protocol";
import { TextDocumentIdentifier, TextDocumentItem } from "vscode-languageserver-protocol";
import { LanguageService, YamlServiceOptions } from "../../types/language-service";
export declare class YamlService extends BaseService<YamlServiceOptions> implements LanguageService {
    $service: any;
    schemas: {
        [schemaUri: string]: string;
    };
    serviceCapabilities: {
        completionProvider: {
            resolveProvider: boolean;
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
    private $getYamlSchemaUri;
    addDocument(document: TextDocumentItem): void;
    private $configureService;
    removeDocument(document: TextDocumentIdentifier): void;
    setOptions(sessionID: string, options: YamlServiceOptions, merge?: boolean): void;
    setGlobalOptions(options: YamlServiceOptions): void;
    format(document: lsp.TextDocumentIdentifier, range: lsp.Range, options: lsp.FormattingOptions): Promise<any>;
    doHover(document: lsp.TextDocumentIdentifier, position: lsp.Position): Promise<lsp.Hover | null>;
    doValidation(document: lsp.TextDocumentIdentifier): Promise<lsp.Diagnostic[]>;
    doComplete(document: lsp.TextDocumentIdentifier, position: lsp.Position): Promise<lsp.CompletionItem[] | lsp.CompletionList | null>;
    doResolve(item: lsp.CompletionItem): Promise<lsp.CompletionItem>;
}
