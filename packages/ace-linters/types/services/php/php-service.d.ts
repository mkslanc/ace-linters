import { BaseService } from "../base-service";
import * as lsp from "vscode-languageserver-protocol";
import { LanguageService, PhpServiceOptions } from "../../types/language-service";
export declare class PhpService extends BaseService<PhpServiceOptions> implements LanguageService {
    $service: any;
    constructor(mode: string);
    doValidation(document: lsp.TextDocumentIdentifier): Promise<lsp.Diagnostic[]>;
}
