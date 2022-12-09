import {ServiceOptions} from "./language-service";
import {LanguageService as VSLanguageService} from "vscode-html-languageservice";
import {Ace} from "ace-code";
import {fromPoint, fromRange, toTooltip} from "../type-converters";
import {HTMLFormatConfiguration} from "vscode-html-languageservice/lib/umd/htmlLanguageTypes";
import {BaseService} from "./base-service";

var htmlService = require('vscode-html-languageservice');

export class HtmlService extends BaseService {
    $service: VSLanguageService;

    constructor(doc: Ace.Document, options: ServiceOptions) {
        super(doc, options);
        this.$service = htmlService.getLanguageService();
    }

    $getDocument() {
        var doc = this.doc.getValue(); //TODO: update
        return htmlService.TextDocument.create("file://test.html", "html", 1, doc);
    }

    format(range: Ace.Range, format: HTMLFormatConfiguration) {
        let document = this.$getDocument();
        if (!document || !range) {
            return [];
        }

        let textEdits = this.$service.format(document, fromRange(range), format);
        return textEdits;
    }

    async doHover(position: Ace.Point) {
        let document = this.$getDocument();
        if (!document) {
            return null;
        }
        let htmlDocument = this.$service.parseHTMLDocument(document);
        let hover = this.$service.doHover(document, fromPoint(position), htmlDocument);
        return Promise.resolve(toTooltip(hover));
    }

    //TODO: separate validator for HTML
    async doValidation() {
        return [];
    }

    async doComplete(position: Ace.Point) {
        let document = this.$getDocument();
        if (!document) {
            return null;
        }
        let htmlDocument = this.$service.parseHTMLDocument(document);

        let completions = this.$service.doComplete(document, fromPoint(position), htmlDocument);
        return completions;
    }
}