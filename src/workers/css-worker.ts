import {LanguageWorker} from "./language-worker";
import {LanguageService} from "vscode-css-languageservice";
import {Ace} from "ace-code";
import {fromPoint, fromRange, toAnnotations} from "../type-converters";

var cssService = require('vscode-css-languageservice');

export class CSSWorker implements LanguageWorker {
    $service: LanguageService;
    session: Ace.EditSession;
    $languageId;

    constructor(session: Ace.EditSession) {
        this.changeLanguageService(session);
    }

    changeLanguageService(session?: Ace.EditSession, modeName?: string) {
        let language = modeName ?? session?.$modeId.replace("ace/mode/", "") ?? "css";
        switch (language) {
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
        if (session)
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

    doValidation(): Ace.Annotation[] {
        let document = this.$getDocument();
        if (!document) {
            return [];
        }
        let cssDocument = this.$service.parseStylesheet(document);

        let diagnostics = this.$service.doValidation(document, cssDocument);
        return toAnnotations(diagnostics);
    }
}