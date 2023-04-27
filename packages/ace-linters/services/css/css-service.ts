import {LanguageService as VSLanguageService} from "vscode-css-languageservice";
import {CSSFormatConfiguration} from "vscode-css-languageservice/lib/umd/cssLanguageTypes";
import {BaseService} from "../base-service";
import * as lsp from "vscode-languageserver-protocol";

import * as cssService from 'vscode-css-languageservice';
import {mergeObjects} from "../../utils";
import {LanguageService} from "../../types";
import {filterDiagnostics} from "../../type-converters/lsp-converters";

export class CssService extends BaseService implements LanguageService {
    $service: VSLanguageService;
    $languageId: string;
    $defaultFormatOptions: CSSFormatConfiguration = {
        newlineBetweenRules: true,
        newlineBetweenSelectors: true,
        preserveNewLines: true,
        spaceAroundSelectorSeparator: false,
        braceStyle: "collapse"
    }
    
    constructor(mode: string) {
        super(mode);
        this.$initLanguageService();
        this.$service.configure();
    }

    private $initLanguageService() {
        switch (this.mode) {
            case "less":
                this.$languageId = "less";
                this.$service = cssService.getLESSLanguageService();
                break;
            case "scss":
                this.$languageId = "scss";
                this.$service = cssService.getSCSSLanguageService();
                break;
            case "css":
            default:
                this.$languageId = "css";
                this.$service = cssService.getCSSLanguageService();
                break;
        }
    }

    getFormattingOptions(options: CSSFormatConfiguration): CSSFormatConfiguration {
        this.$defaultFormatOptions.tabSize = options.tabSize;
        this.$defaultFormatOptions.insertSpaces = options.insertSpaces;
        return mergeObjects(this.globalOptions?.formatOptions, this.$defaultFormatOptions);
    }

    format(document: lsp.TextDocumentIdentifier, range: lsp.Range, options: CSSFormatConfiguration): lsp.TextEdit[] {
        let fullDocument = this.getDocument(document.uri);
        if (!fullDocument)
            return [];

        return this.$service.format(fullDocument, range, this.getFormattingOptions(options));
    }

    async doHover(document: lsp.TextDocumentIdentifier, position: lsp.Position): Promise<lsp.Hover | null> {
        let fullDocument = this.getDocument(document.uri);
        if (!fullDocument)
            return null;

        let cssDocument = this.$service.parseStylesheet(fullDocument);
        return this.$service.doHover(fullDocument, position, cssDocument);
    }

    async doValidation(document: lsp.TextDocumentIdentifier): Promise<lsp.Diagnostic[]> {
        let fullDocument = this.getDocument(document.uri);
        if (!fullDocument)
            return [];

        let cssDocument = this.$service.parseStylesheet(fullDocument);
        return filterDiagnostics(this.$service.doValidation(fullDocument, cssDocument), this.optionsToFilterDiagnostics);
    }

    async doComplete(document: lsp.TextDocumentIdentifier, position: lsp.Position): Promise<lsp.CompletionItem[] | lsp.CompletionList | null> {
        let fullDocument = this.getDocument(document.uri);
        if (!fullDocument)
            return null;

        let cssDocument = this.$service.parseStylesheet(fullDocument);
        return this.$service.doComplete(fullDocument, position, cssDocument);
    }

    async doResolve(item: lsp.CompletionItem): Promise<lsp.CompletionItem> {
        return item;
    }

    async findDocumentHighlights(document: lsp.TextDocumentIdentifier, position: lsp.Position): Promise<lsp.DocumentHighlight[]> {
        let fullDocument = this.getDocument(document.uri);
        if (!fullDocument)
            return [];
        const cssDocument = this.$service.parseStylesheet(fullDocument);
        const highlights = this.$service.findDocumentHighlights(fullDocument, position, cssDocument);
        return Promise.resolve(highlights);
    }
}
