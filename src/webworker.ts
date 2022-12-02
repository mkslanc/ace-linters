import {HtmlService} from "./services/html-service";
import {Document} from "ace-code/src/document";
import {MessageType} from "./message-types";

const ctx: Worker = self as any;

ctx.onmessage = async (ev) => {
    let message = ev.data;
    switch (message["type"] as MessageType) {
        case MessageType.format:
            let edits = self["language"].format(message.range);
            ctx.postMessage({type: MessageType.format, edits: edits});
            break;
        case MessageType.complete:
            let completions = await self["language"].doComplete(message.value);
            ctx.postMessage({type: MessageType.complete, completions: completions});
            break;
        case MessageType.change:
            self["language"].setValue(message.value);
            break;
        case MessageType.hover:
            let hover = await self["language"].doHover(message.value);
            ctx.postMessage({type: MessageType.hover, hover: hover});
            break;
        case MessageType.validate:
            let annotations = await self["language"].doValidation();
            ctx.postMessage({type: MessageType.validate, annotations: annotations});
            break;
        case MessageType.init:
            let options = message.options;
            let htmlConfig = {
                tabSize: options.tabSize,
                insertSpaces: options.useSoftTabs
            }
            let doc = new Document(message.value);
            self["language"] = new HtmlService(doc, htmlConfig);
            break;
    }
};
