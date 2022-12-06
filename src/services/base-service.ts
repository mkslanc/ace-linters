import {LanguageService, ServiceOptions} from "./language-service";
import {Ace} from "ace-code";
import {TextEdit} from "vscode-languageserver-types";
import {CompletionList} from "vscode-json-languageservice/lib/umd/jsonLanguageTypes";

export class BaseService implements LanguageService {
    $service;
    doc: Ace.Document;
    $formatConfig;

    constructor(doc: Ace.Document, options: ServiceOptions) {
        this.doc = doc;
    }

    $getDocument() {
        return null;
    }

    setValue(value: string) {
        this.doc.setValue(value);
    }

    applyDeltas(deltas: Ace.Delta[]) {
        var data = deltas;
        if (data[0].start) {
            this.doc.applyDeltas(data);
        } else {
            for (var i = 0; i < data.length; i += 2) {
                var d, err;
                if (Array.isArray(data[i + 1])) {
                    d = {action: "insert", start: data[i], lines: data[i + 1]};
                } else {
                    d = {action: "remove", start: data[i], end: data[i + 1]};
                }

                if ((d.action == "insert" ? d.start : d.end).row >= this.doc["$lines"].length) {
                    err = new Error("Invalid delta");
                    err.data = {
                        linesLength: this.doc["$lines"].length,
                        start: d.start,
                        end: d.end
                    };
                    throw err;
                }

                this.doc.applyDelta(d, true);
            }
        }
    }

    format(range: Ace.Range): TextEdit[] {
        return [];
    }

    async doHover(position: Ace.Point) {
        return null;
    }

    async doValidation(): Promise<Ace.Annotation[]> {
        return [];
    }

    async doComplete(position: Ace.Point): Promise<CompletionList> {
        return;
    }
}