import { Ace } from "ace-code";
export declare class AceEditor {
    private static _instance;
    static getConstructor(editor?: any): new (...args: any[]) => Ace.Editor & {
        [property: string]: any;
    };
}
