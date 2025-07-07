import {Tooltip} from "./tooltip";
import {Ace} from "ace-code";
import {popupManager} from "./popupManager";

const preventParentScroll = function preventParentScroll(event) {
    event.stopPropagation();
    var target = event.currentTarget;
    var contentOverflows = target.scrollHeight > target.clientHeight;
    if (!contentOverflows) {
        event.preventDefault();
    }
};

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

        /**@type{ReturnType<typeof setTimeout> | undefined}*/
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

        el.addEventListener("blur", function() {
            if (!el.contains(document.activeElement)) this.hide();
        }.bind(this));

        el.addEventListener("wheel", preventParentScroll);
    }

    /**
     * @param {Editor} editor
     */
    addToEditor(editor) {
        editor.on("mousemove", this.onMouseMove);
        editor.on("mousedown", this.hide);
        editor.renderer.getMouseEventTarget().addEventListener("mouseout", this.onMouseOut, true);
    }

    /**
     * @param {Editor} editor
     */
    removeFromEditor(editor) {
        editor.off("mousemove", this.onMouseMove);
        editor.off("mousedown", this.hide);
        editor.renderer.getMouseEventTarget().removeEventListener("mouseout", this.onMouseOut, true);
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
    }

    /**
     * @param {MouseEvent} e
     * @param {Editor} editor
     * @internal
     */
    onMouseMove(e, editor) {
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

    /**
     * @param {MouseEvent} e
     */
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

    /**
     * @param {(event: MouseEvent, editor: Editor) => void} value
     */
    setDataProvider(value) {
        this.$gatherData = value;
    }

    /**
     * @param {Editor} editor
     * @param {Range} range
     * @param {HTMLElement} domNode
     * @param {MouseEvent} [startingEvent]
     */
    showForRange(editor, range, domNode, startingEvent) {
        var MARGIN = 10;
        if (startingEvent && startingEvent != this.lastEvent) return;
        if (this.isOpen && document.activeElement == this.getElement()) return;

        var renderer = editor.renderer;
        if (!this.isOpen) {
            this.$registerCloseEvents();
            this.setTheme(renderer.theme);
        }
        this.isOpen = true;

        this.addMarker(range, editor.session);
        const Range = editor.getSelectionRange().constructor; //TODO:
        this.range = Range.fromPoints(range.start, range.end);
        var position = renderer.textToScreenCoordinates(range.start.row, range.start.column);

        var rect = renderer.scroller.getBoundingClientRect();
        // clip position to visible area of the editor
        if (position.pageX < rect.left)
            position.pageX = rect.left;

        var element = this.getElement();
        element.innerHTML = "";
        element.appendChild(domNode);

        element.style.maxHeight = "";
        element.style.display = "block";

        // measure the size of tooltip, without constraints on its height
        var labelHeight = element.clientHeight;
        var labelWidth = element.clientWidth;
        var spaceBelow = window.innerHeight - position.pageY - renderer.lineHeight;

        // if tooltip fits above the line, or space below the line is smaller, show tooltip above
        let isAbove = true;
        if (position.pageY - labelHeight < 0 && position.pageY < spaceBelow) {
            isAbove = false;
        }

        element.style.maxHeight = (isAbove ? position.pageY : spaceBelow) - MARGIN + "px";
        element.style.top = isAbove ? "" : position.pageY + renderer.lineHeight + "px";
        element.style.bottom = isAbove ?  window.innerHeight - position.pageY  + "px" : "";

        // try to align tooltip left with the range, but keep it on screen
        element.style.left = Math.min(position.pageX, window.innerWidth - labelWidth - MARGIN) + "px";

        popupManager.addPopup(this);
    }

    /**
     * @param {Range} range
     * @param {EditSession} [session]
     */
    addMarker(range, session) {
        if (this.marker) {
            this.$markerSession.removeMarker(this.marker);
        }
        this.$markerSession = session;
        this.marker = session && session.addMarker(range, "ace_highlight-marker", "text");
    }

    hide(e) {
        if (!e && document.activeElement == this.getElement())
            return;
        if (e && e.target && (e.type != "keydown" || e.ctrlKey || e.metaKey) && this.$element.contains(e.target))
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
        this.lastEvent = null;
        if (!this.isOpen) return;

        if (!e.relatedTarget || this.getElement().contains(e.relatedTarget)) return;

        if (e && e.currentTarget.contains(e.relatedTarget)) return;
        if (!e.relatedTarget.classList.contains("ace_content")) this.hide();
    }
}
