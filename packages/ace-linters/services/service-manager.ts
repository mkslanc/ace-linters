import LanguageService = AceLinters.LanguageService;
import ServiceOptions = AceLinters.ServiceOptions;
import {AceLinters} from "../types";
import {mergeObjects} from "../utils";
import {MessageType} from "../message-types";
import {TextDocument} from "vscode-languageserver-textdocument";
import {TextDocumentIdentifier} from "vscode-languageserver-protocol";

interface ServiceData {
    module: () => any,
    className: string,
    modes: string,
    serviceInstance?: LanguageService,
    options?: ServiceOptions
}

export class ServiceManager {
    private $services: { [serviceName: string]: ServiceData } = {};
    private $sessionIDToMode: { [sessionID: string]: string } = {};

    constructor(ctx) {
        let doValidation = (document: TextDocumentIdentifier, serviceInstance?: LanguageService) => {
            serviceInstance ??= this.getServiceInstance(document.uri);
            if (!serviceInstance)
                return;
            let postMessage = {
                "type": MessageType.validate,
            };
            let sessionIDList = Object.keys(serviceInstance.documents);
            for (let sessionID of sessionIDList) {
                serviceInstance.doValidation({uri: sessionID}).then((result) => {
                    postMessage["sessionId"] = sessionID;
                    postMessage["value"] = result;
                    ctx.postMessage(postMessage);
                });

            }
        }
        ctx.addEventListener("message", async (ev) => {
            let message = ev.data;
            let sessionID = message.sessionId as string;
            let postMessage = {
                "type": message.type,
                "sessionId": sessionID,
            };
            let serviceInstance = this.getServiceInstance(sessionID);
            let document = serviceInstance?.getDocument(sessionID) ?? {
                uri: sessionID
            };
            switch (message["type"] as MessageType) {
                case MessageType.format:
                    postMessage["value"] = serviceInstance?.format(document, message.value, message.format);
                    break;
                case MessageType.complete:
                    postMessage["value"] = await serviceInstance?.doComplete(document, message.value);
                    break;
                case MessageType.resolveCompletion:
                    postMessage["value"] = await serviceInstance?.doResolve(message.value);
                    break;
                case MessageType.change:
                    serviceInstance?.setValue(sessionID, message.value);
                    doValidation(document, serviceInstance);
                    break;
                case MessageType.applyDelta:
                    serviceInstance?.applyDeltas(sessionID, message.value);
                    doValidation(document, serviceInstance);
                    break;
                case MessageType.hover:
                    postMessage["value"] = await serviceInstance?.doHover(document, message.value);
                    break;
                case MessageType.validate:
                    postMessage["value"] = await serviceInstance?.doValidation(document);
                    break;
                case MessageType.init: //this should be first message
                    await this.addDocument(sessionID, message.value, message.mode, message.options);
                    doValidation(document);
                    break;
                case MessageType.changeMode:
                    await this.changeDocumentMode(document, message.value, message.mode, message.options);
                    doValidation(document, serviceInstance);
                    break;
                case MessageType.changeOptions:
                    serviceInstance?.setOptions(sessionID, message.options);
                    doValidation(document, serviceInstance);
                    break;
                case MessageType.dispose:
                    this.removeDocument(document);
                    break;
                case MessageType.globalOptions:
                    this.setGlobalOptions(message.serviceName, message.options, message.merge);
                    break;
            }

            ctx.postMessage(postMessage);
        })
    }

    private static async $initServiceInstance(service: ServiceData) {
        let module = await service.module();
        service.serviceInstance = new module[service.className](service.modes);
        service.serviceInstance.setGlobalOptions(service.options);
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
        service.options = merge ? mergeObjects(options, service.options) : options;
        if (service.serviceInstance) {
            service.serviceInstance.setGlobalOptions(service.options);
        }
    }

    async addDocument(sessionID: string, documentValue: string, mode: string, options?: ServiceOptions) {
        if (!mode || !/^ace\/mode\//.test(mode))
            return;

        mode = mode.replace("ace/mode/", "");

        let document = TextDocument.create(sessionID, mode, 1, documentValue);
        let serviceInstance = await this.$getServiceInstanceByMode(mode);
        if (!serviceInstance)
            return;
        serviceInstance.addDocument(document);
        this.$sessionIDToMode[sessionID] = mode;
    }

    async changeDocumentMode(document: TextDocumentIdentifier, value: string, mode: string, options: ServiceOptions) {
        this.removeDocument(document);
        await this.addDocument(document.uri, value, mode, options);
    }

    removeDocument(document: TextDocumentIdentifier) {
        let service = this.getServiceInstance(document.uri);
        if (service) {
            service.removeDocument(document);
            delete this.$sessionIDToMode[document.uri];
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

    registerService(name: string, service: ServiceData) {
        this.$services[name] = service;
    }
}
