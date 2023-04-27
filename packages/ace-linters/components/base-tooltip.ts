import {LanguageProvider} from "../language-provider";
import type {Ace} from "ace-code";
import {Tooltip} from "../ace/tooltip";

export class BaseTooltip extends Tooltip {
    provider: LanguageProvider;
    $activeEditor?: Ace.Editor;
    descriptionText: string;
    x: number;
    y: number;

    $mouseMoveTimer?: NodeJS.Timeout;
    $showTimer?: NodeJS.Timeout;
    row: number;
    column: number;

    constructor(provider: LanguageProvider) {
        super(document.body);
        this.provider = provider;
        //this is for ace-code version < 1.16.0
        try {
            Tooltip.call(this, document.body);
        } catch (e) {
            
        }
            
        this.getElement().style.pointerEvents = "auto";
        this.getElement().style.whiteSpace = "pre-wrap";
        this.getElement().addEventListener("mouseout", this.onMouseOut);
    }
    
    $show() {
        if (!this.$activeEditor)
            return;
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
        
        this.getElement().style.maxWidth = rect.width - (position.pageX - rect.left) + "px";
        this.show(null, position.pageX, position.pageY);
    }
    
    getElement() {
        return super.getElement();
    }

    hide() {
        super.hide();
    }

    show(param, pageX: number, pageY: number) {
        super.show(param, pageX, pageY);
        this.$registerEditorEvents();
    }

    setHtml(descriptionText: string) {
        super.setHtml(descriptionText);
    }

    $hide = () => {
        clearTimeout(this.$mouseMoveTimer);
        clearTimeout(this.$showTimer);
        if (this.isOpen) {
            this.$removeEditorEvents();
            this.hide();
        }
        this.$inactivateEditor();
    }

    destroy() {
        this.$hide();
        this.getElement().removeEventListener("mouseout", this.onMouseOut);
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

    $registerEditorEvents() {
        this.$activeEditor!.on("change", this.$hide);
        this.$activeEditor!.on("mousewheel", this.$hide);
        //@ts-ignore
        this.$activeEditor!.on("mousedown", this.$hide);
    }

    $removeEditorEvents() {
        this.$activeEditor!.off("change", this.$hide);
        this.$activeEditor!.off("mousewheel", this.$hide);
        //@ts-ignore
        this.$activeEditor!.off("mousedown", this.$hide);
    }

    $inactivateEditor() {
        this.$activeEditor?.container.removeEventListener("mouseout", this.onMouseOut);
        this.$activeEditor = undefined;
    }

    $activateEditor(editor: Ace.Editor) {
        if (this.$activeEditor == editor)
            return;

        this.$inactivateEditor();
        this.$activeEditor = editor;
        this.$activeEditor.container.addEventListener("mouseout", this.onMouseOut);
    }
}
