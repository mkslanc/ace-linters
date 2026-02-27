import {Tooltip} from "./tooltip";
import {Ace} from "ace-code";
import {popupManager} from "./popupManager";

function preventParentScroll(event) {
    event.stopPropagation();
    var target = event.currentTarget;
    var contentOverflows = target.scrollHeight > target.clientHeight;
    if (!contentOverflows) {
        event.preventDefault();
    }
}

//taken from ace-code with small changes
export class HoverTooltip extends Tooltip {
    private $gatherData: any;
    private timeout: any;
    private mouseOutHideTimer: number | null;
    private mouseMoveHideTimer: number | null;
    private $fromKeyboard: boolean;
    private idleTime: number;
    private lastT: number;
    private lastEvent: any;
    private range: Ace.Range;
    row: any;
    private marker: any;
    private $markerSession: any;

    constructor(parentNode = document.body) {
        super(parentNode);

        /**@type{ReturnType<typeof setTimeout> | undefined}*/
        this.timeout = undefined;
        this.mouseOutHideTimer = null;
        this.mouseMoveHideTimer = null;
        this.$fromKeyboard = false;
        this.lastT = 0;
        this.idleTime = 350;
        this.lastEvent = undefined;

        this.onMouseOut = this.onMouseOut.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.waitForHover = this.waitForHover.bind(this);
        this.hide = this.hide.bind(this);

        var el = this.getElement();
        el.style.whiteSpace = "pre-wrap";
        el.style.pointerEvents = "auto";
        el.addEventListener("mouseout", this.onMouseOut);
        el.tabIndex = -1;

        el.addEventListener(
            "blur",
            function () {
                if (!el.contains(document.activeElement)) this.hide();
            }.bind(this),
        );

        el.addEventListener("wheel", preventParentScroll);
    }

    /**
     * @param {Editor} editor
     */
    addToEditor(editor: Ace.Editor) {
        editor.on("mousemove", this.onMouseMove);
        editor.on("mousedown", this.hide);
        var target = editor.renderer.getMouseEventTarget();
        if (target && typeof target.removeEventListener === "function") {
            target.addEventListener("mouseout", this.onMouseOut, true);
        }
    }

    /**
     * @param {Editor} editor
     */
    removeFromEditor(editor: Ace.Editor) {
        editor.off("mousemove", this.onMouseMove);
        editor.off("mousedown", this.hide);
        var target = editor.renderer.getMouseEventTarget();
        if (target && typeof target.removeEventListener === "function") {
            target.removeEventListener("mouseout", this.onMouseOut, true);
        }
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
        if (this.mouseOutHideTimer !== null) {
            clearTimeout(this.mouseOutHideTimer);
            this.mouseOutHideTimer = null;
        }
        if (this.mouseMoveHideTimer !== null) {
            clearTimeout(this.mouseMoveHideTimer);
            this.mouseMoveHideTimer = null;
        }
    }

    /**
     * @param {MouseEvent} e
     * @param {Editor} editor
     * @internal
     */
    onMouseMove(e, editor: Ace.Editor) {
        this.lastEvent = e;
        this.lastT = Date.now();
        var isMousePressed = editor['$mouseHandler'].isMousePressed;
        if (this.isOpen) {
            var pos = this.lastEvent && this.lastEvent.getDocumentPosition();
            if (
                !this.range ||
                !this.range.contains(pos.row, pos.column) ||
                isMousePressed ||
                this.isOutsideOfText(this.lastEvent)
            ) {
                this.deferHideFromMouseMove();
            } else if (this.mouseMoveHideTimer !== null) {
                clearTimeout(this.mouseMoveHideTimer);
                this.mouseMoveHideTimer = null;
            }
        }
        if (this.timeout || isMousePressed) return;
        this.lastEvent = e;
        this.timeout = setTimeout(this.waitForHover, this.idleTime);
    }

