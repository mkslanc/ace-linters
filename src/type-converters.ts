import type {Range, Position, Diagnostic} from "vscode-languageserver-types";
import type {Ace} from "ace-code";
import {Range as AceRange} from "ace-code/src/range";

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
        if (el.severity !== 4) return {
            row: el.range.start.line,
            column: el.range.start.character,
            text: el.message,
            type: el.severity === 1 ? "error" : el.severity === 2 ? "warning" : "info"
        };
    });
}