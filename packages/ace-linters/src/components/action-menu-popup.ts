import {Ace} from "ace-code";
import {AcePopup} from "../ace/acePopup";
import {popupManager} from "../ace/popupManager";

export type ActionMenuItem<T> = {
    label: string;
    value: T;
    meta?: string;
};

export class ActionMenuPopup<T> {
    private readonly popup: Ace.AcePopup;
    private items: ActionMenuItem<T>[] = [];
    private isOpenState = false;
    private anchorEl: HTMLElement | null = null;
    private readonly lineHeight: number;

    constructor(parentNode: Element, private readonly onSelect: (value: T) => void, options?: { lineHeight?: number }) {
        // @ts-ignore AcePopup constructor typing is ambient from ace internals.
        this.popup = new AcePopup(parentNode);
        this.lineHeight = options?.lineHeight ?? 12;
        this.popup.on("click", (e) => {
            const selected = this.popup.getData(this.popup.getRow()) as { menuValue?: T } | undefined;
            if (selected?.menuValue !== undefined) {
                this.onSelect(selected.menuValue);
            }
            this.hide();
            e.stop();
        });
    }

    get isOpen(): boolean {
        return this.isOpenState;
    }

    setItems(items: ActionMenuItem<T>[]) {
        this.items = items;
        const popupItems = items.map((item) => ({
            value: item.label,
            meta: item.meta,
            menuValue: item.value
        }));
        this.popup.setData(popupItems as Ace.Completion[], "");
    }

    showAt(x: number, y: number, topdownOnly: boolean = false, anchor?: HTMLElement) {
        if (!this.items.length) {
            return;
        }
        this.anchorEl = anchor ?? null;
        this.popup.show({top: y, left: x}, this.lineHeight, topdownOnly);
        popupManager.addAcePopup(this.popup);
        this.isOpenState = true;
        window.addEventListener("mousedown", this.onWindowMouseDown, true);
        window.addEventListener("keydown", this.onWindowKeyDown, true);
        window.addEventListener("wheel", this.onWindowScrollOrResize, true);
        window.addEventListener("resize", this.onWindowScrollOrResize, true);
    }

    showBelowAnchor(anchor: HTMLElement, offsetY: number = 4) {
        const rect = anchor.getBoundingClientRect();
        this.showAt(rect.right, rect.bottom + offsetY, false, anchor);
    }

    hide = () => {
        if (!this.isOpenState) {
            return;
        }
        this.popup.hide();
        popupManager.removeAcePopup(this.popup);
        this.isOpenState = false;
        this.anchorEl = null;
        window.removeEventListener("mousedown", this.onWindowMouseDown, true);
        window.removeEventListener("keydown", this.onWindowKeyDown, true);
        window.removeEventListener("wheel", this.onWindowScrollOrResize, true);
        window.removeEventListener("resize", this.onWindowScrollOrResize, true);
    };

    destroy() {
        this.hide();
        this.popup.destroy();
    }

    private readonly onWindowMouseDown = (event: MouseEvent) => {
        const target = event.target as Node | null;
        if (target && this.popup.container.contains(target)) {
            return;
        }
        if (target && this.anchorEl && this.anchorEl.contains(target)) {
            return;
        }
        this.hide();
    };

    private readonly onWindowKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
            this.hide();
        }
    };

    private readonly onWindowScrollOrResize = () => {
        this.hide();
    };
}
