import {BaseService} from "../base-service";
import * as lua from "luaparse";
import * as lsp from "vscode-languageserver-protocol";
import {LanguageService} from "../../types/language-service";
import {filterDiagnostics} from "../../type-converters/lsp-converters";

export class LuaService extends BaseService implements LanguageService {
    $service;

    serviceCapabilities = {
        diagnosticProvider: {
            interFileDependencies: true,
            workspaceDiagnostics: true
        }
    }

    constructor(mode: string) {
        super(mode);
        this.$service = lua;
    }

    async doValidation(document: lsp.TextDocumentIdentifier): Promise<lsp.Diagnostic[]> {
        let value = this.getDocumentValue(document.uri);
        if (!value)
            return [];

        let errors: lsp.Diagnostic[] = [];
        try {
            this.$service.parse(value);
        } catch (e) {
            if (e instanceof this.$service.SyntaxError) {
                errors.push({
                    range: {
                        start: {
                            line: e.line - 1,
                            character: e.column
                        },
                        end: {
                            line: e.line - 1,
                            character: e.column
                        }
                    },
                    message: e.message,
                    severity: 1
                });
            }
        }
        return filterDiagnostics(errors, this.optionsToFilterDiagnostics);
    }

}
