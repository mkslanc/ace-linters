import * as rpc from 'vscode-ws-jsonrpc';
import * as lsp from "vscode-languageserver-protocol";
import {
    BrowserMessageReader,
    BrowserMessageWriter,
    createProtocolConnection,

} from "vscode-languageserver-protocol/browser";
import {
    LanguageClientConfig,
    LanguageService,
    ServiceOptions,
} from "../types/language-service";
import {BaseService} from "./base-service";
import {MessageType} from "../message-types";
import {WorkspaceFolder} from "vscode-languageserver-protocol";

export class LanguageClient extends BaseService implements LanguageService {
    $service;
    private isConnected = false;
    private isInitialized = false;
    private socket: WebSocket;
    private connection: lsp.ProtocolConnection;
    private requestsQueue: Function[] = [];
    callbackId = 0;
    callbacks = {};

    serverData: LanguageClientConfig;
    ctx;

    constructor(serverData: LanguageClientConfig, ctx, workspaceUri?: string) {
        super(serverData.modes, workspaceUri);
        this.ctx = ctx;
        this.serverData = serverData;
        this.$connect();
    }

    private $connect() {
        switch (this.serverData.type) {
            case "webworker":
                if ('worker' in this.serverData) {
                    this.$connectWorker(this.serverData.worker, this.serverData.initializationOptions);
                } else {
                    throw new Error("No worker provided");
                }
                break;
            case "socket":
                if ('socket' in this.serverData) {
                    this.socket = this.serverData.socket;
                    this.$connectSocket(this.serverData.initializationOptions);
                } else {
                    throw new Error("No socketUrl provided");
                }
                break;
            default:
                throw new Error("Unknown server type: " + this.serverData.type);
        }
    }

    private $connectSocket(initializationOptions) {
        rpc.listen({
            webSocket: this.socket,
            onConnection: (connection) => {
                this.$initConnection(connection, initializationOptions);
            },
        });
        if (this.socket.readyState === WebSocket.OPEN)
            this.socket.dispatchEvent(new Event('open'));
    }

    private $connectWorker(worker: Worker, initializationOptions?: { [option: string]: any }) {
        const connection = createProtocolConnection(
            new BrowserMessageReader(worker),
            new BrowserMessageWriter(worker)
        );
        this.$initConnection(connection, initializationOptions);
    }

    private $initConnection(connection, initializationOptions) {
        connection.listen();
        this.isConnected = true;

        this.connection = connection;
        this.sendInitialize(initializationOptions);

        this.connection.onNotification('textDocument/publishDiagnostics', (
            result: lsp.PublishDiagnosticsParams,
        ) => {
            let postMessage = {
                "type": MessageType.validate,
                "documentUri": result.uri,
                "value": result.diagnostics,
            };
            this.ctx.postMessage(postMessage);
        });

        this.connection.onNotification('window/showMessage', (params: lsp.ShowMessageParams) => {
            this.showLog(params);
        });

        this.connection.onNotification('window/logMessage', (params: lsp.LogMessageParams) => {
            this.showLog(params);
        });
        this.connection.onNotification('$/logTrace', (params: lsp.LogTraceParams) => {
            this.showTrace(params);
        });

        this.connection.onRequest('window/showMessageRequest', (params: lsp.ShowMessageRequestParams) => {
            this.showLog(params);
        });

        this.connection.onRequest('workspace/configuration', (params: lsp.ConfigurationParams) => {
            console.log(params);
        });

        this.connection.onRequest('client/registerCapability', (params) => {
            console.log(params);
        });

        this.connection.onRequest('workspace/applyEdit', async (params: lsp.ApplyWorkspaceEditParams) => {
            return new Promise((resolve, reject) => {
                const callbackId = this.callbackId++;
                this.callbacks[callbackId] = (result) => {
                    if (result.applied) {
                        resolve(result);
                    } else {
                        reject(new Error(result.failureReason));
                    }
                };
                let postMessage = {
                    "type": MessageType.applyEdit,
                    "serviceName": this.serviceName,
                    "value": params.edit,
                    "callbackId": callbackId,
                };
                this.ctx.postMessage(postMessage);
            });
        });

        this.connection.onRequest('window/showDocument', (params: lsp.ShowDocumentParams) => {
            return new Promise((resolve, reject) => {
                const callbackId = this.callbackId++;
                this.callbacks[callbackId] = (result) => {
                    resolve(result);
                };
                let postMessage = {
                    "type": MessageType.showDocument, "serviceName": this.serviceName, ...params
                };
                this.ctx.postMessage(postMessage);
            });
        });

        this.connection.onError((e) => {
            throw e;
        });

        this.connection.onClose(() => {
            this.isConnected = false;
        });
    }

