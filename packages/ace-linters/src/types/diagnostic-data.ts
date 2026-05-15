import * as lsp from "vscode-languageserver-protocol";

export type DiagnosticFixData = {
    title: string;
    range: lsp.Range;
    newText: string;
    kind?: string;
};

export type DiagnosticCodeActionDataV1 = {
    v: 1;
    provider: string;
    issueId: string;
    fixes?: DiagnosticFixData[];
};

export type DiagnosticCodeActionData = DiagnosticCodeActionDataV1;

export function isDiagnosticCodeActionData(value: unknown): value is DiagnosticCodeActionData {
    if (!value || typeof value !== "object") {
        return false;
    }

    const candidate = value as Partial<DiagnosticCodeActionData>;
    return candidate.v === 1
        && typeof candidate.provider === "string"
        && typeof candidate.issueId === "string";
}
