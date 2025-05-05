import {
    CompletionEntryDetails,
    CompletionInfo,
    Diagnostic,
    JSDocTagInfo,
    QuickInfo, SignatureHelpItems,
    TextChange,
    TextSpan
} from "./lib/typescriptServices";
import * as ts from "./lib/typescriptServices";
import * as lsp from "vscode-languageserver-protocol";
import {TextDocument} from "vscode-languageserver-textdocument";
import {CommonConverter} from "../../type-converters/common-converters";
import convertKind = CommonConverter.convertKind;
import {FilterDiagnosticsOptions} from "../../types/language-service";
import {filterDiagnostics} from "../../type-converters/lsp/lsp-converters";

export function fromTsDiagnostics(diagnostics: Diagnostic[], doc: TextDocument, filterErrors: FilterDiagnosticsOptions): lsp.Diagnostic[] {
    const lspDiagnostics = diagnostics.filter((el) => !filterErrors.errorCodesToIgnore!.includes(el.code.toString())).map((el) => {
        let start = el.start ?? 0;
        let length = el.length ?? 1; //TODO:
        if (filterErrors.errorCodesToTreatAsWarning!.includes(el.code.toString())) {
            el.category = DiagnosticCategory.Warning;
        } else if (filterErrors.errorCodesToTreatAsInfo!.includes(el.code.toString())) {
            el.category = DiagnosticCategory.Message;
        }
        return lsp.Diagnostic.create(lsp.Range.create(doc.positionAt(start), doc.positionAt(start + length)),
            parseMessageText(el.messageText, el.code), fromTsCategory(el.category), el.code);
    });
    return filterDiagnostics(lspDiagnostics, filterErrors);
}

export function toTsOffset(range: lsp.Range, doc: TextDocument) {
    return {
        start: normalizeOffset(range.start, doc),
        end: normalizeOffset(range.end, doc)
    }
}

export function toTextSpan(range: lsp.Range, doc: TextDocument) {
    const start = doc.offsetAt(range.start);
    const end = doc.offsetAt(range.end);
    return {
        start: start,
        length: end - start
    }
}

function normalizeOffset(position: lsp.Position, doc: TextDocument) {
    const offset = doc.offsetAt(position);
    return offset >= 0 ? offset : 0;
}

export function parseMessageText(
    diagnosticsText: string | ts.DiagnosticMessageChain | undefined, errorCode: number
): string {
    if (typeof diagnosticsText === 'string') {
        return diagnosticsText + " (" + errorCode.toString() + ")\n";
    } else if (diagnosticsText === undefined) {
        return '';
    }
    let result = '';
    result += diagnosticsText.messageText + " (" + diagnosticsText.code.toString() + ")\n";
    if (diagnosticsText.next) {
        for (let next of diagnosticsText.next) {
            result += parseMessageText(next, next.code);
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
        case DiagnosticCategory.Warning:
            return 2;
    }
    return 3;
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
    let contents = ['```typescript\n' + displayParts + '\n```\n',
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
            sortText: entry.sortText,
            kind: convertKind(entry.kind),
            position: position,
            entry: entry.name
        }

        /**
         * The `insertText` is subject to interpretation by the client side.
         * Some tools might not take the string literally. For example
         * VS Code when code complete is requested in this example
         * `con<cursor position>` and a completion item with an `insertText` of
         * `console` is provided it will only insert `sole`. Therefore it is
         * recommended to use `textEdit` instead since it avoids additional client
         * side interpretation.
         *
         * https://microsoft.github.io/language-server-protocol/specifications/lsp/3.17/specification/#completionItem
         */
        let completionText = entry.insertText ?? entry.name;
        let rangeStart = toPosition(position, doc);
        let rangeEnd = toPosition(position, doc);

        if (entry.replacementSpan) {
            rangeStart = toPosition(entry.replacementSpan.start, doc);
            rangeEnd = toPosition(entry.replacementSpan.start + entry.replacementSpan.length, doc);
        }

        completion["textEdit"] = {
            range: createRangeFromPoints(rangeStart, rangeEnd),
            newText: completionText
        }

        return completion;
    });
}

export function toResolvedCompletion(entry: CompletionEntryDetails): lsp.CompletionItem {
    let documentation = entry.displayParts.map((displayPart) => displayPart.text).join('');
    if (entry.documentation) {
        documentation += "\n\n" + entry.documentation.map((displayPart) => displayPart.text).join('');
    }
    return {
        label: entry.name,
        kind: convertKind(entry.kind),
        documentation: documentation
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

export function getTokenTypeFromClassification(tsClassification: number): number | undefined {
    if (tsClassification > TokenEncodingConsts.modifierMask) {
        return (tsClassification >> TokenEncodingConsts.typeOffset) - 1;
    }
    return undefined;
}

export function getTokenModifierFromClassification(tsClassification: number) {
    return tsClassification & TokenEncodingConsts.modifierMask;
}

export function diagnosticsToErrorCodes(diagnostics: lsp.Diagnostic[]): number[] {
    return diagnostics.map((el) => {
        return Number(el.code);
    }).filter(code => !isNaN(code));
}

export function toCodeActions(codeFixes: readonly ts.CodeFixAction[], doc: TextDocument): lsp.CodeAction[] {
    return codeFixes
        .filter((fix) => {
            // Removes any 'make a new file'-type code fix
            return fix.changes.filter((change) => change.isNewFile).length === 0;
        })
        .map((fix) => {

            const edit: lsp.WorkspaceEdit = {
                changes: {}
            };
            edit.changes![doc.uri] = [];

            for (const change of fix.changes) {
                if (change.fileName == doc.uri) {

                }
                for (const textChange of change.textChanges) {
                    edit.changes![doc.uri].push({
                        range: toRange(textChange.span, doc)!,
                        newText: textChange.newText
                    });
                }
            }

            return {
                title: fix.description,
                edit,
                kind: 'quickfix'
            };
        });
}

export enum SemanticClassificationFormat {
    Original = "original",
    TwentyTwenty = "2020",
}

enum TokenEncodingConsts {
    typeOffset = 8,
    modifierMask = 255
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
    ES2022 = 9,
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

