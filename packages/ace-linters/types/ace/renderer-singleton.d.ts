import { Ace } from "ace-code";
export declare class AceVirtualRenderer {
    private static _instance;
    static getConstructor(editor?: any): new (...args: any[]) => Ace.VirtualRenderer & {
        [property: string]: any;
    };
}
