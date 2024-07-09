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

export class LanguageClient extends BaseService implements LanguageService {
    $service;
    private isConnected = false;
    private isInitialized = false;
    private readonly socket: WebSocket;
    private connection: lsp.ProtocolConnection;
    private requestsQueue: Function[] = [];
    callbackId = 0;
    callbacks = {};
    
    ctx;

    constructor(serverData: LanguageClientConfig, ctx) {
        super(serverData.modes);
        this.ctx = ctx;
        switch (serverData.type) {
            case "webworker":
                if ('worker' in serverData) {
                    this.$connectWorker(serverData.worker, serverData.initializationOptions);
                } else {
                    throw new Error("No worker provided");
                }
                break;
            case "socket":
                if ('socket' in serverData) {
                    this.socket = serverData.socket;
                    this.$connectSocket(serverData.initializationOptions);
                } else {
                    throw new Error("No socketUrl provided");
                }
                break;
            default:
                throw new Error("Unknown server type: " + serverData.type);
        }
    }

    private $connectSocket(initializationOptions) {
        if (this.socket.readyState === WebSocket.OPEN) {
            rpc.listen({
                webSocket: this.socket,
                onConnection: (connection: rpc.MessageConnection) => {
                    this.$connect(connection, initializationOptions);
                },
            });
            this.socket.dispatchEvent(new Event('open'));
        } else {
            rpc.listen({
                webSocket: this.socket,
                onConnection: (connection: rpc.MessageConnection) => {
                    this.$connect(connection, initializationOptions);
                },
            });
        }
    }

    private $connectWorker(worker: Worker, initializationOptions?: { [option: string]: any }) {
        const connection = createProtocolConnection(
            new BrowserMessageReader(worker),
            new BrowserMessageWriter(worker)
        );
        this.$connect(connection, initializationOptions);
    }

    private $connect(connection, initializationOptions) {
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

        this.connection.onError((e) => {
            throw e;
        });

        this.connection.onClose(() => {
            this.isConnected = false;
        });
    }
    
    sendAppliedResult(result: lsp.ApplyWorkspaceEditResult, callbackId: number) {
       if (!this.isConnected || !this.callbacks[callbackId]) {
           return;
       }
       this.callbacks[callbackId](result);
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
        if (this.connection) {
            this.isConnected = false;
            await this.connection.sendRequest("shutdown");
            this.connection.sendNotification('exit');
            this.connection.dispose();
            if (this.socket)
                this.socket.close();
        }
    }

    sendInitialize(initializationOptions) {
        if (!this.isConnected) {
            return;
        }
        const message: lsp.InitializeParams = {
            capabilities: this.clientCapabilities,
            initializationOptions: initializationOptions,
            processId: null,
            rootUri: "", //TODO: this.documentInfo.rootUri
            workspaceFolders: null,
        };

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
    
}
