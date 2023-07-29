import {
    Range,
    Position,
    Diagnostic,
    InsertTextFormat,
    CompletionItem,
    CompletionItemKind,
    Hover,
    MarkupContent,
    MarkedString,
    TextEdit,
    InsertReplaceEdit,
    TextDocumentContentChangeEvent,
    SignatureHelp,
    DiagnosticSeverity,
    DocumentHighlight
} from "vscode-languageserver-protocol";
import type {Ace} from "ace-code";
import {CommonConverter} from "./common-converters";
import {AceRangeData, CompletionService, FilterDiagnosticsOptions, Tooltip} from "../types/language-service";
import {checkValueAgainstRegexpArray, notEmpty} from "../utils";

import {mergeRanges} from "../utils";

export function fromRange(range: AceRangeData): Range {
    return {
        start: {
            line: range.start.row,
            character: range.start.column
        },
        end: {line: range.end.row, character: range.end.column}
    };
}

export function rangeFromPositions(start: Position, end: Position): Range {
    return {
        start: start,
        end: end
    }
}

export function toRange(range: Range): AceRangeData {
    return {
        start: {
            row: range.start.line,
            column: range.start.character
        },
        end: {
            row: range.end.line,
            column: range.end.character
        }
    }
}

export function fromPoint(point: Ace.Point): Position {
    return {line: point.row, character: point.column}
}

export function toPoint(position: Position): Ace.Point {
    return {row: position.line, column: position.character}
}

export function toAnnotations(diagnostics: Diagnostic[]): Ace.Annotation[] {
    return diagnostics.map((el) => {
        return {
            row: el.range.start.line,
            column: el.range.start.character,
            text: el.message,
            type: el.severity === 1 ? "error" : el.severity === 2 ? "warning" : "info"
        };
    });
}

export function toCompletion(item: CompletionItem) {
    let itemKind = item.kind;
    let kind = itemKind ? Object.keys(CompletionItemKind)[Object.values(CompletionItemKind).indexOf(itemKind)] : undefined;
    let text = item.textEdit?.newText ?? item.insertText ?? item.label;
    let command = (item.command?.command == "editor.action.triggerSuggest") ? "startAutocomplete" : undefined;
    let range = item.textEdit ? getTextEditRange(item.textEdit) : undefined;
    let completion = {
        meta: kind,
        caption: item.label,
        score: undefined
    };

    completion["command"] = command;
    completion["range"] = range;
    completion["item"] = item;

    if (item.insertTextFormat == InsertTextFormat.Snippet) {
        completion["snippet"] = text;
    } else {
        completion["value"] = text ?? "";
    }
    completion["documentation"] = item.documentation; //TODO: this is workaround for services with instant completion
    completion["position"] = item["position"];
    completion["service"] = item["service"]; //TODO: since we have multiple servers, we need to determine which
    // server to use for resolving
    return completion;
}


export function toCompletions(completions: CompletionService[]): Ace.Completion[] {
    if (completions.length > 0) {
        let combinedCompletions = completions.map((el) => {
            if (!el.completions) {
                return [];
            }
            let allCompletions;
            if (Array.isArray(el.completions)) {
                allCompletions = el.completions;
            } else {
                allCompletions = el.completions.items;
            }
            return allCompletions.map((item) => {
                item["service"] = el.service;
                return item;
            });
        }).flat();

        return combinedCompletions.map((item) => toCompletion(item) as Ace.Completion)
    }
    return [];
}

export function toResolvedCompletion(completion: Ace.Completion, item: CompletionItem): Ace.Completion {
    completion["docMarkdown"] = fromMarkupContent(item.documentation);
    return completion;
}

export function toCompletionItem(completion: Ace.Completion): CompletionItem {
    let command;
    if (completion["command"]) {
        command = {
            title: "triggerSuggest",
            command: completion["command"]
        }
    }
    let completionItem: CompletionItem = {
        label: completion.caption ?? "",
        kind: CommonConverter.convertKind(completion.meta),
        command: command,
        insertTextFormat: (completion["snippet"]) ? InsertTextFormat.Snippet : InsertTextFormat.PlainText,
        documentation: completion["documentation"],
    };
    if (completion["range"]) {
        completionItem.textEdit = {
            range: fromRange(completion["range"]),
            newText: (completion["snippet"] ?? completion["value"])!
        }
    } else {
        completionItem.insertText = (completion["snippet"] ?? completion["value"])!
    }
    completionItem["fileName"] = completion["fileName"];
    completionItem["position"] = completion["position"];
    completionItem["item"] = completion["item"];
    completionItem["service"] = completion["service"]; //TODO:

    return completionItem;
}