    private async $reconnect() {
        Object.values(this.documents).forEach(document => this.removeDocument(document));
        await this.dispose();
        this.$connect();
    }

    sendAppliedResult(result: lsp.ApplyWorkspaceEditResult, callbackId: number) {
        if (!this.isConnected || !this.callbacks[callbackId]) {
            return;
        }
        this.callbacks[callbackId](result);
    }

    sendResponse(callbackId: number, args?: lsp.LSPAny) {
        if (!this.isConnected || !this.callbacks[callbackId]) {
            return;
        }
        this.callbacks[callbackId](args);
    }

    showLog(params: lsp.ShowMessageParams) {
        switch (params.type) {
            case 1:
                console.error(params.message);
                break;
            case 2:
                console.warn(params.message);
                break;
            case 3:
                console.info(params.message);
                break;
            case 4:
            default:
                console.log(params.message);
                break;
        }
    }

    showTrace(params: lsp.LogTraceParams) {
        console.log(params.message);
        if (params.verbose) {
            console.log(params.verbose);
        }
    }

    addDocument(document: lsp.TextDocumentItem) {//TODO: this need to be async to avoid race condition
        if (this.getDocument(document.uri)) {
            console.warn(document.uri + ' already exists');
            return;
        }
        super.addDocument(document);
        const textDocumentMessage: lsp.DidOpenTextDocumentParams = {
            textDocument: document
        };

        this.enqueueIfNotConnected(() => this.connection.sendNotification('textDocument/didOpen', textDocumentMessage));
    }

    enqueueIfNotConnected(callback: () => void) {
        if (!this.isConnected || !this.isInitialized) {
            this.requestsQueue.push(callback);
        } else {
            callback();
        }
    }

    removeDocument(document: lsp.TextDocumentIdentifier) {
        super.removeDocument(document);
        this.enqueueIfNotConnected(() => this.connection.sendNotification('textDocument/didClose', {
            textDocument: {
                uri: document.uri
            }
        } as lsp.DidCloseTextDocumentParams));
    }

    async dispose() {
        this.connection?.dispose();
    }

    async closeConnection() {
        if (!this.connection)
            return;
        await this.dispose();
        await this.connection.sendRequest("shutdown");
        await this.connection.sendNotification('exit');
        if (this.socket)
            this.socket.close();
        this.isConnected = false;
    }

    sendInitialize(initializationOptions) {
        if (!this.isConnected)
            return;
        const message: lsp.InitializeParams = {
            capabilities: this.clientCapabilities,
            initializationOptions: initializationOptions,
            processId: null,
            rootUri: null, //TODO: this.documentInfo.rootUri
        };
        if (this.workspaceUri) {
            message.workspaceFolders = [this.workspaceFolder];
        }

        this.connection.sendRequest("initialize", message).then((params: lsp.InitializeResult) => {
            this.isInitialized = true;
            this.serviceCapabilities = params.capabilities as lsp.ServerCapabilities;
            const serviceName = this.serviceName;
            Object.keys(this.documents).forEach((documentUri) => {
                const postMessage = {
                    "type": MessageType.capabilitiesChange,
                    "value": {
                        [serviceName]: this.serviceCapabilities
                    },
                    documentUri: documentUri
                };
                this.ctx.postMessage(postMessage);
            });


            this.connection.sendNotification('initialized', {}).then(() => {
                this.connection.sendNotification('workspace/didChangeConfiguration', {
                    settings: {},
                });

                this.requestsQueue.forEach((requestCallback) => requestCallback());
                this.requestsQueue = [];
            });
        });
    }

