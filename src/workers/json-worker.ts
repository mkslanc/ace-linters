import {LanguageWorker} from "./language-worker";
import {FormattingOptions, JSONSchema, LanguageService} from "vscode-json-languageservice";
import {Ace} from "ace-code";
import {fromPoint, fromRange, toAnnotations, toCompletions} from "../type-converters";
import {TextEdit} from "vscode-languageserver-types";

var jsonService = require('vscode-json-languageservice');

export class JsonWorker implements LanguageWorker {
    $service: LanguageService;
    session: Ace.EditSession;
    private $jsonSchema: JSONSchema;
    $formatConfig: FormattingOptions;

    constructor(session: Ace.EditSession, jsonSchema?: JSONSchema, configuration?: FormattingOptions) {
        this.$jsonSchema = jsonSchema;
        this.$service = jsonService.getLanguageService({
            schemaRequestService: (uri) => {
                if (this.$jsonSchema)
                    return Promise.resolve(JSON.stringify(this.$jsonSchema));
                return Promise.reject(`Unabled to load schema at ${uri}`);
            }
        });
        this.$service.configure({allowComments: false, schemas: [{fileMatch: ["test.json"], uri: "schema.json"}]})
        this.session = session;
        this.$setFormatConfiguration(configuration);
    }

    $setFormatConfiguration(configuration?: FormattingOptions) {
        if (!configuration) {
            this.$formatConfig = {tabSize: 4, insertSpaces: true};
        }
        var options = this.session.getOptions();
        this.$formatConfig.tabSize = configuration?.tabSize ?? options.tabSize;
        this.$formatConfig.insertSpaces = configuration?.insertSpaces ?? options.useSoftTabs;
    }

    $getDocument() {
        if (this.session) {
            var doc = this.session.getDocument().getValue();
            return jsonService.TextDocument.create("test.json", "json", 1, doc);
        }
        return null;
    }

    format(range: Ace.Range): TextEdit[] {
        let document = this.$getDocument();
        if (!document) {
            return [];
        }
        let textEdits = this.$service.format(document, fromRange(range), this.$formatConfig);
        console.log(textEdits);
        return textEdits;
    }

    async doHover(position: Ace.Point) {
        let document = this.$getDocument();
        if (!document) {
            return null;
        }
        let jsonDocument = this.$service.parseJSONDocument(document);
        return this.$service.doHover(document, fromPoint(position), jsonDocument);
    }

    async doValidation(): Promise<Ace.Annotation[]> {
        let document = this.$getDocument();
        if (!document) {
            return [];
        }
        let jsonDocument = this.$service.parseJSONDocument(document);

        let diagnostics = this.$service.doValidation(document, jsonDocument, null, this.$jsonSchema);
        return toAnnotations(await diagnostics);
    }

    async doComplete(position: Ace.Point) {
        let document = this.$getDocument();
        if (!document) {
            return null;
        }
        let jsonDocument = this.$service.parseJSONDocument(document);

        let completions = await this.$service.doComplete(document, fromPoint(position), jsonDocument);
        return toCompletions(completions);
    }
}