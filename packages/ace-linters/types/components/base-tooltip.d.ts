import { LanguageProvider } from "../language-provider";
import type { Ace } from "ace-code";
import { Tooltip } from "../ace/tooltip";
export declare class BaseTooltip extends Tooltip {
    provider: LanguageProvider;
    $activeEditor?: Ace.Editor;
    descriptionText: string;
    x: number;
    y: number;
    $mouseMoveTimer?: NodeJS.Timeout;
    $showTimer?: NodeJS.Timeout;
    row: number;
    column: number;
    constructor(provider: LanguageProvider);
    $show(): void;
    getElement(): HTMLDivElement;
    hide(): void;
    show(param: any, pageX: number, pageY: number): void;
    setHtml(descriptionText: string): void;
    $hide: () => void;
    destroy(): void;
    onMouseOut: (e: MouseEvent) => void;
    $registerEditorEvents(): void;
    $removeEditorEvents(): void;
    $inactivateEditor(): void;
    $activateEditor(editor: Ace.Editor): void;
}
