/// <reference types="node" />
import { Ace } from "ace-code";
import { BaseMessage } from "./message-types";
import { IMessageController, InitCallbacks } from "./types/message-controller-interface";
import * as lsp from "vscode-languageserver-protocol";
import { CompletionService, ServiceFeatures, ServiceOptions, ServiceOptionsMap, SupportedServices } from "./types/language-service";
import EventEmitter from "events";
export declare class MessageController extends EventEmitter implements IMessageController {
    $worker: Worker;
    constructor(worker: Worker);
    init(sessionId: string, document: Ace.Document, mode: string, options: any, callbacks: InitCallbacks): void;
    doValidation(sessionId: string, callback?: (annotations: lsp.Diagnostic[]) => void): void;
    doComplete(sessionId: string, position: lsp.Position, callback?: (completions: CompletionService[]) => void): void;
    doResolve(sessionId: string, completion: lsp.CompletionItem, callback?: (completion: lsp.CompletionItem | null) => void): void;
    format(sessionId: string, range: lsp.Range, format: lsp.FormattingOptions, callback?: (edits: lsp.TextEdit[]) => void): void;
    doHover(sessionId: string, position: lsp.Position, callback?: (hover: lsp.Hover[]) => void): void;
    change(sessionId: string, deltas: any, document: Ace.Document, callback?: () => void): void;
    changeMode(sessionId: string, value: string, version: number, mode: string, callback?: (capabilities: any) => void): void;
    changeOptions(sessionId: string, options: ServiceOptions, callback?: () => void, merge?: boolean): void;
    closeDocument(sessionId: string, callback?: () => void): void;
    dispose(callback: () => void): void;
    setGlobalOptions<T extends keyof ServiceOptionsMap>(serviceName: T, options: ServiceOptionsMap[T], merge?: boolean): void;
    provideSignatureHelp(sessionId: string, position: lsp.Position, callback?: (signatureHelp: lsp.SignatureHelp[]) => void): void;
    findDocumentHighlights(sessionId: string, position: lsp.Position, callback?: (documentHighlights: lsp.DocumentHighlight[]) => void): void;
    configureFeatures(serviceName: SupportedServices, features: ServiceFeatures): void;
    getSemanticTokens(sessionId: string, range: lsp.Range, callback?: (semanticTokens: lsp.SemanticTokens | null) => void): void;
    postMessage(message: BaseMessage, callback?: (any: any) => void): void;
}
