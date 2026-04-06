import type {Diagnostic} from "vscode-languageserver-protocol";
import type {Ace} from "ace-code";

export function toAnnotations(diagnostics: Diagnostic[]): Ace.Annotation[] {
    return diagnostics?.map((el) => {
        const annotation = {
            row: el.range.start.line,
            column: el.range.start.character,
            text: el.message,
            type: el.severity === 1 ? "error" : el.severity === 2 ? "warning" : "info",
            code: el.code,
            data: el.data
        };
        return annotation as Ace.Annotation;
    });
}