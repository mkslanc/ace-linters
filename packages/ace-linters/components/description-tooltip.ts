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

        event.addListener(this.getElement(), "mouseout", this.onMouseOut);

        this.getElement().style.pointerEvents = "auto";
        this.getElement().style.whiteSpace = "pre-wrap";
    }

    registerEditor(editor: Ace.Editor) {
        editor.on("mousemove", this.onMouseMove);
    }

    private $activateEditor(editor: Ace.Editor) {
        this.$activeEditor = editor;

        this.$activeEditor.container.addEventListener("mouseout", this.onMouseOut);
    }

    private $inactivateEditor() {
        if (!this.$activeEditor)
            return;
        this.$activeEditor.container.removeEventListener("mouseout", this.onMouseOut);

        this.$activeEditor = null;
    }

    private $registerEditorEvents() {
        this.$activeEditor.on("change", this.$hide);
        this.$activeEditor.on("mousewheel", this.$hide);
        //@ts-ignore
        this.$activeEditor.on("mousedown", this.$hide);
    }

    private $removeEditorEvents() {
        this.$activeEditor.off("change", this.$hide);
        this.$activeEditor.off("mousewheel", this.$hide);
        //@ts-ignore
        this.$activeEditor.off("mousedown", this.$hide);

        this.$activeEditor.container.removeEventListener("mouseout", this.onMouseOut);
        this.$activeEditor = null;
    }

    update (editor: Ace.Editor) {
        clearTimeout(this.$mouseMoveTimer);
        clearTimeout(this.$showTimer);
        if (this.isOpen) {
            this.doHover();
        } else {
            this.$mouseMoveTimer = setTimeout(() => {
                this.$inactivateEditor();
                this.$activateEditor(editor);
                this.doHover();
                this.$mouseMoveTimer = null;
            }, 500);

        }
    };

    doHover = () => {
        let renderer = this.$activeEditor.renderer;
        let screenPos = renderer.pixelToScreenCoordinates(this.x, this.y);

        let session = this.$activeEditor.session;

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
                this.$show();
            } else {
                this.$showTimer = setTimeout(() => {
                    this.$show();
                    this.$showTimer = null;
                }, 500);
            }
        });
    }

    $show = () => {
        let renderer = this.$activeEditor.renderer;
        let position = renderer.textToScreenCoordinates(this.row, this.column);

        let cursorPos = this.$activeEditor.getCursorPosition();

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

        this.$registerEditorEvents();

        this.getElement().style.maxWidth = rect.width - (position.pageX - rect.left) + "px";
        this.show(null, position.pageX, position.pageY);
    }

    onMouseMove = (e: MouseEvent) => {
        this.x = e.clientX;
        this.y = e.clientY;
        this.update(e["editor"]);
    };

    onMouseOut = (e: MouseEvent) => {
        clearTimeout(this.$mouseMoveTimer);
        clearTimeout(this.$showTimer);
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
        clearTimeout(this.$mouseMoveTimer);
        clearTimeout(this.$showTimer);
        this.$removeEditorEvents();
        this.hide();
    }

    destroy() {
        this.$hide();
        event.removeListener(this.getElement(), "mouseout", this.onMouseOut);
    };

}