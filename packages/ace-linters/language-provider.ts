import {Ace, Range as AceRange} from "ace-code";
import {DescriptionTooltip} from "./components/description-tooltip";
import {AceLinters} from "./types";
import Tooltip = AceLinters.Tooltip;
import TextEdit = AceLinters.TextEdit;
import {FormattingOptions} from "vscode-languageserver-protocol";
import {MarkDownConverter} from "./types";
import {CommonConverter} from "./type-converters/common-converters";
import {IMessageController} from "./types/message-controller-interface";
import ServiceOptions = AceLinters.ServiceOptions;
import Editor = Ace.Editor;
import EditSession = Ace.EditSession;
import Completion = Ace.Completion;
import Annotation = Ace.Annotation;
import {MessageControllerWS} from "./message-controller-ws";
import ServiceOptionsMap = AceLinters.ServiceOptionsMap;
import {MessageController} from "./message-controller";

let showdown = require('showdown');

export class LanguageProvider {
    private $activeEditor: Editor;
    private $descriptionTooltip: DescriptionTooltip;
    private readonly $markdownConverter: MarkDownConverter;
    private readonly $messageController: IMessageController;
    private $sessionLanguageProviders: {[sessionID: string]: SessionLanguageProvider} = {};
    private $editors: Editor[] = [];

    private constructor(messageController: IMessageController, markdownConverter?: MarkDownConverter) {
        this.$messageController = messageController;
        this.$markdownConverter = markdownConverter ?? new showdown.Converter();
        this.$descriptionTooltip = new DescriptionTooltip(this);
    }

    static for(mode: Worker | WebSocket, markdownConverter?: MarkDownConverter) {
        let messageController: IMessageController;
        if (mode instanceof Worker) {
            messageController = new MessageController(mode);
        } else {
            messageController = new MessageControllerWS(mode);
        }
        return new LanguageProvider(messageController, markdownConverter);
    }

    private $registerSession = (session?: EditSession, options?: ServiceOptions) => {
        if (!session)
            return;
        this.$sessionLanguageProviders[session["id"]] ??= new SessionLanguageProvider(session, this.$messageController, options);
    }

    private $getSessionLanguageProvider(session: EditSession): SessionLanguageProvider {
        return this.$sessionLanguageProviders[session["id"]];
    }

    private $getFileName(session: EditSession) {
        let sessionLanguageProvider = this.$getSessionLanguageProvider(session);
        return sessionLanguageProvider.fileName;
    }

    registerEditor(editor: Editor) {
        if (!this.$editors.includes(editor))
            this.$registerEditor(editor);
        this.$registerSession(editor.session);
    }

    $registerEditor(editor: Editor) {
        this.$editors.push(editor);
        editor.on("changeSession", ({session}) => this.$registerSession(session));
        this.$registerCompleters(editor);
        this.$descriptionTooltip.registerEditor(editor);
        this.$activeEditor ??= editor;
        editor.on("focus", () => {
            this.$activeEditor = editor;
        });
    }

    setOptions<OptionsType extends ServiceOptions>(session: EditSession, options: OptionsType) {
        let sessionLanguageProvider = this.$getSessionLanguageProvider(session);
        sessionLanguageProvider.setOptions(options);
    }

    setGlobalOptions<T extends keyof ServiceOptionsMap>(serviceName: T, options: ServiceOptionsMap[T], merge = false) {
        this.$messageController.setGlobalOptions(serviceName, options, merge);
    }

    doHover(session: EditSession, position: Ace.Point, callback?: (hover: Tooltip) => void) {
        this.$messageController.doHover(this.$getFileName(session), position, callback);
    }

    getTooltipText(hover: Tooltip) {
        if (!hover)
            return;
        let text = hover.content.type === CommonConverter.TooltipType.markdown ? CommonConverter.cleanHtml(this.$markdownConverter.makeHtml(hover.content.text)) : hover.content.text;
        return {text: text, range: hover.range}
    }

    format = () => {
        let sessionLanguageProvider = this.$getSessionLanguageProvider(this.$activeEditor.session);
        sessionLanguageProvider.format();
    }

    doComplete(editor: Editor, session: EditSession, callback: (CompletionList: Completion[]) => void) {
        let cursor = editor.getCursorPosition();
        this.$messageController.doComplete(this.$getFileName(session), cursor, callback);
    }

