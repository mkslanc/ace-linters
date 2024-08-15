import * as lsp from "vscode-languageserver-protocol";
import { CodeActionsByService } from "../types/language-service";
import { Ace } from "ace-code";
interface ILightbulbWidget {
    codeActions: CodeActionsByService[];
    executeActionCallback?: (action: (lsp.CodeAction | lsp.Command), serviceName: string) => void;
    setExecuteActionCallback(callback: (action: (lsp.CodeAction | lsp.Command), serviceName: string) => void): void;
    setCodeActions(actions: CodeActionsByService[]): void;
    showLightbulb(): void;
    hideLightbulb(): void;
    dispose(): void;
}
export declare class LightbulbWidget implements ILightbulbWidget {
    codeActions: CodeActionsByService[];
    lightbulb: HTMLDivElement;
    popup: Ace.AcePopup;
    executeActionCallback?: (action: (lsp.CodeAction | lsp.Command), serviceName: string) => void;
    private editor;
    lightBulbWidth: number;
    lightBulbHeight: number;
    constructor(editor: Ace.Editor, executeActionCallback?: (action: (lsp.CodeAction | lsp.Command), serviceName: string) => void);
    setEditorListeners(editor: Ace.Editor): void;
    removeListeners(): void;
    setExecuteActionCallback(callback: (action: (lsp.CodeAction | lsp.Command), serviceName: string) => void): void;
    hideAll: () => void;
    createLightbulb(): void;
    setCodeActions(actions: CodeActionsByService[]): void;
    private showMenu;
    isEmpty(): boolean;
    setDataToPopup(): void;
    executeAction(action: (lsp.CodeAction | lsp.Command), serviceName: string): void;
    showLightbulb(): void;
    hideLightbulb(): void;
    calculatePosition(): {
        x: number;
        y: number;
    };
    setPosition: () => void;
    dispose(): void;
}
export {};
