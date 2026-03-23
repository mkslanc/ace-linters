import {Mirror} from "../mirror";
import {Ace} from "ace-code";
import {JsonDiagnosticsService, getJsonDiagnosticsService} from "./json-diagnostics-service";
import {MinTextDocument} from "../vscode-text-document-min";
import {toAnnotations} from "../utils";

export class JsonWorker extends Mirror {
    service: JsonDiagnosticsService;
    isJson5?: boolean;

    constructor(sender) {
        super(sender);

        this.setTimeout(500);

        var params = {
            schemaRequestService: (uri) => {
                return;
            },
            workspaceContext: {
                resolveRelativePath: (relativePath: string, resource: string) => {
                    return;
                }
            },
        }

        this.service = getJsonDiagnosticsService(params);
        this.$configureService();
    }

    $configureService() {
        this.service.configure({
            allowComments: this.isJson5,
            validate: true
        });
    }

    setOptions(opts) {
        this.isJson5 = opts && opts.isJson5;
        this.$configureService();
    }

    async onUpdate() {
        var value = this.doc.getValue();
        var errors: Ace.Annotation[] = [];

        var fullDocument = new MinTextDocument("file:///foo.json", "json", 1, value);

        try {
            let jsonDocument = this.service.parseJSONDocument(fullDocument);
            errors = toAnnotations(await this.service.doValidation(fullDocument, jsonDocument, {trailingCommas: this.isJson5 ? "ignore" : "error"}));
        } catch (e) {
            console.error(e);
        }
        this.sender.emit("annotate", errors);
    }
}