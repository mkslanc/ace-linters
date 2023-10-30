import {LanguageProvider} from "./language-provider";
import {MessageControllerWS} from "./message-controller-ws";
import type {ProviderOptions} from "./types/language-service";

export class AceLanguageClient {
    /**
     *  Creates LanguageProvider for any Language Server to connect with JSON-RPC (webworker, websocket)
     * @param {Worker | WebSocket} mode
     * @param {ProviderOptions} options
     * @param initializationOptions
     */
    static for(mode: Worker | WebSocket, options?: ProviderOptions, initializationOptions?: { [option: string]: any }) {
        let messageController = new MessageControllerWS(mode, initializationOptions);
        return new LanguageProvider(messageController, options);
    }
}
