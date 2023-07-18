import {FilterDiagnosticsOptions} from "../../types/language-service";
import * as lsp from "vscode-languageserver-protocol";
import {checkValueAgainstRegexpArray} from "../../utils";
import {CommonConverter} from "../../type-converters/common-converters";

export function toDiagnostics(diagnostics: any[], filterErrors: FilterDiagnosticsOptions): lsp.Diagnostic[] {
    return CommonConverter.excludeByErrorMessage(diagnostics, filterErrors.errorMessagesToIgnore).map((el) => {
        let severity;
        if (checkValueAgainstRegexpArray(el.message, filterErrors.errorMessagesToTreatAsWarning)) {
            severity = 2;
        } else if (checkValueAgainstRegexpArray(el.message, filterErrors.errorMessagesToTreatAsInfo)) {
            severity = 3;
        } else {
            severity = el.type === "error" ? 1 : el.type === "warning" ? 2 : 3;
        }
        return {
            range: {
                start: {
                    line: el.line - 1,
                    character: el.col - 1
                },
                end: {
                    line: el.line - 1,
                    character: el.col - 1
                }
            },
            severity: severity,
            message: el.message
        }
    })
}


