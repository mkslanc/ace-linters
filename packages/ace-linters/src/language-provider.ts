import {Ace} from "ace-code";
import "./types/ace-extension";

import {FormattingOptions} from "vscode-languageserver-protocol";
import {CommonConverter} from "./type-converters/common-converters";
import {ComboDocumentIdentifier, IMessageController} from "./types/message-controller-interface";
import {MessageController} from "./message-controller";
import {
    fromAceDelta, fromAnnotations, fromDocumentHighlights,
    fromPoint,
    fromRange, fromSignatureHelp,
    toAnnotations,
    toCompletionItem,
    toCompletions, toMarkerGroupItem,
    toRange, toResolvedCompletion,
    toTooltip
} from "./type-converters/lsp/lsp-converters";
import * as lsp from "vscode-languageserver-protocol";

import showdown from "showdown";
import {createWorker} from "./cdn-worker";
import {SignatureTooltip} from "./components/signature-tooltip";
import {
    AceRangeData, CodeActionsByService,
    ProviderOptions,
    ServiceFeatures,
    ServiceOptions,
    ServiceOptionsMap, ServiceStruct,
    SupportedServices,
    Tooltip
} from "./types/language-service";
import {MarkerGroup} from "./ace/marker_group";
import {AceRange} from "./ace/range-singleton";
import {HoverTooltip} from "./ace/hover-tooltip";
import {
    DecodedSemanticTokens,
    mergeTokens,
    parseSemanticTokens
} from "./type-converters/lsp/semantic-tokens";
import {LightbulbWidget} from "./components/lightbulb";
import {AceVirtualRenderer} from "./ace/renderer-singleton";
import {AceEditor} from "./ace/editor-singleton";
import {setStyles} from "./misc/styles";
import {convertToUri} from "./utils";

export class LanguageProvider {
    activeEditor: Ace.Editor;
    private readonly $messageController: IMessageController;
    private $signatureTooltip: SignatureTooltip;
    $sessionLanguageProviders: { [sessionID: string]: SessionLanguageProvider } = {};
    editors: Ace.Editor[] = [];
    options: ProviderOptions;
    private $hoverTooltip: HoverTooltip;
    $urisToSessionsIds: { [uri: string]: string } = {};
    workspaceUri: string;
    requireFilePath: boolean = false;
    private $lightBulbWidgets: { [editorId: string]: LightbulbWidget } = {};
    private stylesEmbedded: boolean;

    private constructor(worker: Worker, options?: ProviderOptions) {
        this.$messageController = new MessageController(worker, this);
        this.setProviderOptions(options);
        this.$signatureTooltip = new SignatureTooltip(this);
    }

    /**
     *  Creates LanguageProvider using our transport protocol with ability to register different services on same
     *  webworker
     * @param {Worker} worker
     * @param {ProviderOptions} options
     */
    static create(worker: Worker, options?: ProviderOptions) {
        return new LanguageProvider(worker, options);
    }

    /**
     * method to create LanguageProvider from CDN
     * @param customServices
     * @param options
     * @param includeDefaultLinters by default would include all linters
     */
    static fromCdn(customServices: {
        services: ServiceStruct[],
        serviceManagerCdn: string,
        includeDefaultLinters?: { [name in SupportedServices]?: boolean } | boolean
    }, options?: ProviderOptions, includeDefaultLinters?: { [name in SupportedServices]?: boolean } | boolean): LanguageProvider
    static fromCdn(cdnUrl: string, options?: ProviderOptions, includeDefaultLinters?: { [name in SupportedServices]?: boolean } | boolean): LanguageProvider
    static fromCdn(source: string | {
        services: ServiceStruct[],
        serviceManagerCdn: string,
        includeDefaultLinters?: { [name in SupportedServices]?: boolean } | boolean
    }, options?: ProviderOptions, includeDefaultLinters?: { [name in SupportedServices]?: boolean } | boolean) {
        let worker: Worker;
        if (typeof source === "string") {
            if (source == "" || !(/^http(s)?:/.test(source))) {
                throw "Url is not valid";
            }
            if (source[source.length - 1] == "/") {
                source = source.substring(0, source.length - 1);
            }
            worker = createWorker(source, includeDefaultLinters);
        } else {
            if (source.includeDefaultLinters == undefined) {
                source.includeDefaultLinters = true;
            }
            worker = createWorker({
                services: source.services,
                serviceManagerCdn: source.serviceManagerCdn
            }, source.includeDefaultLinters ?? includeDefaultLinters);
        }
        return new LanguageProvider(worker, options);
    }