    applyDeltas(identifier: lsp.VersionedTextDocumentIdentifier, deltas: lsp.TextDocumentContentChangeEvent[]) {
        super.applyDeltas(identifier, deltas);
        if (!this.isConnected || !this.serviceCapabilities) {
            return;
        }
        if (this.serviceCapabilities?.textDocumentSync === lsp.TextDocumentSyncKind.None) {
            return;
        }
        if (this.serviceCapabilities?.textDocumentSync !== lsp.TextDocumentSyncKind.Incremental) {
            return this.setValue(identifier, this.getDocument(identifier.uri).getText());
        }
        const textDocumentChange: lsp.DidChangeTextDocumentParams = {
            textDocument: {
                uri: identifier.uri,
                version: identifier.version,
            } as lsp.VersionedTextDocumentIdentifier,
            contentChanges: deltas,
        };
        this.connection.sendNotification('textDocument/didChange', textDocumentChange);
    }

    setValue(identifier: lsp.VersionedTextDocumentIdentifier, value: string) {
        super.setValue(identifier, value);
        if (!this.isConnected) {
            return;
        }
        if (this.serviceCapabilities?.textDocumentSync === lsp.TextDocumentSyncKind.None) {
            return;
        }
        const textDocumentChange: lsp.DidChangeTextDocumentParams = {
            textDocument: {
                uri: identifier.uri,
                version: identifier.version,
            } as lsp.VersionedTextDocumentIdentifier,
            contentChanges: [{text: value}],
        };
        this.connection.sendNotification('textDocument/didChange', textDocumentChange);
    }

    async doHover(document: lsp.TextDocumentIdentifier, position: lsp.Position) {
        if (!this.isInitialized) {
            return null;
        }
        if (!this.serviceCapabilities?.hoverProvider) {
            return null;
        }
        let options: lsp.TextDocumentPositionParams = {
            textDocument: {
                uri: document.uri,
            },
            position: position,
        };
        return this.connection.sendRequest('textDocument/hover', options) as Promise<lsp.Hover | null>;
    }

    async doComplete(document: lsp.TextDocumentIdentifier, position: lsp.Position) {
        if (!this.isInitialized) {
            return null;
        }
        if (!this.serviceCapabilities?.completionProvider) {
            return null;
        }

        let options: lsp.CompletionParams = {
            textDocument: {
                uri: document.uri,
            },
            position: position,
        };
        return this.connection.sendRequest('textDocument/completion', options) as Promise<lsp.CompletionList | lsp.CompletionItem[] | null>;
    }

    async doInlineComplete(document: lsp.VersionedTextDocumentIdentifier, position: lsp.Position) {
        if (!this.isInitialized) {
            return null;
        }
        if (!this.serviceCapabilities?.inlineCompletionProvider) {
            return null;
        }

        let options: lsp.InlineCompletionParams = {
            textDocument: {
                uri: document.uri,
                // @ts-ignore
                version: document.version,
            },
            position: position,
            context: {
                triggerKind: 1,
            }
        };
        return this.connection.sendRequest('textDocument/inlineCompletion', options) as Promise<lsp.InlineCompletionList | lsp.InlineCompletionItem[] | null>;
    }

    async doResolve(item: lsp.CompletionItem) {
        if (!this.isInitialized)
            return null;
        if (!this.serviceCapabilities?.completionProvider?.resolveProvider)
            return null;
        return this.connection.sendRequest('completionItem/resolve', item["item"]) as Promise<lsp.CompletionItem | null>;
    }


    async doValidation(document: lsp.TextDocumentIdentifier): Promise<lsp.Diagnostic[]> {
        //TODO: textDocument/diagnostic capability
        return [];
    }

    async format(document: lsp.TextDocumentIdentifier, range: lsp.Range, format: lsp.FormattingOptions) {
        if (!this.isInitialized) {
            return [];
        }
        if (!(this.serviceCapabilities && (this.serviceCapabilities.documentRangeFormattingProvider || this.serviceCapabilities.documentFormattingProvider))) {
            return [];
        }
        if (!this.serviceCapabilities.documentRangeFormattingProvider) {
            let options: lsp.DocumentFormattingParams = {
                textDocument: {
                    uri: document.uri,
                },
                options: format,
            };
            return this.connection.sendRequest('textDocument/formatting', options) as Promise<lsp.TextEdit[]>;
        } else {
            let options: lsp.DocumentRangeFormattingParams = {
                textDocument: {
                    uri: document.uri,
                },
                options: format,
                range: range
            };
            return this.connection.sendRequest('textDocument/rangeFormatting', options) as Promise<lsp.TextEdit[]>;
        }
    }