    $registerCompleters(editor: Editor) {
        editor.completers = [
            {
                getCompletions: async (editor, session, pos, prefix, callback) => {
                    this.doComplete(editor, session, (completions) => {
                        let fileName = this.$getFileName(session);
                        completions.forEach((item) => item["fileName"] = fileName);
                        callback(null, CommonConverter.normalizeRanges(completions));
                    });
                },
                getDocTooltip: (item) => {
                    if (!item["isResolved"]) {
                        this.$messageController.doResolve(item["fileName"], item, (completion) => {
                            item["isResolved"] = true;
                            item.docText = completion.docText;
                            if (completion.docHTML) {
                                item.docHTML = completion.docHTML;
                            } else if (completion["docMarkdown"]) {
                                item.docHTML = CommonConverter.cleanHtml(this.$markdownConverter.makeHtml(completion["docMarkdown"]));
                            }
                            editor["completer"].updateDocTooltip();
                        })
                    }
                    return item;
                }
            }
        ];
    }

    dispose() {
        // this.$messageController.dispose(this.$fileName);
    }
}

class SessionLanguageProvider {
    session: EditSession;
    fileName: string;
    private $messageController: IMessageController;
    private $deltaQueue: Ace.Delta[];
    private $isConnected = false;
    private $modeIsChanged = false;
    private $options: ServiceOptions;

    private extensions = {
        "typescript": "ts",
        "javascript": "js"
    }

    constructor(session: EditSession, messageController: IMessageController, options?: ServiceOptions) {
        this.$messageController = messageController;
        this.session = session;
        this.initFileName();
        session.doc.on("change", this.$changeListener, true);

        // @ts-ignore
        session.on("changeMode", this.$changeMode);

        this.$messageController.init(this.fileName, session.getValue(), this.$mode, options, this.$connected, this.$showAnnotations);
    }

    private $connected = () => {
        this.$isConnected = true;
        if (this.$modeIsChanged)
            this.$changeMode();
        if (this.$deltaQueue)
            this.$sendDeltaQueue();
        if (this.$options)
            this.setOptions(this.$options);
    }

    private $changeMode = () => {
        if (!this.$isConnected) {
            this.$modeIsChanged = true;
            return;
        }
        this.$deltaQueue = [];
        this.$messageController.changeMode(this.fileName, this.session.getValue(), this.$mode);
    };

    private initFileName() {
        this.fileName = this.session["id"] + "." + this.$extension;
    }

    private get $extension() {
        let mode = this.$mode.replace("ace/mode/", "");
        return this.extensions[mode] ?? mode;
    }

    private get $mode(): string {
        return this.session["$modeId"];
    }

    private get $format(): FormattingOptions {
        return {
            tabSize: this.session.getTabSize(),
            insertSpaces: this.session.getUseSoftTabs()
        }
    }

    private $changeListener = (delta) => {
        if (!this.$deltaQueue) {
            this.$deltaQueue = [];
            setTimeout(this.$sendDeltaQueue, 0);
        }
        if (delta.action == "insert")
            this.$deltaQueue.push(delta.start, delta.lines);
        else this.$deltaQueue.push(delta.start, delta.end);
    }

    private $sendDeltaQueue = () => {
        let deltas = this.$deltaQueue;
        if (!deltas) return;
        this.$deltaQueue = null;
        if (deltas.length)
            this.$messageController.change(this.fileName, deltas, this.session.getValue(), this.session.doc.getLength());
    };

    private $showAnnotations = (annotations: Annotation[]) => {
        this.session.clearAnnotations();
        if (annotations && annotations.length > 0) {
            this.session.setAnnotations(annotations);
        }
    }

    setOptions<OptionsType extends ServiceOptions>(options: OptionsType) {
        if (!this.$isConnected) {
            this.$options = options;
            return;
        }
        this.$messageController.changeOptions(this.fileName, options);
    }

    validate = () => {
        this.$messageController.doValidation(this.fileName, this.$showAnnotations);
    }

    format = () => {
        let selectionRanges = this.session.getSelection().getAllRanges();
        let $format = this.$format;
        if (!selectionRanges || selectionRanges[0].isEmpty()) {
            let row = this.session.getLength();
            let column = this.session.getLine(row).length - 1;
            selectionRanges = [new AceRange(0, 0, row, column)];
        }
        for (let range of selectionRanges) {
            this.$messageController.format(this.fileName, range, $format, this.$applyFormat);
        }
    }

    private $applyFormat = (edits: TextEdit[]) => {
        for (let edit of edits) {
            this.session.doc.replace(CommonConverter.toRange(edit.range), edit.newText); //we need this to
            // mirror Range
        }
    }

    doComplete(editor: Editor, callback: (CompletionList) => void) {
        let cursor = editor.getCursorPosition();
        this.$messageController.doComplete(this.fileName, cursor, callback);
    }
}
