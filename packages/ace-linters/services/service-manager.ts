import LanguageService = AceLinters.LanguageService;
import ServiceOptions = AceLinters.ServiceOptions;
import {AceLinters} from "../types";
import {mergeObjects, notEmpty} from "../utils";
import {MessageType} from "../message-types";
import {TextDocumentIdentifier, VersionedTextDocumentIdentifier} from "vscode-languageserver-protocol";

type Validation = {
    (document: TextDocumentIdentifier, servicesInstances?: LanguageService[]): Promise<void>;
    (document: TextDocumentIdentifier | undefined, servicesInstances: LanguageService[]): Promise<void>;
}

export class ServiceManager {
    $services: { [serviceName: string]: AceLinters.ServiceData } = {};
    private $sessionIDToMode: { [sessionID: string]: string } = {};

    constructor(ctx) {

        let doValidation: Validation = async (document?: TextDocumentIdentifier, servicesInstances?: LanguageService[]) => {
            servicesInstances ??= this.getServicesInstances(document!.uri);
            if (servicesInstances.length === 0) {
                return;
            }
            //this is list of documents linked to services
            let sessionIDList = Object.keys(servicesInstances[0].documents);
            servicesInstances = this.filterByFeature(servicesInstances, "diagnostics");
            let postMessage = {
                "type": MessageType.validate,
            };
            
            if (servicesInstances.length === 0) {
                //we are sending clearing diagnostics message, just in case
                
                for (let sessionID of sessionIDList) {
                    postMessage["sessionId"] = sessionID;
                    postMessage["value"] = [];
                    ctx.postMessage(postMessage);
                }
                return;
            }

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

            let serviceInstances = this.getServicesInstances(sessionID);
            let documentIdentifier = {
                uri: sessionID,
                version: version
            };
            switch (message["type"] as MessageType) {
                case MessageType.format:
                    serviceInstances = this.filterByFeature(serviceInstances, "format");
                    if (serviceInstances.length > 0) {
                        //we will use only first service to format
                        postMessage["value"] = serviceInstances[0].format(documentIdentifier, message.value, message.format);
                    }
                    break;
                case MessageType.complete:
                    postMessage["value"] = (await Promise.all(this.filterByFeature(serviceInstances, "completion").map(async (service) => {
                        return {
                            completions: await service.doComplete(documentIdentifier, message.value),
                            service: service.serviceData.className
                        };
                    }))).filter(notEmpty);
                    break;
                case MessageType.resolveCompletion:
                    let serviceName = message.value.service;
                    postMessage["value"] = await this.filterByFeature(serviceInstances, "completionResolve").find((service) => {
                        if (service.serviceData.className === serviceName) {
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
                    postMessage["value"] = (await Promise.all(this.filterByFeature(serviceInstances, "hover").map(async (service) => {
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
                    var serviceInstance = this.$services[message.serviceName].serviceInstance;
                    this.setGlobalOptions(message.serviceName, message.options, message.merge);
                    if (serviceInstance)
                        await doValidation(undefined, [serviceInstance]);
                    break;
                case MessageType.configureFeatures:
                    var serviceInstance = this.$services[message.serviceName].serviceInstance;
                    this.configureFeatures(message.serviceName, message.options);
                    if (serviceInstance)
                        await doValidation(undefined, [serviceInstance]);
                    break;
            }

            ctx.postMessage(postMessage);
        })
    }

    private static async $initServiceInstance(service: AceLinters.ServiceData): Promise<LanguageService> {
        let module = await service.module();
        service.serviceInstance = new module[service.className](service.modes);
        if (service.options)
            service.serviceInstance!.setGlobalOptions(service.options);
        service.serviceInstance!.serviceData = service;
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

    getServicesInstances(sessionID: string): LanguageService[] {
        let mode = this.$sessionIDToMode[sessionID];
        if (!mode)
            return []; //TODO:
        let services = this.findServicesByMode(mode);
        return services.map((el) => el.serviceInstance).filter(notEmpty);
    }

    filterByFeature(serviceInstances: LanguageService[], feature: AceLinters.SupportedFeatures): LanguageService[] {
        return serviceInstances.filter((el) => el.serviceData.features![feature] === true);
    }

    findServicesByMode(mode: string): AceLinters.ServiceData[] {
        return Object.values(this.$services).filter((el) => {
            let extensions = el.modes.split('|');
            if (extensions.includes(mode))
                return el;
        });
    }

    registerService(name: string, service: AceLinters.ServiceData) {
        service.features = this.setDefaultFeaturesState(service.features);
        this.$services[name] = service;
    }

    configureFeatures(name: string, features: AceLinters.ServiceFeatures) {
        features = this.setDefaultFeaturesState(features);
        this.$services[name].features = features;
    }

    setDefaultFeaturesState(serviceFeatures?: AceLinters.ServiceFeatures) {
        let features = serviceFeatures ?? {} as AceLinters.ServiceFeatures;
        features.hover ??= true;
        features.completion ??= true;
        features.completionResolve ??= true;
        features.format ??= true;
        features.diagnostics ??= true;
        return features;
    }
}
