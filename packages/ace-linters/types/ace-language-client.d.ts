import { LanguageProvider } from "./language-provider";
import type { ProviderOptions } from "./types/language-service";
export declare class AceLanguageClient {
    /**
     *  Creates LanguageProvider for any Language Server to connect with JSON-RPC (webworker, websocket)
     * @param {Worker | WebSocket} mode
     * @param {ProviderOptions} options
     */
    static for(mode: Worker | WebSocket, options?: ProviderOptions): LanguageProvider;
}
