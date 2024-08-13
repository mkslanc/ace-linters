import { Ace } from "ace-code";
export declare class AceRange {
    private static _instance;
    static getConstructor(editor?: any): new (...args: any[]) => Ace.Range & {
        [property: string]: any;
    };
}
