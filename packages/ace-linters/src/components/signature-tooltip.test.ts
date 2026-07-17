import {expect} from "chai";
import "ace-code/src/test/mockdom";
import {SignatureTooltip} from "./signature-tooltip";

describe("SignatureTooltip", () => {
    function createTooltip() {
        const handlers: Record<string, Function> = {};
        const editor = {
            renderer: {
                on() {},
                off() {}
            },
            on(eventName: string, handler: Function) {
                handlers[eventName] = handler;
            },
            off(eventName: string) {
                delete handlers[eventName];
            }
        } as any;
        const tooltip = new SignatureTooltip({} as any);
        tooltip.$activeEditor = editor;
        tooltip.isOpen = true;
        tooltip.$registerEditorEvents();
        return {tooltip, handlers};
    }

    it("stays open when editor focus moves to tooltip content", () => {
        const {tooltip, handlers} = createTooltip();
        const link = document.createElement("a");
        tooltip.getElement().appendChild(link);

        handlers.blur({relatedTarget: link});

        expect(tooltip.isOpen).to.equal(true);
        tooltip.$hide();
    });

    it("closes when editor focus moves outside the tooltip", () => {
        const {tooltip, handlers} = createTooltip();

        handlers.blur({relatedTarget: document.body});

        expect(tooltip.isOpen).to.equal(false);
    });
});
