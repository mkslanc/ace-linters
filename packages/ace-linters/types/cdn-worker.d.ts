import { SupportedServices } from "./types/language-service";
export declare function createWorker(cdnUrl: any, includeLinters?: {
    [name in SupportedServices]: boolean;
}): Worker | {
    postMessage: () => void;
    terminate: () => void;
};
