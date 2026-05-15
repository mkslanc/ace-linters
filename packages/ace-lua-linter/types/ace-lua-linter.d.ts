import { Config } from "@wasm-fmt/lua_fmt/lua_fmt_web";
import { BaseService } from "ace-linters/src/services/base-service";
import { LanguageService } from "ace-linters/src/types/language-service";
import type { AceLuaLinterOptions } from "./service";
import * as lsp from "vscode-languageserver-protocol";
export declare class AceLuaLinter extends BaseService<AceLuaLinterOptions> implements LanguageService {
    $service: any;
    inited: boolean;
    serviceCapabilities: {
        diagnosticProvider: {
            interFileDependencies: boolean;
            workspaceDiagnostics: boolean;
        };
        documentFormattingProvider: boolean;
        rangeFormattingProvider: boolean;
    };
    $defaultFormatOptions: Config;
    constructor(mode: string);
    init(): Promise<void>;
    getFormattingOptions(options: lsp.FormattingOptions): Config;
    doValidation(document: lsp.TextDocumentIdentifier): Promise<lsp.Diagnostic[]>;
    format(document: lsp.TextDocumentIdentifier, range: lsp.Range, options: lsp.FormattingOptions): Promise<lsp.TextEdit[]>;
}
