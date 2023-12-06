import { BaseService } from "../base-service";
import * as lsp from "vscode-languageserver-protocol";
import { LanguageService } from "../../types/language-service";
export declare class LuaService extends BaseService implements LanguageService {
    $service: any;
    serviceCapabilities: {
        diagnosticProvider: {
            interFileDependencies: boolean;
            workspaceDiagnostics: boolean;
        };
    };
    constructor(mode: string);
    doValidation(document: lsp.TextDocumentIdentifier): Promise<lsp.Diagnostic[]>;
}
