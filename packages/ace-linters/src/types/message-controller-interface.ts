import {Ace} from "ace-code";
import * as lsp from "vscode-languageserver-protocol";
import {CompletionService, ServiceFeatures, ServiceOptions, SupportedServices} from "./language-service";


export interface InitCallbacks {
    initCallback: (capabilities: { [serviceName: string]: lsp.ServerCapabilities }) => void;
    validationCallback: (annotations: lsp.Diagnostic[]) => void;
    changeCapabilitiesCallback: (capabilities: { [serviceName: string]: lsp.ServerCapabilities }) => void;
}
export interface IMessageController {
    $worker: Worker;
    
    init(sessionId: string, document: Ace.Document, mode: string, options: any, callbacks: InitCallbacks): void;

    doValidation(sessionId: string, callback?: (annotations: lsp.Diagnostic[]) => void)

    doComplete(sessionId: string, position: lsp.Position, callback?: (completions: CompletionService[]) => void);

    doResolve(sessionId: string, completion: lsp.CompletionItem, callback?: (completion: lsp.CompletionItem | null) => void);

    format(sessionId: string, range: lsp.Range, format: lsp.FormattingOptions, callback?: (edits: lsp.TextEdit[]) => void);

    doHover(sessionId: string, position: lsp.Position, callback?: (hover: lsp.Hover[]) => void);

    change(sessionId: string, deltas: lsp.TextDocumentContentChangeEvent[], document: Ace.Document, callback?: () => void): void;

    changeMode(sessionId: string, value: string, mode: string, callback?: (capabilities: { [serviceName: string]: lsp.ServerCapabilities }) => void);

    changeOptions(sessionId: string, options: ServiceOptions, callback?: () => void);

    closeDocument(sessionId: string, callback?: () => void): void;
    
    dispose(callback: () => void): void;
    
    setGlobalOptions(serviceName: string, options: any, merge?: boolean): void;

    configureFeatures(serviceName: SupportedServices, features: ServiceFeatures): void;
    
    provideSignatureHelp(sessionId: string, position: lsp.Position, callback?: (signatureHelp: lsp.SignatureHelp[]) => void);

    findDocumentHighlights(sessionId: string, position: lsp.Position, callback?: (documentHighlights: lsp.DocumentHighlight[]) => void)
}
