import { BaseService } from "ace-linters/src/services/base-service";
import * as lsp from "vscode-languageserver-protocol";
import { LanguageService } from "ace-linters/src/types/language-service";
export declare abstract class BaseSQLService extends BaseService implements LanguageService {
    doValidation(document: lsp.TextDocumentIdentifier): Promise<lsp.Diagnostic[]>;
    doComplete(document: lsp.TextDocumentIdentifier, position: lsp.Position): Promise<lsp.CompletionItem[] | lsp.CompletionList | null>;
}
