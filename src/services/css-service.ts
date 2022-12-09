import {ServiceOptions} from "./language-service";
import {LanguageService as VSLanguageService} from "vscode-css-languageservice";
import {Ace} from "ace-code";
import {fromPoint, fromRange, toAnnotations, toTooltip} from "../type-converters";
import {CSSFormatConfiguration} from "vscode-css-languageservice/lib/umd/cssLanguageTypes";
import {BaseService} from "./base-service";

var cssService = require('vscode-css-languageservice');

export class CssService extends BaseService {
    $service: VSLanguageService;
    $languageId: string;

    constructor(doc: Ace.Document, options: ServiceOptions) {
        super(doc, options);
        this.changeLanguageService(options.mode);
    }

    changeLanguageService(modeName?: string) {
        switch (modeName) {
            case "ace/mode/less":
                this.$languageId = "less";
                this.$service = cssService.getLESSLanguageService();
                break;
            case "ace/mode/scss":
                this.$languageId = "scss";
                this.$service = cssService.getSCSSLanguageService();
                break;
            case "ace/mode/css":
            default:
                this.$languageId = "css";
                this.$service = cssService.getCSSLanguageService();
                break;
        }
    }

    $getDocument() {
        var doc = this.doc.getValue(); //TODO: update
        return cssService.TextDocument.create("file://test.html", this.$languageId, 1, doc);
    }

    format(range: Ace.Range, format: CSSFormatConfiguration) {
        let document = this.$getDocument();
        if (!document) {
            return [];
        }
        let textEdits = this.$service.format(document, fromRange(range), format);
        return textEdits;
    }

    doHover(position: Ace.Point) {
        let document = this.$getDocument();
        if (!document) {
            return null;
        }
        let cssDocument = this.$service.parseStylesheet(document);
        let hover = this.$service.doHover(document, fromPoint(position), cssDocument);
        return Promise.resolve(toTooltip(hover));
    }

    async doValidation(): Promise<Ace.Annotation[]> {
        let document = this.$getDocument();
        if (!document) {
            return [];
        }
        let cssDocument = this.$service.parseStylesheet(document);

        let diagnostics = this.$service.doValidation(document, cssDocument);
        return toAnnotations(diagnostics);
    }

    async doComplete(position: Ace.Point) {
        let document = this.$getDocument();
        if (!document) {
            return null;
        }
        let cssDocument = this.$service.parseStylesheet(document);

        let completions = this.$service.doComplete(document, fromPoint(position), cssDocument);
        return completions;
    }
}