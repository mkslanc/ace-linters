import {LanguageService as VSLanguageService} from "vscode-html-languageservice";
import {Ace} from "ace-code";
import {
    fromPoint,
    fromRange,
    toAceTextEdits,
    toCompletions,
    toResolvedCompletion,
    toTooltip
} from "../../type-converters/lsp-converters";
import {HTMLFormatConfiguration} from "vscode-html-languageservice/lib/umd/htmlLanguageTypes";
import {BaseService} from "../base-service";

let htmlService = require('vscode-html-languageservice');

export class HtmlService extends BaseService {
    $service: VSLanguageService;

    constructor(mode: string) {
        super(mode);
        this.$service = htmlService.getLanguageService();
    }

    $getDocument(sessionID: string) {
        let documentValue = this.getDocumentValue(sessionID);
        return htmlService.TextDocument.create("file://test.html", "html", 1, documentValue);
    }

    format(sessionID: string, range: Ace.Range, format: HTMLFormatConfiguration) {
        let document = this.$getDocument(sessionID);
        if (!document || !range) {
            return [];
        }

        let textEdits = this.$service.format(document, fromRange(range), format);
        return toAceTextEdits(textEdits);
    }

    async doHover(sessionID: string, position: Ace.Point) {
        let document = this.$getDocument(sessionID);
        if (!document) {
            return null;
        }
        let htmlDocument = this.$service.parseHTMLDocument(document);
        let hover = this.$service.doHover(document, fromPoint(position), htmlDocument);
        return Promise.resolve(toTooltip(hover));
    }

    //TODO: separate validator for HTML
    async doValidation(sessionID: string) {
        return [];
    }

    async doComplete(sessionID: string, position: Ace.Point) {
        let document = this.$getDocument(sessionID);
        if (!document) {
            return null;
        }
        let htmlDocument = this.$service.parseHTMLDocument(document);

        let completions = this.$service.doComplete(document, fromPoint(position), htmlDocument);
        return toCompletions(completions);
    }

    async resolveCompletion(sessionID: string, completion: Ace.Completion): Promise<Ace.Completion> {
        return toResolvedCompletion(completion, completion["item"]);
    }
}
