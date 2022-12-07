import {
    Range,
    Position,
    Diagnostic,
    InsertTextFormat,
    CompletionList,
    CompletionItemKind, Hover, MarkupContent, MarkedString, MarkupKind
} from "vscode-languageserver-types";
import type {Ace} from "ace-code";
import {Range as AceRange} from "ace-code/src/range";
import {RangeList} from "ace-code/src/range_list";
import {Tooltip, TooltipContent} from "./services/language-service";

export function fromRange(range: Ace.Range): Range | undefined {
    if (!range) {
        return;
    }
    return {
        start: {
            line: range.start.row,
            character: range.start.column
        },
        end: {line: range.end.row, character: range.end.column}
    };
}

export function toRange(range: Range): Ace.Range | undefined {
    if (!range) {
        return;
    }
    return new AceRange(range.start.line, range.start.character, range.end.line, range.end.character);
}

export function fromPoint(point: Ace.Point): Position {
    if (!point) return;
    return {line: point.row, character: point.column}
}

export function toPoint(position: Position): Ace.Point {
    if (!position) return;
    return {row: position.line, column: position.character}
}

export function toAnnotations(diagnostics: Diagnostic[]): Ace.Annotation[] {
    return diagnostics && diagnostics.map((el) => {
        return {
            row: el.range.start.line,
            column: el.range.start.character,
            text: el.message,
            type: el.severity === 1 ? "error" : el.severity === 2 ? "warning" : "info"
        };
    });
}

export function toCompletions(completionList: CompletionList, markdownConverter: MarkDownConverter) {
    return completionList && completionList.items.map((item) => {
            let kind = Object.keys(CompletionItemKind)[Object.values(CompletionItemKind).indexOf(item.kind)];
            let text = item.textEdit?.newText ?? item.insertText ?? item.label;
            let command = (item.command?.command == "editor.action.triggerSuggest") ? "startAutocomplete" : undefined;
            let range = getTextEditRange(item.textEdit)
            let completion = {
                meta: kind,
                caption: item.label,
                command: command,
                range: range
            };
            let doc = fromMarkupContent(item.documentation);
            if (doc) {
                if (doc.type === TooltipType.markdown) {
                    completion["docHTML"] = cleanHtml(markdownConverter.makeHtml(doc.text));
                } else {
                    completion["docText"] = doc.text;
                }
            }
            if (item.insertTextFormat == InsertTextFormat.Snippet) {
                completion["snippet"] = text;
            } else {
                completion["value"] = text;
            }
            return completion;
        }
    );
}

export function getTextEditRange(textEdit?): Ace.Range | undefined {
    if (!textEdit) {
        return;
    }
    if (textEdit.insert != undefined && textEdit.replace != undefined) {
        let rangeList = new RangeList();
        rangeList.ranges = [toRange(textEdit.insert), toRange(textEdit.replace)];
        rangeList.merge();
        return rangeList[0];
    }
    if (textEdit.range) {
        return toRange(textEdit.range);
    }
}

export function toTooltip(hover: Hover): Tooltip {
    let content;
    if (!hover) {
        return;
    }
    if (MarkupContent.is(hover.contents)) {
        content = fromMarkupContent(hover.contents);
    } else if (MarkedString.is(hover.contents)) {
        content = {type: TooltipType.markdown, text: "```" + (hover.contents as any).value + "```"};
    } else if (Array.isArray(hover.contents)) {
        var contents = hover.contents.map((el) => {
            if (typeof el !== "string") {
                return `\`\`\`${el.value}\`\`\``
            }
            return el;
        });
        content = {type: TooltipType.markdown, text: contents.join("\n\n")};
    } else {
        return;
    }
    let tooltip: Tooltip = {content: content, range: toRange(hover.range)};
    return tooltip;
}

export function fromMarkupContent(content?: string | MarkupContent): TooltipContent {
    if (!content)
        return;
    if (typeof content === "string") {
        return {type: TooltipType.plainText, text: content};
    }
    if (content.kind === MarkupKind.Markdown) {
        return {type: TooltipType.markdown, text: content.value};
    } else {
        return {type: TooltipType.plainText, text: content.value};
    }
}

export function cleanHtml(html: string) {//TODO: improve this
    return html.replace(/<a\s/, "<a target='_blank' ");
}

export enum TooltipType {
    plainText,
    markdown
}