import {expect} from "chai";
import "ace-code/src/test/mockdom";

import {
    extractDiagnosticQuickFixesAtPosition,
    getHoverMenuPosition
} from "./hover-quick-fixes";

// @ts-ignore mockdom compatibility
window["self"] = window;

describe("hover quick fixes", () => {
    it("extracts and deduplicates fixes at position", () => {
        const fix = {
            title: "Fix word",
            newText: "word",
            range: {
                start: {line: 1, character: 2},
                end: {line: 1, character: 6}
            }
        };
        const annotations: any[] = [
            {
                row: 1,
                column: 2,
                data: {
                    v: 1,
                    provider: "spell",
                    issueId: "a",
                    fixes: [fix]
                }
            },
            {
                row: 1,
                column: 2,
                data: {
                    v: 1,
                    provider: "spell",
                    issueId: "a",
                    fixes: [fix]
                }
            },
            {
                row: 1,
                column: 2,
                data: {provider: "invalid"}
            }
        ];

        const extracted = extractDiagnosticQuickFixesAtPosition(annotations as any, {row: 1, column: 3} as any);
        expect(extracted).to.have.length(1);
        expect(extracted[0].provider).to.equal("spell");
        expect(extracted[0].fix.title).to.equal("Fix word");
    });

    it("prefers right side when menu fits", () => {
        Object.defineProperty(window, "innerWidth", {value: 900, configurable: true});
        Object.defineProperty(window, "innerHeight", {value: 700, configurable: true});

        const tooltip = document.createElement("div");
        tooltip.className = "ace_tooltip";
        const anchor = document.createElement("a");
        tooltip.appendChild(anchor);
        document.body.appendChild(tooltip);

        (tooltip as any).getBoundingClientRect = () => ({
            left: 100, right: 240, top: 80, bottom: 160
        });
        (anchor as any).getBoundingClientRect = () => ({
            left: 180, right: 230, top: 120, bottom: 130
        });

        const pos = getHoverMenuPosition(anchor);
        expect(pos.x).to.equal(242);
        expect(pos.y).to.equal(108);
    });

    it("uses bottom when right does not fit but bottom fits", () => {
        Object.defineProperty(window, "innerWidth", {value: 430, configurable: true});
        Object.defineProperty(window, "innerHeight", {value: 700, configurable: true});

        const tooltip = document.createElement("div");
        tooltip.className = "ace_tooltip";
        const anchor = document.createElement("a");
        tooltip.appendChild(anchor);
        document.body.appendChild(tooltip);

        (tooltip as any).getBoundingClientRect = () => ({
            left: 100, right: 240, top: 80, bottom: 160
        });
        (anchor as any).getBoundingClientRect = () => ({
            left: 180, right: 230, top: 120, bottom: 130
        });

        const pos = getHoverMenuPosition(anchor);
        expect(pos.y).to.equal(162);
        expect(pos.x).to.equal(168);
    });

    it("falls back to left when right and bottom do not fit", () => {
        Object.defineProperty(window, "innerWidth", {value: 430, configurable: true});
        Object.defineProperty(window, "innerHeight", {value: 330, configurable: true});

        const tooltip = document.createElement("div");
        tooltip.className = "ace_tooltip";
        const anchor = document.createElement("a");
        tooltip.appendChild(anchor);
        document.body.appendChild(tooltip);

        (tooltip as any).getBoundingClientRect = () => ({
            left: 100, right: 240, top: 80, bottom: 160
        });
        (anchor as any).getBoundingClientRect = () => ({
            left: 180, right: 230, top: 120, bottom: 130
        });

        const pos = getHoverMenuPosition(anchor);
        expect(pos.x).to.equal(2);
        expect(pos.y).to.equal(108);
    });
});