    setProviderOptions(options?: ProviderOptions) {
        const defaultFunctionalities = {
            hover: true,
            completion: {overwriteCompleters: true},
            completionResolve: true,
            format: true,
            documentHighlights: true,
            signatureHelp: true,
            semanticTokens: false, //experimental functionality
            codeActions: true
        };

        this.options = options ?? {};

        this.options.functionality = typeof this.options.functionality === 'object' ? this.options.functionality : {};

        Object.entries(defaultFunctionalities).forEach(([key, value]) => {
            // Check if the functionality has not been defined in the provided options
            if (this.options.functionality![key] === undefined) {
                // If not, set it to its default value
                this.options.functionality![key] = value;
            }
        });

        this.options.markdownConverter ||= new showdown.Converter();
        this.requireFilePath = this.options.requireFilePath ?? false;
        if (options?.workspacePath) {
            this.workspaceUri = convertToUri(options.workspacePath);
        }
    }

    /**
     * @param session
     * @param filePath - The full file path associated with the editor.
     */
    setSessionFilePath(session: Ace.EditSession, filePath: string) {
        this.$getSessionLanguageProvider(session)?.setFilePath(filePath);
    }

    private $registerSession = (session: Ace.EditSession, editor: Ace.Editor) => {
        this.$sessionLanguageProviders[session["id"]] ??= new SessionLanguageProvider(this, session, editor, this.$messageController);
    }

    private $getSessionLanguageProvider(session: Ace.EditSession): SessionLanguageProvider {
        return this.$sessionLanguageProviders[session["id"]];
    }

    private $getFileName(session: Ace.EditSession) {
        let sessionLanguageProvider = this.$getSessionLanguageProvider(session);
        return sessionLanguageProvider.comboDocumentIdentifier;
    }

    /**
     * Registers an Ace editor instance with the language provider.
     * @param editor - The Ace editor instance to register.
     */
    registerEditor(editor: Ace.Editor) {
        if (!this.editors.includes(editor))
            this.$registerEditor(editor);
        this.$registerSession(editor.session, editor);
    }

    codeActionCallback: (codeActions: CodeActionsByService[]) => void;

    setCodeActionCallback(callback: (codeActions: CodeActionsByService[]) => void) {
        this.codeActionCallback = callback;
    }

    executeCommand(command: string, serviceName: string, args?: any[], callback?: (something: any) => void): void {
        this.$messageController.executeCommand(serviceName, command, args, callback); //TODO:
    }

    applyEdit(workspaceEdit: lsp.WorkspaceEdit, serviceName: string, callback?: (result: lsp.ApplyWorkspaceEditResult, serviceName: string) => void) {
        if (workspaceEdit.changes) {
            for (let uri in workspaceEdit.changes) {
                if (!this.$urisToSessionsIds[uri]) {
                    callback && callback({
                        applied: false,
                        failureReason: "No session found for uri " + uri
                    }, serviceName);
                    return;
                }
            }
            for (let uri in workspaceEdit.changes) {
                let sessionId = this.$urisToSessionsIds[uri];
                let sessionLanguageProvider = this.$sessionLanguageProviders[sessionId];
                sessionLanguageProvider.applyEdits(workspaceEdit.changes[uri]);
            }
            callback && callback({
                applied: true,
            }, serviceName);
        }
        // some servers doesn't respect missing capability
        if (workspaceEdit.documentChanges) {
            for (let change of workspaceEdit.documentChanges) {
                if ("kind" in change) {
                    // we don't support create/rename/remove stuff
                    return;
                }
                if ("textDocument" in change) {
                    let uri = change.textDocument.uri;
                    if (!this.$urisToSessionsIds[uri]) {
                        callback && callback({
                            applied: false,
                            failureReason: "No session found for uri " + uri
                        }, serviceName);
                        return;
                    }
                }
            }
            for (let change of workspaceEdit.documentChanges) {
                if ("textDocument" in change) {
                    let sessionId = this.$urisToSessionsIds[change.textDocument.uri];
                    let sessionLanguageProvider = this.$sessionLanguageProviders[sessionId];
                    sessionLanguageProvider.applyEdits(change.edits);
                }
            }
            callback && callback({
                applied: true,
            }, serviceName);
        }
    }

