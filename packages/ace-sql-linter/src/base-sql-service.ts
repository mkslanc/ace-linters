import {BaseService} from "ace-linters/src/services/base-service";
import * as lsp from "vscode-languageserver-protocol";

import {LanguageService} from "ace-linters/src/types/language-service";
import {fromPosition, toCompletions, toDiagnostics} from "./type-converters/sql-converters";

export abstract class BaseSQLService extends BaseService implements LanguageService {
    async doValidation(document: lsp.TextDocumentIdentifier): Promise<lsp.Diagnostic[]> {
        let fullDocument = this.getDocument(document.uri);
        if (!fullDocument)
            return [];

        return toDiagnostics(this.$service.validate(fullDocument.getText()), this.optionsToFilterDiagnostics);
    }

    async doComplete(document: lsp.TextDocumentIdentifier, position: lsp.Position): Promise<lsp.CompletionItem[] | lsp.CompletionList | null> {
        let fullDocument = this.getDocument(document.uri);
        if (!fullDocument)
            return null;
        return toCompletions(this.$service.getSuggestionAtCaretPosition(fullDocument.getText(), fromPosition(position)));
    }

}
