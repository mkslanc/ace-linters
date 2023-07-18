import {
    Diagnostic
} from "./pkg/ruff_wasm";
import * as lsp from "vscode-languageserver-protocol";
import {DiagnosticSeverity} from "vscode-languageserver-protocol";
import {FilterDiagnosticsOptions} from "../../types/language-service";

export function toRange(location: { row: number, column: number }, endLocation: { row: number, column: number }): lsp.Range {
    return {
        start: {
            line: Math.max(location.row - 1, 0),
            character: location.column
        },
        end: {
            line: Math.max(endLocation.row - 1, 0),
            character: endLocation.column
        }
    }
}

export function toDiagnostics(diagnostics: Diagnostic[], filterErrors: FilterDiagnosticsOptions): lsp.Diagnostic[] {
    return diagnostics.filter((el) => !filterErrors.errorCodesToIgnore!.includes(el.code)).map((el) => {
        let severity: DiagnosticSeverity = DiagnosticSeverity.Error;
        if (filterErrors.errorCodesToTreatAsWarning!.includes(el.code)) {
            severity = DiagnosticSeverity.Warning;
        } else if (filterErrors.errorCodesToTreatAsInfo!.includes(el.code)) {
            severity = DiagnosticSeverity.Information;
        }
        return {
            message: el.code + " " + el.message,
            range: toRange(el.location, el.end_location),
            severity: severity,
        }
    });
}
