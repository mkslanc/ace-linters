import {
    CompletionEntryDetails,
    CompletionInfo,
    Diagnostic,
    JSDocTagInfo,
    QuickInfo,
    TextChange,
    TextSpan
} from "../services/typescript/lib/typescriptServices";
import {Ace, Range as AceRange} from "ace-code";
import * as ts from "../services/typescript/lib/typescriptServices";
import {CommonConverter} from "./common-converters";
import Tooltip = AceLinters.Tooltip;
import {AceLinters} from "../services/language-service";

export function fromTsDiagnostics(diagnostics: Diagnostic[], doc: Ace.Document): Ace.Annotation[] {
    return diagnostics && diagnostics.map((el) => {
        let start = el.start ?? 0;
        let length = el.length ?? 1; //TODO:
        let pos = doc.indexToPosition(start, 0);
        return {
            row: pos.row,
            column: pos.column,
            text: parseMessageText(el.messageText),
            type: fromTsCategory(el.category)
        };
    });
}

export function toTsOffset(range: Ace.Range, doc: Ace.Document) {
    return {
        start: toIndex(range.start, doc),
        end: toIndex(range.end, doc)
    }
}

export function toIndex(point: Ace.Point, doc: Ace.Document) {
    return doc.positionToIndex(point);
}

export function parseMessageText(
    diagnosticsText: string | ts.DiagnosticMessageChain | undefined,
): string {
    if (typeof diagnosticsText === 'string') {
        return diagnosticsText;
    } else if (diagnosticsText === undefined) {
        return '';
    }
    let result = '';
    result += diagnosticsText.messageText;
    if (diagnosticsText.next) {
        for (let next of diagnosticsText.next) {
            result += parseMessageText(next);
        }
    }
    return result;
}

export function fromTsCategory(category: ts.DiagnosticCategory) {
    switch (category as DiagnosticCategory) {
        case DiagnosticCategory.Error:
            return "error";
        case DiagnosticCategory.Suggestion:
        case DiagnosticCategory.Message:
            return "info";
        case DiagnosticCategory.Warning:
            return "warning";
    }
    return "info";
}

export function toAceTextEdits(textEdits: TextChange[], doc: Ace.Document): AceLinters.TextEdit[] {
    return textEdits && textEdits.reverse().map((el) => {
        return {
            range: toRange(el.span, doc),
            newText: el.newText
        };
    })
}

export function toRange(textSpan: TextSpan, doc: Ace.Document): Ace.Range | undefined {
    if (!textSpan) {
        return;
    }
    let start = doc.indexToPosition(textSpan.start, 0);
    let end = doc.indexToPosition(textSpan.start + textSpan.length, 0);
    return AceRange.fromPoints(start, end);
}

export function toPoint(index: number, doc: Ace.Document): Ace.Point {
    return doc.indexToPosition(index, 0);
}

export function toTooltip(hover: QuickInfo, doc: Ace.Document): Tooltip {
    if (!hover) {
        return;
    }
    let documentation = hover.documentation ? hover.documentation.map((displayPart) => displayPart.text).join('') : "";
    let tags = hover.tags ? hover.tags.map((tag) => tagToString(tag)).join('  \n') : "";
    let displayParts = hover.displayParts ? hover.displayParts.map((displayPart) => displayPart.text).join('') : "";
    let contents = ['```typescript\n' + displayParts + '```\n',
        (documentation + (tags ? '\n' + tags : '')).replace(/</g, "&lt;").replace(/>/g, "&gt;")];
    return {content: {type: CommonConverter.TooltipType.markdown, text: contents.join("\n")}, range: toRange(hover.textSpan, doc)};
}

function tagToString(tag: JSDocTagInfo): string {
    let tagLabel = `*@${tag.name}*`;
    if (tag.name === 'param' && tag.text) {
        const [paramName, ...rest] = tag.text;
        tagLabel += `\`${paramName.text}\``;
        if (rest.length > 0) tagLabel += ` — ${rest.map((r) => r.text).join(' ')}`;
    } else if (Array.isArray(tag.text)) {
        tagLabel += ` — ${tag.text.map((r) => r.text).join(' ')}`;
    } else if (tag.text) {
        tagLabel += ` — ${tag.text}`;
    }
    return tagLabel;
}

export function toCompletions(completionInfo: CompletionInfo, doc: Ace.Document, fileName: string, position: number): Ace.Completion[] {
    return completionInfo && completionInfo.entries.map((entry) => {
        let completion = {
            meta: entry.kind,
            caption: entry.name,
            value: "",
            snippet: entry.name,
            score: parseInt(entry.sortText),
            position: position,
            entry: entry.name
        };

        if (entry.replacementSpan) {
            const p1 = toPoint(entry.replacementSpan.start, doc);
            const p2 = toPoint(entry.replacementSpan.start + entry.replacementSpan.length, doc);
            completion["range"] = CommonConverter.toRange({start: p1, end: p2});
        }

        return  completion;
    });
}

export function toResolvedCompletion(entry: CompletionEntryDetails): Ace.Completion {
    return {
        meta: entry?.kind,
        caption: entry.name,
        value: "",
        snippet: entry.name,
        docHTML: entry.displayParts.map((displayPart) => displayPart.text).join('')
    };
}

export enum ScriptKind {
    Unknown = 0,
    JS = 1,
    JSX = 2,
    TS = 3,
    TSX = 4,
    External = 5,
    JSON = 6,
    /**
     * Used on extensions that doesn't define the ScriptKind but the content defines it.
     * Deferred extensions are going to be included in all project contexts.
     */
    Deferred = 7
}

export enum ScriptTarget {
    ES3 = 0,
    ES5 = 1,
    ES2015 = 2,
    ES2016 = 3,
    ES2017 = 4,
    ES2018 = 5,
    ES2019 = 6,
    ES2020 = 7,
    ES2021 = 8,
    ESNext = 99,
    JSON = 100,
    Latest = 99
}

export enum DiagnosticCategory {
    Warning = 0,
    Error = 1,
    Suggestion = 2,
    Message = 3
}

export enum JsxEmit {
    None = 0,
    Preserve = 1,
    React = 2,
    ReactNative = 3,
    ReactJSX = 4,
    ReactJSXDev = 5
}
