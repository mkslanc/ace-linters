import { Diagnostic } from "./pkg/ruff_wasm";
import * as lsp from "vscode-languageserver-protocol";
import { FilterDiagnosticsOptions } from "../../types/language-service";
export declare function toRange(location: {
    row: number;
    column: number;
}, endLocation: {
    row: number;
    column: number;
}): lsp.Range;
export declare function toDiagnostics(diagnostics: Diagnostic[], filterErrors: FilterDiagnosticsOptions): lsp.Diagnostic[];
