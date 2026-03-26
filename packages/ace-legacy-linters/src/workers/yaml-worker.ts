import {Mirror} from "../mirror";
import {Ace} from "ace-code";
import {YAMLValidation} from "yaml-language-server/out/server/src/languageservice/services/yamlValidation";
import {MinTextDocument} from "../vscode-text-document-min";
import {toAnnotations} from "../utils";
import {JSONSchemaService} from "vscode-json-languageservice/lib/esm/services/jsonSchemaService";

export class YamlWorker extends Mirror {
    service: YAMLValidation;
    isJson5?: boolean;
    currentVersion = 0;

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

        var schemaService = new JSONSchemaService(params);
        this.service = new YAMLValidation(schemaService);
    }

    async onUpdate() {
        var value = this.doc.getValue();
        var errors: Ace.Annotation[] = [];
        this.currentVersion++;

        var fullDocument = new MinTextDocument("file:///foo.yaml", "yaml", this.currentVersion, value);

        try {
            errors = toAnnotations(await this.service.doValidation(fullDocument, false));
        } catch (e) {
            console.error(e);
        }
        this.sender.emit("annotate", errors);
    }
}
