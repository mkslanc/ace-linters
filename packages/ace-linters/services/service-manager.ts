import {AceLinters} from "../index";
import LanguageService = AceLinters.LanguageService;
import ServiceOptions = AceLinters.ServiceOptions;
import {Document} from "ace-code/src/document";

interface ServiceData {
    module: any, name: string, modes: string, serviceInstance?: LanguageService, options?: ServiceOptions
}

export class ServiceManager {
    private static _instance: ServiceManager;
    private $services: ServiceData[] = [
        {
            module: import("./html/html-service"),
            name: "HtmlService",
            modes: "html"
        },
        {
            module: import("./css/css-service"),
            name: "CssService",
            modes: "css"
        },
        {
            module: import("./css/css-service"),
            name: "CssService",
            modes: "less"
        },
        {
            module: import("./css/css-service"),
            name: "CssService",
            modes: "scss"
        },
        {
            module: import("./json/json-service"),
            name: "JsonService",
            modes: "json",
            options: {
                allowComments: false,
                trailingCommas: false
            }
        },
        {
            module: import("./json/json-service"),
            name: "JsonService",
            modes: "json5",
            options: {
                allowComments: true,
                trailingCommas: true
            }
        },
        {
            module: import("./typescript/typescript-service"),
            name: "TypescriptService",
            modes: "typescript|javascript|tsx"
        }
    ];
    private $sessionIDToMode: {[sessionID: string]: string} = {};

    static get instance() {
        if (!ServiceManager._instance) {
            ServiceManager._instance = new ServiceManager();
        }
        return ServiceManager._instance;
    }

    private async $initServiceInstance(service: ServiceData) {
        try {
            service.serviceInstance = new (await service.module)[service.name](service.modes);
        } catch (e) {
            console.log("Couldn't resolve language service for " + service.modes);//TODO
        }
    }

    private async $getServiceInstanceByMode(mode: string): Promise<LanguageService> {
        let service = this.findServiceByMode(mode);
        if (!service)
            return;
        if (!service.serviceInstance)
            await this.$initServiceInstance(service);
        return service.serviceInstance;
    }

    async addDocument(sessionID: string, documentValue: string, mode: string, options: ServiceOptions) {
        if (!mode || !/^ace\/mode\//.test(mode))
            return;

        mode = mode.replace("ace/mode/", "");

        let document = new Document(documentValue);
        let service = this.findServiceByMode(mode);
        let serviceInstance = await this.$getServiceInstanceByMode(mode);
        serviceInstance.addDocument(sessionID, document, {...service.options, ...options});
        this.$sessionIDToMode[sessionID] = mode;
    }

    async changeDocumentMode(sessionID: string, mode: string, options: ServiceOptions) {
        let service = this.getServiceInstance(sessionID);
        let documentValue = service.getDocumentValue(sessionID);
        this.removeDocument(sessionID);
        await this.addDocument(sessionID, documentValue, mode, options);
    }

    removeDocument(sessionID: string) {
        let service = this.getServiceInstance(sessionID);
        service.removeDocument(sessionID);
        delete this.$sessionIDToMode[sessionID];
    }

    getServiceInstance(sessionID: string): LanguageService {
        let mode = this.$sessionIDToMode[sessionID];
        let service = this.findServiceByMode(mode);
        if (!mode || !service?.serviceInstance)
            throw Error("No registered service for " + sessionID);

        return service.serviceInstance;
    }

    findServiceByMode(mode: string): ServiceData {
        return this.$services.find((el) => {
            let extensions = el.modes.split('|');
            if (extensions.includes(mode))
                return el;
        });
    }
}