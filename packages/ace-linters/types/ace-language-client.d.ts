import { LanguageProvider } from "./language-provider";
import type { ProviderOptions, LanguageClientConfig } from "./types/language-service";
export declare class AceLanguageClient {
    /**
     *  Creates LanguageProvider for any Language Server to connect with JSON-RPC (webworker, websocket)
     * @param {LanguageClientConfig | LanguageClientConfig[]} servers
     * @param {ProviderOptions} options
     */
    static for(servers: LanguageClientConfig | LanguageClientConfig[], options?: ProviderOptions): LanguageProvider;
}