    $registerEditor(editor: Ace.Editor) {
        this.editors.push(editor);

        //init singletons
        AceRange.getConstructor(editor);
        AceVirtualRenderer.getConstructor(editor);
        AceEditor.getConstructor(editor);

        editor.setOption("useWorker", false);
        editor.on("changeSession", ({session}) => this.$registerSession(session, editor));

        if (this.options.functionality!.completion) {
            this.$registerCompleters(editor);
        }
        this.activeEditor ??= editor;
        editor.on("focus", () => {
            this.activeEditor = editor;
        });

        if (this.options.functionality!.documentHighlights) {
            var $timer
            editor.on("changeSelection", () => {
                if (!$timer)
                    $timer =
                        setTimeout(() => {
                            let cursor = editor.getCursorPosition();
                            let sessionLanguageProvider = this.$getSessionLanguageProvider(editor.session);

                            this.$messageController.findDocumentHighlights(this.$getFileName(editor.session), fromPoint(cursor), sessionLanguageProvider.$applyDocumentHighlight);
                            $timer = undefined;
                        }, 50);
            });
        }

        if (this.options.functionality!.codeActions) {
            this.$provideCodeActions(editor);
        }

        if (this.options.functionality!.hover) {
            if (!this.$hoverTooltip) {
                this.$hoverTooltip = new HoverTooltip();
            }
            this.$initHoverTooltip(editor);
        }

        if (this.options.functionality!.signatureHelp) {
            this.$signatureTooltip.registerEditor(editor);
        }

        this.setStyles(editor);
    }

    private $provideCodeActions(editor: Ace.Editor) {
        const lightBulb = new LightbulbWidget(editor);
        this.$lightBulbWidgets[editor.id] = lightBulb;
        lightBulb.setExecuteActionCallback((action, serviceName) => {
            for (let id in this.$lightBulbWidgets) {
                this.$lightBulbWidgets[id].hideAll();
            }
            if (typeof action.command === "string") {
                this.executeCommand(action.command, serviceName, action["arguments"]);
            } else {
                if (action.command) {
                    this.executeCommand(action.command.command, serviceName, action.command.arguments);
                } else if ("edit" in action) {
                    this.applyEdit(action.edit!, serviceName);
                }
            }
        });

        var actionTimer
        editor.on("changeSelection", () => {
            if (!actionTimer)
                actionTimer =
                    setTimeout(() => {
                        //TODO: no need to send request on empty
                        let selection = editor.getSelection().getRange();
                        let cursor = editor.getCursorPosition();
                        let diagnostics = fromAnnotations(editor.session.getAnnotations().filter((el) => el.row === cursor.row));
                        this.$messageController.getCodeActions(this.$getFileName(editor.session), fromRange(selection), {diagnostics}, (codeActions) => {
                            lightBulb.setCodeActions(codeActions);
                            lightBulb.showLightbulb();
                        });
                        actionTimer = undefined;
                    }, 500);
        });
    }

    private $initHoverTooltip(editor) {
        const Range = editor.getSelectionRange().constructor;

        this.$hoverTooltip.setDataProvider((e, editor) => {
            const session = editor.session;
            const docPos = e.getDocumentPosition();

            this.doHover(session, docPos, (hover) => {
                const errorMarkers = this.$getSessionLanguageProvider(session).state?.diagnosticMarkers?.getMarkersAtPosition(docPos) ?? [];
                const hasHoverContent = hover?.content;
                if (errorMarkers.length === 0 && !hasHoverContent) return;

                var range = hover?.range ?? errorMarkers[0]?.range;
                range = range ? Range.fromPoints(range.start, range.end) : session.getWordRange(docPos.row, docPos.column);
                const hoverNode = hasHoverContent ? this.createHoverNode(hover) : null;
                const errorNode = errorMarkers.length > 0 ? this.createErrorNode(errorMarkers) : null;

                const domNode = document.createElement('div');
                if (errorNode) domNode.appendChild(errorNode);
                if (hoverNode) domNode.appendChild(hoverNode);

                this.$hoverTooltip.showForRange(editor, range, domNode, e);
            });
        });
        this.$hoverTooltip.addToEditor(editor);
    }


    private createHoverNode(hover) {
        const hoverNode = document.createElement("div");
        hoverNode.innerHTML = this.getTooltipText(hover);
        return hoverNode;
    }

