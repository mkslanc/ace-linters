import { Ace } from "ace-code";
import * as lsp from "vscode-languageserver-protocol";
import { CompletionService, ServiceFeatures, ServiceOptions, SupportedServices } from "./language-service";
export interface IMessageController {
    init(sessionId: string, document: Ace.Document, mode: string, options: any, initCallback: (capabilities: lsp.ServerCapabilities[]) => void, validationCallback: (annotations: lsp.Diagnostic[]) => void): void;
    doValidation(sessionId: string, callback?: (annotations: lsp.Diagnostic[]) => void): any;
    doComplete(sessionId: string, position: lsp.Position, callback?: (completions: CompletionService[]) => void): any;
    doResolve(sessionId: string, completion: lsp.CompletionItem, callback?: (completion: lsp.CompletionItem | null) => void): any;
    format(sessionId: string, range: lsp.Range, format: lsp.FormattingOptions, callback?: (edits: lsp.TextEdit[]) => void): any;
    doHover(sessionId: string, position: lsp.Position, callback?: (hover: lsp.Hover[]) => void): any;
    change(sessionId: string, deltas: lsp.TextDocumentContentChangeEvent[], document: Ace.Document, callback?: () => void): void;
    changeMode(sessionId: string, value: string, mode: string, callback?: (capabilities: lsp.ServerCapabilities[]) => void): any;
    changeOptions(sessionId: string, options: ServiceOptions, callback?: () => void): any;
    dispose(sessionId: string, callback?: () => void): void;
    setGlobalOptions(serviceName: string, options: any, merge?: boolean): void;
    configureFeatures(serviceName: SupportedServices, features: ServiceFeatures): void;
    provideSignatureHelp(sessionId: string, position: lsp.Position, callback?: (signatureHelp: lsp.SignatureHelp[]) => void): any;
    findDocumentHighlights(sessionId: string, position: lsp.Position, callback?: (documentHighlights: lsp.DocumentHighlight[]) => void): any;
}
