import {LanguageService as VSLanguageService} from "vscode-html-languageservice";
import {HTMLFormatConfiguration} from "vscode-html-languageservice/lib/umd/htmlLanguageTypes";
import {BaseService} from "../base-service";
import {AceLinters} from "../../types";
import * as lsp from "vscode-languageserver-protocol";

import * as htmlService from 'vscode-html-languageservice';

export class HtmlService extends BaseService implements AceLinters.LanguageService {
    $service: VSLanguageService;

    constructor(mode: string) {
        super(mode);
        this.$service = htmlService.getLanguageService();
    }

    format(document: lsp.TextDocumentIdentifier, range: lsp.Range, options: HTMLFormatConfiguration): lsp.TextEdit[] {
        let fullDocument = this.getDocument(document.uri);
        if (!fullDocument)
            return [];

        return this.$service.format(fullDocument, range, options);
    }

    async doHover(document: lsp.TextDocumentIdentifier, position: lsp.Position): Promise<lsp.Hover | null> {
        let fullDocument = this.getDocument(document.uri);
        if (!fullDocument)
            return null;

        let htmlDocument = this.$service.parseHTMLDocument(fullDocument);
        return this.$service.doHover(fullDocument, position, htmlDocument);
    }

    //TODO: separate validator for HTML
    async doValidation(document: lsp.TextDocumentIdentifier): Promise<lsp.Diagnostic[]> {
        return [];
    }

    async doComplete(document: lsp.TextDocumentIdentifier, position: lsp.Position): Promise<lsp.CompletionItem[] | lsp.CompletionList | null> {
        let fullDocument = this.getDocument(document.uri);
        if (!fullDocument)
            return null;

        let htmlDocument = this.$service.parseHTMLDocument(fullDocument);
        return this.$service.doComplete(fullDocument, position, htmlDocument);
    }

    async doResolve(item: lsp.CompletionItem): Promise<lsp.CompletionItem> {
        return item;
    }
}
