import LanguageService = AceLinters.LanguageService;
import ServiceOptions = AceLinters.ServiceOptions;
import {Document} from "ace-code/src/document";
import {AceLinters} from "./language-service";

interface ServiceData {
    module: any, name: string, modes: string, serviceInstance?: LanguageService, options?: ServiceOptions
}
export class ServiceManager {
    private static _instance: ServiceManager;
    private $services: {[serviceName: string]: ServiceData } = {
        html: {
            module: import("./html/html-service"),
            name: "HtmlService",
            modes: "html"
        },
        css: {
            module: import("./css/css-service"),
            name: "CssService",
            modes: "css"
        },
        less: {
            module: import("./css/css-service"),
            name: "CssService",
            modes: "less"
        },
        scss: {
            module: import("./css/css-service"),
            name: "CssService",
            modes: "scss"
        },
        json: {
            module: import("./json/json-service"),
            name: "JsonService",
            modes: "json",
            options: {
                allowComments: false,
                trailingCommas: false
            }
        },
        json5: {
            module: import("./json/json-service"),
            name: "JsonService",
            modes: "json5",
            options: {
                allowComments: true,
                trailingCommas: true
            }
        },
        typescript: {
            module: import("./typescript/typescript-service"),
            name: "TypescriptService",
            modes: "typescript|javascript|tsx|jsx"
        }
    };
    private $sessionIDToMode: {[sessionID: string]: string} = {};

    static get instance() {
        if (!ServiceManager._instance) {
            ServiceManager._instance = new ServiceManager();
        }
        return ServiceManager._instance;
    }

    private static async $initServiceInstance(service: ServiceData) {
        try {
            service.serviceInstance = new (await service.module)[service.name](service.modes);
            service.serviceInstance.setGlobalOptions(service.options);
        } catch (e) {
            console.log("Couldn't resolve language service for " + service.modes);//TODO
        }
    }

    private async $getServiceInstanceByMode(mode: string): Promise<LanguageService> {
        let service = this.findServiceByMode(mode);
        if (!service)
            return;
        if (!service.serviceInstance)
            await ServiceManager.$initServiceInstance(service);
        return service.serviceInstance;
    }

    setGlobalOptions(serviceName: string, options: ServiceOptions) {
        let service = this.$services[serviceName];
        if (!service)
            return;
        service.options = options;
        if (service.serviceInstance)
            service.serviceInstance.setGlobalOptions(options);
    }

    async addDocument(sessionID: string, documentValue: string, mode: string, options: ServiceOptions) {
        if (!mode || !/^ace\/mode\//.test(mode))
            return;

        mode = mode.replace("ace/mode/", "");

        let document = new Document(documentValue);
        let serviceInstance = await this.$getServiceInstanceByMode(mode);
        if (!serviceInstance)
            return;
        serviceInstance.addDocument(sessionID, document, options);
        this.$sessionIDToMode[sessionID] = mode;
    }

    async changeDocumentMode(sessionID: string, value: string, mode: string, options: ServiceOptions) {
        this.removeDocument(sessionID);
        await this.addDocument(sessionID, value, mode, options);
    }

    removeDocument(sessionID: string) {
        let service = this.getServiceInstance(sessionID);
        if (service) {
            service.removeDocument(sessionID);
            delete this.$sessionIDToMode[sessionID];
        }
    }

    getServiceInstance(sessionID: string): LanguageService {
        let mode = this.$sessionIDToMode[sessionID];
        let service = this.findServiceByMode(mode);
        if (!mode || !service?.serviceInstance)
            return; //TODO:

        return service.serviceInstance;
    }

    findServiceByMode(mode: string): ServiceData {
        return Object.values(this.$services).find((el) => {
            let extensions = el.modes.split('|');
            if (extensions.includes(mode))
                return el;
        });
    }
}