import {Ace, Range as AceRange} from "ace-code";
import {DescriptionTooltip} from "./components/description-tooltip";
import {AceLinters} from "./types";
import Tooltip = AceLinters.Tooltip;
import {FormattingOptions} from "vscode-languageserver-protocol";
import {MarkDownConverter} from "./types";
import {CommonConverter} from "./type-converters/common-converters";
import {IMessageController} from "./types/message-controller-interface";
import ServiceOptions = AceLinters.ServiceOptions;
import Editor = Ace.Editor;
import EditSession = Ace.EditSession;
import Completion = Ace.Completion;
import ServiceOptionsMap = AceLinters.ServiceOptionsMap;
import {MessageController} from "./message-controller";
import {
    fromAceDelta,
    fromPoint,
    fromRange, fromSignatureHelp,
    toAnnotations,
    toCompletionItem,
    toCompletions,
    toRange, toResolvedCompletion,
    toTooltip
} from "./type-converters/lsp-converters";
import * as lsp from "vscode-languageserver-protocol";

import showdown from "showdown";
import {createWorker} from "./cdn-worker";
import {SignatureTooltip} from "./components/signature-tooltip";

export class LanguageProvider {
    $activeEditor: Editor;
    private $descriptionTooltip: DescriptionTooltip;
    private $signatureTooltip: SignatureTooltip;
    private readonly $markdownConverter: MarkDownConverter;
    private readonly $messageController: IMessageController;
    private $sessionLanguageProviders: { [sessionID: string]: SessionLanguageProvider } = {};
    private $editors: Editor[] = [];

    constructor(messageController: IMessageController, markdownConverter?: MarkDownConverter) {
        this.$messageController = messageController;
        this.$markdownConverter = markdownConverter ?? new showdown.Converter();
        this.$signatureTooltip = new SignatureTooltip(this);
        this.$descriptionTooltip = new DescriptionTooltip(this);
    }

    /**
     *  Creates LanguageProvider using our transport protocol with ability to register different services on same
     *  webworker
     * @param {Worker} worker
     * @param markdownConverter
     */
    static create(worker: Worker, markdownConverter?: MarkDownConverter) {
        let messageController: IMessageController;
        messageController = new MessageController(worker);
        return new LanguageProvider(messageController, markdownConverter);
    }

    static fromCdn(cdnUrl: string) {
        let messageController: IMessageController;
        if (cdnUrl == "" || !(/^http(s)?:/.test(cdnUrl))) {
            throw "Url is not valid";
        }
        if (cdnUrl[cdnUrl.length - 1] == "/") {
            cdnUrl = cdnUrl.substring(0, cdnUrl.length - 1);
        }
        let worker = createWorker(cdnUrl);
        // @ts-ignore
        messageController = new MessageController(worker);
        return new LanguageProvider(messageController);
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
        editor.setOption("useWorker", false);
        editor.on("changeSession", ({session}) => this.$registerSession(session));
        this.$registerCompleters(editor);
        this.$activeEditor ??= editor;
        editor.on("focus", () => {
            this.$activeEditor = editor;
        });
        this.$descriptionTooltip.registerEditor(editor);
        this.$signatureTooltip.registerEditor(editor);
    }

    setOptions<OptionsType extends ServiceOptions>(session: EditSession, options: OptionsType) {
        let sessionLanguageProvider = this.$getSessionLanguageProvider(session);
        sessionLanguageProvider.setOptions(options);
    }

    setGlobalOptions<T extends keyof ServiceOptionsMap>(serviceName: T, options: ServiceOptionsMap[T], merge = false) {
        this.$messageController.setGlobalOptions(serviceName, options, merge);
    }

    doHover(session: EditSession, position: Ace.Point, callback?: (hover: Tooltip | undefined) => void) {
        this.$messageController.doHover(this.$getFileName(session), fromPoint(position), (hover) => callback && callback(toTooltip(hover)));
    }

    provideSignatureHelp(session: EditSession, position: Ace.Point, callback?: (signatureHelp: Tooltip | undefined) => void) {
        this.$messageController.provideSignatureHelp(this.$getFileName(session), fromPoint(position), (signatureHelp) => callback && callback(fromSignatureHelp(signatureHelp)));
    }

    getTooltipText(hover: Tooltip): string | undefined {
        return hover.content.type === "markdown" ?
            CommonConverter.cleanHtml(this.$markdownConverter.makeHtml(hover.content.text)) : hover.content.text;
    }

    format = () => {
        let sessionLanguageProvider = this.$getSessionLanguageProvider(this.$activeEditor.session);
        sessionLanguageProvider.format();
    }

    doComplete(editor: Editor, session: EditSession, callback: (CompletionList: Completion[] | null) => void) {
        let cursor = editor.getCursorPosition();
        cursor.column--;
        this.$messageController.doComplete(this.$getFileName(session), fromPoint(cursor),
            (completionList) => completionList && callback(toCompletions(completionList)));
    }

    $registerCompleters(editor: Editor) {
        editor.completers = [
            {
                getCompletions: async (editor, session, pos, prefix, callback) => {
                    this.doComplete(editor, session, (completions) => {
                        let fileName = this.$getFileName(session);
                        if (!completions)
                            return;
                        completions.forEach((item) => item["fileName"] = fileName);
                        callback(null, CommonConverter.normalizeRanges(completions));
                    });
                },
                getDocTooltip: (item) => {
                    if (!item["isResolved"]) {
                        this.$messageController.doResolve(item["fileName"], toCompletionItem(item), (completionItem?) => {
                            item["isResolved"] = true;
                            if (!completionItem)
                                return;
                            let completion = toResolvedCompletion(item, completionItem);
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
    private $deltaQueue: Ace.Delta[] | null;
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

        session.doc["version"] = 0;
        session.doc.on("change", this.$changeListener, true);

        // @ts-ignore
        session.on("changeMode", this.$changeMode);

        this.$messageController.init(this.fileName, session.doc, this.$mode, options, this.$connected, this.$showAnnotations);
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
        this.session.doc["version"]++;
        if (!this.$deltaQueue) {
            this.$deltaQueue = [];
            setTimeout(this.$sendDeltaQueue, 0);
        }
        this.$deltaQueue.push(delta);
    }

    private $sendDeltaQueue = () => {
        let deltas = this.$deltaQueue;
        if (!deltas) return;
        this.$deltaQueue = null;
        if (deltas.length)
            this.$messageController.change(this.fileName, deltas.map((delta) =>
                fromAceDelta(delta, this.session.doc.getNewLineCharacter())), this.session.doc);
    };

    private $showAnnotations = (diagnostics) => {
        this.session.clearAnnotations();
        let annotations = toAnnotations(diagnostics)
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
            this.$messageController.format(this.fileName, fromRange(range), $format, this.$applyFormat);
        }
    }

    private $applyFormat = (edits: lsp.TextEdit[]) => {
        for (let edit of edits.reverse()) {
            this.session.doc.replace(toRange(edit.range), edit.newText);
        }
    }
}