    private createErrorNode(errorMarkers) {
        const errorDiv = document.createElement('div');
        errorDiv.textContent = errorMarkers.map(el => el.tooltipText.trim()).join("\n");
        return errorDiv;
    }

    private setStyles(editor) {
        if (!this.stylesEmbedded) {
            setStyles(editor);
            this.stylesEmbedded = true;
        }
    }

    setGlobalOptions<T extends keyof ServiceOptionsMap>(serviceName: T & string, options: ServiceOptionsMap[T], merge = false) {
        this.$messageController.setGlobalOptions(serviceName, options, merge);
    }

    /**
     * Sets the workspace URI for the language provider.
     *
     * If the provided URI is the same as the current workspace URI, no action is taken.
     * Otherwise, the workspace URI is updated and the message controller is notified.
     *
     * Not all servers support changing of workspace URI.
     *
     * @param workspaceUri - The new workspace URI. Could be simple path, not URI itself.
     */
    changeWorkspaceFolder(workspaceUri: string) {
        if (workspaceUri === this.workspaceUri)
            return;
        this.workspaceUri = convertToUri(workspaceUri);
        this.$messageController.setWorkspace(workspaceUri);
    }

    setSessionOptions<OptionsType extends ServiceOptions>(session: Ace.EditSession, options: OptionsType) {
        let sessionLanguageProvider = this.$getSessionLanguageProvider(session);
        sessionLanguageProvider.setOptions(options);
    }

    configureServiceFeatures(serviceName: SupportedServices, features: ServiceFeatures) {
        this.$messageController.configureFeatures(serviceName, features);
    }

    doHover(session: Ace.EditSession, position: Ace.Point, callback?: (hover: Tooltip | undefined) => void) {
        this.$messageController.doHover(this.$getFileName(session), fromPoint(position), (hover) => callback && callback(toTooltip(hover)));
    }

    provideSignatureHelp(session: Ace.EditSession, position: Ace.Point, callback?: (signatureHelp: Tooltip | undefined) => void) {
        this.$messageController.provideSignatureHelp(this.$getFileName(session), fromPoint(position), (signatureHelp) => callback && callback(fromSignatureHelp(signatureHelp)));
    }

    getTooltipText(hover: Tooltip): string {
        return hover.content.type === "markdown" ?
            CommonConverter.cleanHtml(this.options.markdownConverter!.makeHtml(hover.content.text)) : hover.content.text;
    }

    format = () => {
        if (!this.options.functionality!.format)
            return;

        let sessionLanguageProvider = this.$getSessionLanguageProvider(this.activeEditor.session);
        sessionLanguageProvider.$sendDeltaQueue(sessionLanguageProvider.format);
    }

    getSemanticTokens() {
        if (!this.options.functionality!.semanticTokens)
            return;

        let sessionLanguageProvider = this.$getSessionLanguageProvider(this.activeEditor.session);
        sessionLanguageProvider.getSemanticTokens();
    }

    doComplete(editor: Ace.Editor, session: Ace.EditSession, callback: (CompletionList: Ace.Completion[] | null) => void) {
        let cursor = editor.getCursorPosition();
        this.$messageController.doComplete(this.$getFileName(session), fromPoint(cursor),
            (completions) => completions && callback(toCompletions(completions)));
    }

    doResolve(item: Ace.Completion, callback: (completionItem: lsp.CompletionItem | null) => void) {
        this.$messageController.doResolve(item["fileName"], toCompletionItem(item), callback);
    }


    $registerCompleters(editor: Ace.Editor) {
        let completer: Ace.Completer = {
            getCompletions: async (editor, session, pos, prefix, callback) => {
                this.$getSessionLanguageProvider(session).$sendDeltaQueue(() => {
                    this.doComplete(editor, session, (completions) => {
                        let fileName = this.$getFileName(session);
                        if (!completions)
                            return;
                        completions.forEach((item) => {
                            item.completerId = completer.id;
                            item["fileName"] = fileName
                        });
                        callback(null, CommonConverter.normalizeRanges(completions));
                    });
                });
            },
            getDocTooltip: (item: Ace.Completion) => {
                if (this.options.functionality!.completionResolve && !item["isResolved"] && item.completerId === completer.id) {
                    this.doResolve(item, (completionItem?) => {
                        item["isResolved"] = true;
                        if (!completionItem)
                            return;
                        let completion = toResolvedCompletion(item, completionItem);
                        item.docText = completion.docText;
                        if (completion.docHTML) {
                            item.docHTML = completion.docHTML;
                        } else if (completion["docMarkdown"]) {
                            item.docHTML = CommonConverter.cleanHtml(this.options.markdownConverter!.makeHtml(completion["docMarkdown"]));
                        }
                        if (editor["completer"]) {
                            editor["completer"].updateDocTooltip();
                        }

                    })
                }
                return item;
            },
            id: "lspCompleters"
        }
        if (this.options.functionality!.completion && this.options.functionality!.completion.overwriteCompleters) {
            editor.completers = [
                completer
            ];
        } else {
            if (!editor.completers) {
                editor.completers = [];
            }
            editor.completers.push(completer);
        }
    }

