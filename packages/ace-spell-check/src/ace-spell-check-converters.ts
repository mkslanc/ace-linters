import * as lsp from "vscode-languageserver-protocol";

import {TextDocument} from "vscode-languageserver-textdocument";
import type {FilterDiagnosticsOptions} from "ace-linters/src/types/language-service";

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
        return lsp.Diagnostic.create(
            lsp.Range.create(doc.positionAt(start), doc.positionAt(start + length)),
            "Typo in word: `" + el.text + "`",
            4,
        );
    });
}

export function toCodeActions(
    issues: readonly SpellCodeActionIssue[],
    doc: TextDocument,
    range: lsp.Range,
    context: lsp.CodeActionContext,
): lsp.CodeAction[] {
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
