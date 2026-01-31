import {Diagnostic, DiagnosticSeverity} from "vscode-languageserver-protocol";
import {CommonConverter} from "../../type-converters/common-converters";
import {FilterDiagnosticsOptions} from "../../types/language-service";
import {checkValueAgainstRegexpArray} from "../../utils";

export function toDiagnostic(error, filterErrors: FilterDiagnosticsOptions): Diagnostic {
    let severity;
    if (checkValueAgainstRegexpArray(error.message, filterErrors.errorMessagesToTreatAsWarning)) {
        severity = DiagnosticSeverity.Warning;
    } else if (checkValueAgainstRegexpArray(error.message, filterErrors.errorMessagesToTreatAsInfo)) {
        severity = DiagnosticSeverity.Information;
    } else {
        severity = (error.fatal) ? DiagnosticSeverity.Error : error.severity;
    }

    return {
        message: error.message,
        range: {
            start: {
                line: normalizeNumber(error.line - 1),
                character: normalizeNumber(error.column - 1)
            },
            end: {
                line: normalizeNumber((error.endLine ?? error.line) - 1),
                character: normalizeNumber((error.endColumn ?? error.column) - 1)
            }
        },
        severity: severity,
    }
}

function normalizeNumber(num) {
    return !isFinite(num) || num < 0 ? 0 : num;
}

export function toDiagnostics(diagnostics: Diagnostic[], filterErrors: FilterDiagnosticsOptions): Diagnostic[] {
    if (!diagnostics) {
        return [];
    }
    console.log(diagnostics)
    return CommonConverter.excludeByErrorMessage(diagnostics, filterErrors.errorMessagesToIgnore).map((error) => toDiagnostic(error, filterErrors));
}
