import {Document} from "ace-code/src/document";
import {MessageType} from "./message-types";
import {ServiceManager} from "./services/service-manager";
import {ServiceOptions} from "./services/language-service";

const ctx: Worker = self as any;

ctx.onmessage = async (ev) => {
    let message = ev.data;
    let uri = message.sessionId;
    let manager = ServiceManager.instance;
    let postMessage = {
        "type": message.type,
        "sessionId": uri,
    };
    switch (message["type"] as MessageType) {
        case MessageType.format:
            postMessage["edits"] = manager.getServiceInstance(uri).format(message.value, message.format);
            break;
        case MessageType.complete:
            postMessage["completions"] = await manager.getServiceInstance(uri).doComplete(message.value);
            break;
        case MessageType.change:
            manager.getServiceInstance(uri).setValue(message.value);
            break;
        case MessageType.applyDelta:
            manager.getServiceInstance(uri).applyDeltas(message.value);
            postMessage["type"] = MessageType.change;
            break;
        case MessageType.hover:
            postMessage["hover"] = await manager.getServiceInstance(uri).doHover(message.value);
            break;
        case MessageType.validate:
            postMessage["annotations"] = await manager.getServiceInstance(uri).doValidation();
            break;
        case MessageType.init: //this should be first message
            let options: ServiceOptions = message.options;
            let doc = new Document(message.value);
            await manager.addServiceInstance(uri, doc, options);
            break;
        case MessageType.changeMode:
            let newOptions: ServiceOptions = message.value;
            let service = manager.getServiceInstance(uri);
            let newDoc = new Document(service.doc.getValue());
            manager.removeServiceInstance(uri);
            await manager.addServiceInstance(uri, newDoc, newOptions);
            break;
    }

    ctx.postMessage(postMessage);
};