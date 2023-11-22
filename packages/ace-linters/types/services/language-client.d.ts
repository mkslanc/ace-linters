import * as lsp from "vscode-languageserver-protocol";
import { LanguageService, ServiceOptions } from "../types/language-service";
import { BaseService } from "./base-service";
import { TextDocumentIdentifier, TextDocumentItem } from "vscode-languageserver-protocol";
export declare class LanguageClient extends BaseService implements LanguageService {
    $service: any;
    private isConnected;
    private isInitialized;
    private readonly socket;
    private serverCapabilities;
    private connection;
    private requestsQueue;
    clientCapabilities: lsp.ClientCapabilities;
    constructor(mode: string, connectionType: WebSocket | Worker, initializationOptions?: {
        [option: string]: any;
    });
    private $connectSocket;
    private $connectWorker;
    private $connect;
    addDocument(document: TextDocumentItem): void;
    enqueueIfNotConnected(callback: () => void): void;
    removeDocument(document: TextDocumentIdentifier): void;
    sendInitialize(initializationOptions: any): void;
    applyDeltas(identifier: lsp.VersionedTextDocumentIdentifier, deltas: lsp.TextDocumentContentChangeEvent[]): void;
    setValue(identifier: lsp.VersionedTextDocumentIdentifier, value: string): void;
    doHover(document: lsp.TextDocumentIdentifier, position: lsp.Position): Promise<lsp.Hover | null>;
    doComplete(document: lsp.TextDocumentIdentifier, position: lsp.Position): Promise<lsp.CompletionList | lsp.CompletionItem[] | null>;
    doResolve(item: lsp.CompletionItem): Promise<lsp.CompletionItem | null>;
    doValidation(document: lsp.TextDocumentIdentifier): Promise<lsp.Diagnostic[]>;
    format(document: lsp.TextDocumentIdentifier, range: lsp.Range, format: lsp.FormattingOptions): Promise<lsp.TextEdit[]>;
    setGlobalOptions(options: ServiceOptions): void;
    findDocumentHighlights(document: lsp.TextDocumentIdentifier, position: lsp.Position): Promise<lsp.DocumentHighlight[]>;
    provideSignatureHelp(document: lsp.TextDocumentIdentifier, position: lsp.Position): Promise<lsp.SignatureHelp | null>;
}
