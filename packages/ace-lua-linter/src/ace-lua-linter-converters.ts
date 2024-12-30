import * as lsp from "vscode-languageserver-protocol";

export function toTextEdits(input: string, range: lsp.Range): lsp.TextEdit[] {
    return [{
        range: range,
        newText: input
    }]
}