import {LanguageProvider} from "./language-provider";
import {MessageControllerWS} from "./message-controller-ws";
import {AceLinters} from "./types";

export class AceLanguageClient {
    /**
     *  Creates LanguageProvider for any Language Server to connect with JSON-RPC (webworker, websocket)
     * @param {Worker | WebSocket} mode
     * @param {AceLinters.ProviderOptions} options
     */
    static for(mode: Worker | WebSocket, options?: AceLinters.ProviderOptions) {
        let messageController = new MessageControllerWS(mode);
        return new LanguageProvider(messageController, options);
    }
}
