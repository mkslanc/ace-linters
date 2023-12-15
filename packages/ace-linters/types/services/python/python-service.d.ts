import { BaseService } from "../base-service";
import * as lsp from "vscode-languageserver-protocol";
import { LanguageService, PythonServiceOptions } from "../../types/language-service";
export declare class PythonService extends BaseService<PythonServiceOptions> implements LanguageService {
    $service: any;
    initOutput: any;
    serviceCapabilities: {
        diagnosticProvider: {
            interFileDependencies: boolean;
            workspaceDiagnostics: boolean;
        };
    };
    constructor(mode: string);
    init(): Promise<void>;
    doValidation(document: lsp.TextDocumentIdentifier): Promise<lsp.Diagnostic[]>;
}
