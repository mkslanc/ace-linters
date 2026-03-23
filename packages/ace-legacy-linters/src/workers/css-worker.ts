import {Mirror} from "../mirror";
import {Ace} from "ace-code";
import {MinTextDocument} from "../vscode-text-document-min";
import {toAnnotations} from "../utils";
import {
    CssDiagnosticsService,
    getCSSDiagnosticsService,
    getLESSDiagnosticsService,
    getSCSSDiagnosticsService
} from "./css-diagnostics-service";

export class CssWorker extends Mirror {
    service: CssDiagnosticsService;
    mode?: string;
    $languageId = "css";

    constructor(sender) {
        super(sender);

        this.setTimeout(500);

        this.service = getCSSDiagnosticsService();
    }

    setOptions(opts) {
        this.mode = opts && opts.mode;
        this.$configureService();
    }

    $configureService() {
        switch (this.mode) {
            case "less":
                this.$languageId = "less";
                this.service = getLESSDiagnosticsService();
                break;
            case "scss":
                this.$languageId = "scss";
                this.service = getSCSSDiagnosticsService();
                break;
            case "css":
            default:
                this.$languageId = "css";
                this.service = getCSSDiagnosticsService();
                break;
        }
    }

    async onUpdate() {
        var value = this.doc.getValue();
        var errors: Ace.Annotation[] = [];

        var fullDocument = new MinTextDocument("file:///foo." + this.$languageId, this.$languageId, 1, value);

        try {
            let cssDocument = this.service.parseStylesheet(fullDocument);
            errors = toAnnotations(this.service.doValidation(fullDocument, cssDocument));
        } catch (e) {
            console.error(e);
        }
        this.sender.emit("annotate", errors);
    }
}