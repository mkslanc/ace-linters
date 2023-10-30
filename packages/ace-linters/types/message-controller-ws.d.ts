/// <reference types="node" />
import * as events from 'events';
import * as lsp from "vscode-languageserver-protocol";
import { IMessageController } from "./types/message-controller-interface";
import { Ace } from "ace-code";
import { CompletionService, ServiceFeatures, SupportedServices } from "./types/language-service";
export declare class MessageControllerWS extends events.EventEmitter implements IMessageController {
    private isConnected;
    private isInitialized;
    private readonly socket;
    private serverCapabilities;
    private connection;
    private requestsQueue;
    clientCapabilities: lsp.ClientCapabilities;
    constructor(mode: WebSocket | Worker, initializationOptions?: {
        [option: string]: any;
    });
    configureFeatures(serviceName: SupportedServices, features: ServiceFeatures): void;
    private $connectSocket;
    private $connectWorker;
    private $connect;
    init(sessionId: string, document: Ace.Document, mode: string, options: any, initCallback: (capabilities: any) => void, validationCallback: (annotations: lsp.Diagnostic[]) => void): void;
    initSession(textDocumentMessage: lsp.DidOpenTextDocumentParams, initCallback: any): void;
    close(): void;
    sendInitialize(initializationOptions: any): void;
    change(sessionId: string, deltas: lsp.TextDocumentContentChangeEvent[], document: any, callback?: () => void): void;
    doHover(sessionId: string, position: lsp.Position, callback?: (hover: lsp.Hover[]) => void): void;
    doComplete(sessionId: string, position: lsp.Position, callback?: (completions: CompletionService[]) => void): void;
    doResolve(sessionId: string, completion: lsp.CompletionItem, callback?: (completion: lsp.CompletionItem | null) => void): void;
    changeMode(sessionId: string, value: string, mode: string, callback?: (capabilities: any) => void): void;
    changeOptions(sessionId: string, options: any, callback?: () => void): void;
    dispose(sessionId: string, callback?: () => void): void;
    doValidation(sessionId: string, callback?: (annotations: lsp.Diagnostic[]) => void): void;
    format(sessionId: string, range: lsp.Range, format: lsp.FormattingOptions, callback?: (edits: lsp.TextEdit[]) => void): void;
    setGlobalOptions(serviceName: string, options: any, merge?: boolean): void;
    postMessage(name: any, sessionId: any, options: any, callback: (any: any) => void): void;
    findDocumentHighlights(sessionId: string, position: lsp.Position, callback?: (documentHighlights: lsp.DocumentHighlight[]) => void): void;
    provideSignatureHelp(sessionId: string, position: lsp.Position, callback?: (signatureHelp: lsp.SignatureHelp[]) => void): void;
}
