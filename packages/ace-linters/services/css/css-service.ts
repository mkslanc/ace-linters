import {LanguageService as VSLanguageService} from "vscode-css-languageservice";
import {Ace} from "ace-code";
import {
    fromPoint,
    fromRange,
    toAceTextEdits,
    toAnnotations,
    toCompletions,
    toResolvedCompletion,
    toTooltip
} from "../../type-converters/vscode-converters";
import {CSSFormatConfiguration} from "vscode-css-languageservice/lib/umd/cssLanguageTypes";
import {BaseService} from "../base-service";

let cssService = require('vscode-css-languageservice');

export class CssService extends BaseService {
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

    $getDocument(sessionID: string) {
        let documentValue = this.getDocumentValue(sessionID);
        return cssService.TextDocument.create("file://test.html", this.$languageId, 1, documentValue);
    }

    format(sessionID: string, range: Ace.Range, format: CSSFormatConfiguration) {
        let document = this.$getDocument(sessionID);
        if (!document) {
            return [];
        }
        let textEdits = this.$service.format(document, fromRange(range), format);
        return toAceTextEdits(textEdits);
    }

    doHover(sessionID: string, position: Ace.Point) {
        let document = this.$getDocument(sessionID);
        if (!document) {
            return null;
        }
        let cssDocument = this.$service.parseStylesheet(document);
        let hover = this.$service.doHover(document, fromPoint(position), cssDocument);
        return Promise.resolve(toTooltip(hover));
    }

    async doValidation(sessionID: string): Promise<Ace.Annotation[]> {
        let document = this.$getDocument(sessionID);
        if (!document) {
            return [];
        }
        let cssDocument = this.$service.parseStylesheet(document);

        let diagnostics = this.$service.doValidation(document, cssDocument);
        return toAnnotations(diagnostics);
    }

    async doComplete(sessionID: string, position: Ace.Point) {
        let document = this.$getDocument(sessionID);
        if (!document) {
            return null;
        }
        let cssDocument = this.$service.parseStylesheet(document);

        let completions = this.$service.doComplete(document, fromPoint(position), cssDocument);
        return toCompletions(completions);
    }

    async resolveCompletion(sessionID: string, completion: Ace.Completion): Promise<Ace.Completion> {
        return toResolvedCompletion(completion, completion["item"]);
    }
}