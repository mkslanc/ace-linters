import LanguageService = AceLinters.LanguageService;
import ServiceOptions = AceLinters.ServiceOptions;
import {AceLinters} from "../types";
import {mergeObjects, notEmpty} from "../utils";
import {MessageType} from "../message-types";
import {TextDocumentIdentifier, VersionedTextDocumentIdentifier} from "vscode-languageserver-protocol";

interface ServiceData {
    module: () => any,
    className: string,
    modes: string,
    serviceInstance?: LanguageService,
    options?: ServiceOptions,
    features: AceLinters.ServiceFeatures
}

export class ServiceManager {
    private $services: { [serviceName: string]: ServiceData } = {};
    private $sessionIDToMode: { [sessionID: string]: string } = {};

    constructor(ctx) {
        type Validation = {
            (document: TextDocumentIdentifier, servicesInstances?: LanguageService[]): void;
            (document: TextDocumentIdentifier | undefined, servicesInstances: LanguageService[]): void;
        }
        const doValidation = async (document?: TextDocumentIdentifier, servicesInstances?: LanguageService[]) => {
            serviceInstances ??= this.getServicesInstances(document!.uri);
            if (servicesInstances.length === 0)
                return;
            let postMessage = {
                "type": MessageType.validate,
            };

            let sessionIDList = Object.keys(servicesInstances[0].documents);
            for (let sessionID of sessionIDList) {
                let diagnostics = await Promise.all(servicesInstances.map((el) => {
                    return el.doValidation({uri: sessionID});
                }));
                postMessage["sessionId"] = sessionID;
                postMessage["value"] = diagnostics.flat();
                ctx.postMessage(postMessage);
            }
        }

        ctx.addEventListener("message", async (ev) => {
            let message = ev.data;
            let sessionID = message.sessionId ?? "";
            let version = message.version;
            let postMessage = {
                "type": message.type,
                "sessionId": sessionID,
            };

            const feature = this.getFeatureByMessageType(message["type"]);
            let serviceInstances = this.getServicesInstances(sessionID, feature);
            let documentIdentifier = {
                uri: sessionID,
                version: version
            };
            switch (message["type"] as MessageType) {
                case MessageType.format:
                    if (serviceInstances.length > 0) {
                        //we will use only first service to format
                        postMessage["value"] = serviceInstances[0].format(documentIdentifier, message.value, message.format);
                    }
                    break;
                case MessageType.complete:
                    postMessage["value"] = (await Promise.all(serviceInstances.map(async (service) => {
                        return {
                            completions: await service.doComplete(documentIdentifier, message.value),
                            service: service.constructor.name
                        };
                    }))).filter(notEmpty);
                    break;
                case MessageType.resolveCompletion:
                    let serviceName = message.value.service;
                    postMessage["value"] = await serviceInstances.find((service) => {
                        if (service.constructor.name === serviceName) {
                            return service;
                        }
                    })?.doResolve(message.value);
                    break;
                case MessageType.change:
                    serviceInstances.forEach((service) => {
                        service.setValue(documentIdentifier, message.value);
                    });
                    await doValidation(documentIdentifier, serviceInstances);
                    break;
                case MessageType.applyDelta:
                    serviceInstances.forEach((service) => {
                        service.applyDeltas(documentIdentifier, message.value);
                    });
                    await doValidation(documentIdentifier, serviceInstances);
                    break;
                case MessageType.hover:
                    postMessage["value"] = (await Promise.all(serviceInstances.map(async (service) => {
                        return service.doHover(documentIdentifier, message.value);
                    }))).filter(notEmpty);
                    break;
                case MessageType.validate:
                    postMessage["value"] = await doValidation(documentIdentifier, serviceInstances);
                    break;
                case MessageType.init: //this should be first message
                    await this.addDocument(documentIdentifier, message.value, message.mode, message.options);
                    await doValidation(documentIdentifier);
                    break;
                case MessageType.changeMode:
                    await this.changeDocumentMode(documentIdentifier, message.value, message.mode, message.options);
                    await doValidation(documentIdentifier, serviceInstances);
                    break;
                case MessageType.changeOptions:
                    serviceInstances.forEach((service) => {
                        service.setOptions(sessionID, message.options);
                    });
                    await doValidation(documentIdentifier, serviceInstances);
                    break;
                case MessageType.dispose:
                    this.removeDocument(documentIdentifier);
                    break;
                case MessageType.globalOptions:
                    serviceInstance = this.$services[message.serviceName].serviceInstance;
                    this.setGlobalOptions(message.serviceName, message.options, message.merge);
                    if (serviceInstance)
                        doValidation(undefined, serviceInstance);
                    break;
                case MessageType.featuresToggle:
                    this.toggleFeatures(message.serviceName, message.options);
                    break;
            }

            ctx.postMessage(postMessage);
        })
    }