    closeConnection() {
        this.$messageController.closeConnection(() => {
            this.$messageController.$worker.terminate();
        })
    }

    /**
     * Removes document from all linked services by session id
     * @param session
     * @param [callback]
     */
    closeDocument(session: Ace.EditSession, callback?) {
        let sessionProvider = this.$getSessionLanguageProvider(session);
        if (sessionProvider) {
            sessionProvider.closeDocument(callback);
            delete this.$sessionLanguageProviders[session["id"]];
        }
    }
}

class SessionLanguageProvider {
    session: Ace.EditSession;
    documentUri: string;
    private $messageController: IMessageController;
    private $deltaQueue: Ace.Delta[] | null;
    private $isConnected = false;
    private $options?: ServiceOptions;
    private $filePath: string;
    private $isFilePathRequired = false;
    private $servicesCapabilities?: { [serviceName: string]: lsp.ServerCapabilities };
    private $requestsQueue: Function[] = [];

    state: {
        occurrenceMarkers: MarkerGroup | null,
        diagnosticMarkers: MarkerGroup | null
    } = {
        occurrenceMarkers: null,
        diagnosticMarkers: null
    }

    private extensions = {
        "typescript": "ts",
        "javascript": "js"
    }
    editor: Ace.Editor;

    private semanticTokensLegend?: lsp.SemanticTokensLegend;
    private $provider: LanguageProvider;

    /**
     * Constructs a new instance of the `SessionLanguageProvider` class.
     *
     * @param provider - The `LanguageProvider` instance.
     * @param session - The Ace editor session.
     * @param editor - The Ace editor instance.
     * @param messageController - The `IMessageController` instance for handling messages.
     */
    constructor(provider: LanguageProvider, session: Ace.EditSession, editor: Ace.Editor, messageController: IMessageController) {
        this.$provider = provider;
        this.$messageController = messageController;
        this.session = session;
        this.editor = editor;
        this.$isFilePathRequired = provider.requireFilePath;

        session.doc.version = 1;
        session.doc.on("change", this.$changeListener, true);
        this.addSemanticTokenSupport(session); //TODO: ?
        session.on("changeMode", this.$changeMode);
        if (this.$provider.options.functionality!.semanticTokens) {
            session.on("changeScrollTop", () => this.getSemanticTokens());
        }

        this.$init();
    }

    enqueueIfNotConnected(callback: () => void) {
        if (!this.$isConnected) {
            this.$requestsQueue.push(callback);
        } else {
            callback();
        }
    }

    get comboDocumentIdentifier(): ComboDocumentIdentifier {
        return {
            documentUri: this.documentUri,
            sessionId: this.session["id"]
        };
    }

    /**
     * @param filePath
     */
    setFilePath(filePath: string) {
        this.enqueueIfNotConnected(() => {
            this.session.doc.version++;
            if (this.$filePath !== undefined)//TODO change file path
                return;
            this.$filePath = filePath;
            const previousComboId = this.comboDocumentIdentifier;
            this.initDocumentUri(true);
            this.$messageController.renameDocument(previousComboId, this.comboDocumentIdentifier.documentUri, this.session.doc.version);
        })
    };

    private $init() {
        if (this.$isFilePathRequired && this.$filePath === undefined)
            return;
        this.initDocumentUri();
        this.$messageController.init(this.comboDocumentIdentifier, this.session.doc, this.$mode, this.$options, this.$connected);
    }

