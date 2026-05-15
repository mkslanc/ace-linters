import { BaseService } from "ace-linters/src/services/base-service";
import { LanguageService } from "ace-linters/src/types/language-service";
import type { AceDartLinterOptions } from "./service";
import * as lsp from "vscode-languageserver-protocol";
export declare class AceDartLinter extends BaseService<AceDartLinterOptions> implements LanguageService {
    $service: any;
    inited: boolean;
    serviceCapabilities: {
        documentFormattingProvider: boolean;
        rangeFormattingProvider: boolean;
    };
    $defaultFormatOptions: {
        line_width: number;
        line_ending: string;
    };
    constructor(mode: string);
    getFormattingOptions(options: lsp.FormattingOptions): any;
    init(): Promise<void>;
    format(document: lsp.TextDocumentIdentifier, range: lsp.Range, options: lsp.FormattingOptions): Promise<lsp.TextEdit[]>;
}
