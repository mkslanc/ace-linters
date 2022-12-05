import {LanguageService, ServiceOptions} from "./language-service";
import {LanguageService as VSLanguageService} from "vscode-html-languageservice";
import {Ace} from "ace-code";
import {fromPoint, fromRange, toTooltip} from "../type-converters";
import {HTMLFormatConfiguration} from "vscode-html-languageservice/lib/umd/htmlLanguageTypes";

var htmlService = require('vscode-html-languageservice');

export class HtmlService implements LanguageService {
    $service: VSLanguageService;
    doc: Ace.Document;
    $formatConfig: HTMLFormatConfiguration = {};

    constructor(doc: Ace.Document, options: ServiceOptions) {
        this.$service = htmlService.getLanguageService();
        this.doc = doc;
        this.$formatConfig = options.format;
    }

    $getDocument() {
        var doc = this.doc.getValue(); //TODO: update
        return htmlService.TextDocument.create("file://test.html", "html", 1, doc);
    }

    //TODO:
    setValue(value) {
        this.doc.setValue(value);
    }

    format(range: Ace.Range) {
        let document = this.$getDocument();
        if (!document || !range) {
            return [];
        }

        let textEdits = this.$service.format(document, fromRange(range), this.$formatConfig);
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