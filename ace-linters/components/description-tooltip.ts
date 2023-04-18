import {Ace} from "ace-code";
import {BaseTooltip} from "./base-tooltip";

export class DescriptionTooltip extends BaseTooltip {

    registerEditor(editor: Ace.Editor) {
        editor.on("mousemove", this.onMouseMove);
    }

    update(editor: Ace.Editor) {
        clearTimeout(this.$mouseMoveTimer);
        clearTimeout(this.$showTimer);
        if (this.isOpen) {
            this.doHover();
        } else {
            this.$mouseMoveTimer = setTimeout(() => {
                this.$activateEditor(editor);
                this.doHover();
                this.$mouseMoveTimer = undefined;
            }, 500);

        }
    };

    doHover = () => {
        if (!this.provider.options.functionality.hover) 
            return;
        
        let renderer = this.$activeEditor!.renderer;
        let screenCoordinates = renderer.pixelToScreenCoordinates(this.x, this.y);

        let session = this.$activeEditor!.session;
        let docPos = session.screenToDocumentPosition(screenCoordinates.row, screenCoordinates.column);

        this.provider.doHover(session, docPos, (hover) => {
            let descriptionText = hover ? this.provider.getTooltipText(hover) : null;
            if (!hover || !descriptionText) {
                this.hide();
                return;
            }

            let token = session.getTokenAt(docPos.row, docPos.column + 1);

            let row = hover.range?.start.row ?? docPos.row;
            let column = hover.range?.start.column ?? token?.start ?? 0;

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
                    this.$showTimer = undefined;
                }, 500);
            }
        });
    }

    onMouseMove = (e: MouseEvent) => {
        this.x = e.clientX;
        this.y = e.clientY;
        this.update(e["editor"]);
    };

}
