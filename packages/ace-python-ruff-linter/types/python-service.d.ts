import { BaseService } from "ace-linters/src/services/base-service";
import * as lsp from "vscode-languageserver-protocol";
import { LanguageService, PythonServiceOptions } from "ace-linters/src/types/language-service";
import { Workspace } from "@astral-sh/ruff-wasm-web";
export declare class PythonService extends BaseService<PythonServiceOptions> implements LanguageService {
    $service: Workspace;
    initOutput: any;
    defaultOptions: {
        'line-length': number;
        'indent-width': number;
        format: {
            'indent-style': string;
            'quote-style': string;
        };
        lint: {
            select: string[];
        };
    };
    currentOptions: any;
    serviceCapabilities: {
        diagnosticProvider: {
            interFileDependencies: boolean;
            workspaceDiagnostics: boolean;
        };
        documentFormattingProvider: boolean;
    };
    constructor(mode: string);
    init(): Promise<void>;
    setFormattingOptions(options: lsp.FormattingOptions): void;
    doValidation(document: lsp.TextDocumentIdentifier): Promise<lsp.Diagnostic[]>;
    format(document: lsp.TextDocumentIdentifier, range: lsp.Range, options: lsp.FormattingOptions): Promise<lsp.TextEdit[]>;
}
