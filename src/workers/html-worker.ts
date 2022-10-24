import {LanguageWorker} from "./language-worker";
import {LanguageService, Position, Range} from "vscode-html-languageservice";
import {Ace} from "ace-code";
import {fromPoint, fromRange} from "../type-converters";
import {HTMLFormatConfiguration} from "vscode-html-languageservice/lib/umd/htmlLanguageTypes";

var htmlService = require('vscode-html-languageservice');

export class HtmlWorker implements LanguageWorker {
    $service: LanguageService;
    session: Ace.EditSession;
    $formatConfig: HTMLFormatConfiguration;

    constructor(session: Ace.EditSession, configuration?: HTMLFormatConfiguration) {
        this.$service = htmlService.getLanguageService();
        this.session = session;
        this.$setFormatConfiguration(configuration);
    }

    $setFormatConfiguration(configuration?: HTMLFormatConfiguration) {
        if (!configuration) {
            this.$formatConfig = {};
        }
        var options = this.session.getOptions();
        this.$formatConfig.tabSize = configuration?.tabSize ?? options.tabSize;
        this.$formatConfig.insertSpaces = configuration?.insertSpaces ?? options.useSoftTabs;
    }

    $getDocument() {
        if (this.session) {
            var doc = this.session.getDocument().getValue();
            return htmlService.TextDocument.create("file://test.html", "html", 1, doc);
        }
        return null;
    }

    format(range: Ace.Range) {
        let document = this.$getDocument();
        if (!document || !range) {
            return [];
        }

        let textEdits = this.$service.format(document, fromRange(range), this.$formatConfig);
        return textEdits;
    }

    doHover(position: Ace.Point) {
        let document = this.$getDocument();
        if (!document) {
            return null;
        }
        let htmlDocument = this.$service.parseHTMLDocument(document);
        let hover = this.$service.doHover(document, fromPoint(position), htmlDocument);
        return Promise.resolve(hover);
    }

    //TODO: separate validator for HTML
    async doValidation() {
        return [];
    }
}