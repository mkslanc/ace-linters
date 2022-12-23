import {MessageType} from "./message-types";
import {ServiceManager} from "./services/service-manager";

const ctx: Worker = self as any;

ctx.onmessage = async (ev) => {
    let message = ev.data;
    let sessionID = message.sessionId;
    let manager = ServiceManager.instance;
    let postMessage = {
        "type": message.type,
        "sessionId": sessionID,
    };
    switch (message["type"] as MessageType) {
        case MessageType.format:
            postMessage["value"] = manager.getServiceInstance(sessionID)?.format(sessionID, message.value, message.format);
            break;
        case MessageType.complete:
            postMessage["value"] = await manager.getServiceInstance(sessionID)?.doComplete(sessionID, message.value);
            break;
        case MessageType.resolveCompletion:
            postMessage["value"] = await manager.getServiceInstance(sessionID)?.resolveCompletion(sessionID, message.value);
            break;
        case MessageType.change:
            manager.getServiceInstance(sessionID)?.setValue(sessionID, message.value);
            break;
        case MessageType.applyDelta:
            manager.getServiceInstance(sessionID)?.applyDeltas(sessionID, message.value);
            break;
        case MessageType.hover:
            postMessage["value"] = await manager.getServiceInstance(sessionID)?.doHover(sessionID, message.value);
            break;
        case MessageType.validate:
            postMessage["value"] = await manager.getServiceInstance(sessionID)?.doValidation(sessionID);
            break;
        case MessageType.init: //this should be first message
            await manager.addDocument(sessionID, message.value, message.mode, message.options);
            break;
        case MessageType.changeMode:
            await manager.changeDocumentMode(sessionID, message.value, message.mode, message.options);
            break;
        case MessageType.changeOptions:
            manager.getServiceInstance(sessionID)?.setOptions(sessionID, message.options);
            break;
        case MessageType.dispose:
            manager.removeDocument(sessionID);
            break;
        case MessageType.globalOptions:
            manager.setGlobalOptions(message.serviceName, message.options, message.merge);
            break;
    }

    ctx.postMessage(postMessage);
};