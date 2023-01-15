import {Ace, Range as AceRange} from "ace-code";
import {DescriptionTooltip} from "./components/description-tooltip";
import {AceLinters} from "./types";
import Tooltip = AceLinters.Tooltip;
import TextEdit = AceLinters.TextEdit;
import {FormattingOptions} from "vscode-languageserver-protocol";
import {MarkDownConverter} from "./types";
import {CommonConverter} from "./type-converters/common-converters";
import {IMessageController} from "./types/message-controller-interface";

let showdown = require('showdown');

export class LanguageProvider<OptionsType = AceLinters.ServiceOptions> {
    editor: Ace.Editor;
    private $descriptionTooltip;
    private readonly $markdownConverter: MarkDownConverter;
    private $messageController: IMessageController;
    private $options: OptionsType;
    private readonly $fileName;
    deltaQueue: Ace.Delta[];

    private static extensions = {
        "typescript": "ts",
        "javascript": "js"
    }

    constructor(editor: Ace.Editor, messageController: IMessageController, options: OptionsType, markdownConverter?: MarkDownConverter) {
        this.editor = editor;
        this.$messageController = messageController;
        this.$options = options;
        this.$markdownConverter = markdownConverter ?? new showdown.Converter();
        this.$fileName = this.editor.session["id"] + "." + LanguageProvider.getExtension(this.$mode);
    }

    private static getExtension(mode: string) {
        mode = mode.replace("ace/mode/", "");
        return this.extensions[mode] ?? mode;
    }

    set options(options: OptionsType) {
        this.$options = options;
        this.$changeOptions();
    }

    setOption<T extends keyof OptionsType>(optionName: T, optionValue: OptionsType[T]) {
        this.$options[optionName] = optionValue;
        this.$changeOptions();
    }

    private $changeListener(delta) {
        if (!this.deltaQueue) {
            this.deltaQueue = [];
            setTimeout(this.$sendDeltaQueue, 0);
        }
        if (delta.action == "insert")
            this.deltaQueue.push(delta.start, delta.lines);
        else this.deltaQueue.push(delta.start, delta.end);
    }

    private $sendDeltaQueue = () => {
        let deltas = this.deltaQueue;
        if (!deltas) return;
        this.deltaQueue = null;
        this.$messageController.change(this.$fileName, deltas, this.editor.session.getValue(), this.editor.session.doc.getLength(), this.validate);
    };

    private get $editorOptions() {
        return this.editor.getOptions();
    }

    private get $mode() {
        return this.$editorOptions.mode;
    }

    private get $format(): FormattingOptions {
        let editorOptions = this.$editorOptions;
        return {
            tabSize: editorOptions.tabSize,
            insertSpaces: editorOptions.useSoftTabs
        }
    }

    async start() {
        await new Promise(
            (resolve) => {
                this.$messageController.init(this.$fileName, this.editor.getValue(), this.$mode, this.$options, () => {
                    this.$descriptionTooltip = new DescriptionTooltip(this);

                    this.editor.session.doc.on("change", this.$changeListener.bind(this), true);

                    this.$onInit();

                    // @ts-ignore
                    this.editor.on("changeMode", () => {
                        this.$messageController.changeMode(this.$fileName, this.editor.getValue(), this.$mode, this.$options, this.$onInit);
                    });
                    resolve(true);
                }, (annotations: Ace.Annotation[]) => {
                    this.editor.session.clearAnnotations();
                    if (annotations && annotations.length > 0) {
                        this.editor.session.setAnnotations(annotations);
                    }
                });
            });
    }

    private $changeOptions = () => {
        this.$messageController.changeOptions(this.$fileName, this.$options, this.$onInit);
    }

    private $onInit = () => {
        this.validate();
        this.registerCompleters();
    }

    validate = () => {
        this.$messageController.doValidation(this.$fileName, (annotations: Ace.Annotation[]) => {
            this.editor.session.clearAnnotations();
            if (annotations && annotations.length > 0) {
                this.editor.session.setAnnotations(annotations);
            }
        });
    }

    doHover(position: Ace.Point, callback?: (hover: Tooltip) => void) {
        this.$messageController.doHover(this.$fileName, position, callback);
    }

    getTooltipText(hover: Tooltip) {
        if (!hover)
            return;
        let text = hover.content.type === CommonConverter.TooltipType.markdown ? CommonConverter.cleanHtml(this.$markdownConverter.makeHtml(hover.content.text)) : hover.content.text;
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
            this.$messageController.format(this.$fileName, range, $format, this.$applyFormat);
        }
    }

    private $applyFormat = (edits: TextEdit[]) => {
        for (let edit of edits) {
            this.editor.session.doc.replace(CommonConverter.toRange(edit.range), edit.newText); //we need this to
            // mirror Range
        }
    }

    doComplete(callback?: (CompletionList) => void) {
        let cursor = this.editor.getCursorPosition();
        this.$messageController.doComplete(this.$fileName, cursor, callback);
    }

    registerCompleters() {
        this.editor.completers = [
            {
                getCompletions: async (editor, session, pos, prefix, callback) => {
                    this.doComplete((completions) => {
                        callback(null, CommonConverter.normalizeRanges(completions));
                    });
                },
                getDocTooltip: (item) => {
                    if (!item["isResolved"]) {
                        this.$messageController.doResolve(this.$fileName, item, (completion) => {
                            item["isResolved"] = true;
                            item.docText = completion.docText;
                            if (completion.docHTML) {
                                item.docHTML = completion.docHTML;
                            } else if (completion["docMarkdown"]) {
                                item.docHTML = CommonConverter.cleanHtml(this.$markdownConverter.makeHtml(completion["docMarkdown"]));
                            }
                            this.editor["completer"].updateDocTooltip();
                        })
                    }
                    return item;
                }
            }
        ];
    }

    dispose() {
        this.$messageController.dispose(this.$fileName);
    }
}
