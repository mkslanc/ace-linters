import {Ace} from "ace-code";
import * as lsp from "vscode-languageserver-protocol";
import {DiagnosticFixData, isDiagnosticCodeActionData} from "../../types/diagnostic-data";

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
    wrapper.style.marginTop = "8px";
    wrapper.style.paddingTop = "8px";
    wrapper.style.borderTop = "1px solid rgba(127,127,127,0.35)";

    const title = document.createElement("div");
    title.textContent = "Quick fixes";
    title.style.fontWeight = "600";
    title.style.marginBottom = "6px";
    wrapper.appendChild(title);

    const controls = document.createElement("div");
    controls.style.display = "flex";
    controls.style.alignItems = "center";
    controls.style.gap = "8px";
    wrapper.appendChild(controls);

    const primaryLink = createActionLink(fixes[0].fix.title);
    primaryLink.style.flex = "1";
    primaryLink.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        onApplyFix(fixes[0]);
    });
    controls.appendChild(primaryLink);

    if (fixes.length > 1) {
        const menuWrapper = document.createElement("div");
        menuWrapper.style.position = "relative";
        controls.appendChild(menuWrapper);

        const moreLink = createActionLink("More v");
        moreLink.style.whiteSpace = "nowrap";
        menuWrapper.appendChild(moreLink);

        const menu = document.createElement("div");
        menu.style.display = "none";
        menu.style.position = "absolute";
        menu.style.right = "0";
        menu.style.top = "100%";
        menu.style.zIndex = "1000";
        menu.style.background = "var(--ace-bg, #fff)";
        menu.style.border = "1px solid rgba(127,127,127,0.45)";
        menu.style.minWidth = "220px";
        menu.style.marginTop = "4px";
        menu.style.padding = "4px 0";
        menu.style.boxShadow = "0 2px 8px rgba(0,0,0,0.2)";
        menuWrapper.appendChild(menu);

        fixes.slice(1).forEach((entry) => {
            const item = createActionLink(entry.fix.title);
            item.style.display = "block";
            item.style.padding = "6px 10px";
            item.style.textDecoration = "none";
            item.style.color = "inherit";
            item.addEventListener("click", (event) => {
                event.preventDefault();
                event.stopPropagation();
                menu.style.display = "none";
                onApplyFix(entry);
            });
            menu.appendChild(item);
        });

        moreLink.addEventListener("click", (event) => {
            event.preventDefault();
            event.stopPropagation();
            menu.style.display = menu.style.display === "none" ? "block" : "none";
        });
    }

    return wrapper;
}

function createActionLink(text: string): HTMLAnchorElement {
    const link = document.createElement("a");
    link.href = "#";
    link.textContent = text;
    link.style.cursor = "pointer";
    link.style.textDecoration = "underline";
    link.style.color = "var(--ace-link-color, #2563eb)";
    link.style.fontWeight = "500";
    return link;
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
