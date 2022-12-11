import {Ace, Range as AceRange} from "ace-code";

export function toCompletions(completions: Ace.Completion[], markdownConverter: MarkDownConverter): Ace.Completion[] {
    return completions && completions.map((el) => {
        if (el["docMarkdown"]) {
            el["docHTML"] = cleanHtml(markdownConverter.makeHtml(el["docMarkdown"]));
            el["docMarkdown"] = undefined;
        }
        if (el["range"]) {
            el["range"] = toRange(el["range"]);
        }
        return el;
    })
}

export function cleanHtml(html: string) {//TODO: improve this
    return html.replace(/<a\s/, "<a target='_blank' ");
}

export function toRange(range: { start, end }): Ace.Range | undefined {
    if (!range || !range.start || !range.end) {
        return;
    }
    return AceRange.fromPoints(range.start, range.end);
}

export enum TooltipType {
    plainText,
    markdown
}