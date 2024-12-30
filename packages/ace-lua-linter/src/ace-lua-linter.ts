import * as lua from "luaparse";
import init, {Config, format} from "@wasm-fmt/lua_fmt";

import {BaseService} from "ace-linters/src/services/base-service";

import {LanguageService} from "ace-linters/src/types/language-service";
import type {AceLuaLinterOptions} from "./service";
import * as lsp from "vscode-languageserver-protocol";
import {filterDiagnostics} from "ace-linters/src/type-converters/lsp/lsp-converters";
import {mergeObjects} from "ace-linters/src/utils";
import {toTextEdits} from "./ace-lua-linter-converters";

export class AceLuaLinter extends BaseService<AceLuaLinterOptions> implements LanguageService {
    $service;

    inited = false;

    serviceCapabilities = {
        diagnosticProvider: {
            interFileDependencies: true,
            workspaceDiagnostics: true
        },
        documentFormattingProvider: true,
        rangeFormattingProvider: true,
    }

    $defaultFormatOptions: Config = {
        indent_style: "space",
        indent_width: 4,
        line_width: 80,
        line_ending: "lf"
    }

    constructor(mode: string) {
        super(mode);
        this.$service = lua;
    }

    async init() {
        await init();
        this.inited = true;
    }

    getFormattingOptions(options: lsp.FormattingOptions): Config {
        this.$defaultFormatOptions.indent_style = options.insertSpaces ? "space" : "tab";
        this.$defaultFormatOptions.indent_width = options.tabSize;
        return mergeObjects(this.globalOptions?.formatOptions, this.$defaultFormatOptions);
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

    async format(document: lsp.TextDocumentIdentifier, range: lsp.Range, options: lsp.FormattingOptions): Promise<lsp.TextEdit[]> {
        if (!this.inited) {
            await this.init();
        }

        let fullDocument = this.getDocument(document.uri);
        if (!fullDocument)
            return Promise.resolve([]);

        const text = fullDocument.getText(range);

        try {
            const output = format(text, document.uri, this.getFormattingOptions(options));
            return Promise.resolve(toTextEdits(output, range));
        } catch (e) {
            console.log(e);
            return Promise.resolve([]);
        }
    }
}
