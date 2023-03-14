import {
    CompletionEntryDetails,
    CompletionInfo,
    Diagnostic,
    JSDocTagInfo,
    QuickInfo, SignatureHelpItems,
    TextChange,
    TextSpan
} from "../services/typescript/lib/typescriptServices";
import * as ts from "../services/typescript/lib/typescriptServices";
import * as lsp from "vscode-languageserver-protocol";
import {TextDocument} from "vscode-languageserver-textdocument";
import {CommonConverter} from "./common-converters";
import convertKind = CommonConverter.convertKind;

export function fromTsDiagnostics(diagnostics: Diagnostic[], doc: TextDocument): lsp.Diagnostic[] {
    return diagnostics.map((el) => {
        let start = el.start ?? 0;
        let length = el.length ?? 1; //TODO:
        return lsp.Diagnostic.create(lsp.Range.create(doc.positionAt(start), doc.positionAt(length)),
            parseMessageText(el.messageText), fromTsCategory(el.category));
    });
}

export function toTsOffset(range: lsp.Range, doc: TextDocument) {
    return {
        start: doc.offsetAt(range.start),
        end: doc.offsetAt(range.end)
    }
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
            return 1;
        case DiagnosticCategory.Suggestion:
        case DiagnosticCategory.Message:
            return 2;
        case DiagnosticCategory.Warning:
            return 3;
    }
    return 4;
}

export function toTextEdits(textEdits: TextChange[], doc: TextDocument): lsp.TextEdit[] {
    return textEdits.map((el): lsp.TextEdit => {
        return {
            range: toRange(el.span!, doc)!,
            newText: el.newText
        };
    })
}

export function toRange(textSpan: TextSpan | undefined, doc: TextDocument): lsp.Range | undefined {
    if (!textSpan) {
        return;
    }
    let start = toPosition(textSpan.start, doc);
    let end = toPosition(textSpan.start + textSpan.length, doc);
    return createRangeFromPoints(start, end);
}

export function createRangeFromPoints(start: lsp.Position, end: lsp.Position): lsp.Range {
    return {
        start: start,
        end: end
    }
}

export function toPosition(index: number, doc: TextDocument): lsp.Position {
    return doc.positionAt(index);
}

export function toHover(hover: QuickInfo | undefined, doc: TextDocument): lsp.Hover | null {
    if (!hover) {
        return null;
    }
    let documentation = hover.documentation ? hover.documentation.map((displayPart) => displayPart.text).join('') : "";
    let tags = hover.tags ? hover.tags.map((tag) => tagToString(tag)).join('  \n') : "";
    let displayParts = hover.displayParts ? hover.displayParts.map((displayPart) => displayPart.text).join('') : "";
    let contents = ['```typescript\n' + displayParts + '```\n',
        (documentation + (tags ? '\n' + tags : '')).replace(/</g, "&lt;").replace(/>/g, "&gt;")];
    return {
        contents: {kind: "markdown", value: contents.join("\n")},
        range: toRange(hover.textSpan, doc)
    };
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

export function toCompletions(completionInfo: CompletionInfo, doc: TextDocument, position: number): lsp.CompletionItem[] {
    return completionInfo.entries.map((entry) => {
        let completion = {
            label: entry.name,
            insertText: entry.name,
            sortText: entry.sortText,
            kind: convertKind(entry.kind),
            position: position,
            entry: entry.name
        }

        if (entry.replacementSpan) {
            const p1 = toPosition(entry.replacementSpan.start, doc);
            const p2 = toPosition(entry.replacementSpan.start + entry.replacementSpan.length, doc);
            completion["range"] = createRangeFromPoints(p1, p2);
        }

        return completion;
    });
}

export function toResolvedCompletion(entry: CompletionEntryDetails): lsp.CompletionItem {
    return {
        label: entry.name,
        kind: convertKind(entry.kind),
        documentation: entry.displayParts.map((displayPart) => displayPart.text).join('')
    };
}

export function toSignatureHelp(signatureItems: SignatureHelpItems | undefined): lsp.SignatureHelp | null {
    if (!signatureItems) {
        return null;
    }
    let signatureHelp: lsp.SignatureHelp = {
        signatures: [],
        activeSignature: signatureItems.selectedItemIndex,
        activeParameter: signatureItems.argumentIndex,
    }
    
    signatureItems.items.forEach((item) => {
        let signature = {
            label: '',
            parameters: [],
            documentation: displayPartsToString(item.documentation)
        };
        signature.label += displayPartsToString(item.prefixDisplayParts);
        item.parameters.forEach((p, i, a) => {
            const label = displayPartsToString(p.displayParts);
            const parameter = {
                label: label,
                documentation: {
                    value: displayPartsToString(p.documentation)
                }
            };
            signature.label += label;
            // @ts-ignore
            signature.parameters.push(parameter);
            if (i < a.length - 1) {
                signature.label += displayPartsToString(item.separatorDisplayParts);
            }
        });
        signature.label += displayPartsToString(item.suffixDisplayParts);
        signatureHelp.signatures.push(signature);
    });
    return signatureHelp;
}

function displayPartsToString(displayParts: ts.SymbolDisplayPart[] | undefined): string {
    if (displayParts) {
        return displayParts.map((displayPart) => displayPart.text).join('');
    }
    return '';
}

export function toDocumentHighlights(highlights: ts.DocumentHighlights[] | undefined, doc: TextDocument): lsp.DocumentHighlight[] {
    if (!highlights)
        return [];
    return highlights.flatMap(highlight => highlight.highlightSpans.map((highlightSpans) => {
        return <lsp.DocumentHighlight>{
            range: toRange(highlightSpans.textSpan, doc),
            kind:
                highlightSpans.kind === 'writtenReference'
                    ? lsp.DocumentHighlightKind.Write
                    : lsp.DocumentHighlightKind.Text
        }
    }));
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

