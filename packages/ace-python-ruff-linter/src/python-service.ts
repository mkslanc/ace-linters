import {BaseService} from "ace-linters/src/services/base-service";
import * as lsp from "vscode-languageserver-protocol";

import {toDiagnostics, toTextEdits} from "./python-converters";
import {LanguageService, PythonServiceOptions} from "ace-linters/src/types/language-service";
import init, {Workspace} from "@astral-sh/ruff-wasm-web"
import {mergeObjects} from "ace-linters/src/utils";

export class PythonService extends BaseService<PythonServiceOptions> implements LanguageService {
    $service: Workspace;
    initOutput;

    defaultOptions = {
        'line-length': 88,
        'indent-width': 4,
        format: {
            'indent-style': 'space',
            'quote-style': 'double',
        },
        lint: {
            select: [
                'E4',
                'E7',
                'E9',
                'F'
            ],
        },
    }

    currentOptions;

    serviceCapabilities = {
        diagnosticProvider: {
            interFileDependencies: true,
            workspaceDiagnostics: true
        },
        documentFormattingProvider: true,
    }

    constructor(mode: string) {
        super(mode);
    }

    async init() {
        this.initOutput = await init();
        this.currentOptions = this.getOption("", "configuration");
        this.currentOptions = this.currentOptions ? mergeObjects(this.currentOptions, this.defaultOptions) : this.defaultOptions;
        this.$service = new Workspace(this.currentOptions);
    }

    setFormattingOptions(options: lsp.FormattingOptions) {
        const indentStyle = options.insertSpaces ? 'space' : 'tab';
        if (this.currentOptions['indent-width'] != options.tabSize || this.currentOptions.format['indent-style'] != indentStyle) {
            this.currentOptions['indent-width'] = options.tabSize;
            this.currentOptions.format['indent-style'] = indentStyle;
        }
        this.$service = new Workspace(this.currentOptions);
    }

    async doValidation(document: lsp.TextDocumentIdentifier): Promise<lsp.Diagnostic[]> {
        let value = this.getDocumentValue(document.uri);
        if (!value)
            return [];

        if (!this.initOutput)
            await this.init();

        let diagnostics = this.$service.check(value);
        return toDiagnostics(diagnostics, this.optionsToFilterDiagnostics);
    }

    format(document: lsp.TextDocumentIdentifier, range: lsp.Range, options: lsp.FormattingOptions): Promise<lsp.TextEdit[]> {
        let fullDocument = this.getDocument(document.uri);
        if (!fullDocument)
            return Promise.resolve([]);
        const text = fullDocument.getText(range);
        this.setFormattingOptions(options);

        try {
            const output = this.$service.format(text);
            return Promise.resolve(toTextEdits(output, range));
        } catch (e) {
            console.log(e);
            return Promise.resolve([]);
        }
    }
}
