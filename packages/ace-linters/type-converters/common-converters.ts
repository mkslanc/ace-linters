import {Ace, Range as AceRange} from "ace-code";
import {CompletionItemKind} from "vscode-languageserver-protocol";

export namespace CommonConverter {
    export function normalizeRanges(completions: Ace.Completion[]): Ace.Completion[] {
        return completions && completions.map((el) => {
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

    export function convertKind(kind: string): CompletionItemKind {
        switch (kind) {
            case "primitiveType":
            case "keyword":
                return CompletionItemKind.Keyword;
            case "variable":
            case "localVariable":
                return CompletionItemKind.Variable;
            case "memberVariable":
            case "memberGetAccessor":
            case "memberSetAccessor":
                return CompletionItemKind.Field;
            case "function":
            case "memberFunction":
            case "constructSignature":
            case "callSignature":
            case "indexSignature":
                return CompletionItemKind.Function;
            case "enum":
                return CompletionItemKind.Enum;
            case "module":
                return CompletionItemKind.Module;
            case "class":
                return CompletionItemKind.Class;
            case "interface":
                return CompletionItemKind.Interface;
            case "warning":
                return CompletionItemKind.File;
        }

        return CompletionItemKind.Property;
    }
}
