import {LanguageService as VSLanguageService} from "vscode-css-languageservice";
import {CSSFormatConfiguration} from "vscode-css-languageservice/lib/umd/cssLanguageTypes";
import {BaseService} from "../base-service";
import {AceLinters} from "../../types";
import * as lsp from "vscode-languageserver-protocol";

import * as cssService from 'vscode-css-languageservice';

export class CssService extends BaseService implements AceLinters.LanguageService {
    $service: VSLanguageService;
    $languageId: string;

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

    format(document: lsp.TextDocumentIdentifier, range: lsp.Range, options: CSSFormatConfiguration): lsp.TextEdit[] | null {
        let fullDocument = this.getDocument(document.uri);
        if (!fullDocument) {
            return [];
        }
        let textEdits = this.$service.format(fullDocument, range, options);
        return textEdits;
    }

    async doHover(document: lsp.TextDocumentIdentifier, position: lsp.Position): Promise<lsp.Hover | null> {
        let fullDocument = this.getDocument(document.uri);
        if (!fullDocument) {
            return null;
        }
        let cssDocument = this.$service.parseStylesheet(fullDocument);
        let hover = this.$service.doHover(fullDocument, position, cssDocument);
        return Promise.resolve(hover);
    }

    async doValidation(document: lsp.TextDocumentIdentifier): Promise<lsp.Diagnostic[]> {
        let fullDocument = this.getDocument(document.uri);
        if (!fullDocument) {
            return [];
        }
        let cssDocument = this.$service.parseStylesheet(fullDocument);

        let diagnostics = this.$service.doValidation(fullDocument, cssDocument);
        return Promise.resolve(diagnostics);
    }

    async doComplete(document: lsp.TextDocumentIdentifier, position: lsp.Position): Promise<lsp.CompletionItem[] | lsp.CompletionList | null> {
        let fullDocument = this.getDocument(document.uri);
        if (!fullDocument) {
            return null;
        }
        let cssDocument = this.$service.parseStylesheet(fullDocument);

        let completions = this.$service.doComplete(fullDocument, position, cssDocument);
        return Promise.resolve(completions);
    }

    async doResolve(item: lsp.CompletionItem): Promise<lsp.CompletionItem> {
        return Promise.resolve(item);
    }
}