    addSemanticTokenSupport(session: Ace.EditSession) {
        let bgTokenizer = session.bgTokenizer;
        session.setSemanticTokens = (tokens: DecodedSemanticTokens | undefined) => {
            bgTokenizer.semanticTokens = tokens;
        }

        bgTokenizer.$tokenizeRow = (row: number) => {
            var line = bgTokenizer.doc.getLine(row);
            var state = bgTokenizer.states[row - 1];
            var data = bgTokenizer.tokenizer.getLineTokens(line, state, row);

            if (bgTokenizer.states[row] + "" !== data.state + "") {
                bgTokenizer.states[row] = data.state;
                bgTokenizer.lines[row + 1] = null;
                if (bgTokenizer.currentLine > row + 1)
                    bgTokenizer.currentLine = row + 1;
            } else if (bgTokenizer.currentLine == row) {
                bgTokenizer.currentLine = row + 1;
            }

            if (bgTokenizer.semanticTokens) {
                let decodedTokens = bgTokenizer.semanticTokens.getByRow(row);
                if (decodedTokens) {
                    data.tokens = mergeTokens(data.tokens, decodedTokens);
                }
            }

            return bgTokenizer.lines[row] = data.tokens;
        }
    }

    private $connected = (capabilities: { [serviceName: string]: lsp.ServerCapabilities }) => {
        this.$isConnected = true;

        this.setServerCapabilities(capabilities);

        this.$requestsQueue.forEach((requestCallback) => requestCallback());
        this.$requestsQueue = [];

        if (this.$deltaQueue)
            this.$sendDeltaQueue();
        if (this.$options)
            this.setOptions(this.$options);
    }

    private $changeMode = () => {
        this.enqueueIfNotConnected(() => {
            this.$deltaQueue = [];

            this.session.clearAnnotations();
            if (this.state.diagnosticMarkers) {
                this.state.diagnosticMarkers.setMarkers([]);
            }

            this.session.setSemanticTokens(undefined); //clear all semantic tokens
            let newVersion = this.session.doc.version++;
            this.$messageController.changeMode(this.comboDocumentIdentifier, this.session.getValue(), newVersion, this.$mode, this.setServerCapabilities);
        });
    };

    setServerCapabilities = (capabilities: { [serviceName: string]: lsp.ServerCapabilities }) => {
        if (!capabilities)
            return;
        this.$servicesCapabilities = {...capabilities};

        let hasTriggerChars = Object.values(capabilities).some((capability) => capability?.completionProvider?.triggerCharacters);

        if (hasTriggerChars) {
            let completer = this.editor.completers.find((completer) => completer.id === "lspCompleters");
            if (completer) {
                let allTriggerCharacters: string[] = [];
                Object.values(capabilities).forEach((capability) => {
                    if (capability?.completionProvider?.triggerCharacters) {
                        allTriggerCharacters.push(...capability.completionProvider.triggerCharacters);
                    }
                });

                allTriggerCharacters = [...new Set(allTriggerCharacters)];

                const lspCompleterOptions = (typeof this.$provider.options.functionality?.completion == "object") ? this.$provider.options.functionality.completion.lspCompleterOptions?.triggerCharacters : undefined;
                if (lspCompleterOptions)
                {
                    completer.triggerCharacters = allTriggerCharacters.filter((value: string) => !lspCompleterOptions.remove.includes(value)); // Remove trigger characters
                    lspCompleterOptions.add.forEach((value: string) => !completer!.triggerCharacters!.includes(value) && completer!.triggerCharacters!.push(value)); // Add trigger characters
                }
                else
                {
                    completer.triggerCharacters = allTriggerCharacters;
                }
            }
        }

        let hasSemanticTokensProvider = Object.values(capabilities).some((capability) => {
            if (capability?.semanticTokensProvider) {
                this.semanticTokensLegend = capability.semanticTokensProvider.legend;
                return true;
            }
        });
        if (hasSemanticTokensProvider) {
            this.getSemanticTokens();
        }
        //TODO: we should restrict range formatting if any of services is only has full format capabilities
        //or we shoudl use service with full format capability instead of range one's
    }

    private initDocumentUri(isRename = false) {
        let filePath = this.$filePath ?? this.session["id"] + "." + this.$extension;
        if (isRename) {
            delete this.$provider.$urisToSessionsIds[this.documentUri];
        }
        this.documentUri = convertToUri(filePath);
        this.$provider.$urisToSessionsIds[this.documentUri] = this.session["id"];
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
        this.session.doc.version++;
        if (!this.$deltaQueue) {
            this.$deltaQueue = [];
            setTimeout(() => this.$sendDeltaQueue(() => {
                this.getSemanticTokens();
            }), 0);
        }
        this.$deltaQueue.push(delta);
    }

