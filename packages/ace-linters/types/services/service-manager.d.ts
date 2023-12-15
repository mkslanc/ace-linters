import { TextDocumentIdentifier, VersionedTextDocumentIdentifier } from "vscode-languageserver-protocol";
import { LanguageService, LanguageClientConfig, ServiceConfig, ServiceFeatures, ServiceOptions, SupportedFeatures } from "../types/language-service";
export declare class ServiceManager {
    $services: {
        [serviceName: string]: ServiceConfig | LanguageClientConfig;
    };
    serviceInitPromises: {
        [serviceName: string]: Promise<LanguageService>;
    };
    private $sessionIDToMode;
    ctx: {
        postMessage: any;
        addEventListener: any;
    };
    constructor(ctx: {
        postMessage: any;
        addEventListener: any;
    });
    private static $initServiceInstance;
    private $getServicesInstancesByMode;
    private initializeService;
    setGlobalOptions(serviceName: string, options: ServiceOptions, merge?: boolean): void;
    addDocument(documentIdentifier: VersionedTextDocumentIdentifier, documentValue: string, mode: string, options?: ServiceOptions): Promise<LanguageService[] | undefined>;
    changeDocumentMode(documentIdentifier: VersionedTextDocumentIdentifier, value: string, mode: string, options: ServiceOptions): Promise<LanguageService[] | undefined>;
    removeDocument(document: TextDocumentIdentifier): void;
    getServicesInstances(sessionID: string): LanguageService[];
    filterByFeature(serviceInstances: LanguageService[], feature: SupportedFeatures): LanguageService[];
    findServicesByMode(mode: string): (ServiceConfig | LanguageClientConfig)[];
    registerService(name: string, service: ServiceConfig): void;
    registerServer(name: string, clientConfig: LanguageClientConfig): void;
    configureFeatures(name: string, features: ServiceFeatures): void;
    setDefaultFeaturesState(serviceFeatures?: ServiceFeatures): ServiceFeatures;
}
