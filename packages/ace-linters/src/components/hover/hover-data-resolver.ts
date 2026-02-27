import {Ace} from "ace-code";
import * as lsp from "vscode-languageserver-protocol";
import {Tooltip} from "../../types/language-service";
import {HoverQuickFixEntry} from "./hover-quick-fixes";

type PointLike = {
    row: number;
    column: number;
};

type RangeLike = {
    start: PointLike;
    end: PointLike;
};

export type HoverDiagnosticMarker = {
    range: RangeLike;
    tooltipText?: string;
};

export type HoverResolvedModel = {
    range: Ace.Range;
    errorText?: string;
    hoverHtml?: string;
    quickFixes: HoverQuickFixEntry[];
};

type HoverResolveContext = {
    hover?: Tooltip;
    errorMarkers: HoverDiagnosticMarker[];
    quickFixes: HoverQuickFixEntry[];
    docPos: Ace.Point;
    rangeFromPoints: (start: PointLike, end: PointLike) => Ace.Range;
    getWordRange: (row: number, column: number) => Ace.Range;
    lspRangeToAceRange: (range: lsp.Range) => RangeLike;
    getHoverHtml: (hover: Tooltip) => string;
};

export function resolveHoverModel(context: HoverResolveContext): HoverResolvedModel | null {
    const {hover, errorMarkers, quickFixes} = context;
    const hoverHtml = hover?.content ? context.getHoverHtml(hover) : undefined;
    const errorText = buildErrorText(errorMarkers);

    if (!hoverHtml && !errorText && quickFixes.length === 0) {
        return null;
    }

    const actionRange = quickFixes[0]?.fix.range
        ? context.lspRangeToAceRange(quickFixes[0].fix.range)
        : undefined;

    const baseRange = hover?.range ?? errorMarkers[0]?.range ?? actionRange;
    const range = baseRange
        ? context.rangeFromPoints(baseRange.start, baseRange.end)
        : context.getWordRange(context.docPos.row, context.docPos.column);

    return {
        range,
        errorText,
        hoverHtml,
        quickFixes
    };
}

function buildErrorText(errorMarkers: HoverDiagnosticMarker[]): string | undefined {
    const text = errorMarkers
        .map((marker) => marker.tooltipText?.trim())
        .filter((value): value is string => Boolean(value))
        .join("\n");
    return text || undefined;
}
