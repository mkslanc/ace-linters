import {monaco} from "./old.monaco";
import {Ace} from "ace-code";
import * as lsp from "vscode-languageserver-protocol";

export function toRange(range: monaco.IRange): lsp.Range {
    if (!range) {
        return;
    }
    return {
        start: {
            line: range.startLineNumber,
            character: range.startColumn
        },
        end: {
            line: range.endLineNumber,
            character: range.endColumn
        }

    };
}

export function fromPoint(point: Ace.Point): monaco.IPosition {
    if (!point) return;
    return {lineNumber: point.row, column: point.column}
}

export function toDiagnostics(diagnostics: monaco.editor.IMarkerData[]): lsp.Diagnostic[] {
    return diagnostics && diagnostics.map((el) => {
        return {
            message: el.message,
            range: {
                start: {
                    line: el.startLineNumber,
                    character: el.startColumn
                },
                end: {
                    line: el.endLineNumber,
                    character: el.endColumn
                }
            },
            severity: el.severity === 8 ? 1 : el.severity === 4 ? 2 : 3
        }
    });
}

export function toCompletions(completionList: monaco.languages.CompletionItem[]) {
    return completionList?.map((item) => toCompletion(item)
    );
}

export function toCompletion(item: monaco.languages.CompletionItem): lsp.CompletionItem {
    let textEdit: lsp.TextEdit = {
        range: getTextEditRange(item.range),
        newText: item.insertText
    }
    let documentation = (item.documentation) ? ((item.documentation as any).value != undefined) ?
        (item.documentation as any).value : item.documentation : undefined
    let completionItem: lsp.CompletionItem = {
        label: (typeof item.label == "string") ? item.label as string : item.label.label,
        textEdit: textEdit,
        insertTextFormat: item.insertTextRules == CompletionItemInsertTextRule.InsertAsSnippet ? lsp.InsertTextFormat.Snippet :
            lsp.InsertTextFormat.PlainText,
        documentation: documentation
    };
    return completionItem;
}

export function getTextEditRange(textEdit?): lsp.Range | undefined {
    if (!textEdit) {
        return;
    }
    if (textEdit.insert != undefined && textEdit.replace != undefined) {
        let ranges = [toRange(textEdit.insert), toRange(textEdit.replace)];
        return mergeRanges(ranges);
    } else {
        return toRange(textEdit);
    }
}

export function toHover(hover: monaco.languages.Hover): lsp.Hover {
    if (!hover) {
        return;
    }
    let contents = hover.contents.map((el) => {
        if (typeof el !== "string") {
            return `\`\`\`${el.value}\`\`\``
        }
        return el;
    });
    return {range: toRange(hover.range), contents: contents};
}

enum CompletionItemKind {
    Method = 0,
    Function = 1,
    Constructor = 2,
    Field = 3,
    Variable = 4,
    Class = 5,
    Struct = 6,
    Interface = 7,
    Module = 8,
    Property = 9,
    Event = 10,
    Operator = 11,
    Unit = 12,
    Value = 13,
    Constant = 14,
    Enum = 15,
    EnumMember = 16,
    Keyword = 17,
    Text = 18,
    Color = 19,
    File = 20,
    Reference = 21,
    Customcolor = 22,
    Folder = 23,
    TypeParameter = 24,
    User = 25,
    Issue = 26,
    Snippet = 27
}

enum CompletionItemInsertTextRule {
    /**
     * Adjust whitespace/indentation of multiline insert texts to
     * match the current line indentation.
     */
    KeepWhitespace = 1,
    /**
     * `insertText` is a snippet.
     */
    InsertAsSnippet = 4
}

function mergeRanges(ranges: lsp.Range[]) {
    var removed = [];
    var list = ranges;

    list = list.sort(function (a, b) {
        return comparePoints(a.start, b.start);
    });

    var next = list[0], range: lsp.Range;
    for (var i = 1; i < list.length; i++) {
        range = next;
        next = list[i];
        var cmp = comparePoints(range.end, next.start);
        if (cmp < 0)
            continue;

        if (cmp == 0 && !isEmpty(range) && !isEmpty(next))
            continue;

        if (comparePoints(range.end, next.end) < 0) {
            range.end.line = next.end.line;
            range.end.character = next.end.character;
        }

        list.splice(i, 1);
        removed.push(next);
        next = range;
        i--;
    }

    return list[0]
}

function comparePoints(p1: lsp.Position, p2: lsp.Position) {
    return p1.line - p2.line || p1.character - p2.character;
}

function isEmpty(range: lsp.Range) {
    return (range.start.line === range.end.line && range.start.character === range.end.character);
}