    setGlobalOptions(options: ServiceOptions): void {
        super.setGlobalOptions(options);
        const configChanges: lsp.DidChangeConfigurationParams = {
            settings: options
        };
        this.enqueueIfNotConnected(() => this.connection.sendNotification('workspace/didChangeConfiguration', configChanges));
    }


    setWorkspace(workspaceUri: string) {
        super.setWorkspace(workspaceUri);
        this.enqueueIfNotConnected(() => {
            if (!this.serviceCapabilities?.workspace?.workspaceFolders?.changeNotifications) {
                return this.$reconnect();
            }
            const message: lsp.WorkspaceFoldersChangeEvent = {
                added: [this.workspaceFolder],
                removed: []
            };

            return this.connection.sendRequest('workspace/didChangeWorkspaceFolders', message);
        });
    }

    get workspaceFolder(): WorkspaceFolder {
        let workspaceUri = this.workspaceUri!;
        return {
            uri: workspaceUri,
            name: workspaceUri.split("/").pop()!,
        }
    }

    async findDocumentHighlights(document: lsp.TextDocumentIdentifier, position: lsp.Position) {
        if (!this.isInitialized)
            return [];
        if (!this.serviceCapabilities?.documentHighlightProvider)
            return [];
        let options: lsp.DocumentHighlightParams = {
            textDocument: {
                uri: document.uri,
            },
            position: position,
        };
        return this.connection.sendRequest('textDocument/documentHighlight', options) as Promise<lsp.DocumentHighlight[]>
    }

    async provideSignatureHelp(document: lsp.TextDocumentIdentifier, position: lsp.Position) {
        if (!this.isInitialized)
            return null;
        if (!this.serviceCapabilities?.signatureHelpProvider)
            return null;
        let options: lsp.SignatureHelpParams = {
            textDocument: {
                uri: document.uri,
            },
            position: position,
        };
        return this.connection.sendRequest('textDocument/signatureHelp', options) as Promise<lsp.SignatureHelp | null>
    }

    async getSemanticTokens(document: lsp.TextDocumentIdentifier, range: lsp.Range) {
        if (!this.isInitialized)
            return null;
        if (!this.serviceCapabilities?.semanticTokensProvider)
            return null;
        if (!this.serviceCapabilities.semanticTokensProvider.range) {
            let options: lsp.SemanticTokensParams = {
                textDocument: {
                    uri: document.uri,
                },
            };
            return this.connection.sendRequest('textDocument/semanticTokens/full', options) as Promise<lsp.SemanticTokens | null>
        } else {
            let options: lsp.SemanticTokensRangeParams = {
                textDocument: {
                    uri: document.uri,
                },
                range: range,
            };
            return this.connection.sendRequest('textDocument/semanticTokens/range', options) as Promise<lsp.SemanticTokens | null>
        }

    }

    async getCodeActions(document: lsp.TextDocumentIdentifier, range: lsp.Range, context: lsp.CodeActionContext) {
        if (!this.isInitialized)
            return null;
        if (!this.serviceCapabilities?.codeActionProvider)
            return null;
        let options: lsp.CodeActionParams = {
            textDocument: {
                uri: document.uri,
            },
            range: range,
            context: context,
        };
        return this.connection.sendRequest('textDocument/codeAction', options) as Promise<(lsp.Command | lsp.CodeAction)[] | null>
    }

    executeCommand(command: string, args?: lsp.LSPAny[]) {
        if (!this.isInitialized)
            return Promise.resolve(null);
        if (!this.serviceCapabilities?.executeCommandProvider || !this.serviceCapabilities?.executeCommandProvider.commands.includes(command))
            return Promise.resolve(null);
        let options: lsp.ExecuteCommandParams = {
            command,
            arguments: args
        };
        return this.connection.sendRequest('workspace/executeCommand', options) as Promise<any>
    }

    /**
     * Send a custom request to the server.
     * @param name
     * @param args
     */
    sendRequest(name: string, args?: lsp.LSPAny) {
        if (args === undefined || args === null) {
            return this.connection.sendRequest(name);
        }
        return this.connection.sendRequest(name, args);
    }

}
