import {BaseService} from "ace-linters/src/services/base-service";
import init, {format} from "@wasm-fmt/dart_fmt";

import {LanguageService} from "ace-linters/src/types/language-service";
import type {AceDartLinterOptions} from "./service";
import * as lsp from "vscode-languageserver-protocol";
import {toTextEdits} from "./ace-dart-linter-converters";
import {mergeObjects} from "ace-linters/src/utils";

export class AceDartLinter extends BaseService<AceDartLinterOptions> implements LanguageService {
    $service;

    inited = false;

    serviceCapabilities = {
        documentFormattingProvider: true,
        rangeFormattingProvider: true,
    }

    $defaultFormatOptions = {
        line_width: 80,
        line_ending: "lf",
        language_version: "2.17",
    }

    constructor(mode: string) {
        super(mode);
    }

    getFormattingOptions(options: lsp.FormattingOptions) {
        return mergeObjects(this.globalOptions?.formatOptions, this.$defaultFormatOptions);
    }

    async init() {
        await init();
        this.inited = true;
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
