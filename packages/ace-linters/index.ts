import {MessageController} from "./message-controller";
import {AceLinters} from "./services/language-service";
import ServiceOptionsMap = AceLinters.ServiceOptionsMap;
import * as lintersCSS from "./css/linters.css";
import * as dom from "ace-code/src/lib/dom";

export function setLanguageGlobalOptions<T extends keyof ServiceOptionsMap>(serviceName: T, options: ServiceOptionsMap[T], merge = false) {
    MessageController.instance.setGlobalOptions(serviceName, options, merge);
}

export function registerStyles() {
    dom.importCssString(lintersCSS, "linters.css");
}

export {LanguageProvider} from "./language-provider";