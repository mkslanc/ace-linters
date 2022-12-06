import {LanguageService, ServiceOptions} from "./language-service";
import {CssService} from "./css-service";

export class ServiceManager {
    private static _instance: ServiceManager;
    services: { module: any, name: string, extensions: string }[] = [
        {
            module: import("./html-service"),
            name: "HtmlService",
            extensions: "html"
        },
        {
            module: import("./css-service"),
            name: "CssService",
            extensions: "css|less|scss"
        },
        {
            module: import("./json-service"),
            name: "JsonService",
            extensions: "json"
        }
    ];
    serviceInstances: { [sessionId: string]: LanguageService } = {};

    static get instance() {
        if (!ServiceManager._instance) {
            ServiceManager._instance = new ServiceManager();
        }
        return ServiceManager._instance;
    }

    async addServiceInstance(uri: string, doc, options: ServiceOptions): Promise<LanguageService> {
        if (!options["mode"] || !/^ace\/mode\//.test(options["mode"]))
            return;
        let resolvedMode = options["mode"]?.replace("ace/mode/", "");
        try {
            let service = this.findServiceByExtension(resolvedMode);
            if (!service) {
                console.log("No service registered for " + resolvedMode);
                return;
            }
            this.serviceInstances[uri] = new (await service.module)[service.name](doc, options);
            return this.serviceInstances[uri];
        } catch (e) {
            throw "Couldn't resolve language service for " + resolvedMode;
        }
    }

    removeServiceInstance(uri: string) {
        this.serviceInstances[uri] = undefined;
    }

    getServiceInstance(uri: string): LanguageService {
        if (!this.serviceInstances[uri]) {
            throw Error("No registered service for " + uri);
        }
        return this.serviceInstances[uri];
    }

    findServiceByExtension(extension: string) {
        return this.services.find((el) => {
            let extensions = el.extensions.split('|');
            if (extensions.indexOf(extension) !== -1)
                return el;
        })
    }
}