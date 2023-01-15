import * as rpc from 'vscode-ws-jsonrpc';
import * as events from 'events';
import {
    ClientCapabilities, CompletionItem, CompletionList, CompletionParams,
    DidChangeTextDocumentParams,
    DidOpenTextDocumentParams, Hover,
    InitializeParams,
    InitializeResult,
    PublishDiagnosticsParams,
    ServerCapabilities,
    ShowMessageParams,
    ShowMessageRequestParams,
    TextDocumentItem,
    TextDocumentPositionParams,
    VersionedTextDocumentIdentifier,
    WorkspaceClientCapabilities
} from 'vscode-languageserver-protocol';
import {IMessageController} from "./types/message-controller-interface";
import {Ace} from "ace-code";
import {AceLinters} from "./types";
import {
    fromPoint,
    fromRange,
    toAceTextEdits, toAnnotations,
    toCompletions,
    toRange, toResolvedCompletion,
    toTooltip
} from "./type-converters/lsp-converters";
import {
    DocumentRangeFormattingParams
} from "vscode-languageserver-protocol/lib/common/protocol";
import {TextEdit} from "vscode-languageserver-types";

export class MessageControllerWS extends events.EventEmitter implements IMessageController {
    private isConnected = false;
    private isInitialized = false;
    private socket: WebSocket;
    private serverCapabilities: ServerCapabilities;
    private documentVersion = 0;
    private connection: rpc.MessageConnection;
    private initSessionQueue: {textDocumentMessage: DidOpenTextDocumentParams, initCallback: () => void}[] = [];

    clientCapabilities: ClientCapabilities = {
        textDocument: {
            hover: {
                dynamicRegistration: true,
                contentFormat: ['markdown', 'plaintext'],
            },
            synchronization: {
                dynamicRegistration: true,
                willSave: false,
                didSave: false,
                willSaveWaitUntil: false,
            },
            formatting: {
                dynamicRegistration: true
            },
            completion: {
                dynamicRegistration: true,
                completionItem: {
                    snippetSupport: true,
                    commitCharactersSupport: false,
                    documentationFormat: ['plaintext', 'markdown'],
                    deprecatedSupport: false,
                    preselectSupport: false,
                },
                contextSupport: false,
            }
        },
        workspace: {
            didChangeConfiguration: {
                dynamicRegistration: true,
            },
        } as WorkspaceClientCapabilities,
    };

    constructor(socket: WebSocket) {
        super();
        this.socket = socket;
        this.$connect();
    }

    private $connect() {
        rpc.listen({
            webSocket: this.socket,
            logger: new rpc.ConsoleLogger(),
            onConnection: (connection: rpc.MessageConnection) => {
                connection.listen();
                this.isConnected = true;

                this.connection = connection;
                this.sendInitialize();

                this.connection.onNotification('textDocument/publishDiagnostics', (
                    result: PublishDiagnosticsParams,
                ) => {
                    this.emit("validate-" + result.uri, toAnnotations(result.diagnostics));
                });

                this.connection.onNotification('window/showMessage', (params: ShowMessageParams) => {
                    this.emit('logging', params);
                });

                this.connection.onRequest('window/showMessageRequest', (params: ShowMessageRequestParams) => {
                    this.emit('logging', params);
                });

                this.connection.onError((e) => {
                    this.emit('error', e);
                });

                this.connection.onClose(() => {
                    this.isConnected = false;
                });

                this.initSessionQueue.forEach((initSession) => this.initSession(initSession.textDocumentMessage, initSession.initCallback));
            },
        });
    }

    init(sessionId: string, value: string, mode: string, options: AceLinters.ServiceOptions, initCallback: () => void, validationCallback: (annotations: Ace.Annotation[]) => void) {
        this["on"]("validate-" + sessionId, validationCallback);

        const textDocumentMessage: DidOpenTextDocumentParams = {
            textDocument: {
                uri: sessionId,
                languageId: mode,
                text: value,
                version: this.documentVersion,
            } as TextDocumentItem,
        };

        if (!this.isConnected) {
            this.initSessionQueue.push({textDocumentMessage: textDocumentMessage, initCallback: initCallback});
        } else {
            this.initSession(textDocumentMessage, initCallback);
        }
    }

    initSession(textDocumentMessage: DidOpenTextDocumentParams, initCallback) {
        this.connection.sendNotification('textDocument/didOpen', textDocumentMessage);
        initCallback();
    }

