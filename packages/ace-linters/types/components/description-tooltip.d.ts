import { Ace } from "ace-code";
import { BaseTooltip } from "./base-tooltip";
export declare class DescriptionTooltip extends BaseTooltip {
    registerEditor(editor: Ace.Editor): void;
    update(editor: Ace.Editor): void;
    doHover: () => void;
    onMouseMove: (e: MouseEvent) => void;
}
