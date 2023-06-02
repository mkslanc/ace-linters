import * as rpc from 'vscode-ws-jsonrpc';
import * as events from 'events';
import * as lsp from "vscode-languageserver-protocol";
import {
    BrowserMessageReader,
    BrowserMessageWriter,
    createProtocolConnection,
} from "vscode-languageserver-protocol/browser";
import {IMessageController} from "./types/message-controller-interface";
import {Ace} from "ace-code";
import {CompletionService, ServiceFeatures, SupportedServices} from "./types";

export class MessageControllerWS extends events.EventEmitter implements IMessageController {
    private isConnected = false;
    private isInitialized = false;
    private readonly socket: WebSocket;
    private serverCapabilities: lsp.ServerCapabilities;
    private connection: lsp.ProtocolConnection;
    private initSessionQueue: { textDocumentMessage: lsp.DidOpenTextDocumentParams, initCallback: () => void }[] = [];

    clientCapabilities: lsp.ClientCapabilities = {
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
                    documentationFormat: ['markdown', 'plaintext'],
                    deprecatedSupport: false,
                    preselectSupport: false,
                },
                contextSupport: false,
            },
            signatureHelp: {
                signatureInformation: {
                    documentationFormat: ['markdown', 'plaintext'],
                    activeParameterSupport: true
                }
            },
            documentHighlight: {
                dynamicRegistration: true
            }
        },
        workspace: {
            didChangeConfiguration: {
                dynamicRegistration: true,
            },
        } as lsp.WorkspaceClientCapabilities,
    };

    constructor(mode: WebSocket | Worker) {
        super();
        if (mode instanceof Worker) {
            this.$connectWorker(mode);
        } else {
            this.socket = mode;
            this.$connectSocket();
        }
    }

    configureFeatures(serviceName: SupportedServices, features: ServiceFeatures): void {
        throw new Error('Method not implemented.');
    }

    private $connectSocket() {
        rpc.listen({
            webSocket: this.socket,
            logger: new rpc.ConsoleLogger(),
            onConnection: (connection: rpc.MessageConnection) => {
                this.$connect(connection);
            },
        });
    }

    private $connectWorker(worker: Worker) {
        const connection = createProtocolConnection(
            new BrowserMessageReader(worker),
            new BrowserMessageWriter(worker)
        );
        this.$connect(connection);
    }

    private $connect(connection) {
        connection.listen();
        this.isConnected = true;

        this.connection = connection;
        this.sendInitialize();

        this.connection.onNotification('textDocument/publishDiagnostics', (
            result: lsp.PublishDiagnosticsParams,
        ) => {
            this.emit("validate-" + result.uri, result.diagnostics);
        });

        this.connection.onNotification('window/showMessage', (params: lsp.ShowMessageParams) => {
            this.emit('logging', params);
        });

        this.connection.onRequest('window/showMessageRequest', (params: lsp.ShowMessageRequestParams) => {
            this.emit('logging', params);
        });

        this.connection.onError((e) => {
            this.emit('error', e);
        });

        this.connection.onClose(() => {
            this.isConnected = false;
        });

        this.initSessionQueue.forEach((initSession) => this.initSession(initSession.textDocumentMessage, initSession.initCallback));
    }

    init(sessionId: string, document: Ace.Document, mode: string, options: any, initCallback: () => void, validationCallback: (annotations: lsp.Diagnostic[]) => void) {
        this["on"]("validate-" + sessionId, validationCallback);

        const textDocumentMessage: lsp.DidOpenTextDocumentParams = {
            textDocument: {
                uri: sessionId,
                languageId: mode,
                text: document.getValue(),
                version: document["version"],
            } as lsp.TextDocumentItem,
        };

        if (!this.isConnected) {
            this.initSessionQueue.push({textDocumentMessage: textDocumentMessage, initCallback: initCallback});
        } else {
            this.initSession(textDocumentMessage, initCallback);
        }
    }

    initSession(textDocumentMessage: lsp.DidOpenTextDocumentParams, initCallback) {
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
        const message: lsp.InitializeParams = {
            capabilities: this.clientCapabilities,
            initializationOptions: null,
            processId: null,
            rootUri: "", //TODO: this.documentInfo.rootUri
            workspaceFolders: null,
        };

        this.connection.sendRequest("initialize", message).then((params: lsp.InitializeResult) => {
            this.isInitialized = true;
            this.serverCapabilities = params.capabilities as lsp.ServerCapabilities;

            this.connection.sendNotification('initialized');
            this.connection.sendNotification('workspace/didChangeConfiguration', {
                settings: {},
            });
        });
    }

    change(sessionId: string, deltas: lsp.TextDocumentContentChangeEvent[], document, callback?: () => void) {
        if (!this.isConnected) {
            return;
        }
        const textDocumentChange: lsp.DidChangeTextDocumentParams = {
            textDocument: {
                uri: sessionId,
                version: document["version"],
            } as lsp.VersionedTextDocumentIdentifier,
            contentChanges: deltas,
        };
        this.connection.sendNotification('textDocument/didChange', textDocumentChange).then(() => callback && callback());
    }

    doHover(sessionId: string, position: lsp.Position, callback?: (hover: lsp.Hover[]) => void) {
        if (!this.isInitialized) {
            return;
        }
        if (!(this.serverCapabilities && this.serverCapabilities.hoverProvider)) {
            return;
        }
        let options: lsp.TextDocumentPositionParams = {
            textDocument: {
                uri: sessionId,
            },
            position: position,
        };
        let hoverCallback = (result: lsp.Hover) => {
            callback && callback([result]);
        };
        this.postMessage('textDocument/hover', sessionId, options, hoverCallback);
    }

    doComplete(sessionId: string, position: lsp.Position, callback?: (completions: CompletionService[]) => void) {
        if (!this.isInitialized) {
            return;
        }
        if (!(this.serverCapabilities && this.serverCapabilities.completionProvider)) {
            return;
        }

        let options: lsp.CompletionParams = {
            textDocument: {
                uri: sessionId,
            },
            position: position,
        };
        let completionCallback = (result: lsp.CompletionItem[] | lsp.CompletionList | null) => {
            let completionService = {
                completions: result,
                service: "lsp"
            }
            callback && callback([completionService]);
        };
        this.postMessage('textDocument/completion', sessionId, options, completionCallback);
    }

    doResolve(sessionId: string, completion: lsp.CompletionItem, callback?: (completion: lsp.CompletionItem | null) => void) {
        if (!this.isInitialized)
            return;
        if (!this.serverCapabilities?.completionProvider?.resolveProvider)
            return;
        this.postMessage('completionItem/resolve', sessionId, completion["item"], (result: lsp.CompletionItem) => {
            callback && callback(result);
        });
    }

    changeMode(sessionId: string, value: string, mode: string, callback?: () => void): void {
    }

    changeOptions(sessionId: string, options: any, callback?: () => void): void {//TODO:
    }

    dispose(sessionId: string, callback?: () => void): void {
        this.connection.sendNotification('textDocument/didClose', {
            textDocument: {
                uri: sessionId
            }
        } as lsp.DidCloseTextDocumentParams);
    }

    doValidation(sessionId: string, callback?: (annotations: lsp.Diagnostic[]) => void) {
        //TODO: textDocument/diagnostic capability
    }

    format(sessionId: string, range: lsp.Range, format: lsp.FormattingOptions, callback?: (edits: lsp.TextEdit[]) => void) {
        if (!this.isInitialized) {
            return;
        }
        if (!(this.serverCapabilities && this.serverCapabilities.documentRangeFormattingProvider)) {
            return;
        }
        let options: lsp.DocumentRangeFormattingParams = {
            textDocument: {
                uri: sessionId,
            },
            options: format,
            range: range
        };
        this.postMessage('textDocument/rangeFormatting', sessionId, options, (params: lsp.TextEdit[]) => {
            callback && callback(params);
        });
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

    findDocumentHighlights(sessionId: string, position: lsp.Position, callback?: (documentHighlights: lsp.DocumentHighlight[]) => void) {
        if (!this.isInitialized)
            return;
        if (!this.serverCapabilities?.documentHighlightProvider)
            return;
        let options: lsp.DocumentHighlightParams = {
            textDocument: {
                uri: sessionId,
            },
            position: position,
        };
        let documentHighlightCallback = (result: lsp.DocumentHighlight[]) => {
            callback && callback(result);
        };
        this.postMessage('textDocument/documentHighlight', sessionId, options, documentHighlightCallback);
    }

    provideSignatureHelp(sessionId: string, position: lsp.Position, callback?: (signatureHelp: lsp.SignatureHelp[]) => void) {
        if (!this.isInitialized)
            return;
        if (!this.serverCapabilities?.signatureHelpProvider)
            return;
        let options: lsp.SignatureHelpParams = {
            textDocument: {
                uri: sessionId,
            },
            position: position,
        };
        let signatureHelpCallback = (result: lsp.SignatureHelp) => {
            callback && callback([result]);
        };
        this.postMessage('textDocument/signatureHelp', sessionId, options, signatureHelpCallback);
    }
}
