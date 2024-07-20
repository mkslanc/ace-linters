import {Ace} from "ace-code";

export class AceRange {
    private static _instance: new (...args: any[]) => Ace.Range & { [property: string]: any; };

    static getConstructor(editor?: any): new (...args: any[]) => Ace.Range & { [property: string]: any; } {
        if (!AceRange._instance && editor) {
            AceRange._instance = editor.getSelectionRange().constructor;
        }
        return AceRange._instance;
    }
}
