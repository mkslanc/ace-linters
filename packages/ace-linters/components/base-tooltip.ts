import {LanguageProvider} from "../language-provider";
import {Ace} from "ace-code";
import {Tooltip} from "ace-code/src/tooltip";
import Editor = Ace.Editor;

export class BaseTooltip extends Tooltip {
    provider: LanguageProvider;
    _activeEditor?: Editor;
    descriptionText: string;
    isOpen: boolean;
    x: number;
    y: number;

    get $activeEditor(): Editor {
        return this._activeEditor!;
    }

    $mouseMoveTimer?: NodeJS.Timeout;
    $showTimer?: NodeJS.Timeout;
    row: number;
    column: number;

    constructor(provider: LanguageProvider) {
        super();
        this.provider = provider;
        Tooltip.call(this, document.body);
        
        this.getElement().style.pointerEvents = "auto";
        this.getElement().style.whiteSpace = "pre-wrap";
    }

    $activateEditor(editor: Ace.Editor) {
        this._activeEditor = editor;
    }

    $inactivateEditor() {
        if (!this.$activeEditor)
            return;

        this._activeEditor = undefined;
    }
    
    $show() {
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
    }

    setHtml(descriptionText: string) {
        super.setHtml(descriptionText);
    }
}
