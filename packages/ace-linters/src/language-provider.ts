import {Ace} from "ace-code";
import "./types/ace-extension";

import {CommonConverter} from "./type-converters/common-converters";
import {IMessageController} from "./types/message-controller-interface";
import {MessageController} from "./message-controller";
import {
    fromAnnotations,
    fromPoint,
    fromRange, fromSignatureHelp,
    toCompletionItem,
    toCompletions, toInlineCompletions,
    toRange, toResolvedCompletion,
    toTooltip
} from "./type-converters/lsp/lsp-converters";
import * as lsp from "vscode-languageserver-protocol";

import showdown from "showdown";
import {createWorker} from "./cdn-worker";
import {SignatureTooltip} from "./components/signature-tooltip";
import {
    CodeActionsByService,
    ProviderOptions,
    ServiceFeatures,
    ServiceOptions,
    ServiceOptionsMap, ServiceStruct, SessionInitialConfig,
    SupportedServices,
    Tooltip
} from "./types/language-service";
import {AceRange} from "./ace/range-singleton";
import {HoverTooltip} from "./ace/hover-tooltip";
import {LightbulbWidget} from "./components/lightbulb";
import {AceVirtualRenderer} from "./ace/renderer-singleton";
import {AceEditor} from "./ace/editor-singleton";
import {setStyles} from "./misc/styles";
import {convertToUri} from "./utils";
import {createInlineCompleterAdapter} from "./ace/inline_autocomplete";
import {SessionLanguageProvider} from "./session-language-provider";

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
    private $lightBulbWidgets: { [editorId: string]: LightbulbWidget } = {};
    private stylesEmbedded: boolean;
    private inlineCompleter?: any;
    private doLiveAutocomplete: (e) => void;
    private completerAdapter?: {
        InlineCompleter: any;
        doLiveAutocomplete: (e) => void;
        validateAceInlineCompleterWithEditor: (editor: Ace.Editor) => void;
    };

    private constructor(worker: Worker, options?: ProviderOptions) {
        this.$messageController = new MessageController(worker, this);
        this.setProviderOptions(options);
        this.$signatureTooltip = new SignatureTooltip(this);
    }

    /**
     *  Creates LanguageProvider using our transport protocol with the ability to register different services on the same
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
            codeActions: true,
            inlineCompletion: false
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
        if (options?.workspacePath) {
            this.workspaceUri = convertToUri(options.workspacePath);
        }
        if (this.options.functionality.inlineCompletion) {
            this.checkInlineCompletionAdapter(() => {
                if (!this.options.aceComponents?.InlineAutocomplete || !this.options.aceComponents?.CommandBarTooltip || !this.options.aceComponents?.CompletionProvider) {
                    throw new Error("Inline completion requires the InlineAutocomplete, CompletionProvider and CommandBarTooltip to be" +
                        " defined");
                }
                this.completerAdapter = createInlineCompleterAdapter(this.options.aceComponents.InlineAutocomplete, this.options.aceComponents.CommandBarTooltip, this.options.aceComponents.CompletionProvider);
            });
        }
    }

    private checkInlineCompletionAdapter(method: () => void) {
        try {
            method();
        } catch (e) {
            console.error(`Inline completion disabled: Incompatible Ace implementation: ${e.message}`);
            if (this.options?.functionality) {
                this.options.functionality.inlineCompletion = false;
            }
        }
    }

    /**
     * Sets the file path for the given Ace edit session. Optionally allows the file path to
     * be joined with the workspace URI.
     *
     * @param session The Ace edit session to update with the file path.
     * @param config config to set
     */
    setSessionFilePath(session: Ace.EditSession, config: SessionInitialConfig) {
        this.$getSessionLanguageProvider(session)?.setFilePath(config.filePath, config.joinWorkspaceURI);
    }

    private $registerSession = (session: Ace.EditSession, editor: Ace.Editor, config?: SessionInitialConfig) => {
        if (!this.$sessionLanguageProviders[session["id"]]) {
            this.$sessionLanguageProviders[session["id"]] = new SessionLanguageProvider(this, session, editor, this.$messageController, config);
        }
        if (config) {
            this.$sessionLanguageProviders[session["id"]].setFilePath(config.filePath, config.joinWorkspaceURI);
        }
    }

    private $getSessionLanguageProvider(session: Ace.EditSession): SessionLanguageProvider {
        return this.$sessionLanguageProviders[session["id"]];
    }

    private $getFileName(session: Ace.EditSession) {
        let sessionLanguageProvider = this.$getSessionLanguageProvider(session);
        return sessionLanguageProvider.comboDocumentIdentifier;
    }

    /**
     * Registers an Ace editor instance along with the session's configuration settings.
     *
     * @param editor - The Ace editor instance to be registered.
     * @param [config] - Configuration options for the session.
     */
    registerEditor(editor: Ace.Editor, config?: SessionInitialConfig) {
        if (!this.editors.includes(editor))
            this.$registerEditor(editor);
        this.$registerSession(editor.session, editor, config);
    }

    codeActionCallback: (codeActions: CodeActionsByService[]) => void;

    /**
     * Sets a callback function that will be triggered with an array of code actions grouped by service.
     *
     * @param {function} callback - A function that receives an array of code actions, categorized by service, as its argument.
     */
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

        if (this.options.functionality!.completion || this.options.functionality!.inlineCompletion) {
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

    /**
     * Sets global options for the specified service.
     *
     * @param serviceName - The name of the service for which to set global options.
     * @param options - The options to set for the specified service.
     * @param {boolean} [merge=false] - Indicates whether to merge the provided options with the existing options. Defaults to false.
     */
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
        this.$messageController.setWorkspace(this.workspaceUri);
    }

    /**
     * Sets the options for a specified editor session.
     *
     * @param session - The Ace editor session to configure.
     * @param options - The configuration options to be applied to the session.
     */
    setSessionOptions<OptionsType extends ServiceOptions>(session: Ace.EditSession, options: OptionsType) {
        let sessionLanguageProvider = this.$getSessionLanguageProvider(session);
        sessionLanguageProvider.setOptions(options);
    }

    /**
     * Configures the specified features for a given service.
     *
     * @param {SupportedServices} serviceName - The name of the service for which features are being configured.
     * @param {ServiceFeatures} features - The features to be configured for the given service.
     * @return {void} Does not return a value.
     */
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

    doComplete(editor: Ace.Editor, session: Ace.EditSession, callback: (completionList: Ace.Completion[] | null) => void) {
        let cursor = editor.getCursorPosition();
        this.$messageController.doComplete(this.$getFileName(session), fromPoint(cursor),
            (completions) => completions && callback(toCompletions(completions)));
    }

    doInlineComplete(editor: Ace.Editor, session: Ace.EditSession, callback: (completionList: Ace.Completion[] | null) => void) {
        let cursor = editor.getCursorPosition();
        this.$messageController.doInlineComplete(this.$getFileName(session), fromPoint(cursor),
            (completions) => completions && callback(toInlineCompletions(completions)));
    }

    doResolve(item: Ace.Completion, callback: (completionItem: lsp.CompletionItem | null) => void) {
        this.$messageController.doResolve(item["fileName"], toCompletionItem(item), callback);
    }

    $registerCompleters(editor: Ace.Editor) {
        let completer: Ace.Completer, inlineCompleter: Ace.Completer;
        if (!this.options.functionality?.completion && !this.options.functionality?.inlineCompletion) {
            return;
        }
        if (this.options.functionality?.completion && this.options.functionality?.completion.overwriteCompleters) {
            editor.completers = [];
        }
        if (this.options.functionality?.inlineCompletion && this.options.functionality?.inlineCompletion.overwriteCompleters) {
            editor.inlineCompleters = [];
        }
        if (this.options.functionality.completion) {
            completer = {
                getCompletions: async (editor, session, pos, prefix, callback) => {
                    this.$getSessionLanguageProvider(session).$sendDeltaQueue(() => {
                        const completionCallback = (completions) => {
                            let fileName = this.$getFileName(session);
                            if (!completions)
                                return;
                            completions.forEach((item) => {
                                item.completerId = completer.id;
                                item["fileName"] = fileName
                            });
                            callback(null, CommonConverter.normalizeRanges(completions));
                        };
                        this.doComplete(editor, session, completionCallback);
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
            editor.completers.push(completer);
        }

        if (this.options?.functionality?.inlineCompletion) {
            this.checkInlineCompletionAdapter(() => {
                if (this.completerAdapter) {
                    editor.inlineCompleters ??= [];
                    this.completerAdapter.validateAceInlineCompleterWithEditor(editor);
                    this.inlineCompleter = this.completerAdapter.InlineCompleter;
                    this.doLiveAutocomplete = this.completerAdapter.doLiveAutocomplete;
                }
            });
        }

        if (this.options.functionality?.inlineCompletion) {
            editor.commands.addCommand({
                name: "startInlineAutocomplete",
                exec: (editor, options) => {
                    var completer = this.inlineCompleter?.for(editor);
                    completer.show(options);
                },
                bindKey: {win: "Alt-C", mac: "Option-C"}
            });
            editor.commands.on('afterExec', this.doLiveAutocomplete);

            inlineCompleter = {
                getCompletions: async (editor, session, pos, prefix, callback) => {
                    this.$getSessionLanguageProvider(session).$sendDeltaQueue(() => {
                        const completionCallback = (completions) => {
                            let fileName = this.$getFileName(session);
                            if (!completions)
                                return;
                            completions.forEach((item) => {
                                item.completerId = completer.id;
                                item["fileName"] = fileName
                            });
                            callback(null, CommonConverter.normalizeRanges(completions));
                        };
                        this.doInlineComplete(editor, session, completionCallback);
                    });
                },
                id: "lspInlineCompleters"
            }
            editor.inlineCompleters.push(inlineCompleter);
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

    /**
     * Sends a request to the message controller.
     * @param serviceName - The name of the service/server to send the request to.
     * @param method - The method name for the request.
     * @param params - The parameters for the request.
     * @param callback - An optional callback function that will be called with the result of the request.
     */
    sendRequest(serviceName: string, method: string, params: any, callback?: (result: any) => void) {
        this.$messageController.sendRequest(serviceName, method, params, callback);
    }

    showDocument(params: lsp.ShowDocumentParams, serviceName: string, callback?: (result: lsp.LSPAny, serviceName: string) => void) {
        //TODO: implement other params for showDocument (external, takeFocus, selection)
        try {
            window.open(params.uri, "_blank");
            callback && callback({
                success: true,
            }, serviceName);
        } catch (e) {
            callback && callback({
                success: false,
                error: e
            }, serviceName);
        }
    }
}
