import {AceLinters} from "./language-service";
import LanguageService = AceLinters.LanguageService;
import ServiceOptions = AceLinters.ServiceOptions;
import {Document} from "ace-code/src/document";

export class ServiceManager {
    private static _instance: ServiceManager;
    private $services: { module: any, name: string, extensions: string }[] = [
        {
            module: import("./html/html-service"),
            name: "HtmlService",
            extensions: "html"
        },
        {
            module: import("./css/css-service"),
            name: "CssService",
            extensions: "css|less|scss"
        },
        {
            module: import("./json/json-service"),
            name: "JsonService",
            extensions: "json"
        }
    ];
    private $serviceInstances: { [mode: string]: LanguageService } = {};
    private $sessionIDToMode: {[sessionID: string]: string} = {};

    static get instance() {
        if (!ServiceManager._instance) {
            ServiceManager._instance = new ServiceManager();
        }
        return ServiceManager._instance;
    }

    private async $initServiceInstance(mode: string): Promise<LanguageService> {
        let resolvedMode = mode?.replace("ace/mode/", "");
        try {
            let service = this.findServiceByExtension(resolvedMode);
            if (!service) {
                console.log("No service registered for " + resolvedMode);
                return;
            }
            this.$serviceInstances[mode] = new (await service.module)[service.name](mode);
            return this.$serviceInstances[mode];
        } catch (e) {
            throw "Couldn't resolve language service for " + resolvedMode;
        }
    }

    private async $getServiceInstance(mode: string): Promise<LanguageService> {
        if (!this.$serviceInstances[mode]) {
            await this.$initServiceInstance(mode);
        }
        return this.$serviceInstances[mode];
    }

    async addDocument(sessionID: string, documentValue: string, mode: string, options: ServiceOptions) {
        if (!mode || !/^ace\/mode\//.test(mode))
            return;

        let document = new Document(documentValue);

        let serviceInstance = await this.$getServiceInstance(mode);
        serviceInstance.addDocument(sessionID, document, options);

        this.$sessionIDToMode[sessionID] = mode;
    }

    async changeDocumentMode(sessionID: string, mode: string, options: ServiceOptions) {
        let service = this.getServiceInstance(sessionID);
        let documentValue = service.getDocumentValue(sessionID);

        service.removeDocument(sessionID);

        delete this.$sessionIDToMode[sessionID];

        await this.addDocument(sessionID, documentValue, mode, options);
    }

    getServiceInstance(sessionID: string): LanguageService {
        let mode = this.$sessionIDToMode[sessionID];
        if (!mode || !this.$serviceInstances[mode]) {
            throw Error("No registered service for " + sessionID);
        }
        return this.$serviceInstances[mode];
    }

    findServiceByExtension(extension: string) {
        return this.$services.find((el) => {
            let extensions = el.extensions.split('|');
            if (extensions.indexOf(extension) !== -1)
                return el;
        })
    }
}