import {Diagnostic, DiagnosticSeverity, Range} from "vscode-languageserver-protocol";
import {TextDocument} from "vscode-languageserver-textdocument";

export function lexingErrorToDiagnostic(document: TextDocument, error): Diagnostic {
    return {
        message: error.message,
        range: Range.create(
            document.positionAt(error.offset),
            document.positionAt(error.offset + error.length)
        ),
        severity: DiagnosticSeverity.Error,
    };
}

export function parsingErrorToDiagnostic(document: TextDocument, error): Diagnostic {
    return {
        message: error.message,
        range: {
            start: document.positionAt(error.token.startOffset),
            end: document.positionAt(
                error.token.endOffset ? error.token.endOffset : 0
            ),
        },
        severity: DiagnosticSeverity.Error,
    };
}

export function issueToDiagnostic(document: TextDocument, issue): Diagnostic {
    return {
        message: issue.msg,
        range: {
            start: document.positionAt(issue.position.startOffset),
            // Chevrotain Token positions are non-inclusive for endOffsets
            end: document.positionAt(issue.position.endOffset + 1),
        },
        severity: toDiagnosticSeverity(issue.severity),
    };
}

function toDiagnosticSeverity(issueSeverity: string): DiagnosticSeverity {
    switch (issueSeverity) {
        case "error":
            return DiagnosticSeverity.Error;
        case "warning":
            return DiagnosticSeverity.Warning;
        case "info":
        default:
            return DiagnosticSeverity.Information;
    }
}