    $sendDeltaQueue = (callback?) => {
        let deltas = this.$deltaQueue;
        if (!deltas) return callback && callback();
        this.$deltaQueue = null;
        if (deltas.length)
            this.$messageController.change(this.comboDocumentIdentifier, deltas.map((delta) =>
                fromAceDelta(delta, this.session.doc.getNewLineCharacter())), this.session.doc, callback);
    };

    $showAnnotations = (diagnostics: lsp.Diagnostic[]) => {
        if (!diagnostics) {
            return;
        }

        let annotations = toAnnotations(diagnostics);
        this.session.clearAnnotations();
        if (annotations && annotations.length > 0) {
            this.session.setAnnotations(annotations);
        }
        if (!this.state.diagnosticMarkers) {
            this.state.diagnosticMarkers = new MarkerGroup(this.session);
        }
        this.state.diagnosticMarkers.setMarkers(diagnostics?.map((el) => toMarkerGroupItem(CommonConverter.toRange(toRange(el.range)), "language_highlight_error", el.message)));
    }

    setOptions<OptionsType extends ServiceOptions>(options: OptionsType) {
        if (!this.$isConnected) {
            this.$options = options;
            return;
        }
        this.$messageController.changeOptions(this.comboDocumentIdentifier, options);
    }

    validate = () => {
        this.$messageController.doValidation(this.comboDocumentIdentifier, this.$showAnnotations);
    }

    format = () => {
        let selectionRanges = this.session.getSelection().getAllRanges();
        let $format = this.$format;
        let aceRangeDatas = selectionRanges as AceRangeData[];
        if (!selectionRanges || selectionRanges[0].isEmpty()) {
            let row = this.session.getLength();
            let column = this.session.getLine(row).length - 1;
            aceRangeDatas =
                [{
                    start: {
                        row: 0, column: 0
                    },
                    end: {
                        row: row, column: column
                    }
                }];
        }
        for (let range of aceRangeDatas) {
            this.$messageController.format(this.comboDocumentIdentifier, fromRange(range), $format, this.applyEdits);
        }
    }

    applyEdits = (edits: lsp.TextEdit[]) => {
        edits ??= [];
        for (let edit of edits.reverse()) {
            this.session.replace(<Ace.Range>toRange(edit.range), edit.newText);
        }
    }

    getSemanticTokens() {
        if (!this.$provider.options.functionality!.semanticTokens)
            return;
        //TODO: improve this 
        let lastRow = this.editor.renderer.getLastVisibleRow();
        let visibleRange: AceRangeData = {
            start: {
                row: this.editor.renderer.getFirstVisibleRow(),
                column: 0
            },
            end: {
                row: lastRow + 1,
                column: this.session.getLine(lastRow).length
            }
        }

        this.$messageController.getSemanticTokens(this.comboDocumentIdentifier, fromRange(visibleRange), (tokens) => {
                if (!tokens) {
                    return;
                }
                let decodedTokens = parseSemanticTokens(tokens.data, this.semanticTokensLegend!.tokenTypes, this.semanticTokensLegend!.tokenModifiers);
                this.session.setSemanticTokens(decodedTokens);
                let bgTokenizer = this.session.bgTokenizer;

                //@ts-ignore
                bgTokenizer.running = setTimeout(() => {
                    if (bgTokenizer?.semanticTokens?.tokens && bgTokenizer?.semanticTokens?.tokens.length > 0) {
                        let startRow: number = bgTokenizer?.semanticTokens?.tokens[0].row;
                        bgTokenizer.currentLine = startRow;
                        bgTokenizer.lines = bgTokenizer.lines.slice(0, startRow - 1);
                    } else {
                        bgTokenizer.currentLine = 0;
                        bgTokenizer.lines = [];
                    }
                    bgTokenizer.$worker();
                }, 20);
            }
        );
    }

    $applyDocumentHighlight = (documentHighlights: lsp.DocumentHighlight[]) => {
        if (!this.state.occurrenceMarkers) {
            this.state.occurrenceMarkers = new MarkerGroup(this.session);
        }
        if (documentHighlights) { //some servers return null, which contradicts spec
            this.state.occurrenceMarkers.setMarkers(fromDocumentHighlights(documentHighlights));
        }
    };

    closeDocument(callback?) {
        this.$messageController.closeDocument(this.comboDocumentIdentifier, callback);
    }
}
