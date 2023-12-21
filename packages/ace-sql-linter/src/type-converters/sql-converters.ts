import * as lsp from "vscode-languageserver-protocol";
import {FilterDiagnosticsOptions} from "ace-linters/src/types/language-service";
import {CommonConverter} from "ace-linters/src/type-converters/common-converters";
import {CaretPosition, Suggestions} from "dt-sql-parser/dist/parser/common/basic-parser-types";

export function toDiagnostics(diagnostics: any[], filterErrors: FilterDiagnosticsOptions): lsp.Diagnostic[] {
    return CommonConverter.excludeByErrorMessage(diagnostics, filterErrors.errorMessagesToIgnore).map((el) => {
        let code = typeof el.code === 'number' ? String(el.code) : <string>el.code;

        return {
            range: {
                start: {
                    line: el.startLine - 1,
                    character: el.startCol
                },
                end: {
                    line: el.endLine - 1,
                    character: el.endCol
                }
            },
            severity: 1,
            message: el.message,
            code: code,
            source: el.source
        };
    });
}

export function toPosition(pos: CaretPosition): lsp.Position {
    return {
        line: pos.lineNumber,
        character: pos.column
    }
}

export function fromPosition(pos: lsp.Position): CaretPosition {
    return {
        lineNumber: pos.line + 1,
        column: pos.character + 1
    }
}

export function toCompletions(completions: Suggestions | null): lsp.CompletionItem[] | null {
    if (!completions) {
        return null;
    }
    return completions.keywords.map((el) => {
        return {
            label: el,
            kind: 14,
            detail: "keyword"
        }
    })
}
