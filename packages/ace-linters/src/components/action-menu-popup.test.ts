import {expect} from "chai";
import "ace-code/src/test/mockdom";

import {ActionMenuPopup} from "./action-menu-popup";

// @ts-ignore mockdom compatibility
window["self"] = window;

type ClickHandler = (event: { stop: () => void }) => void;

class FakePopup<T> {
    container = document.createElement("div");
    private clickHandler?: ClickHandler;
    data: { menuValue?: T; value: string }[] = [];
    row = 0;
    showCalls: Array<{ pos: { top: number; left: number }; lineHeight: number; topdownOnly: boolean }> = [];
    hideCalls = 0;
    destroyCalls = 0;

    on(eventName: string, callback: ClickHandler) {
        if (eventName === "click") {
            this.clickHandler = callback;
        }
    }

    getData(row: number) {
        return this.data[row];
    }

    getRow() {
        return this.row;
    }

    setData(items: any[]) {
        this.data = items;
    }

    show(pos: { top: number; left: number }, lineHeight: number, topdownOnly: boolean) {
        this.showCalls.push({pos, lineHeight, topdownOnly});
    }

    hide() {
        this.hideCalls++;
    }

    destroy() {
        this.destroyCalls++;
    }

    emitClick(row = 0) {
        this.row = row;
        this.clickHandler?.({stop: () => undefined});
    }
}

describe("ActionMenuPopup", () => {
    function dispatchMouseDown(target: EventTarget) {
        let event: Event;
        if (typeof (window as any).MouseEvent === "function") {
            event = new (window as any).MouseEvent("mousedown", {bubbles: true});
        } else {
            event = document.createEvent("MouseEvents");
            (event as any).initMouseEvent(
                "mousedown",
                true,
                true,
                window,
                0,
                0,
                0,
                0,
                0,
                false,
                false,
                false,
                false,
                0,
                null
            );
        }
        (target as HTMLElement).dispatchEvent(event);
    }

    it("registers/unregisters popup manager on show/hide", () => {
        const fakePopup = new FakePopup<number>();
        let addCalls = 0;
        let removeCalls = 0;

        const popup = new ActionMenuPopup<number>(document.body, () => undefined, {
            popupFactory: () => fakePopup as any,
            popupManager: {
                addAcePopup: () => addCalls++,
                removeAcePopup: () => removeCalls++
            }
        });

        popup.setItems([{label: "One", value: 1}]);
        popup.showAt(10, 20, false);

        expect(addCalls).to.equal(1);
        expect(fakePopup.showCalls).to.have.length(1);
        expect(popup.isOpen).to.equal(true);

        popup.hide();
        expect(removeCalls).to.equal(1);
        expect(fakePopup.hideCalls).to.equal(1);
        expect(popup.isOpen).to.equal(false);
    });

    it("does not show when menu is empty", () => {
        const fakePopup = new FakePopup<number>();
        let addCalls = 0;

        const popup = new ActionMenuPopup<number>(document.body, () => undefined, {
            popupFactory: () => fakePopup as any,
            popupManager: {
                addAcePopup: () => addCalls++,
                removeAcePopup: () => undefined
            }
        });

        popup.showAt(10, 20, false);

        expect(addCalls).to.equal(0);
        expect(fakePopup.showCalls).to.have.length(0);
        expect(popup.isOpen).to.equal(false);
    });

    it("selects clicked item and hides", () => {
        const fakePopup = new FakePopup<number>();
        let selected: number | undefined;

        const popup = new ActionMenuPopup<number>(document.body, (value) => selected = value, {
            popupFactory: () => fakePopup as any,
            popupManager: {
                addAcePopup: () => undefined,
                removeAcePopup: () => undefined
            }
        });

        popup.setItems([{label: "A", value: 10}, {label: "B", value: 20}]);
        popup.showAt(10, 20, false);
        fakePopup.emitClick(1);

        expect(selected).to.equal(20);
        expect(fakePopup.hideCalls).to.equal(1);
        expect(popup.isOpen).to.equal(false);
    });

    it("keeps open for anchor/popup clicks and closes on outside click", () => {
        const fakePopup = new FakePopup<number>();
        const anchor = document.createElement("button");
        document.body.appendChild(anchor);
        const popupChild = document.createElement("div");
        fakePopup.container.appendChild(popupChild);
        const outside = document.createElement("div");
        document.body.appendChild(outside);

        const popup = new ActionMenuPopup<number>(document.body, () => undefined, {
            popupFactory: () => fakePopup as any,
            popupManager: {
                addAcePopup: () => undefined,
                removeAcePopup: () => undefined
            }
        });

        popup.setItems([{label: "A", value: 1}]);
        popup.showAt(10, 20, false, anchor);
        expect(popup.isOpen).to.equal(true);

        dispatchMouseDown(anchor);
        expect(popup.isOpen).to.equal(true);

        dispatchMouseDown(popupChild);
        expect(popup.isOpen).to.equal(true);

        dispatchMouseDown(outside);
        expect(popup.isOpen).to.equal(false);
    });
});
