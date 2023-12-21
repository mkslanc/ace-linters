import { ServiceStruct, SupportedServices } from "./types/language-service";
export declare function createWorker(services: {
    services: ServiceStruct[];
    serviceManagerCdn: string;
}, includeLinters?: {
    [name in SupportedServices]: boolean;
} | boolean): Worker;
export declare function createWorker(cdnUrl: string, includeLinters?: {
    [name in SupportedServices]: boolean;
} | boolean): Worker;
