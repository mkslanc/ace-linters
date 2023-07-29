import {Range} from "ace-code";

export class AceRange {
    private static _instance: Range;

    static getConstructor(editor?: any): Range {
        if (!AceRange._instance && editor) {
            AceRange._instance = editor.getSelectionRange().constructor;
        }
        return AceRange._instance;
    }
}
