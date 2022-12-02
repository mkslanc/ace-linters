import {Ace} from "ace-code";
import {toCompletions, TooltipType, toRange} from "./type-converters";
import {Range as AceRange} from "ace-code/src/range";
import {TextEdit} from "vscode-languageserver-types";
import {MessageAdapter} from "./message-adapter";
import {MessageType} from "./message-types";
import * as oop from "ace-code/src/lib/oop";
import {EventEmitter} from "ace-code/src/lib/event_emitter";
import {Tooltip} from "./services/language-service";

var showdown = require('showdown');

export class LanguageProvider {
    private $editor: Ace.Editor;
    worker: Worker;
    markdownConverter: MarkDownConverter;
    message: MessageAdapter;

    constructor(editor: Ace.Editor, markdownConverter?: MarkDownConverter) {
        this.$editor = editor;
        if (markdownConverter) {
            this.markdownConverter = markdownConverter;
        } else {
            this.markdownConverter = new showdown.Converter();
        }
        this.$initWorker();
        this.message = new MessageAdapter(this.worker);
        this.message.init(this.$editor.getOptions(), this.$editor.getValue());
        //TODO:
        this.$editor.on("change", () => {
            this.worker.postMessage({type: 3, value: this.$editor.getValue()})
            this.validate();
            var $setAnnotations = (annotations: Ace.Annotation[]) => {
                this.off("validate", $setAnnotations);
                this.$editor.session.clearAnnotations();
                if (annotations && annotations.length > 0) {
                    this.$editor.session.setAnnotations(annotations);
                }
            }
            this.on("validate", $setAnnotations);
        });
    }

    private $initWorker() {
        // @ts-ignore
        this.worker = new Worker(new URL('./webworker.ts', import.meta.url));
        this.worker.onmessage = (e) => {
            let message = e.data;

            switch (message.type as MessageType) {
                case MessageType.format:
                    var edits: TextEdit[] = message.edits;
                    this.$applyFormat(edits);
                    break;
                case MessageType.complete:
                    //@ts-ignore
                    this._signal("completions", toCompletions(message.completions, this.markdownConverter));
                    break;
                case MessageType.hover:
                    var hover: Tooltip = message.hover;
                    this._signal("hover", hover);
                    break;
                case MessageType.validate:
                    var annotations: Ace.Annotation[] = message.annotations;
                    this._signal("validate", annotations);
                    break;
                case MessageType.init:
                    break;
            }
        };
    }


    validate() {
        this.message.doValidation();
    }

    doHover(position: Ace.Point) {
        this.message.doHover(position);
    }

    getTooltipText(hover: Tooltip) {
        if (!hover)
            return;
        let text = hover.content.type === TooltipType.markdown ? this.markdownConverter.makeHtml(hover.content.text) : hover.content.text;
        return {text: text, range: hover.range}
    }

    format() {
        var row = this.$editor.session.getLength();
        var column = this.$editor.session.getLine(row).length - 1;
        var selectionRanges = this.$editor.getSelection().getAllRanges();
        if (selectionRanges.length > 0 && !selectionRanges[0].isEmpty()) {
            for (var range of selectionRanges) {
                this.message.format(range);
            }
        } else {
            this.message.format(new AceRange(0, 0, row, column));
        }
    }

    private $applyFormat(edits: TextEdit[]) {
        for (var edit of edits.reverse()) {
            this.$editor.session.doc.replace(toRange(edit.range), edit.newText);
        }
    }

    doComplete() {
        let cursor = this.$editor.getCursorPosition();
        this.message.doComplete(cursor);
    }

    registerCompleters() {
        this.$editor.completers = [
            {
                getCompletions: async (editor, session, pos, prefix, callback) => {
                    this.doComplete();
                    var $setCompletions = (completions) => {
                        //@ts-ignore
                        this.off("completions", $setCompletions);
                        callback(null, completions);
                    }
                    //@ts-ignore
                    this.on("completions", $setCompletions)
                }
            }
        ];
    }
}

oop.implement(LanguageProvider.prototype, EventEmitter);