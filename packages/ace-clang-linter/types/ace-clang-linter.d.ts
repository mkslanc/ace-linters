import { BaseService } from "ace-linters/src/services/base-service";
import { LanguageService } from "ace-linters/src/types/language-service";
import type { AceClangLinterOptions } from "./service";
import * as lsp from "vscode-languageserver-protocol";
export declare class AceClangLinter extends BaseService<AceClangLinterOptions> implements LanguageService {
    $service: any;
    inited: boolean;
    serviceCapabilities: {
        documentFormattingProvider: boolean;
        rangeFormattingProvider: boolean;
    };
    $defaultFormatOptions: {
        BasedOnStyle: string;
        IndentWidth: number;
        ColumnLimit: number;
    };
    constructor(mode: string);
    getFormattingOptions(options: lsp.FormattingOptions): string;
    init(): Promise<void>;
    format(document: lsp.TextDocumentIdentifier, range: lsp.Range, options: lsp.FormattingOptions): Promise<lsp.TextEdit[]>;
}
