import { TextDocumentIdentifier, VersionedTextDocumentIdentifier } from "vscode-languageserver-protocol";
import { LanguageClientConfig, LanguageService, ServiceConfig, ServiceFeatures, ServiceOptions, SupportedFeatures } from "../types/language-service";
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
    workspaceUri?: string;
    constructor(ctx: {
        postMessage: any;
        addEventListener: any;
    });
    private getServicesCapabilitiesAfterCallback;
    aggregateFeatureResponses(serviceInstances: LanguageService[], feature: SupportedFeatures, methodName: string, documentIdentifier: VersionedTextDocumentIdentifier, attrs: any | any[]): Promise<any>;
    applyOptionsToServices(serviceInstances: LanguageService[], documentUri: string, options: ServiceOptions): void;
    closeAllConnections(): Promise<void>;
    private static $initServiceInstance;
    private $getServicesInstancesByMode;
    private initializeService;
    setGlobalOptions(serviceName: string, options: ServiceOptions, merge?: boolean): void;
    setWorkspace(workspaceUri: string): void;
    addDocument(documentIdentifier: VersionedTextDocumentIdentifier, documentValue: string, mode: string, options?: ServiceOptions): Promise<never[] | {
        [serviceName: string]: LanguageClientConfig | ServiceConfig;
    } | undefined>;
    renameDocument(documentIdentifier: VersionedTextDocumentIdentifier, newDocumentUri: string): Promise<void>;
    changeDocumentMode(documentIdentifier: VersionedTextDocumentIdentifier, value: string, mode: string, options: ServiceOptions): Promise<never[] | {
        [serviceName: string]: LanguageClientConfig | ServiceConfig;
    } | undefined>;
    removeDocument(document: TextDocumentIdentifier): void;
    getServicesInstances(documentUri: string): LanguageService[];
    filterByFeature(serviceInstances: LanguageService[], feature: SupportedFeatures): LanguageService[];
    findServicesByMode(mode: string): {
        [serviceName: string]: (ServiceConfig | LanguageClientConfig);
    };
    registerService(name: string, service: ServiceConfig): void;
    registerServer(name: string, clientConfig: LanguageClientConfig): void;
    configureFeatures(name: string, features?: ServiceFeatures): void;
    setDefaultFeaturesState(serviceFeatures?: ServiceFeatures): ServiceFeatures;
}
