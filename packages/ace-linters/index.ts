import * as lintersCSS from "./css/linters.css";
import {importCssString} from "./ace/dom";

importCssString(lintersCSS, "linters.css");

export {LanguageProvider} from "./language-provider";
export {MessageController} from "./message-controller";
