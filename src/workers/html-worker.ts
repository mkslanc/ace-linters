import {LanguageWorker} from "./language-worker";
import {LanguageService, Position, Range} from "vscode-html-languageservice";
import {Ace} from "ace-code";
import {fromPoint, fromRange} from "../type-converters";

var htmlService = require('vscode-html-languageservice');

export class HtmlWorker implements LanguageWorker {
    $service: LanguageService;
    session: Ace.EditSession;

    constructor(session: Ace.EditSession) {
        this.$service = htmlService.getLanguageService();
        this.session = session;
    }

    $getDocument() {
        if (this.session) {
            var doc = this.session.getDocument().getValue();
            return htmlService.TextDocument.create("file://test.html", "html", 1, doc);
        }
    }

    format(range: Ace.Range) {
        let document = this.$getDocument();
        if (!document || !range) {
            return [];
        }

        let textEdits = this.$service.format(document, fromRange(range), {});
        console.log(textEdits);
        return textEdits;
    }

    doHover(position: Ace.Point) {
        let document = this.$getDocument();
        if (!document) {
            return null;
        }
        let htmlDocument = this.$service.parseHTMLDocument(document);
        let hover = this.$service.doHover(document, fromPoint(position), htmlDocument);
        return hover;
    }

    //TODO: separate validator for HTML
    doValidation() {
        return [];
    }
}