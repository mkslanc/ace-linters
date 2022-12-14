"use strict";
import {LanguageProvider} from "../language-provider";
var event = require("ace-code/src/lib/event");
var {Tooltip} = require("ace-code/src/tooltip");

export class DescriptionTooltip extends Tooltip {
    private provider: LanguageProvider;

    $timer: NodeJS.Timeout;
    row?: number;
    column?: number;

    constructor(provider: LanguageProvider) {
        super();
        this.provider = provider;
        Tooltip.call(this, provider.editor.container);

        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseOut = this.onMouseOut.bind(this);
        this.$hide = this.$hide.bind(this);
        this.onTooltipMouseOut = this.onTooltipMouseOut.bind(this);

        event.addListener(this.provider.editor.renderer.scroller, "mousemove", this.onMouseMove);
        event.addListener(this.provider.editor.renderer.scroller, "mouseout", this.onMouseOut);
        event.addListener(this.provider.editor.renderer.scroller, "mousedown", this.$hide);
        event.addListener(this.getElement(), "mouseout", this.onTooltipMouseOut);
        this.provider.editor.on("change", this.$hide);
        this.provider.editor.on("mousewheel", this.$hide);

        this.getElement().style.pointerEvents = "auto";
        this.getElement().style.whiteSpace = "pre-wrap";
    }

    update () {
        var renderer = this.provider.editor.renderer;
        var screenPos = renderer.pixelToScreenCoordinates(this.x, this.y);

        this.provider.doHover(screenPos, (hover) => {
            clearTimeout(this.$timer);

            let description = this.provider.getTooltipText(hover);
            if (!description || !description.text) {
                this.hide();
                return;
            }
            var descriptionText = description.text;

            var session = this.provider.editor.session;
            var docPos = session.screenToDocumentPosition(screenPos.row, screenPos.column);
            var token = session.getTokenAt(docPos.row, docPos.column + 1);

            var row = description.range?.start.row ?? docPos.row;
            var column = description.range?.start.column ?? token.start;

            if (this.descriptionText != descriptionText) {
                this.hide();
                this.setHtml(descriptionText);
                this.descriptionText = descriptionText;
            } else if (this.row == row && this.column == column && this.isOpen) {
                return;
            }

            this.row = row;
            this.column = column;

            this.$timer = setTimeout(() => {
                var position = renderer.textToScreenCoordinates(row, column);

                var cursorPos = this.provider.editor.getCursorPosition();

                this.show(null, position.pageX, position.pageY);

                var labelHeight = this.getElement().getBoundingClientRect().height;
                let rect = renderer.scroller.getBoundingClientRect();

                var isTopdown = true;
                if (row > cursorPos.row)
                    // don't obscure cursor
                    isTopdown = true;
                else if (row < cursorPos.row)
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
            }, 500);
        });
    };

    onMouseMove (e: MouseEvent) {
        this.x = e.clientX;
        this.y = e.clientY;
        this.update();
    };

    onMouseOut (e: MouseEvent) {
        if (e && e.relatedTarget == this.getElement())
            return;
        this.$hide();
    };

    onTooltipMouseOut(e: MouseEvent) {
        //@ts-ignore
        if (e && e.currentTarget.contains(e.relatedTarget))
            return;
        this.onMouseMove(e);
    }

    $hide() {
        clearTimeout(this.$timer);
        this.hide();
    }

    destroy() {
        this.$hide();
        event.removeListener(this.provider.editor.renderer.scroller, "mousemove", this.onMouseMove);
        event.removeListener(this.provider.editor.renderer.scroller, "mouseout", this.onMouseOut);
        event.removeListener(this.provider.editor.renderer.scroller, "mousedown", this.$hide);
        event.removeListener(this.getElement(), "mouseout", this.onTooltipMouseOut);
        this.provider.editor.off("change", this.$hide);
        this.provider.editor.off("mousewheel", this.$hide);
    };

}