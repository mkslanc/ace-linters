import {LanguageProvider} from "./language-provider";
import {MessageControllerWS} from "./message-controller-ws";
import type {ProviderOptions} from "./types";

export class AceLanguageClient {
    /**
     *  Creates LanguageProvider for any Language Server to connect with JSON-RPC (webworker, websocket)
     * @param {Worker | WebSocket} mode
     * @param {ProviderOptions} options
     */
    static for(mode: Worker | WebSocket, options?: ProviderOptions) {
        let messageController = new MessageControllerWS(mode);
        return new LanguageProvider(messageController, options);
    }
}
