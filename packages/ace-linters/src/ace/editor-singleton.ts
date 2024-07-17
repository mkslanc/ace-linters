import {Ace} from "ace-code";

export class AceEditor {
    private static _instance: new (...args: any[]) => Ace.Editor & { [property: string]: any; };

    static getConstructor(editor?: any): new (...args: any[]) => Ace.Editor & { [property: string]: any; } {
        if (!AceEditor._instance && editor) {
            AceEditor._instance = editor.constructor;
        }
        return AceEditor._instance;
    }
}
