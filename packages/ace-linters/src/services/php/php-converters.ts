import {Error} from "php-parser";
import {Diagnostic} from "vscode-languageserver-protocol";

export function toDiagnostics(
    errors: Error[],
): Diagnostic[] {
    if (!errors) {
        return [];
    }
    return errors.map((el) => {
        let line;
        if (el.line) {
            if (el.line > 0) {
                line = el.line - 1;
            } else {
                line = el.line;
            }
        } else {
            line = 0;
        }

        let startLine = line;
        let startColumn = 0;
        let endLine = line;
        let endColumn = 0;
        if (el.loc) {
          //TODO: turn it on, when https://github.com/glayzzle/php-parser/issues/1185 would be fixed
          if (el.loc.start.offset > el.loc.end.offset) {
            startLine = el.loc.end.line - 1;
            startColumn = el.loc.end.column;
            endLine = el.loc.start.line - 1;
            endColumn = el.loc.start.column;
          } else {
            startLine = el.loc.start.line - 1;
            startColumn = el.loc.start.column;
            endLine = el.loc.end.line - 1;
            endColumn = el.loc.end.column;
          }
        }

        return {
            range: {
                start: {line: startLine, character: startColumn},
                end: {line: endLine, character: endColumn},
            },
            message: el.message,
            severity: 1,
            source: "php-parser",
        };
    });
}