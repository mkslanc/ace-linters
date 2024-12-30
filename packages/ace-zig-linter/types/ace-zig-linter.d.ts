import { BaseService } from "ace-linters/src/services/base-service";
import { LanguageService } from "ace-linters/src/types/language-service";
import type { AceZigLinterOptions } from "./service";
import * as lsp from "vscode-languageserver-protocol";
export declare class AceZigLinter extends BaseService<AceZigLinterOptions> implements LanguageService {
    $service: any;
    inited: boolean;
    serviceCapabilities: {
        documentFormattingProvider: boolean;
        rangeFormattingProvider: boolean;
    };
    constructor(mode: string);
    init(): Promise<void>;
    format(document: lsp.TextDocumentIdentifier, range: lsp.Range, options: lsp.FormattingOptions): Promise<lsp.TextEdit[]>;
}
