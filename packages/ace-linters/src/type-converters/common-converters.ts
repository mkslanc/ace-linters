import {Ace} from "ace-code";
import {CompletionItemKind} from "vscode-languageserver-protocol";
import {checkValueAgainstRegexpArray} from "../utils";
import {AceRange} from "../ace/range-singleton";

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

    export function toRange(range: { start, end }) {
        if (!range || !range.start || !range.end) {
            return;
        }
        let Range = AceRange.getConstructor();
        // @ts-ignore
        return Range.fromPoints(range.start, range.end);
    }

    export declare type TooltipType = 'plaintext' | 'markdown';

    export function convertKind(kind?: string): CompletionItemKind {
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

    export function excludeByErrorMessage<T>(diagnostics: T[], errorMessagesToIgnore?: RegExp[], fieldName = "message"): T[] {
        if (!errorMessagesToIgnore)
            return diagnostics;
        return diagnostics.filter((el) => !checkValueAgainstRegexpArray(el[fieldName], errorMessagesToIgnore));
    }
}
