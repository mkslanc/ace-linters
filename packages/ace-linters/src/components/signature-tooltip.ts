import {Ace} from "ace-code";
import {BaseTooltip} from "./base-tooltip";

export class SignatureTooltip extends BaseTooltip {
    editorHandlers: Map<Ace.Editor, () => void> = new Map();
    escCommand = {
        exec: this.$hide,
        bindKey: "Esc"
    };

    registerEditor(editor: Ace.Editor) {
        const handler = () => this.onChangeSelection(editor);
        this.editorHandlers.set(editor, handler);
        editor.on("changeSelection", handler);

        editor.commands.addCommand(this.escCommand);
    }

    unregisterEditor(editor: Ace.Editor) {
        const handler = this.editorHandlers.get(editor);
        if (handler) {
            editor.off("changeSelection", handler);
            this.editorHandlers.delete(editor);
        }
        // Clean up if this was the active editor
        if (this.$activeEditor === editor) {
            this.$inactivateEditor();
        }

        editor.commands.removeCommand(this.escCommand);
    }

    onChangeSelection = (editor: Ace.Editor) => {
        if (!this.provider.options.functionality!.signatureHelp)
            return;

        this.$activateEditor(editor);
        if (this.isOpen) {
            setTimeout(this.provideSignatureHelp, 0);
        } else {
            this.lastT = Date.now();
            this.timeout = setTimeout(this.waitForSignature, this.idleTime);
        }
    };

    waitForSignature = () => {
        if (this.timeout) clearTimeout(this.timeout);
        var dt = Date.now() - this.lastT;
        if (this.idleTime - dt > 10) {
            this.timeout = setTimeout(this.waitForSignature, this.idleTime - dt);
            return;
        }

        this.timeout = undefined;
        this.provideSignatureHelp();
    }


    provideSignatureHelp = () => {
        if (!this.$activeEditor) {
            // Editor was deactivated before this callback
            return;
        }

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
            this.$show();
        });
    }

    $onAfterRender = (e) => {
        if (!this.isOpen) return;
        setTimeout(() => {
            if (!this.$activeEditor?.isRowVisible(this.row)) {
                this.$hide();
            } else {
                this.$show();
            }
        }, 0);

    }

    $registerEditorEvents() {
        this.$activeEditor!.renderer.on("afterRender", this.$onAfterRender);
        this.$activeEditor!.on("blur", this.$hide);
    }

    $removeEditorEvents() {
        this.$activeEditor!.renderer.off("afterRender", this.$onAfterRender);
        this.$activeEditor!.off("blur", this.$hide);
    }
}
