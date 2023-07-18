import { BaseService } from "../base-service";
import * as lsp from "vscode-languageserver-protocol";
import { LanguageService } from "../../types/language-service";
export declare class LuaService extends BaseService implements LanguageService {
    $service: any;
    constructor(mode: string);
    doValidation(document: lsp.TextDocumentIdentifier): Promise<lsp.Diagnostic[]>;
}
