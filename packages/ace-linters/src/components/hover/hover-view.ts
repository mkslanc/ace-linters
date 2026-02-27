import {HoverQuickFixEntry, createHoverQuickFixNode} from "./hover-quick-fixes";

export type HoverViewModel = {
    errorText?: string;
    hoverHtml?: string;
    quickFixes: HoverQuickFixEntry[];
};

export function createHoverViewNode(
    model: HoverViewModel,
    onApplyFix: (entry: HoverQuickFixEntry) => void
): HTMLElement {
    const domNode = document.createElement("div");

    const errorNode = createErrorNode(model.errorText);
    if (errorNode) {
        domNode.appendChild(errorNode);
    }

    const hoverNode = createHoverNode(model.hoverHtml);
    if (hoverNode) {
        domNode.appendChild(hoverNode);
    }

    const quickFixNode = createHoverQuickFixNode(model.quickFixes, onApplyFix);
    if (quickFixNode) {
        domNode.appendChild(quickFixNode);
    }

    return domNode;
}

function createHoverNode(hoverHtml?: string): HTMLElement | null {
    if (!hoverHtml) {
        return null;
    }
    const hoverNode = document.createElement("div");
    hoverNode.innerHTML = hoverHtml;
    return hoverNode;
}

function createErrorNode(errorText?: string): HTMLElement | null {
    if (!errorText) {
        return null;
    }
    const errorNode = document.createElement("div");
    errorNode.textContent = errorText;
    return errorNode;
}
