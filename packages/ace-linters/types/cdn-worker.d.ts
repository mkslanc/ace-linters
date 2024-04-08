import { ServiceStruct, SupportedServices } from "./types/language-service";
type IncludeLinters = Partial<{
    [name in SupportedServices]: boolean | undefined;
}> | boolean;
export declare function createWorker(services: {
    services: ServiceStruct[];
    serviceManagerCdn: string;
}, includeLinters?: IncludeLinters): Worker;
export declare function createWorker(cdnUrl: string, includeLinters?: IncludeLinters): Worker;
export declare function getServices(includeLinters?: IncludeLinters): ServiceStruct[];
export {};
