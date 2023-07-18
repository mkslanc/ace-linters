import { TextDocumentIdentifier, VersionedTextDocumentIdentifier } from "vscode-languageserver-protocol";
import { LanguageService, ServiceData, ServiceFeatures, ServiceOptions, SupportedFeatures } from "../types/language-service";
export declare class ServiceManager {
    $services: {
        [serviceName: string]: ServiceData;
    };
    private $sessionIDToMode;
    constructor(ctx: any);
    private static $initServiceInstance;
    private $getServicesInstancesByMode;
    setGlobalOptions(serviceName: string, options: ServiceOptions, merge?: boolean): void;
    addDocument(documentIdentifier: VersionedTextDocumentIdentifier, documentValue: string, mode: string, options?: ServiceOptions): Promise<void>;
    changeDocumentMode(documentIdentifier: VersionedTextDocumentIdentifier, value: string, mode: string, options: ServiceOptions): Promise<void>;
    removeDocument(document: TextDocumentIdentifier): void;
    getServicesInstances(sessionID: string): LanguageService[];
    filterByFeature(serviceInstances: LanguageService[], feature: SupportedFeatures): LanguageService[];
    findServicesByMode(mode: string): ServiceData[];
    registerService(name: string, service: ServiceData): void;
    configureFeatures(name: string, features: ServiceFeatures): void;
    setDefaultFeaturesState(serviceFeatures?: ServiceFeatures): ServiceFeatures;
}