    waitForHover() {
        if (this.timeout) clearTimeout(this.timeout);
        var dt = Date.now() - this.lastT;
        if (this.idleTime - dt > 10) {
            this.timeout = setTimeout(this.waitForHover, this.idleTime - dt);
            return;
        }

        this.timeout = null;
        if (this.lastEvent && !this.isOutsideOfText(this.lastEvent)) {
            this.$gatherData(this.lastEvent, this.lastEvent.editor);
        }
    }

    /**
     * @param {MouseEvent} e
     */
    isOutsideOfText(e) {
        var editor = e.editor;
        var docPos = e.getDocumentPosition();
        var line = editor.session.getLine(docPos.row);
        if (docPos.column == line.length) {
            var screenPos = editor.renderer.pixelToScreenCoordinates(
                e.clientX,
                e.clientY,
            );
            var clippedPos = editor.session.documentToScreenPosition(
                docPos.row,
                docPos.column,
            );
            if (
                clippedPos.column != screenPos.column ||
                clippedPos.row != screenPos.row
            ) {
                return true;
            }
        }
        return false;
    }

    /**
     * @param {(event: MouseEvent, editor: Editor) => void} value
     */
    setDataProvider(value) {
        this.$gatherData = value;
    }

    showForRange(
        editor: Ace.Editor,
        range: Ace.Range,
        domNode: HTMLElement,
        startingEvent?: MouseEvent,
    ) {
        if (startingEvent && startingEvent != this.lastEvent) return;
        if (this.isOpen && document.activeElement == this.getElement()) return;

        var renderer = editor.renderer;
        if (!this.isOpen) {
            this.$registerCloseEvents();
            this.setTheme(renderer.theme);
        }
        this.isOpen = true;
        const Range = editor.getSelectionRange().constructor as any; //TODO:
        this.range = Range.fromPoints(range.start, range.end);
        var position = renderer.textToScreenCoordinates(
            range.start.row,
            range.start.column,
        );

        var rect = renderer.scroller.getBoundingClientRect();
        // clip position to visible area of the editor
        if (position.pageX < rect.left) position.pageX = rect.left;

        var element = this.getElement();
        element.innerHTML = "";
        element.appendChild(domNode);

        element.style.maxHeight = "";
        element.style.display = "block";

        this.$setPosition(editor, position, true, range);

        editor.renderer["$textLayer"].dom.$fixPositionBug(element);
        popupManager.addPopup(this);
    }

    /**
     * @param {Editor} editor
     * @param {{pageX: number;pageY: number;}} position
     * @param {boolean} withMarker
     * @param {Range} [range]
     */
    $setPosition(
        editor: Ace.Editor,
        position: { pageX: number; pageY: number },
        withMarker: boolean,
        range: Ace.Range,
    ) {
        var MARGIN = 10;

        withMarker && this.addMarker(range, editor.session);

        var renderer = editor.renderer;
        var element = this.getElement();

        // measure the size of tooltip, without constraints on its height
        var labelHeight = element.offsetHeight;
        var labelWidth = element.offsetWidth;
        var anchorTop = position.pageY;
        var anchorLeft = position.pageX;
        var spaceBelow = window.innerHeight - anchorTop - renderer.lineHeight;

        // if tooltip fits above the line, or space below the line is smaller, show tooltip above
        var isAbove = this.$shouldPlaceAbove(
            labelHeight,
            anchorTop,
            spaceBelow - MARGIN,
        );

        element.style.maxHeight =
            (isAbove ? anchorTop : spaceBelow) - MARGIN + "px";
        element.style.top = isAbove ? "" : anchorTop + renderer.lineHeight + "px";
        element.style.bottom = isAbove ? window.innerHeight - anchorTop + "px" : "";

        // try to align tooltip left with the range, but keep it on screen
        element.style.left =
            Math.min(anchorLeft, window.innerWidth - labelWidth - MARGIN) + "px";
    }

    /**
     * @param {number} labelHeight
     * @param {number} anchorTop
     * @param {number} spaceBelow
     */
    $shouldPlaceAbove(labelHeight, anchorTop, spaceBelow) {
        return !(anchorTop - labelHeight < 0 && anchorTop < spaceBelow);
    }

