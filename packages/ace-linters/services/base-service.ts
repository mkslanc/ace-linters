import {FormattingOptions} from "vscode-languageserver-types";
import {AceLinters} from "../index";
import {Ace} from "ace-code";

export abstract class BaseService<OptionsType extends AceLinters.ServiceOptions = AceLinters.ServiceOptions> implements AceLinters.LanguageService {
    abstract $service;
    mode: string;
    documents: {[sessionID: string]: Ace.Document} = {};
    options: {[sessionID: string]: OptionsType} = {};

    protected constructor(mode: string) {
        this.mode = mode;
    }

    $getDocument(sessionID: string) {
        return null;
    }

    addDocument(sessionID: string, document: Ace.Document, options?: OptionsType) {
        this.documents[sessionID] = document;
        if (options)
            this.setOptions(sessionID, options);
    }

    getDocument(sessionID: string): Ace.Document {
        return this.documents[sessionID];
    }

    removeDocument(sessionID: string) {
        delete this.documents[sessionID];
        if (this.options[sessionID]) {
            delete this.options[sessionID];
        }
    }

    getDocumentValue(sessionID: string): string {
        return this.getDocument(sessionID).getValue();
    }

    private $setVersion(doc: Ace.Document) { //TODO: this is workaround for ts service
        if (!doc["version"]) {
            doc["version"] = 1;
        } else {
            doc["version"]++;
        }
    }

    setValue(sessionID: string, value: string) {
        let document = this.getDocument(sessionID);
        this.$setVersion(document);
        document.setValue(value);
    }

    setOptions(sessionID: string, options: OptionsType) {
        this.options[sessionID] = options;
    }

    applyDeltas(sessionID: string, deltas: Ace.Delta[]) {
        let data = deltas;
        let document = this.getDocument(sessionID);
        this.$setVersion(document);
        if (data[0].start) {
            document.applyDeltas(data);
        } else {
            for (let i = 0; i < data.length; i += 2) {
                let d, err;
                if (Array.isArray(data[i + 1])) {
                    d = {action: "insert", start: data[i], lines: data[i + 1]};
                } else {
                    d = {action: "remove", start: data[i], end: data[i + 1]};
                }

                let linesLength = document["$lines"].length;
                if ((d.action == "insert" ? d.start : d.end).row >= linesLength) {
                    err = new Error("Invalid delta");
                    err.data = {
                        linesLength: linesLength,
                        start: d.start,
                        end: d.end
                    };
                    throw err;
                }

                document.applyDelta(d, true);
            }
        }
    }

    format(sessionID: string, range: Ace.Range, format: FormattingOptions): AceLinters.TextEdit[] {
        return [];
    }

    async doHover(sessionID: string, position: Ace.Point) {
        return null;
    }

    async doValidation(sessionID: string): Promise<Ace.Annotation[]> {
        return [];
    }

    async doComplete(sessionID: string, position: Ace.Point): Promise<Ace.Completion[]> {
        return;
    }
}