"use strict";
import {LanguageProvider} from "../language-provider";
import {Ace} from "ace-code";
import Editor = Ace.Editor;

let event = require("ace-code/src/lib/event");
let {Tooltip} = require("ace-code/src/tooltip");

export class DescriptionTooltip extends Tooltip {
    private provider: LanguageProvider;
    private $activeEditor: Editor;

    $mouseMoveTimer: NodeJS.Timeout;
    $showTimer: NodeJS.Timeout;
    row?: number;
    column?: number;

    constructor(provider: LanguageProvider) {
        super();
        this.provider = provider;
        Tooltip.call(this, document.body);

        event.addListener(this.getElement(), "mouseout", this.onTooltipMouseOut);

        this.getElement().style.pointerEvents = "auto";
        this.getElement().style.whiteSpace = "pre-wrap";
    }

    registerEditor(editor: Ace.Editor) {
        editor.on("mousemove", this.onMouseMove);
    }

    private $registerEditorEvents(editor: Ace.Editor) {
        this.$activeEditor = editor;
        editor.on("change", this.$hide);
        editor.on("mousewheel", this.$hide);
        //@ts-ignore
        editor.on("mousedown", this.$hide);

        editor.container.addEventListener("mouseout", this.onTooltipMouseOut);
    }

    private $removeEditorEvents() {
        this.$activeEditor.off("change", this.$hide);
        this.$activeEditor.off("mousewheel", this.$hide);
        //@ts-ignore
        this.$activeEditor.off("mousedown", this.$hide);

        this.$activeEditor.container.removeEventListener("mouseout", this.onTooltipMouseOut);
        this.$activeEditor = null;
    }

    update (editor: Ace.Editor) {
        clearTimeout(this.$mouseMoveTimer);
        clearTimeout(this.$showTimer);
        if (this.isOpen) {
            this.doHover(editor);
        } else {
            this.$mouseMoveTimer = setTimeout(() => {
                this.doHover(editor);
                this.$mouseMoveTimer = null;
            }, 500);

        }
    };

    doHover = (editor) => {
        if (!editor) {
            console.log(editor);
        }
        let renderer = editor.renderer;
        let screenPos = renderer.pixelToScreenCoordinates(this.x, this.y);

        let session = editor.session;

        this.provider.doHover(session, screenPos, (hover) => {
            let description = this.provider.getTooltipText(hover);
            if (!description || !description.text) {
                this.hide();
                return;
            }
            let descriptionText = description.text;

            let docPos = session.screenToDocumentPosition(screenPos.row, screenPos.column);
            let token = session.getTokenAt(docPos.row, docPos.column + 1);

            let row = description.range?.start.row ?? docPos.row;
            let column = description.range?.start.column ?? token.start;

            if (this.descriptionText != descriptionText) {
                this.hide();
                this.setHtml(descriptionText);
                this.descriptionText = descriptionText;
            } else if (this.row == row && this.column == column && this.isOpen) {
                return;
            }

            this.row = row;
            this.column = column;

            if (this.$mouseMoveTimer) {
                this.$show(editor);
            } else {
                this.$showTimer = setTimeout(() => {
                    this.$show(editor);
                    this.$showTimer = null;
                }, 500);
            }
        });
    }

    $show = (editor: Editor) => {
        let renderer = editor.renderer;
        let position = renderer.textToScreenCoordinates(this.row, this.column);

        let cursorPos = editor.getCursorPosition();

        this.show(null, position.pageX, position.pageY);

        let labelHeight = this.getElement().getBoundingClientRect().height;
        let rect = renderer.scroller.getBoundingClientRect();

        let isTopdown = true;
        if (this.row > cursorPos.row)
            // don't obscure cursor
            isTopdown = true;
        else if (this.row < cursorPos.row)
            // don't obscure cursor
            isTopdown = false;
        if (position.pageY - labelHeight + renderer.lineHeight < rect.top)
            // not enough space above us
            isTopdown = true;
        else if (position.pageY + labelHeight > rect.bottom)
            isTopdown = false;

        if (!isTopdown)
            position.pageY -= labelHeight;
        else
            position.pageY += renderer.lineHeight;

        this.$registerEditorEvents(editor);

        this.getElement().style.maxWidth = rect.width - (position.pageX - rect.left) + "px";
        this.show(null, position.pageX, position.pageY);
    }

    onMouseMove = (e: MouseEvent) => {
        this.x = e.clientX;
        this.y = e.clientY;
        this.update(e["editor"]);
    };

    onMouseOut = (e: MouseEvent) => {
        if (e && e.relatedTarget == this.getElement())
            return;
        this.$hide();
    };

    onTooltipMouseOut = (e: MouseEvent) => {
        if (!e.relatedTarget || e.relatedTarget == this.getElement())
            return;

        //@ts-ignore
        if (e && e.currentTarget.contains(e.relatedTarget))
            return;
        //@ts-ignore
        if (!e.relatedTarget.classList.contains("ace_content"))
            this.$hide();
    }

    $hide = () => {
        clearTimeout(this.$timer);
        this.$removeEditorEvents();
        this.hide();
    }

    destroy() {
        this.$hide();
        event.removeListener(this.getElement(), "mouseout", this.onTooltipMouseOut);
    };

}