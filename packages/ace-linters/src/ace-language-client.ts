import {LanguageProvider} from "./language-provider";
import type {ProviderOptions, LanguageClientConfig} from "./types/language-service";
import {ServiceManager} from "./services/service-manager";
import {MockWorker} from "./misc/mock-worker";

let serviceManager: ServiceManager, client;

export class AceLanguageClient {
    /**
     *  Creates LanguageProvider for any Language Server to connect with JSON-RPC (webworker, websocket)
     * @param {LanguageClientConfig | LanguageClientConfig[]} servers
     * @param {ProviderOptions} options
     */
    static for(servers: LanguageClientConfig | LanguageClientConfig[], options?: ProviderOptions) {
        if (!serviceManager) {
            client = new MockWorker(true);
            let ctx = new MockWorker(true);
            client.setEmitter(ctx);
            ctx.setEmitter(client);
            serviceManager = new ServiceManager(ctx);
        }
        if (servers instanceof Array) {
            servers.forEach((serverData, index) => {
                serviceManager.registerServer("server" + index, serverData);
            });
        } else {
            serviceManager.registerServer("server", servers);
        }

        return LanguageProvider.create(client, options);
    }
}
