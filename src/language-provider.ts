import {Ace} from "ace-code";
import {toCompletions, TooltipType, toRange} from "./type-converters";
import {Range as AceRange} from "ace-code/src/range";
import {TextEdit} from "vscode-languageserver-types";
import {MessageController} from "./message-controller";
import {MessageType} from "./message-types";
import * as oop from "ace-code/src/lib/oop";
import {EventEmitter} from "ace-code/src/lib/event_emitter";
import {ServiceOptions, Tooltip} from "./services/language-service";

var showdown = require('showdown');

export class LanguageProvider {
    private $editor: Ace.Editor;
    markdownConverter: MarkDownConverter;
    message: MessageController;
    options: ServiceOptions;
    deltaQueue: Ace.Delta[] = [];

    constructor(editor: Ace.Editor, options: ServiceOptions, markdownConverter?: MarkDownConverter) {
        this.$editor = editor;
        this.options = options;
        this.$adaptOptions();
        if (markdownConverter) {
            this.markdownConverter = markdownConverter;
        } else {
            this.markdownConverter = new showdown.Converter();
        }
        this.$init();
        this.validate();
        this.$editor.session.doc.on("change", this.$changeListener.bind(this), true);
    }

    private $changeListener(delta) {
        if (delta.action == "insert")
            this.deltaQueue.push(delta.start, delta.lines);
        else this.deltaQueue.push(delta.start, delta.end);
        this.$sendDeltaQueue();
    }

    private $sendDeltaQueue() {
        var deltas = this.deltaQueue;
        if (!deltas) return;
        this.deltaQueue = [];
        let changed = () => {
            this.validate();
            this["off"]("changed", changed);
        };
        this["on"]("changed", changed);
        this.message.change(this.$editor.session["id"], deltas, this.$editor.session.getValue(), this.$editor.session.doc.getLength());
    };

    private $adaptOptions() {
        let editorOptions = this.$editor.getOptions();
        this.options.mode ??= editorOptions.mode;
        if (!this.options.format) {
            this.options.format = {tabSize: null, insertSpaces: null};
        }
        this.options.format.tabSize ??= editorOptions.tabSize;
        this.options.format.insertSpaces ??= editorOptions.useSoftTabs;
    }

    private $init() {
        this.message = MessageController.instance;
        this.message["on"]("message-" + this.$editor.session["id"], (e) => {
            let message = e.data;
            switch (message.type as MessageType) {
                case MessageType.format:
                    var edits: TextEdit[] = message.edits;
                    this.$applyFormat(edits);
                    break;
                case MessageType.complete:
                    this["_signal"]("completions", toCompletions(message.completions, this.markdownConverter));
                    break;
                case MessageType.hover:
                    var hover: Tooltip = message.hover;
                    this["_signal"]("hover", hover);
                    break;
                case MessageType.validate:
                    var annotations: Ace.Annotation[] = message.annotations;
                    this["_signal"]("validate", annotations);
                    break;
                case MessageType.change:
                    this["_signal"]("changed", null);
                    break;
                case MessageType.init:
                    break;
            }
        });
        this.message.init(this.$editor.session["id"], this.$editor.getValue(), this.options);
    }

    validate() {
        this.message.doValidation(this.$editor.session["id"]);
        var $setAnnotations = (annotations: Ace.Annotation[]) => {
            this["off"]("validate", $setAnnotations);
            this.$editor.session.clearAnnotations();
            if (annotations && annotations.length > 0) {
                this.$editor.session.setAnnotations(annotations);
            }
        }
        this["on"]("validate", $setAnnotations);
    }

    doHover(position: Ace.Point) {
        this.message.doHover(this.$editor.session["id"], position);
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
                this.message.format(this.$editor.session["id"], range);
            }
        } else {
            this.message.format(this.$editor.session["id"], new AceRange(0, 0, row, column));
        }
    }

    private $applyFormat(edits: TextEdit[]) {
        for (var edit of edits.reverse()) {
            this.$editor.session.doc.replace(toRange(edit.range), edit.newText);
        }
    }

    doComplete() {
        let cursor = this.$editor.getCursorPosition();
        this.message.doComplete(this.$editor.session["id"], cursor);
    }

    registerCompleters() {
        this.$editor.completers = [
            {
                getCompletions: async (editor, session, pos, prefix, callback) => {
                    this.doComplete();
                    var $setCompletions = (completions) => {
                        this["off"]("completions", $setCompletions);
                        callback(null, completions);
                    }
                    this["on"]("completions", $setCompletions)
                }
            }
        ];
    }
}

oop.implement(LanguageProvider.prototype, EventEmitter);