    close() { //TODO:
        if (this.connection) {
            this.connection.dispose();
        }
        this.socket.close();
    }

    sendInitialize() {
        if (!this.isConnected) {
            return;
        }
        const message: InitializeParams = {
            capabilities: this.clientCapabilities,
            initializationOptions: null,
            processId: null,
            rootUri: "", //TODO: this.documentInfo.rootUri
            workspaceFolders: null,
        };

        this.connection.sendRequest("initialize", message).then((params: InitializeResult) => {
            this.isInitialized = true;
            this.serverCapabilities = params.capabilities as ServerCapabilities;

            this.connection.sendNotification('initialized');
            this.connection.sendNotification('workspace/didChangeConfiguration', {
                settings: {},
            });
        });
    }

    change(sessionId: string, deltas: Ace.Delta[], value: string, docLength: number, callback?: () => void) {
        //TODO: incremental deltas
        if (!this.isConnected) {
            return;
        }
        const textDocumentChange: DidChangeTextDocumentParams = {
            textDocument: {
                uri: sessionId,
                version: this.documentVersion,
            } as VersionedTextDocumentIdentifier,
            contentChanges: [{
                text: value,
            }],
        };
        this.connection.sendNotification('textDocument/didChange', textDocumentChange);
        this.documentVersion++;
    }

    doHover(sessionId: string, position: Ace.Point, callback?: (hover: AceLinters.Tooltip) => void) {
        if (!this.isInitialized) {
            return;
        }
        if (!(this.serverCapabilities && this.serverCapabilities.hoverProvider)) {
            return;
        }
        let options: TextDocumentPositionParams = {
            textDocument: {
                uri: sessionId,
            },
            position: fromPoint(position),
        };
        let hoverCallback = (result: Hover) => {
            callback(toTooltip(result));
        };
        this.postMessage('textDocument/hover', sessionId, options, hoverCallback);
    }

    doComplete(sessionId: string, position: Ace.Point, callback?: (completionList: Ace.Completion[]) => void) {
        if (!this.isInitialized) {
            return;
        }
        if (!(this.serverCapabilities && this.serverCapabilities.completionProvider)) {
            return;
        }

        let options: CompletionParams = {
            textDocument: {
                uri: sessionId,
            },
            position: fromPoint(position),
        };
        let completionCallback = (result: CompletionList | CompletionItem[] | null) => {
            callback(toCompletions(result));
        };
        this.postMessage('textDocument/completion', sessionId, options, completionCallback);
    }

    doResolve(sessionId: string, completion: Ace.Completion, callback?: (completion: Ace.Completion) => void) {
        if (!this.isInitialized) {
            return;
        }
        let resolveCallback = (result: CompletionItem) => {
            callback(toResolvedCompletion(completion, result));
        };
        this.postMessage('completionItem/resolve', sessionId, completion["item"], resolveCallback);
    }

    changeMode(sessionId: string, value: string, mode: string, options: any, callback?: () => void): void {
    }

    changeOptions(sessionId: string, options: any, callback?: () => void): void {//TODO:
    }

    dispose(sessionId: string, callback?: () => void): void { //TODO:
    }

    doValidation(sessionId: string, callback?: (annotations: Ace.Annotation[]) => void) {
        //TODO:
    }

    format(sessionId: string, range: Ace.Range, format: any, callback?: (edits: any[]) => void): void {
        if (!this.isInitialized) {
            return;
        }
        let options: DocumentRangeFormattingParams = {
            textDocument: {
                uri: sessionId,
            },
            options: format,
            range: fromRange(range)
        };
        let formatCallback = (params: TextEdit[]) => {
            callback(toAceTextEdits(params));
        }
        this.postMessage('textDocument/rangeFormatting', sessionId, options, formatCallback);
    }

    setGlobalOptions(serviceName: string, options: any, merge?: boolean): void { //TODO: ?
    }

    postMessage(name, sessionId, options, callback: (any) => void) {
        let eventName = name + "-" + sessionId;
        let callbackFunction = (data) => {
            this["off"](eventName, callbackFunction);
            callback(data);
        }
        this["on"](eventName, callbackFunction);
        this.connection.sendRequest(name, options).then((params) => {
            this.emit(eventName, params);
        })
    }
}
