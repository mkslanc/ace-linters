import * as lsp from "vscode-languageserver-protocol";

import {TextDocument} from "vscode-languageserver-textdocument";
import type {FilterDiagnosticsOptions} from "ace-linters/src/types/language-service";
import {isDiagnosticCodeActionData} from "ace-linters/src/types/diagnostic-data";
import type {DiagnosticCodeActionData} from "ace-linters/src/types/diagnostic-data";

export type SpellCodeActionIssue = {
    offset?: number;
    length?: number;
    text?: string;
    suggestions?: string[];
};

type SpellCheckResult = {
    issues?: readonly SpellCodeActionIssue[];
};

export function fromSpellCheckResult(
    result: SpellCheckResult,
    doc: TextDocument,
    filterErrors?: FilterDiagnosticsOptions,
): lsp.Diagnostic[] {
    if (!result || !result.issues) return [];

    return result.issues.map((el) => {
        let start = el.offset ?? 0;
        let length = el.length ?? 1; //TODO:
        const issueRange = lsp.Range.create(doc.positionAt(start), doc.positionAt(start + length));
        const diagnostic = lsp.Diagnostic.create(
            issueRange,
            "Typo in word: `" + el.text + "`",
            4,
        );
        const suggestions = (el.suggestions || []).filter((suggestion) => !!suggestion).slice(0, 5);
        diagnostic.data = {
            v: 1,
            provider: "ace-spell-check",
            issueId: `${start}:${length}:${el.text || ""}`,
            fixes: suggestions.map((replacementText) => ({
                title: `Change to "${replacementText}"`,
                range: issueRange,
                newText: replacementText,
                kind: lsp.CodeActionKind.QuickFix,
            })),
        } satisfies DiagnosticCodeActionData;
        return diagnostic;
    });
}

export function toCodeActions(
    issues: readonly SpellCodeActionIssue[],
    doc: TextDocument,
    range: lsp.Range,
    context: lsp.CodeActionContext,
): lsp.CodeAction[] {
    const actionsFromDiagnosticData = toCodeActionsFromDiagnosticData(
        context.diagnostics || [],
        doc,
        range,
        "ace-spell-check"
    );
    if (actionsFromDiagnosticData.length) {
        return actionsFromDiagnosticData;
    }

    const requestStart = doc.offsetAt(range.start);
    const requestEnd = doc.offsetAt(range.end);
    const actions: lsp.CodeAction[] = [];

    for (const issue of issues || []) {
        const issueStart = issue.offset ?? 0;
        const issueLength = issue.length ?? (issue.text?.length || 1);
        const issueEnd = issueStart + issueLength;
        const overlapsRange = issueStart <= requestEnd && issueEnd >= requestStart;
        if (!overlapsRange) continue;

        const suggestions = (issue.suggestions || []).filter((suggestion) => !!suggestion);
        if (!suggestions.length) continue;

        const issueRange = lsp.Range.create(
            doc.positionAt(issueStart),
            doc.positionAt(issueEnd),
        );

        for (const replacementText of suggestions.slice(0, 5)) {
            actions.push({
                title: `Change to "${replacementText}"`,
                kind: lsp.CodeActionKind.QuickFix,
                diagnostics: context.diagnostics,
                edit: {
                    changes: {
                        [doc.uri]: [
                            {
                                range: issueRange,
                                newText: replacementText,
                            },
                        ],
                    },
                },
            });
        }
    }

    return actions;
}

function toCodeActionsFromDiagnosticData(
    diagnostics: readonly lsp.Diagnostic[],
    doc: TextDocument,
    range: lsp.Range,
    provider: string
): lsp.CodeAction[] {
    const requestStart = doc.offsetAt(range.start);
    const requestEnd = doc.offsetAt(range.end);
    const actions: lsp.CodeAction[] = [];
    const seen = new Set<string>();

    for (const diagnostic of diagnostics) {
        if (!isDiagnosticCodeActionData(diagnostic.data) || diagnostic.data.provider !== provider) {
            continue;
        }
        for (const fix of diagnostic.data.fixes || []) {
            const fixStart = doc.offsetAt(fix.range.start);
            const fixEnd = doc.offsetAt(fix.range.end);
            const overlapsRange = fixStart <= requestEnd && fixEnd >= requestStart;
            if (!overlapsRange) {
                continue;
            }

            const key = [
                diagnostic.data.issueId,
                fix.title,
                fix.newText,
                fix.range.start.line,
                fix.range.start.character,
                fix.range.end.line,
                fix.range.end.character
            ].join("|");
            if (seen.has(key)) {
                continue;
            }
            seen.add(key);

            actions.push({
                title: fix.title,
                kind: (fix.kind as lsp.CodeActionKind) || lsp.CodeActionKind.QuickFix,
                diagnostics: [diagnostic],
                edit: {
                    changes: {
                        [doc.uri]: [{
                            range: fix.range,
                            newText: fix.newText,
                        }],
                    },
                },
            });
        }
    }

    return actions;
}
