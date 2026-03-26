import {Mirror} from "../mirror";
import {Ace} from "ace-code";
import {parseAllDocuments, YAMLError} from "yaml";

export class YamlWorker extends Mirror {

    constructor(sender) {
        super(sender);

        this.setTimeout(500);
    }

    async onUpdate() {
        var value = this.doc.getValue();
        var errors: Ace.Annotation[] = [];

        try {
            var diagnostics: YAMLError[] = []
            var yamlAllDocuments = parseAllDocuments(value, {
                prettyErrors: false
            });
            yamlAllDocuments.forEach(doc => {
                diagnostics.push(...doc.errors, ...doc.warnings);
            })
            errors = diagnostics.map((diagnostic) => {
                var start = diagnostic.linePos?.[0];
                var row, column;
                if (start) {
                    row = start && start.line > 0 ? start.line : 0;
                    column = start && start.col > 0 ? start.line : 0;
                } else {
                    var pos = this.doc.indexToPosition(diagnostic.pos[0]);
                    row = pos.row;
                    column = pos.column;
                }

                return {
                    row,
                    column,
                    text: diagnostic.message,
                    type: diagnostic.name === "YAMLWarning" ? "warning" : "error"
                };
            });
        } catch (e) {
            console.error(e);
        }
        this.sender.emit("annotate", errors);
    }
}
