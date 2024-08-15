import { Ace } from "ace-code";
import { BaseMessage, CloseConnectionMessage, ExecuteCommandMessage } from "./message-types";
import { ComboDocumentIdentifier, IMessageController } from "./types/message-controller-interface";
import * as lsp from "vscode-languageserver-protocol";
import { CodeActionsByService, CompletionService, ServiceFeatures, ServiceOptions, ServiceOptionsMap, SupportedServices } from "./types/language-service";
import type { LanguageProvider } from "./language-provider";
export declare class MessageController implements IMessageController {
    $worker: Worker;
    callbacks: {};
    callbackId: number;
    private provider;
    constructor(worker: Worker, provider: LanguageProvider);
    private getSessionIdByUri;
    init(documentIdentifier: ComboDocumentIdentifier, document: Ace.Document, mode: string, options: any, initCallback: (capabilities: {
        [serviceName: string]: lsp.ServerCapabilities;
    }) => void): void;
    doValidation(documentIdentifier: ComboDocumentIdentifier, callback?: (annotations: lsp.Diagnostic[]) => void): void;
    doComplete(documentIdentifier: ComboDocumentIdentifier, position: lsp.Position, callback?: (completions: CompletionService[]) => void): void;
    doResolve(documentIdentifier: ComboDocumentIdentifier, completion: lsp.CompletionItem, callback?: (completion: lsp.CompletionItem | null) => void): void;
    format(documentIdentifier: ComboDocumentIdentifier, range: lsp.Range, format: lsp.FormattingOptions, callback?: (edits: lsp.TextEdit[]) => void): void;
    doHover(documentIdentifier: ComboDocumentIdentifier, position: lsp.Position, callback?: (hover: lsp.Hover[]) => void): void;
    change(documentIdentifier: ComboDocumentIdentifier, deltas: lsp.TextDocumentContentChangeEvent[], document: Ace.Document, callback?: () => void): void;
    changeMode(documentIdentifier: ComboDocumentIdentifier, value: string, version: number, mode: string, callback?: (capabilities: any) => void): void;
    changeOptions(documentIdentifier: ComboDocumentIdentifier, options: ServiceOptions, callback?: () => void, merge?: boolean): void;
    closeDocument(documentIdentifier: ComboDocumentIdentifier, callback?: () => void): void;
    closeConnection(callback: () => void): void;
    setGlobalOptions<T extends keyof ServiceOptionsMap>(serviceName: T, options: ServiceOptionsMap[T], merge?: boolean): void;
    provideSignatureHelp(documentIdentifier: ComboDocumentIdentifier, position: lsp.Position, callback?: (signatureHelp: lsp.SignatureHelp[]) => void): void;
    findDocumentHighlights(documentIdentifier: ComboDocumentIdentifier, position: lsp.Position, callback?: (documentHighlights: lsp.DocumentHighlight[]) => void): void;
    configureFeatures(serviceName: SupportedServices, features: ServiceFeatures): void;
    getSemanticTokens(documentIdentifier: ComboDocumentIdentifier, range: lsp.Range, callback?: (semanticTokens: lsp.SemanticTokens | null) => void): void;
    getCodeActions(documentIdentifier: ComboDocumentIdentifier, range: lsp.Range, context: lsp.CodeActionContext, callback?: (codeActions: CodeActionsByService[]) => void): void;
    executeCommand(serviceName: string, command: string, args?: any[], callback?: (result: any) => void): void;
    setWorkspace(workspaceUri: string, callback?: () => void): void;
    postMessage(message: BaseMessage | CloseConnectionMessage | ExecuteCommandMessage, callback?: (any: any) => void): void;
}
