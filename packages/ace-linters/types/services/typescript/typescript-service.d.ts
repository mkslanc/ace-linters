import { BaseService } from "../base-service";
import * as ts from './lib/typescriptServices';
import { Diagnostic } from './lib/typescriptServices';
import * as lsp from "vscode-languageserver-protocol";
import { LanguageService, TsServiceOptions } from "../../types/language-service";
export declare class TypescriptService extends BaseService<TsServiceOptions> implements ts.LanguageServiceHost, LanguageService {
    $service: ts.LanguageService;
    $defaultCompilerOptions: ts.CompilerOptions;
    $defaultFormatOptions: {
        insertSpaceAfterCommaDelimiter: boolean;
        insertSpaceAfterSemicolonInForStatements: boolean;
        insertSpaceBeforeAndAfterBinaryOperators: boolean;
        insertSpaceAfterConstructor: boolean;
        insertSpaceAfterKeywordsInControlFlowStatements: boolean;
        insertSpaceAfterFunctionKeywordForAnonymousFunctions: boolean;
        insertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis: boolean;
        insertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets: boolean;
        insertSpaceAfterOpeningAndBeforeClosingNonemptyBraces: boolean;
        insertSpaceAfterOpeningAndBeforeClosingEmptyBraces: boolean;
        insertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces: boolean;
        insertSpaceAfterOpeningAndBeforeClosingJsxExpressionBraces: boolean;
        insertSpaceAfterTypeAssertion: boolean;
        insertSpaceBeforeFunctionParenthesis: boolean;
        placeOpenBraceOnNewLineForFunctions: boolean;
        placeOpenBraceOnNewLineForControlBlocks: boolean;
        indentSize: number;
        tabSize: number;
        newLineCharacter: string;
        convertTabsToSpaces: boolean;
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
        documentHighlightProvider: boolean;
        hoverProvider: boolean;
        signatureHelpProvider: {};
    };
    constructor(mode: string);
    getCompilationSettings(): ts.CompilerOptions;
    getScriptFileNames(): string[];
    private get $extraLibs();
    getScriptVersion(fileName: string): string;
    getScriptSnapshot(fileName: string): ts.IScriptSnapshot | undefined;
    $getDocument(fileName: string): string | undefined;
    getScriptKind?(fileName: string): ts.ScriptKind;
    getCurrentDirectory(): string;
    getDefaultLibFileName(options: ts.CompilerOptions): string;
    readFile(path: string): string | undefined;
    fileExists(path: string): boolean;
    getSyntacticDiagnostics(fileName: string): Diagnostic[];
    getSemanticDiagnostics(fileName: string): Diagnostic[];
    getFormattingOptions(options: lsp.FormattingOptions): ts.FormatCodeSettings;
    format(document: lsp.TextDocumentIdentifier, range: lsp.Range, options: lsp.FormattingOptions): Promise<lsp.TextEdit[]>;
    doHover(document: lsp.TextDocumentIdentifier, position: lsp.Position): Promise<lsp.Hover | null>;
    doValidation(document: lsp.TextDocumentIdentifier): Promise<lsp.Diagnostic[]>;
    doComplete(document: lsp.TextDocumentIdentifier, position: lsp.Position): Promise<lsp.CompletionItem[] | lsp.CompletionList | null>;
    doResolve(item: lsp.CompletionItem): Promise<lsp.CompletionItem | null>;
    provideSignatureHelp(document: lsp.TextDocumentIdentifier, position: lsp.Position): Promise<lsp.SignatureHelp | null>;
    findDocumentHighlights(document: lsp.TextDocumentIdentifier, position: lsp.Position): Promise<lsp.DocumentHighlight[]>;
}
