import * as lsp from "vscode-languageserver-protocol";
import {DiagnosticSeverity} from "vscode-languageserver-protocol";
import {FilterDiagnosticsOptions} from "ace-linters/src/types/language-service";
import {filterDiagnostics} from "ace-linters/src/type-converters/lsp/lsp-converters";
import {Diagnostic} from "@astral-sh/ruff-wasm-web";

export function toRange(location: { row: number, column: number }, endLocation: {
    row: number,
    column: number
}): lsp.Range {
    return {
        start: {
            line: Math.max(location.row - 1, 0),
            character: location.column - 1
        },
        end: {
            line: Math.max(endLocation.row - 1, 0),
            character: endLocation.column - 1
        }
    }
}

export function toDiagnostics(diagnostics: Diagnostic[], filterErrors: FilterDiagnosticsOptions): lsp.Diagnostic[] {
    const lspDiagnostics = diagnostics.filter((el) => !filterErrors.errorCodesToIgnore!.includes(el.code ?? "")).map((el) => {
        const code = el.code ?? "";
        let severity: DiagnosticSeverity = DiagnosticSeverity.Error;
        if (filterErrors.errorCodesToTreatAsWarning!.includes(code)) {
            severity = DiagnosticSeverity.Warning;
        } else if (filterErrors.errorCodesToTreatAsInfo!.includes(code)) {
            severity = DiagnosticSeverity.Information;
        }
        return {
            message: code + " " + el.message,
            range: toRange(el.start_location, el.end_location),
            severity: severity,
        }
    });

    return filterDiagnostics(lspDiagnostics, filterErrors);
}

export function toTextEdits(input: string, range: lsp.Range): lsp.TextEdit[] {
    return [{
        range: range,
        newText: input
    }]
}