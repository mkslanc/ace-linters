import {Ace} from "ace-code";
import {FormattingOptions} from "vscode-languageserver-protocol";
import {CommonConverter} from "./type-converters/common-converters";
import {IMessageController} from "./types/message-controller-interface";
import {MessageController} from "./message-controller";
import {
    fromAceDelta, fromDocumentHighlights,
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
    AceRangeData,
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

export class LanguageProvider {
    activeEditor: Ace.Editor;
    private readonly $messageController: IMessageController;
    private $signatureTooltip: SignatureTooltip;
    private $sessionLanguageProviders: { [sessionID: string]: SessionLanguageProvider } = {};
    editors: Ace.Editor[] = [];
    options: ProviderOptions;
    private $hoverTooltip: HoverTooltip;

    constructor(messageController: IMessageController, options?: ProviderOptions) {
        this.$messageController = messageController;
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
        let messageController: IMessageController;
        messageController = new MessageController(worker);
        return new LanguageProvider(messageController, options);
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
        let messageController: IMessageController;
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
        messageController = new MessageController(worker);
        return new LanguageProvider(messageController, options);
    }

    setProviderOptions(options?: ProviderOptions) {
        const defaultFunctionalities = {
            hover: true,
            completion: { overwriteCompleters: true },
            completionResolve: true,
            format: true,
            documentHighlights: true,
            signatureHelp: true,
            semanticTokens: false, //experimental functionality
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
    }

    private $registerSession = (session: Ace.EditSession, editor: Ace.Editor, options?: ServiceOptions) => {
        this.$sessionLanguageProviders[session["id"]] ??= new SessionLanguageProvider(this, session, editor, this.$messageController, options);
    }

    private $getSessionLanguageProvider(session: Ace.EditSession): SessionLanguageProvider {
        return this.$sessionLanguageProviders[session["id"]];
    }

    private $getFileName(session: Ace.EditSession) {
        let sessionLanguageProvider = this.$getSessionLanguageProvider(session);
        return sessionLanguageProvider.fileName;
    }

    registerEditor(editor: Ace.Editor) {
        if (!this.editors.includes(editor))
            this.$registerEditor(editor);
        this.$registerSession(editor.session, editor);
    }

    $registerEditor(editor: Ace.Editor) {
        this.editors.push(editor);

        //init Range singleton
        AceRange.getConstructor(editor);

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
            // @ts-ignore
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

        if (this.options.functionality!.hover) {
            if (!this.$hoverTooltip) {
                this.$hoverTooltip = new HoverTooltip();
            }
            this.$initHoverTooltip(editor);
        }

        if (this.options.functionality!.signatureHelp) {
            this.$signatureTooltip.registerEditor(editor);
        }

        this.setStyle(editor);
    }

    private $initHoverTooltip(editor) {
        this.$hoverTooltip.setDataProvider((e, editor) => {
            let session = editor.session;
            let docPos = e.getDocumentPosition();

            this.doHover(session, docPos, (hover) => {
                if (!hover)
                    return;
                var errorMarker = this.$getSessionLanguageProvider(session).state?.diagnosticMarkers?.getMarkerAtPosition(docPos);

                if (!errorMarker && !hover?.content) return;

                var range = hover?.range || errorMarker?.range;
                const Range = editor.getSelectionRange().constructor;
                range = range ? Range.fromPoints(range.start, range.end) : session.getWordRange(docPos.row, docPos.column);
                var hoverNode = hover && document.createElement("div");
                if (hoverNode) {
                    // todo render markdown using ace markdown mode
                    hoverNode.innerHTML = this.getTooltipText(hover);
                }

                var domNode = document.createElement('div');

                if (errorMarker) {
                    var errorDiv = document.createElement('div');
                    var errorText = document.createTextNode(errorMarker.tooltipText.trim());
                    errorDiv.appendChild(errorText);
                    domNode.appendChild(errorDiv);
                }

                if (hoverNode) {
                    domNode.appendChild(hoverNode);
                }
                this.$hoverTooltip.showForRange(editor, range, domNode, e);
            });
        });
        this.$hoverTooltip.addToEditor(editor);
    }

    setStyle(editor) {
        editor.renderer["$textLayer"].dom.importCssString(`.ace_tooltip * {
    margin: 0;
    font-size: 12px;
}

.ace_tooltip code {
    font-style: italic;
    font-size: 11px;
}

.language_highlight_error {
    position: absolute;
    border-bottom: dotted 1px #e00404;
    z-index: 2000;
    border-radius: 0;
}

.language_highlight_warning {
    position: absolute;
    border-bottom: solid 1px #DDC50F;
    z-index: 2000;
    border-radius: 0;
}

.language_highlight_info {
    position: absolute;
    border-bottom: dotted 1px #999;
    z-index: 2000;
    border-radius: 0;
}

.language_highlight_text, .language_highlight_read, .language_highlight_write {
    position: absolute;
    box-sizing: border-box;
    border: solid 1px #888;
    z-index: 2000;
}

.language_highlight_write {
    border: solid 1px #F88;
}`, "linters.css");
    }

    setSessionOptions<OptionsType extends ServiceOptions>(session: Ace.EditSession, options: OptionsType) {
        let sessionLanguageProvider = this.$getSessionLanguageProvider(session);
        sessionLanguageProvider.setOptions(options);
    }

    setGlobalOptions<T extends keyof ServiceOptionsMap>(serviceName: T & string, options: ServiceOptionsMap[T], merge = false) {
        this.$messageController.setGlobalOptions(serviceName, options, merge);
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
        let completer = {
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

    dispose() {
        this.$messageController.dispose(() => {
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
    fileName: string;
    private $messageController: IMessageController;
    private $deltaQueue: Ace.Delta[] | null;
    private $isConnected = false;
    private $modeIsChanged = false;
    private $options: ServiceOptions;
    private $servicesCapabilities?: { [serviceName: string]: lsp.ServerCapabilities };

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

    constructor(provider: LanguageProvider, session: Ace.EditSession, editor: Ace.Editor, messageController: IMessageController, options?: ServiceOptions) {
        this.$provider = provider;
        this.$messageController = messageController;
        this.session = session;
        this.editor = editor;
        this.initFileName();

        session.doc["version"] = 1;
        session.doc.on("change", this.$changeListener, true);
        this.addSemanticTokenSupport(session); //TODO: ?
        // @ts-ignore
        session.on("changeMode", this.$changeMode);
        if (this.$provider.options.functionality!.semanticTokens) {
            session.on("changeScrollTop", () => this.getSemanticTokens());
        }
        
        let initCallbacks = {
            "initCallback": this.$connected,
            "validationCallback": this.$showAnnotations,
            "changeCapabilitiesCallback": this.setServerCapabilities
        }

        this.$messageController.init(this.fileName, session.doc, this.$mode, options, initCallbacks);
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
        // @ts-ignore

        this.setServerCapabilities(capabilities);
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

        this.session.clearAnnotations();
        if (this.state.diagnosticMarkers) {
            this.state.diagnosticMarkers.setMarkers([]);
        }

        this.session.setSemanticTokens(undefined); //clear all semantic tokens

        this.$messageController.changeMode(this.fileName, this.session.getValue(), this.$mode, this.setServerCapabilities);
    };

    private setServerCapabilities = (capabilities: { [serviceName: string]: lsp.ServerCapabilities }) => {
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

                completer.triggerCharacters = allTriggerCharacters;
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
    }

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
            setTimeout(()=> this.$sendDeltaQueue(() => {
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
            this.$messageController.change(this.fileName, deltas.map((delta) =>
                fromAceDelta(delta, this.session.doc.getNewLineCharacter())), this.session.doc, callback);
    };

    private $showAnnotations = (diagnostics: lsp.Diagnostic[]) => {
        if (!diagnostics) {
            return;
        }
        this.session.clearAnnotations();
        let annotations = toAnnotations(diagnostics)
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
        this.$messageController.changeOptions(this.fileName, options);
    }

    validate = () => {
        this.$messageController.doValidation(this.fileName, this.$showAnnotations);
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
            this.$messageController.format(this.fileName, fromRange(range), $format, this.$applyFormat);
        }
    }

    private $applyFormat = (edits: lsp.TextEdit[]) => {
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
        
        this.$messageController.getSemanticTokens(this.fileName, fromRange(visibleRange), (tokens) => {
                if (!tokens) {
                    return;
                }
                let decodedTokens = parseSemanticTokens(tokens.data, this.semanticTokensLegend!.tokenTypes, this.semanticTokensLegend!.tokenModifiers);
                this.session.setSemanticTokens(decodedTokens);
                let bgTokenizer = this.session.bgTokenizer;
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
        this.$messageController.closeDocument(this.fileName, callback);
    }
}
