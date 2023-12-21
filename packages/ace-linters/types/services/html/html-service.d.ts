import { LanguageService as VSLanguageService } from "vscode-html-languageservice";
import { HTMLFormatConfiguration } from "vscode-html-languageservice/lib/umd/htmlLanguageTypes";
import { BaseService } from "../base-service";
import * as lsp from "vscode-languageserver-protocol";
import { HtmlServiceOptions, LanguageService } from "../../types/language-service";
export declare class HtmlService extends BaseService<HtmlServiceOptions> implements LanguageService {
    $service: VSLanguageService;
    defaultValidationOptions: {
        "attr-no-duplication": boolean;
        "body-no-duplicates": boolean;
        "head-body-descendents-html": boolean;
        "head-no-duplicates": boolean;
        "head-valid-children": boolean;
        "html-no-duplicates": boolean;
        "html-root-node": boolean;
        "html-valid-children": boolean;
        "html-valid-children-order": boolean;
        "img-src-required": boolean;
        "invalid-attribute-char": boolean;
        "nested-paragraphs": boolean;
        "spec-char-escape": boolean;
        "src-not-empty": boolean;
        "tag-pair": boolean;
    };
    $defaultFormatOptions: HTMLFormatConfiguration;
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
        documentHighlightProvider: boolean;
        hoverProvider: boolean;
    };
    constructor(mode: string);
    getFormattingOptions(options: HTMLFormatConfiguration): HTMLFormatConfiguration;
    format(document: lsp.TextDocumentIdentifier, range: lsp.Range, options: HTMLFormatConfiguration): Promise<lsp.TextEdit[]>;
    doHover(document: lsp.TextDocumentIdentifier, position: lsp.Position): Promise<lsp.Hover | null>;
    doValidation(document: lsp.TextDocumentIdentifier): Promise<lsp.Diagnostic[]>;
    doComplete(document: lsp.TextDocumentIdentifier, position: lsp.Position): Promise<lsp.CompletionItem[] | lsp.CompletionList | null>;
    doResolve(item: lsp.CompletionItem): Promise<lsp.CompletionItem>;
    findDocumentHighlights(document: lsp.TextDocumentIdentifier, position: lsp.Position): Promise<lsp.DocumentHighlight[]>;
}
