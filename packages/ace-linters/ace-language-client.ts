import {LanguageProvider} from "./language-provider";
import {MessageControllerWS} from "./message-controller-ws";
import {MarkDownConverter} from "./types";

export class AceLanguageClient {
    /**
     *  Creates LanguageProvider for any Language Server to connect with JSON-RPC (webworker, websocket)
     * @param {Worker | WebSocket} mode
     * @param markdownConverter
     */
    static for(mode: Worker | WebSocket, markdownConverter?: MarkDownConverter) {
        let messageController = new MessageControllerWS(mode);
        return new LanguageProvider(messageController, markdownConverter);
    }
}