    addMarker(range: Ace.Range | null, session?: Ace.EditSession) {
        if (this.marker) {
            this.$markerSession.removeMarker(this.marker);
        }
        this.$markerSession = session;
        this.marker =
            session && range
                ? session.addMarker(range, "ace_highlight-marker", "text")
                : null;
    }

    hide(e?: any) {
        if (e && this.$fromKeyboard && e.type == "keydown") {
            if (e.code == "Escape") {
                return;
            }
        }

        if (!e && document.activeElement == this.getElement()) return;
        if (
            e &&
            e.target &&
            (e.type != "keydown" || e.ctrlKey || e.metaKey) &&
            this.$element?.contains(e.target)
        )
            return;
        this.lastEvent = null;
        if (this.timeout) clearTimeout(this.timeout);
        this.timeout = null;
        if (this.mouseOutHideTimer !== null) {
            clearTimeout(this.mouseOutHideTimer);
            this.mouseOutHideTimer = null;
        }
        if (this.mouseMoveHideTimer !== null) {
            clearTimeout(this.mouseMoveHideTimer);
            this.mouseMoveHideTimer = null;
        }
        this.addMarker(null);
        if (this.isOpen) {
            this.$fromKeyboard = false;
            this.$removeCloseEvents();
            this.getElement().style.display = "none";
            this.isOpen = false;
            popupManager.removePopup(this);
        }
    }

    $registerCloseEvents() {
        window.addEventListener("keydown", this.hide, true);
        window.addEventListener("wheel", this.hide, true);
        window.addEventListener("mousedown", this.hide, true);
    }

    $removeCloseEvents() {
        window.removeEventListener("keydown", this.hide, true);
        window.removeEventListener("wheel", this.hide, true);
        window.removeEventListener("mousedown", this.hide, true);
    }

    /**
     * @internal
     */
    onMouseOut(e) {
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
        if (this.mouseOutHideTimer !== null) {
            clearTimeout(this.mouseOutHideTimer);
            this.mouseOutHideTimer = null;
        }
        if (this.mouseMoveHideTimer !== null) {
            clearTimeout(this.mouseMoveHideTimer);
            this.mouseMoveHideTimer = null;
        }
        this.lastEvent = null;
        if (!this.isOpen) return;

        const tooltipEl = this.getElement();
        if (!e.relatedTarget || tooltipEl.contains(e.relatedTarget)) return;

        if (e && e.currentTarget.contains(e.relatedTarget)) return;
        if (this.isPointerInsideTooltipBounds(e, tooltipEl)) return;
        if (e.relatedTarget.classList.contains("ace_content")) return;

        this.mouseOutHideTimer = window.setTimeout(() => {
            this.mouseOutHideTimer = null;
            if (!this.isOpen) return;
            if (tooltipEl.matches(":hover")) return;
            if (document.activeElement && tooltipEl.contains(document.activeElement))
                return;
            this.hide();
        }, 0);
    }

    private deferHideFromMouseMove(): void {
        if (this.mouseMoveHideTimer !== null) {
            clearTimeout(this.mouseMoveHideTimer);
            this.mouseMoveHideTimer = null;
        }
        const tooltipEl = this.getElement();
        if (tooltipEl.matches(":hover")) {
            return;
        }
        this.mouseMoveHideTimer = window.setTimeout(() => {
            this.mouseMoveHideTimer = null;
            if (!this.isOpen) return;
            if (tooltipEl.matches(":hover")) return;
            if (document.activeElement && tooltipEl.contains(document.activeElement))
                return;
            this.hide();
        }, 50);
    }

    private isPointerInsideTooltipBounds(
        e: MouseEvent,
        tooltipEl: HTMLElement,
    ): boolean {
        if (typeof e.clientX !== "number" || typeof e.clientY !== "number") {
            return false;
        }
        const rect = tooltipEl.getBoundingClientRect();
        return (
            e.clientX >= rect.left &&
            e.clientX <= rect.right &&
            e.clientY >= rect.top &&
            e.clientY <= rect.bottom
        );
    }
}
