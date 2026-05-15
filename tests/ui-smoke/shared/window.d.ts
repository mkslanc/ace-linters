import type {UiTestFlags} from "./types";

declare global {
    interface Window {
        testFlags: UiTestFlags;
        editor: any;
        languageProvider: any;
    }
}

export {};
