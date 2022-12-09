import {Ace} from "ace-code";
import {cleanHtml, toCompletions, TooltipType, toRange} from "./type-converters";
import {Range as AceRange} from "ace-code/src/range";
import {FormattingOptions, TextEdit} from "vscode-languageserver-types";
import {MessageController} from "./message-controller";
import {ServiceOptions, Tooltip} from "./services/language-service";
import {DescriptionTooltip} from "./components/description-tooltip";

let showdown = require('showdown');

export class LanguageProvider {
    editor: Ace.Editor;
    private $descriptionTooltip;
    private $markdownConverter: MarkDownConverter;
    private $message: MessageController;
    options: ServiceOptions;
    deltaQueue: Ace.Delta[] = [];

    constructor(editor: Ace.Editor, options: ServiceOptions, markdownConverter?: MarkDownConverter) {
        this.editor = editor;
        this.options = options;
        this.$adaptOptions();
        this.$markdownConverter = markdownConverter ?? new showdown.Converter();
        this.$init();
    }

    private $changeListener(delta) {
        if (delta.action == "insert")
            this.deltaQueue.push(delta.start, delta.lines);
        else this.deltaQueue.push(delta.start, delta.end);
        this.$sendDeltaQueue();
    }

    private $sendDeltaQueue() {
        if (!this.deltaQueue) return;
        this.deltaQueue = [];
        this.$message.change(this.editor.session["id"], this.deltaQueue, this.editor.session.getValue(), this.editor.session.doc.getLength(), this.validate);
    };

    private $adaptOptions() {
        let editorOptions = this.editor.getOptions();
        this.options.mode = editorOptions.mode;
    }

    private get $format(): FormattingOptions {
        let editorOptions = this.editor.getOptions();
        return {
            tabSize: editorOptions.tabSize,
            insertSpaces: editorOptions.useSoftTabs
        }
    }

    private $init() {
        this.$message = MessageController.instance;
        this.$message.init(this.editor.session["id"], this.editor.getValue(), this.options, () => {
            this.$descriptionTooltip = new DescriptionTooltip(this);

            this.editor.session.doc.on("change", this.$changeListener.bind(this), true);

            this.validate();
            this.registerCompleters();

            // @ts-ignore
            this.editor.on("changeMode", () => {
                this.$adaptOptions();
                this.$message.changeMode(this.editor.session["id"], this.options, () => {
                    this.validate();
                    this.registerCompleters();
                });
            });
        });
    }

    validate = () => {
        this.$message.doValidation(this.editor.session["id"], (annotations: Ace.Annotation[]) => {
            this.editor.session.clearAnnotations();
            if (annotations && annotations.length > 0) {
                this.editor.session.setAnnotations(annotations);
            }
        });
    }

    doHover(position: Ace.Point, callback?: (hover: Tooltip) => void) {
        this.$message.doHover(this.editor.session["id"], position, callback);
    }

    getTooltipText(hover: Tooltip) {
        if (!hover)
            return;
        let text = hover.content.type === TooltipType.markdown ? cleanHtml(this.$markdownConverter.makeHtml(hover.content.text)) : hover.content.text;
        return {text: text, range: hover.range}
    }

    format = () => {
        let selectionRanges = this.editor.getSelection().getAllRanges();
        let $format = this.$format;
        if (!selectionRanges || selectionRanges[0].isEmpty()) {
            let row = this.editor.session.getLength();
            let column = this.editor.session.getLine(row).length - 1;
            selectionRanges = [new AceRange(0, 0, row, column)];
        }
        for (let range of selectionRanges) {
            this.$message.format(this.editor.session["id"], range, $format, this.$applyFormat);
        }
    }

    private $applyFormat = (edits: TextEdit[]) => {
        for (let edit of edits.reverse()) {
            this.editor.session.doc.replace(toRange(edit.range), edit.newText);
        }
    }

    doComplete(callback?: (CompletionList) => void) {
        let cursor = this.editor.getCursorPosition();
        this.$message.doComplete(this.editor.session["id"], cursor, callback);
    }

    registerCompleters() {
        this.editor.completers = [
            {
                getCompletions: async (editor, session, pos, prefix, callback) => {
                    this.doComplete((completions) => {
                        callback(null, toCompletions(completions, this.$markdownConverter));
                    });
                }
            }
        ];
    }
}