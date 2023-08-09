import { CompletionEntryDetails, CompletionInfo, Diagnostic, QuickInfo, SignatureHelpItems, TextChange, TextSpan } from "./lib/typescriptServices";
import * as ts from "./lib/typescriptServices";
import * as lsp from "vscode-languageserver-protocol";
import { TextDocument } from "vscode-languageserver-textdocument";
import { FilterDiagnosticsOptions } from "../../types/language-service";
export declare function fromTsDiagnostics(diagnostics: Diagnostic[], doc: TextDocument, filterErrors: FilterDiagnosticsOptions): lsp.Diagnostic[];
export declare function toTsOffset(range: lsp.Range, doc: TextDocument): {
    start: number;
    end: number;
};
export declare function parseMessageText(diagnosticsText: string | ts.DiagnosticMessageChain | undefined, errorCode: number): string;
export declare function fromTsCategory(category: ts.DiagnosticCategory): 1 | 2 | 3;
export declare function toTextEdits(textEdits: TextChange[], doc: TextDocument): lsp.TextEdit[];
export declare function toRange(textSpan: TextSpan | undefined, doc: TextDocument): lsp.Range | undefined;
export declare function createRangeFromPoints(start: lsp.Position, end: lsp.Position): lsp.Range;
export declare function toPosition(index: number, doc: TextDocument): lsp.Position;
export declare function toHover(hover: QuickInfo | undefined, doc: TextDocument): lsp.Hover | null;
export declare function toCompletions(completionInfo: CompletionInfo, doc: TextDocument, position: number): lsp.CompletionItem[];
export declare function toResolvedCompletion(entry: CompletionEntryDetails): lsp.CompletionItem;
export declare function toSignatureHelp(signatureItems: SignatureHelpItems | undefined): lsp.SignatureHelp | null;
export declare function toDocumentHighlights(highlights: ts.DocumentHighlights[] | undefined, doc: TextDocument): lsp.DocumentHighlight[];
export declare enum ScriptKind {
    Unknown = 0,
    JS = 1,
    JSX = 2,
    TS = 3,
    TSX = 4,
    External = 5,
    JSON = 6,
    /**
     * Used on extensions that doesn't define the ScriptKind but the content defines it.
     * Deferred extensions are going to be included in all project contexts.
     */
    Deferred = 7
}
export declare enum ScriptTarget {
    ES3 = 0,
    ES5 = 1,
    ES2015 = 2,
    ES2016 = 3,
    ES2017 = 4,
    ES2018 = 5,
    ES2019 = 6,
    ES2020 = 7,
    ES2021 = 8,
    ES2022 = 9,
    ESNext = 99,
    JSON = 100,
    Latest = 99
}
export declare enum DiagnosticCategory {
    Warning = 0,
    Error = 1,
    Suggestion = 2,
    Message = 3
}
export declare enum JsxEmit {
    None = 0,
    Preserve = 1,
    React = 2,
    ReactNative = 3,
    ReactJSX = 4,
    ReactJSXDev = 5
}
