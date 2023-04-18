import {Ace} from "ace-code";
import {BaseTooltip} from "./base-tooltip";

export class SignatureTooltip extends BaseTooltip {
    
    registerEditor(editor: Ace.Editor) {
        // @ts-ignore
        editor.on("changeSelection", () => this.onChangeSelection(editor));
    }
    
    update(editor: Ace.Editor) {
        clearTimeout(this.$mouseMoveTimer);
        clearTimeout(this.$showTimer);
        if (this.isOpen) {
            this.provideSignatureHelp();
        } else {
            this.$mouseMoveTimer = setTimeout(() => {
                this.$activateEditor(editor);
                this.provideSignatureHelp();
                this.$mouseMoveTimer = undefined;
            }, 500);

        }
    };

    provideSignatureHelp = () => {
        if (!this.provider.options.functionality.signatureHelp)
            return;
        let cursor = this.$activeEditor!.getCursorPosition();
        let session = this.$activeEditor!.session;
        let docPos = session.screenToDocumentPosition(cursor.row, cursor.column);

        this.provider.provideSignatureHelp(session, docPos, (tooltip) => {
            let descriptionText = tooltip ? this.provider.getTooltipText(tooltip) : null;
            if (!tooltip || !descriptionText) {
                this.hide();
                return;
            }

            let token = session.getTokenAt(docPos.row, docPos.column);

            let row = tooltip.range?.start.row ?? docPos.row;
            let column = tooltip.range?.start.column ?? token?.start ?? 0;

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
    

    onChangeSelection = (editor: Ace.Editor) => {
        this.update(editor);
    };
}
