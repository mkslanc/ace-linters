import {BaseService} from "../base-service";
import * as lua from "luaparse";
import {AceLinters} from "../../types";
import * as lsp from "vscode-languageserver-protocol";

export class LuaService extends BaseService implements AceLinters.LanguageService {
    $service;

    constructor(mode: string) {
        super(mode);
        this.$service = lua;
    }

    async doValidation(document: lsp.TextDocumentIdentifier): Promise<lsp.Diagnostic[]> {
        let value = this.getDocumentValue(document.uri);
        if (!value) {
            return [];
        }
        let errors = [];
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
        return errors;
    }

}
