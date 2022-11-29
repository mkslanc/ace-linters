import {LanguageWorker, Tooltip} from "./workers/language-worker";
import {Ace} from "ace-code";
import {TooltipType} from "./type-converters";

var showdown  = require('showdown');

export class LanguageProvider {
    private $editor: Ace.Editor;
    worker: LanguageWorker;
    markdownConverter: MarkDownConverter;

    constructor(editor: Ace.Editor, worker: LanguageWorker, markdownConverter?: MarkDownConverter) {
        this.$editor = editor;
        this.worker = worker;
        if (markdownConverter) {
            this.markdownConverter = markdownConverter;
        } else {
            this.markdownConverter = new showdown.Converter();
        }
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

    async doHover(position: Ace.Point) {
        let hover = await this.worker.doHover(position);
        let text = hover.content.type === TooltipType.markdown ? this.markdownConverter.makeHtml(hover.content.text) : hover.content.text;
        return {text: text, range: hover.range}
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