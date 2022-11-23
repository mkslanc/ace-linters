import {LanguageWorker} from "./language-worker";
import {LanguageService} from "vscode-css-languageservice";
import {Ace} from "ace-code";
import {fromPoint, fromRange, toAnnotations, toCompletions} from "../type-converters";
import {CSSFormatConfiguration} from "vscode-css-languageservice/lib/umd/cssLanguageTypes";

var cssService = require('vscode-css-languageservice');

export class CSSWorker implements LanguageWorker {
    $service: LanguageService;
    session: Ace.EditSession;
    $languageId: string;
    $formatConfig: CSSFormatConfiguration;

    constructor(session: Ace.EditSession, configuration?: CSSFormatConfiguration) {
        this.changeLanguageService(session);
        this.$setFormatConfiguration(configuration);
    }

    changeLanguageService(session?: Ace.EditSession, modeName?: string) {
        let language = modeName ?? session?.getOption("mode").replace("ace/mode/", "") ?? "css";
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

    $setFormatConfiguration(configuration?: CSSFormatConfiguration) {
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
            return cssService.TextDocument.create("file://test.css", this.$languageId, 1, doc);
        }
        return null;
    }

    format(range: Ace.Range) {
        let document = this.$getDocument();
        if (!document) {
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
        let cssDocument = this.$service.parseStylesheet(document);
        let hover = this.$service.doHover(document, fromPoint(position), cssDocument);
        return Promise.resolve(hover);
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

    //TODO: markdown parsing for completions
    async doComplete(position: Ace.Point) {
        return null;
        let document = this.$getDocument();
        if (!document) {
            return null;
        }
        let cssDocument = this.$service.parseStylesheet(document);

        let completions = this.$service.doComplete(document, fromPoint(position), cssDocument);
        return toCompletions(completions);
    }
}