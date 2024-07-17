import {Ace} from "ace-code";

export class AceVirtualRenderer {
    private static _instance: new (...args: any[]) => Ace.VirtualRenderer & { [property: string]: any; };

    static getConstructor(editor?: any): new (...args: any[]) => Ace.VirtualRenderer & { [property: string]: any; } {
        if (!AceVirtualRenderer._instance && editor) {
            AceVirtualRenderer._instance = editor.renderer.constructor;
        }
        return AceVirtualRenderer._instance;
    }
}
