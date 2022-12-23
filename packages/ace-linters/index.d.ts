import {AceLinters} from "./services/language-service";

export {AceLinters} from "./services/language-service";
export {LanguageProvider} from "./language-provider";
export * from "./type-converters/converters";

export function setLanguageGlobalOptions<T extends keyof AceLinters.ServiceOptionsMap>(serviceName: T, options: AceLinters.ServiceOptionsMap[T], merge?: boolean): void;

export function registerStyles(): void;