    private static async $initServiceInstance(service: ServiceData): Promise<LanguageService> {
        let module = await service.module();
        service.serviceInstance = new module[service.className](service.modes);
        if (service.options)
            service.serviceInstance!.setGlobalOptions(service.options);
        return service.serviceInstance!;
    }

    private async $getServicesInstancesByMode(mode: string): Promise<LanguageService[]> {
        let services = this.findServicesByMode(mode);
        if (services.length === 0) {
            return [];
        }
        return Promise.all(services.map(async (service) => {
            if (!service.serviceInstance) {
                return await ServiceManager.$initServiceInstance(service);
            } else {
                return service.serviceInstance;
            }
        }));
    }

    setGlobalOptions(serviceName: string, options: ServiceOptions, merge = false) {
        let service = this.$services[serviceName];
        if (!service)
            return;
        service.options = merge ? mergeObjects(options, service.options) : options;
        if (service.serviceInstance) {
            service.serviceInstance.setGlobalOptions(service.options!);
        }
    }

    async addDocument(documentIdentifier: VersionedTextDocumentIdentifier, documentValue: string, mode: string, options?: ServiceOptions) {
        if (!mode || !/^ace\/mode\//.test(mode))
            return;
        mode = mode.replace("ace/mode/", "");
        let serviceInstances = await this.$getServicesInstancesByMode(mode);
        if (serviceInstances.length === 0)
            return;
        let documentItem = {
            uri: documentIdentifier.uri,
            version: documentIdentifier.version,
            languageId: mode,
            text: documentValue
        }
        serviceInstances.forEach((el) => el.addDocument(documentItem));
        this.$sessionIDToMode[documentIdentifier.uri] = mode;
    }

    async changeDocumentMode(documentIdentifier: VersionedTextDocumentIdentifier, value: string, mode: string, options: ServiceOptions) {
        this.removeDocument(documentIdentifier);
        await this.addDocument(documentIdentifier, value, mode, options);
    }

    removeDocument(document: TextDocumentIdentifier) {
        let services = this.getServicesInstances(document.uri);
        if (services.length > 0) {
            services.map((el) => el.removeDocument(document));
            delete this.$sessionIDToMode[document.uri];
        }
    }

    getServicesInstances(sessionID: string, feature?: string): LanguageService[] {
        let mode = this.$sessionIDToMode[sessionID];
        if (!mode)
            return []; //TODO:
        let services = this.findServicesByMode(mode);
        if (feature) {
            services = services.filter((el) => el.features[feature] === true);
        }
        return services.map((el) => el.serviceInstance).filter(notEmpty);
    }

    getFeatureByMessageType(messageType: MessageType) {
        switch (messageType) {
            case MessageType.complete:
                return "completion";
            case MessageType.format:
                return "format";
            case MessageType.hover:
                return "hover";
            case MessageType.resolveCompletion:
                return "completionResolve"
            case MessageType.validate:
            case MessageType.init:
            case MessageType.applyDelta:
            case MessageType.change:
            case MessageType.changeMode:
            case MessageType.changeOptions:
                return "diagnostics"
        }
    }

    findServicesByMode(mode: string): ServiceData[] {
        return Object.values(this.$services).filter((el) => {
            let extensions = el.modes.split('|');
            if (extensions.includes(mode))
                return el;
        });
    }

    registerService(name: string, service: ServiceData) {
        service.features ??= {
            hover: true,
            completion: true,
            completionResolve: true,
            format: true,
            diagnostics: true
        }
        this.$services[name] = service;
    }

    toggleFeatures(name: string, features: AceLinters.ServiceFeatures) {
        features ??= {
            hover: true,
            completion: true,
            completionResolve: true,
            format: true,
            diagnostics: true
        }
        this.$services[name].features = features;
    }
}
