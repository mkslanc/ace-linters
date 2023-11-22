import { TextDocumentIdentifier, VersionedTextDocumentIdentifier } from "vscode-languageserver-protocol";
import { LanguageService, ServerData, ServiceData, ServiceFeatures, ServiceOptions, SupportedFeatures } from "../types/language-service";
export declare class ServiceManager {
    $services: {
        [serviceName: string]: ServiceData;
    };
    private $sessionIDToMode;
    constructor(ctx: Window & typeof globalThis);
    private static $initServiceInstance;
    private $getServicesInstancesByMode;
    setGlobalOptions(serviceName: string, options: ServiceOptions, merge?: boolean): void;
    addDocument(documentIdentifier: VersionedTextDocumentIdentifier, documentValue: string, mode: string, options?: ServiceOptions): Promise<LanguageService[] | undefined>;
    changeDocumentMode(documentIdentifier: VersionedTextDocumentIdentifier, value: string, mode: string, options: ServiceOptions): Promise<LanguageService[] | undefined>;
    removeDocument(document: TextDocumentIdentifier): void;
    getServicesInstances(sessionID: string): LanguageService[];
    filterByFeature(serviceInstances: LanguageService[], feature: SupportedFeatures): LanguageService[];
    findServicesByMode(mode: string): ServiceData[];
    registerService(name: string, service: ServiceData): void;
    registerServer(name: string, server: ServerData): void;
    configureFeatures(name: string, features: ServiceFeatures): void;
    setDefaultFeaturesState(serviceFeatures?: ServiceFeatures): ServiceFeatures;
}