export function getTextEditRange(textEdit: TextEdit | InsertReplaceEdit): AceRangeData {
    if (textEdit.hasOwnProperty("insert") && textEdit.hasOwnProperty("replace")) {
        textEdit = textEdit as InsertReplaceEdit;
        let mergedRanges = mergeRanges([toRange(textEdit.insert), toRange(textEdit.replace)]);
        return mergedRanges[0];
    } else {
        textEdit = textEdit as TextEdit;
        return toRange(textEdit.range);
    }
}

export function toTooltip(hover: Hover[] | undefined): Tooltip | undefined {
    if (!hover)
        return;
    let content = hover.map((el) => {
        if (!el || !el.contents) 
            return;
        if (MarkupContent.is(el.contents)) {
            return fromMarkupContent(el.contents);
        } else if (MarkedString.is(el.contents)) {
            if (typeof el.contents === "string") {
                return el.contents;
            }
            return "```" + el.contents.value + "```";
        } else {
            let contents = el.contents.map((el) => {
                if (typeof el !== "string") {
                    return `\`\`\`${el.value}\`\`\``;
                } else {
                    return el;
                }
            });
            return contents.join("\n\n");
        }
    }).filter(notEmpty);
    if (content.length === 0)
        return;

    //TODO: it could be merged within all ranges in future
    let lspRange = hover.find((el) => el?.range)?.range;
    let range;
    if (lspRange) range = toRange(lspRange);
    return {
        content: {
            type: "markdown",
            text: content.join("\n\n")
        },
        range: range
    };
}

export function fromSignatureHelp(signatureHelp: SignatureHelp[] | undefined): Tooltip | undefined {
    if (!signatureHelp)
        return;
    let content = signatureHelp.map((el) => {
        if (!el)
            return;
        
        let signatureIndex = el?.activeSignature || 0;
        let activeSignature = el.signatures[signatureIndex];
        if (!activeSignature)
            return;
        let activeParam = el?.activeParameter;
        let contents = activeSignature.label;
        if (activeParam != undefined && activeSignature.parameters && activeSignature.parameters[activeParam]) {
            let param = activeSignature.parameters[activeParam].label;
            if (typeof param == "string") {
                contents = contents.replace(param, `**${param}**`);
            }
        }
        if (activeSignature.documentation) {
            if (MarkupContent.is(activeSignature.documentation)) {
                return contents + "\n\n" + fromMarkupContent(activeSignature.documentation)
            } else {
                contents += "\n\n" + activeSignature.documentation;
                return contents;
            }
        } else {
            return contents;
        }
    }).filter(notEmpty);
    
    if (content.length === 0)
        return;

    return {
        content: {
            type: "markdown",
            text: content.join("\n\n")
        }
    };
}

export function fromMarkupContent(content?: string | MarkupContent): string | undefined {
    if (!content)
        return;

    if (typeof content === "string") {
        return content;
    } else {
        return content.value;
    }
}

export function fromAceDelta(delta: Ace.Delta, eol: string): TextDocumentContentChangeEvent {
    const text = delta.lines.length > 1 ? delta.lines.join(eol) : delta.lines[0];
    return {
        range:
            delta.action === "insert"
                ? rangeFromPositions(fromPoint(delta.start), fromPoint(delta.start))
                : rangeFromPositions(fromPoint(delta.start), fromPoint(delta.end)),
        text: delta.action === "insert" ? text : "",
    };
}

export function filterDiagnostics(diagnostics: Diagnostic[], filterErrors: FilterDiagnosticsOptions): Diagnostic[] {
    return CommonConverter.excludeByErrorMessage(diagnostics, filterErrors.errorMessagesToIgnore).map((el) => {
        if (checkValueAgainstRegexpArray(el.message, filterErrors.errorMessagesToTreatAsWarning)) {
            el.severity = DiagnosticSeverity.Warning;
        } else if (checkValueAgainstRegexpArray(el.message, filterErrors.errorMessagesToTreatAsInfo)) {
            el.severity = DiagnosticSeverity.Information;
        }
        return el;
    })
}

export function fromDocumentHighlights(documentHighlights: DocumentHighlight[]): Ace.MarkerGroupItem[] {
    return documentHighlights.map(function (el) {
        let className = el.kind == 2
            ? "language_highlight_read"
            : el.kind == 3
                ? "language_highlight_write"
                : "language_highlight_text";
        return toMarkerGroupItem(CommonConverter.toRange(toRange(el.range)), className);
    });
}

export function toMarkerGroupItem(range, className, tooltipText?): Ace.MarkerGroupItem {
    let markerGroupItem = {
        range: range,
        className: className
    }
    if (tooltipText) {
        markerGroupItem["tooltipText"] = tooltipText;
    }
    return markerGroupItem;
}
