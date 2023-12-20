import { LanguageService as VSLanguageService } from "vscode-css-languageservice";
import { CSSFormatConfiguration } from "vscode-css-languageservice/lib/umd/cssLanguageTypes";
import { BaseService } from "../base-service";
import * as lsp from "vscode-languageserver-protocol";
import { LanguageService } from "../../types/language-service";
export declare class CssService extends BaseService implements LanguageService {
    $service: VSLanguageService;
    $languageId: string;
    $defaultFormatOptions: CSSFormatConfiguration;
    serviceCapabilities: {
        completionProvider: {
            triggerCharacters: string[];
            resolveProvider: boolean;
        };
        diagnosticProvider: {
            interFileDependencies: boolean;
            workspaceDiagnostics: boolean;
        };
        documentRangeFormattingProvider: boolean;
        documentFormattingProvider: boolean;
        documentHighlightProvider: boolean;
        hoverProvider: boolean;
    };
    constructor(mode: string);
    private $initLanguageService;
    getFormattingOptions(options: CSSFormatConfiguration): CSSFormatConfiguration;
    format(document: lsp.TextDocumentIdentifier, range: lsp.Range, options: CSSFormatConfiguration): Promise<lsp.TextEdit[]>;
    doHover(document: lsp.TextDocumentIdentifier, position: lsp.Position): Promise<lsp.Hover | null>;
    doValidation(document: lsp.TextDocumentIdentifier): Promise<lsp.Diagnostic[]>;
    doComplete(document: lsp.TextDocumentIdentifier, position: lsp.Position): Promise<lsp.CompletionItem[] | lsp.CompletionList | null>;
    doResolve(item: lsp.CompletionItem): Promise<lsp.CompletionItem>;
    findDocumentHighlights(document: lsp.TextDocumentIdentifier, position: lsp.Position): Promise<lsp.DocumentHighlight[]>;
}
