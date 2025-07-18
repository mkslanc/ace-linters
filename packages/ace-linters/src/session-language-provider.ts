import {Ace} from "ace-code";
import {ComboDocumentIdentifier, IMessageController} from "./types/message-controller-interface";
import {AceRangeData, ServiceOptions, SessionInitialConfig} from "./types/language-service";
import {MarkerGroup} from "./ace/marker_group";
import type {LanguageProvider} from "./language-provider";
import * as lsp from "vscode-languageserver-protocol";
import {DecodedSemanticTokens, mergeTokens, parseSemanticTokens} from "./type-converters/lsp/semantic-tokens";
import {convertToUri} from "./utils";
import {FormattingOptions} from "vscode-languageserver-protocol";
import {
    fromAceDelta, fromDocumentHighlights,
    fromRange,
    toAnnotations,
    toMarkerGroupItem,
    toRange,
} from "./type-converters/lsp/lsp-converters";
import {CommonConverter} from "./type-converters/common-converters";

export class SessionLanguageProvider {
    session: Ace.EditSession;
    documentUri: string;
    private $messageController: IMessageController;
    private $deltaQueue: Ace.Delta[] | null;
    private $isConnected = false;
    private $options?: ServiceOptions;
    private $filePath: string;
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
     * @param config
     */
    constructor(provider: LanguageProvider, session: Ace.EditSession, editor: Ace.Editor, messageController: IMessageController, config?: SessionInitialConfig) {
        this.$provider = provider;
        this.$messageController = messageController;
        this.session = session;
        this.editor = editor;

        session.doc.version = 1;
        session.doc.on("change", this.$changeListener, true);
        this.addSemanticTokenSupport(session); //TODO: ?
        session.on("changeMode", this.$changeMode);
        if (this.$provider.options.functionality!.semanticTokens) {
            session.on("changeScrollTop", () => this.getSemanticTokens());
        }

        this.$init(config);
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
     * Sets the file path for the current document and optionally joins it with the workspace URI.
     * Increments the document version and updates the internal document URI and identifier.
     *
     * @param {string} filePath - The new file path for the document.
     * @param {boolean} [joinWorkspaceURI] - Optional flag to indicate whether to join the file path with the workspace URI.
     */
    setFilePath(filePath: string, joinWorkspaceURI?: boolean) {
        this.enqueueIfNotConnected(() => {
            this.session.doc.version++;
            this.$filePath = filePath;
            const previousComboId = this.comboDocumentIdentifier;
            this.initDocumentUri(true, joinWorkspaceURI);
            this.$messageController.renameDocument(previousComboId, this.comboDocumentIdentifier.documentUri, this.session.doc.version);
        })
    };

    private $init(config?: SessionInitialConfig) {
        if (config?.filePath) {
            this.$filePath = config.filePath;
        }
        this.initDocumentUri(false, config?.joinWorkspaceURI);
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

        if (hasTriggerChars || this.$provider.options.functionality?.completion && this.$provider.options.functionality?.completion.lspCompleterOptions?.triggerCharacters) {
            let completer = this.editor.completers.find((completer) => completer.id === "lspCompleters");
            if (completer) {
                let allTriggerCharacters: string[] = [];
                Object.values(capabilities).forEach((capability) => {
                    if (capability?.completionProvider?.triggerCharacters) {
                        allTriggerCharacters.push(...capability.completionProvider.triggerCharacters);
                    }
                });

                allTriggerCharacters = [...new Set(allTriggerCharacters)];

                const triggerCharacterOptions = (typeof this.$provider.options.functionality?.completion == "object") ? this.$provider.options.functionality.completion.lspCompleterOptions?.triggerCharacters : undefined;
                if (triggerCharacterOptions) {
                    const removeChars: string[] = Array.isArray(triggerCharacterOptions.remove)
                        ? triggerCharacterOptions.remove
                        : [];
                    const addChars: string[] = Array.isArray(triggerCharacterOptions.add)
                        ? triggerCharacterOptions.add
                        : [];
                    completer.triggerCharacters = allTriggerCharacters.filter(
                        (char: string) => !removeChars.includes(char)
                    );
                    addChars.forEach((char: string) => {
                        if (!completer!.triggerCharacters!.includes(char)) {
                            completer!.triggerCharacters!.push(char);
                        }
                    });
                } else {
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

    private initDocumentUri(isRename = false, joinWorkspaceURI = false) {
        let filePath = this.$filePath ?? this.session["id"] + "." + this.$extension;
        if (isRename) {
            delete this.$provider.$urisToSessionsIds[this.documentUri];
        }
        this.documentUri = convertToUri(filePath, joinWorkspaceURI, this.$provider.workspaceUri);
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