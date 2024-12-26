import * as lsp from "vscode-languageserver-protocol";
import { FilterDiagnosticsOptions } from "ace-linters/src/types/language-service";
import { Diagnostic } from "@astral-sh/ruff-wasm-web";
export declare function toRange(location: {
    row: number;
    column: number;
}, endLocation: {
    row: number;
    column: number;
}): lsp.Range;
export declare function toDiagnostics(diagnostics: Diagnostic[], filterErrors: FilterDiagnosticsOptions): lsp.Diagnostic[];
export declare function toTextEdits(input: string, range: lsp.Range): lsp.TextEdit[];
