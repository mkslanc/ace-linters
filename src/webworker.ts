import {Document} from "ace-code/src/document";
import {MessageType} from "./message-types";
import {ServiceManager} from "./services/service-manager";
import {ServiceOptions} from "./services/language-service";

const ctx: Worker = self as any;

ctx.onmessage = async (ev) => {
    let message = ev.data;
    let uri = message.sessionId;
    let manager = ServiceManager.instance;
    switch (message["type"] as MessageType) {
        case MessageType.format:
            let edits = manager.getServiceInstance(uri).format(message.value);
            ctx.postMessage({type: MessageType.format, sessionId: uri, edits: edits});
            break;
        case MessageType.complete:
            let completions = await manager.getServiceInstance(uri).doComplete(message.value);
            ctx.postMessage({type: MessageType.complete, sessionId: uri, completions: completions});
            break;
        case MessageType.change:
            manager.getServiceInstance(uri).setValue(message.value);
            ctx.postMessage({type: MessageType.change, sessionId: uri});
            break;
        case MessageType.applyDelta:
            manager.getServiceInstance(uri).applyDeltas(message.value);
            ctx.postMessage({type: MessageType.change, sessionId: uri});
            break;
        case MessageType.hover:
            let hover = await manager.getServiceInstance(uri).doHover(message.value);
            ctx.postMessage({type: MessageType.hover, sessionId: uri, hover: hover});
            break;
        case MessageType.validate:
            let annotations = await manager.getServiceInstance(uri).doValidation();
            ctx.postMessage({type: MessageType.validate, sessionId: uri, annotations: annotations});
            break;
        case MessageType.init: //this should be first message
            let options: ServiceOptions = message.options;
            let doc = new Document(message.value);
            await manager.addServiceInstance(uri, doc, options);
            break;
    }
};
//TODO: on mode change - unregister/register