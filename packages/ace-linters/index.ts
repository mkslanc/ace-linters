import {MessageController} from "./message-controller";
import * as lintersCSS from "./css/linters.css";
import * as dom from "ace-code/src/lib/dom";

export function registerStyles() {
    dom.importCssString(lintersCSS, "linters.css");
}

export {LanguageProvider} from "./language-provider";
export {MessageController} from "./message-controller";
