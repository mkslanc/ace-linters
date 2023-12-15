import { Ace } from "ace-code";
import { BaseTooltip } from "./base-tooltip";
export declare class SignatureTooltip extends BaseTooltip {
    registerEditor(editor: Ace.Editor): void;
    update(editor: Ace.Editor): void;
    provideSignatureHelp: () => void;
    onChangeSelection: (editor: Ace.Editor) => void;
}
