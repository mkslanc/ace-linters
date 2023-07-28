import {Tooltip} from "./tooltip";
import {PopupManager} from "./popupManager";
import {Ace} from "ace-code";

let popupManager = new PopupManager();
//taken from ace-code with small changes
export class HoverTooltip extends Tooltip {
    private $gatherData: any;
    private timeout: any;
    private idleTime: number;
    private lastT: number;
    private lastEvent: any;
    private range: Ace.Range;
    row: any;
    private marker: any;
    private $markerSession: any;
    
    constructor(parentNode = document.body) {
        super(parentNode);

        this.timeout = undefined;
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

        el.addEventListener("blur", function () {
            if (!el.contains(document.activeElement)) this.hide();
        }.bind(this));
    }

    addToEditor(editor) {
        editor.on("mousemove", this.onMouseMove);
        editor.on("mousedown", this.hide);
        editor.renderer.getMouseEventTarget().addEventListener("mouseout", this.onMouseOut, true);
    }

    removeFromEditor(editor) {
        editor.off("mousemove", this.onMouseMove);
        editor.off("mousedown", this.hide);
        editor.renderer.getMouseEventTarget().removeEventListener("mouseout", this.onMouseOut, true);
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
    }

    onMouseMove(e: MouseEvent, editor) {
        this.lastEvent = e;
        this.lastT = Date.now();
        var isMousePressed = editor.$mouseHandler.isMousePressed;
        if (this.isOpen) {
            var pos = this.lastEvent && this.lastEvent.getDocumentPosition();
            if (
                !this.range
                || !this.range.contains(pos.row, pos.column)
                || isMousePressed
                || this.isOutsideOfText(this.lastEvent)
            ) {
                this.hide();
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

    isOutsideOfText(e) {
        var editor = e.editor;
        var docPos = e.getDocumentPosition();
        var line = editor.session.getLine(docPos.row);
        if (docPos.column == line.length) {
            var screenPos = editor.renderer.pixelToScreenCoordinates(e.clientX, e.clientY);
            var clippedPos = editor.session.documentToScreenPosition(docPos.row, docPos.column);
            if (
                clippedPos.column != screenPos.column
                || clippedPos.row != screenPos.row
            ) {
                return true;
            }
        }
        return false;
    }

    setDataProvider(value) {
        this.$gatherData = value;
    }

    showForRange(editor, range, domNode, startingEvent) {
        if (startingEvent && startingEvent != this.lastEvent) return;
        if (this.isOpen && document.activeElement == this.getElement()) return;

        var renderer = editor.renderer;
        if (!this.isOpen) {
            popupManager.addPopup(this);
            this.$registerCloseEvents();
            this.setTheme(renderer.theme);
        }
        this.isOpen = true;

        this.addMarker(range, editor.session);
        const Range = editor.getSelectionRange().constructor;
        this.range = Range.fromPoints(range.start, range.end);

        var element = this.getElement();
        element.innerHTML = "";
        element.appendChild(domNode);
        element.style.display = "block";

        var position = renderer.textToScreenCoordinates(range.start.row, range.start.column);
        var cursorPos = editor.getCursorPosition();

        var labelHeight = element.clientHeight;
        var rect = renderer.scroller.getBoundingClientRect();

        var isTopdown = true;
        if (this.row > cursorPos.row) {
            // don't obscure cursor
            isTopdown = true;
        } else if (this.row < cursorPos.row) {
            // don't obscure cursor
            isTopdown = false;
        }

        if (position.pageY - labelHeight + renderer.lineHeight < rect.top) {
            // not enough space above us
            isTopdown = true;
        } else if (position.pageY + labelHeight > rect.bottom) {
            isTopdown = false;
        }

        if (!isTopdown) {
            position.pageY -= labelHeight;
        } else {
            position.pageY += renderer.lineHeight;
        }

        element.style.maxWidth = rect.width - (position.pageX - rect.left) + "px";

        this.setPosition(position.pageX, position.pageY);
    }

    addMarker(range, session?) {
        if (this.marker) {
            this.$markerSession.removeMarker(this.marker);
        }
        this.$markerSession = session;
        this.marker = session && session.addMarker(range, "ace_highlight-marker", "text");
    }

    hide(e?) {
        if (!e && document.activeElement == this.getElement())
            return;
        if (e && e.target && (e.type != "keydown" || e.ctrlKey || e.metaKey) && this.$element && this.$element.contains(e.target))
            return;
        this.lastEvent = null;
        if (this.timeout) clearTimeout(this.timeout);
        this.timeout = null;
        this.addMarker(null);
        if (this.isOpen) {
            this.$removeCloseEvents();
            this.getElement().style.display = "none";
            this.isOpen = false;
            popupManager.removePopup(this);
        }
    }

    $registerCloseEvents() {
        window.addEventListener("keydown", this.hide, true);
        window.addEventListener("mousewheel", this.hide, true);
        window.addEventListener("mousedown", this.hide, true);
    }

    $removeCloseEvents() {
        window.removeEventListener("keydown", this.hide, true);
        window.removeEventListener("mousewheel", this.hide, true);
        window.removeEventListener("mousedown", this.hide, true);
    }

    onMouseOut(e) {
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
        this.lastEvent = null;
        if (!this.isOpen) return;

        if (!e.relatedTarget || e.relatedTarget == this.getElement()) return;

        if (e && e.currentTarget.contains(e.relatedTarget)) return;
        if (!e.relatedTarget.classList.contains("ace_content")) this.hide();
    }
}
