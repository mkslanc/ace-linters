import {LanguageProvider} from "../language-provider";
import type {Ace} from "ace-code";
import {Tooltip} from "../ace/tooltip";
import {popupManager} from "../ace/popupManager";

export class BaseTooltip extends Tooltip {
    provider: LanguageProvider;
    $activeEditor?: Ace.Editor;
    descriptionText: string;
    x: number;
    y: number;

    timeout?: NodeJS.Timeout | null;
    idleTime: number;
    lastT: number;
    lastEvent: any;

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

        this.timeout = undefined;
        this.lastT = 0;
        this.idleTime = 500;

        var el = this.getElement();
        el.style.whiteSpace = "pre-wrap";
        el.style.pointerEvents = "auto";
    }
    
    $show = () => {
        if (!this.$activeEditor)
            return;
        let editor = this.$activeEditor;
        var MARGIN = 10;
        var renderer = editor.renderer;
        if (!this.isOpen) {
            this.$registerEditorEvents();
            this.setTheme(renderer.theme);
            this.isOpen = true;
        }

        let position = renderer.textToScreenCoordinates(this.row, this.column);

        var rect = renderer.scroller.getBoundingClientRect();
        // clip position to visible area of the editor
        if (position.pageX < rect.left)
            position.pageX = rect.left;

        var element = this.getElement();

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

    hide() {
        super.hide();
        popupManager.removePopup(this);
    }

    show(param, pageX: number, pageY: number) {
        super.show(param, pageX, pageY);
        this.$registerEditorEvents();
    }

    setHtml(descriptionText: string) {
        super.setHtml(descriptionText);
    }

    $inactivateEditor() {
        this.$activeEditor = undefined;
    }

    $activateEditor(editor: Ace.Editor) {
        if (this.$activeEditor == editor)
            return;

        this.$activeEditor = editor;
    }

    $hide = () => {
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
        this.lastEvent = null;

        if (this.isOpen) {
            this.$removeEditorEvents();
            this.hide();
        }
        this.$inactivateEditor();
    }

    destroy() {
        this.$hide();
    };

    $registerEditorEvents() {
    }

    $removeEditorEvents() {
    }
}
