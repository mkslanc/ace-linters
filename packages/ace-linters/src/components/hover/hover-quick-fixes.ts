import {Ace} from "ace-code";
import * as lsp from "vscode-languageserver-protocol";
import {DiagnosticFixData, isDiagnosticCodeActionData} from "../../types/diagnostic-data";
import {ActionMenuPopup} from "../action-menu-popup";

export type HoverQuickFixEntry = {
    provider: string;
    issueId: string;
    fix: DiagnosticFixData;
};

export function extractDiagnosticQuickFixesAtPosition(
    annotations: (Ace.Annotation & { data?: unknown })[],
    position: Ace.Point
): HoverQuickFixEntry[] {
    const fixes: HoverQuickFixEntry[] = [];
    const seen = new Set<string>();

    for (const annotation of annotations) {
        const data = annotation.data;
        if (!isDiagnosticCodeActionData(data)) {
            continue;
        }

        for (const fix of data.fixes || []) {
            if (!isPositionInLspRange(position, fix.range)) {
                continue;
            }
            const key = [
                data.provider,
                data.issueId,
                fix.title,
                fix.newText,
                fix.range.start.line,
                fix.range.start.character,
                fix.range.end.line,
                fix.range.end.character
            ].join("|");
            if (seen.has(key)) {
                continue;
            }
            seen.add(key);
            fixes.push({
                provider: data.provider,
                issueId: data.issueId,
                fix
            });
        }
    }

    return fixes;
}

export function createHoverQuickFixNode(
    fixes: HoverQuickFixEntry[],
    onApplyFix: (entry: HoverQuickFixEntry) => void
): HTMLElement | null {
    if (!fixes.length) {
        return null;
    }

    const wrapper = document.createElement("div");
    wrapper.className = "ace_lsp_hover_quickfixes";

    const title = document.createElement("div");
    title.className = "ace_lsp_hover_quickfixes_title";
    wrapper.appendChild(title);

    const controls = document.createElement("div");
    controls.className = "ace_lsp_hover_quickfixes_controls";
    wrapper.appendChild(controls);

    const primaryLink = createActionLink(fixes[0].fix.title);
    primaryLink.classList.add("ace_lsp_hover_quickfixes_primary");
    primaryLink.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        onApplyFix(fixes[0]);
    });
    controls.appendChild(primaryLink);

    let menuPopup: ActionMenuPopup<HoverQuickFixEntry> | null = null;

    if (fixes.length > 1) {
        const moreLink = createActionLink("More actions...");
        moreLink.classList.add("ace_lsp_hover_quickfixes_more");
        controls.appendChild(moreLink);

        moreLink.addEventListener("click", (event) => {
            event.preventDefault();
            event.stopPropagation();
            if (menuPopup) {
                menuPopup.destroy();
                menuPopup = null;
                return;
            }

            menuPopup = new ActionMenuPopup(
                document.body || document.documentElement,
                (entry) => {
                    onApplyFix(entry);
                    menuPopup?.destroy();
                    menuPopup = null;
                },
                {lineHeight: 12}
            );
            menuPopup.setItems(
                fixes.slice(1).map((entry) => ({
                    label: entry.fix.title,
                    value: entry
                }))
            );
            const menuPosition = getHoverMenuPosition(moreLink);
            menuPopup.showAt(menuPosition.x, menuPosition.y, false, moreLink);
        });
    }

    return wrapper;
}

function createActionLink(text: string): HTMLAnchorElement {
    const link = document.createElement("a");
    link.href = "#";
    link.textContent = text;
    link.className = "ace_lsp_hover_quickfixes_link";
    return link;
}

export function getHoverMenuPosition(anchor: HTMLElement): { x: number; y: number } {
    const gap = 2;
    const estimatedMenuWidth = 260;
    const estimatedMenuHeight = 220;
    const anchorRect = anchor.getBoundingClientRect();
    const tooltip = anchor.closest(".ace_tooltip") as HTMLElement | null;
    if (!tooltip) {
        return {
            x: anchorRect.right,
            y: anchorRect.bottom + 4
        };
    }
    const tooltipRect = tooltip.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const rightX = tooltipRect.right + gap;
    const rightFits = rightX + estimatedMenuWidth <= viewportWidth - gap;

    if (rightFits) {
        return {
            x: rightX,
            y: Math.max(gap, anchorRect.top - 12)
        };
    }

    const bottomY = tooltipRect.bottom + gap;
    const bottomFits = bottomY + estimatedMenuHeight <= viewportHeight - gap;
    if (bottomFits) {
        return {
            x: Math.max(gap, Math.min(anchorRect.right, viewportWidth - estimatedMenuWidth - gap)),
            y: bottomY
        };
    }

    const leftX = Math.max(gap, tooltipRect.left - estimatedMenuWidth - gap);
    return {
        x: leftX,
        y: Math.max(gap, anchorRect.top - 12)
    };
}

function isPositionInLspRange(position: Ace.Point, range: lsp.Range): boolean {
    const line = position.row;
    const character = position.column;
    if (line < range.start.line || line > range.end.line) {
        return false;
    }
    if (line === range.start.line && character < range.start.character) {
        return false;
    }
    if (line === range.end.line && character > range.end.character) {
        return false;
    }
    return true;
}
