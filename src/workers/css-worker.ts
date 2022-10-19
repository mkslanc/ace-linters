import {LanguageWorker} from "./language-worker";
import {LanguageService} from "vscode-css-languageservice";
import {Diagnostic} from "vscode-languageserver-types";
import {Ace} from "ace-code";
import {fromPoint, fromRange} from "../type-converters";

var cssService = require('vscode-css-languageservice');

export class CSSWorker implements LanguageWorker {
    $service: LanguageService;
    session;
    $languageId;

    constructor(session) {
        this.$languageId = "css";
        //TODO: different services depending on language id
        this.$service = cssService.getCSSLanguageService();
        this.session = session;
    }

    $getDocument() {
        if (this.session) {
            var doc = this.session.getDocument().getValue();
            return cssService.TextDocument.create("file://test.css", this.$languageId, 1, doc);
        }
    }

    format(range: Ace.Range) {
        let document = this.$getDocument();
        if (!document) {
            return [];
        }
        let textEdits = this.$service.format(document, fromRange(range), {});
        return textEdits;
    }

    doHover(position: Ace.Point) {
        let document = this.$getDocument();
        if (!document) {
            return null;
        }
        let cssDocument = this.$service.parseStylesheet(document);
        let hover = this.$service.doHover(document, fromPoint(position), cssDocument);
        return hover;
    }

    doValidation(): Diagnostic[] {
        let document = this.$getDocument();
        if (!document) {
            return [];
        }
        let cssDocument = this.$service.parseStylesheet(document);

        let diagnostics = this.$service.doValidation(document, cssDocument);
        console.log(diagnostics);
        return diagnostics;
    }
}