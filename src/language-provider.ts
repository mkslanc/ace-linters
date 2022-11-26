import {LanguageWorker} from "./workers/language-worker";
import {Ace} from "ace-code";

export class LanguageProvider {
    private $editor: Ace.Editor;
    worker: LanguageWorker;

    constructor(editor, worker) {
        this.$editor = editor;
        this.worker = worker;
    }

    async validate() {
        this.$editor.session.clearAnnotations();
        let annotations = await this.worker.doValidation();
        if (annotations && annotations.length > 0) {
            this.$editor.session.setAnnotations(annotations);
        }
    }

    async doComplete() {
        let cursor = this.$editor.getCursorPosition();
        let completions = await this.worker.doComplete(cursor);
        return completions;
    }

    registerCompleters() {
        this.$editor.completers = [
            {
                getCompletions: async (editor, session, pos, prefix, callback) => {
                    var completions = await this.doComplete();
                    callback(null, completions);
                },// @ts-ignore
                getDocTooltip: function (item) {
                    if (!item.docHTML && item.doc) {
                        item.docHTML = (typeof item.doc == "string") ? item.doc : item.doc?.value;
                    }
                }
            }
        ];
    }
}