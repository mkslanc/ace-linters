import LanguageService = AceLinters.LanguageService;
import ServiceOptions = AceLinters.ServiceOptions;
import {Document} from "ace-code/src/document";
import {AceLinters} from "./language-service";
import {mergeObjects} from "../utils";
import {MessageType} from "../message-types";

interface ServiceData {
    module: any,
    name: string,
    modes: string,
    serviceInstance?: LanguageService,
    options?: ServiceOptions
}

export class ServiceManager {
    private $services: { [serviceName: string]: ServiceData } = {
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
        },
        json5: {
            module: import("./json/json-service"),
            name: "JsonService",
            modes: "json5",
        },
        typescript: {
            module: import("./typescript/typescript-service"),
            name: "TypescriptService",
            modes: "typescript|javascript|tsx|jsx"
        },
        lua: {
            module: import("./lua/lua-service"),
            name: "LuaService",
            modes: "lua"
        }
    };
    private $sessionIDToMode: { [sessionID: string]: string } = {};

    constructor(ctx) {
        ctx.addEventListener("message", async (ev) => {
            let message = ev.data;
            let sessionID = message.sessionId;
            let postMessage = {
                "type": message.type,
                "sessionId": sessionID,
            };
            switch (message["type"] as MessageType) {
                case MessageType.format:
                    postMessage["value"] = this.getServiceInstance(sessionID)?.format(sessionID, message.value, message.format);
                    break;
                case MessageType.complete:
                    postMessage["value"] = await this.getServiceInstance(sessionID)?.doComplete(sessionID, message.value);
                    break;
                case MessageType.resolveCompletion:
                    postMessage["value"] = await this.getServiceInstance(sessionID)?.resolveCompletion(sessionID, message.value);
                    break;
                case MessageType.change:
                    this.getServiceInstance(sessionID)?.setValue(sessionID, message.value);
                    break;
                case MessageType.applyDelta:
                    this.getServiceInstance(sessionID)?.applyDeltas(sessionID, message.value);
                    break;
                case MessageType.hover:
                    postMessage["value"] = await this.getServiceInstance(sessionID)?.doHover(sessionID, message.value);
                    break;
                case MessageType.validate:
                    postMessage["value"] = await this.getServiceInstance(sessionID)?.doValidation(sessionID);
                    break;
                case MessageType.init: //this should be first message
                    await this.addDocument(sessionID, message.value, message.mode, message.options);
                    break;
                case MessageType.changeMode:
                    await this.changeDocumentMode(sessionID, message.value, message.mode, message.options);
                    break;
                case MessageType.changeOptions:
                    this.getServiceInstance(sessionID)?.setOptions(sessionID, message.options);
                    break;
                case MessageType.dispose:
                    this.removeDocument(sessionID);
                    break;
                case MessageType.globalOptions:
                    this.setGlobalOptions(message.serviceName, message.options, message.merge);
                    break;
            }

            ctx.postMessage(postMessage);
        })
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

    setGlobalOptions(serviceName: string, options: ServiceOptions, merge = false) {
        let service = this.$services[serviceName];
        if (!service)
            return;
        service.options = options;
        if (service.serviceInstance) {
            if (merge) {
                options = mergeObjects(options, service.serviceInstance.globalOptions);
            }
            service.serviceInstance.setGlobalOptions(options);
        }
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
