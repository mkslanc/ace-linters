import {
    Diagnostic
} from "./pkg";
import * as lsp from "vscode-languageserver-protocol";
import {DiagnosticSeverity} from "vscode-languageserver-protocol";

export function toRange(location: { row: number, column: number }, endLocation: { row: number, column: number }): lsp.Range {
    return {
        start: {
            line: location.row - 1 || 0,
            character: location.column
        },
        end: {
            line: endLocation.row - 1 || 0,
            character: endLocation.column
        }
    }
}

export function toDiagnostics(diagnostics: Diagnostic[]): lsp.Diagnostic[] {
    return diagnostics.map((el) => {
        return {
            message: el.code + " " + el.message,
            range: toRange(el.location, el.end_location),
            severity: DiagnosticSeverity.Error,
        }
    });
}
