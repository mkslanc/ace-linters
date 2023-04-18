import {Diagnostic} from "vscode-languageserver-protocol";

export function toDiagnostic(error): Diagnostic {
    return {
        message: error.message,
        range: {
            start: {
                line: error.line - 1,
                character: error.column - 1
            },
            end: {
                line: error.endLine - 1,
                character: error.endColumn - 1
            }
        },
        severity: (error.fatal) ? 1 : error.severity,
    }
}

export function toDiagnostics(errors: any[]): Diagnostic[] {
    if (!errors) {
        return [];
    }
    return errors.map((error) => toDiagnostic(error));
}
