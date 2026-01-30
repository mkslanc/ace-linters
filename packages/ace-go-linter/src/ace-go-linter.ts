import init, { format } from "@wasm-fmt/gofmt/gofmt_web";

import {BaseService} from "ace-linters/src/services/base-service";

import {LanguageService} from "ace-linters/src/types/language-service";
import type {AceGoLinterOptions} from "./service";
import * as lsp from "vscode-languageserver-protocol";
import {toTextEdits} from "./ace-go-linter-converters";

export class AceGoLinter extends BaseService<AceGoLinterOptions> implements LanguageService {
    $service;

    inited = false;

    serviceCapabilities = {
        documentFormattingProvider: true,
        rangeFormattingProvider: true,
    }

    constructor(mode: string) {
        super(mode);
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
            const output = format(text);
            return Promise.resolve(toTextEdits(output, range));
        } catch (e) {
            console.log(e);
            return Promise.resolve([]);
        }
    }
}
