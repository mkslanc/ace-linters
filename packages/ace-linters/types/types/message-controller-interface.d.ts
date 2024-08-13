import { Ace } from "ace-code";
import * as lsp from "vscode-languageserver-protocol";
import { CodeActionsByService, CompletionService, ServiceFeatures, ServiceOptions, SupportedServices } from "./language-service";
export interface ComboDocumentIdentifier {
    sessionId: string;
    documentUri: lsp.DocumentUri;
}
export interface IMessageController {
    $worker: Worker;
    init(documentIdentifier: ComboDocumentIdentifier, document: Ace.Document, mode: string, options: any, initCallback: (capabilities: {
        [serviceName: string]: lsp.ServerCapabilities;
    }) => void): void;
    doValidation(documentIdentifier: ComboDocumentIdentifier, callback?: (annotations: lsp.Diagnostic[]) => void): any;
    doComplete(documentIdentifier: ComboDocumentIdentifier, position: lsp.Position, callback?: (completions: CompletionService[]) => void): any;
    doResolve(documentIdentifier: ComboDocumentIdentifier, completion: lsp.CompletionItem, callback?: (completion: lsp.CompletionItem | null) => void): any;
    format(documentIdentifier: ComboDocumentIdentifier, range: lsp.Range, format: lsp.FormattingOptions, callback?: (edits: lsp.TextEdit[]) => void): any;
    doHover(documentIdentifier: ComboDocumentIdentifier, position: lsp.Position, callback?: (hover: lsp.Hover[]) => void): any;
    change(documentIdentifier: ComboDocumentIdentifier, deltas: lsp.TextDocumentContentChangeEvent[], document: Ace.Document, callback?: () => void): void;
    changeMode(documentIdentifier: ComboDocumentIdentifier, value: string, version: number, mode: string, callback?: (capabilities: {
        [serviceName: string]: lsp.ServerCapabilities;
    }) => void): any;
    changeOptions(documentIdentifier: ComboDocumentIdentifier, options: ServiceOptions, callback?: () => void): any;
    closeDocument(documentIdentifier: ComboDocumentIdentifier, callback?: () => void): void;
    closeConnection(callback: () => void): void;
    setGlobalOptions(serviceName: string, options: any, merge?: boolean): void;
    configureFeatures(serviceName: SupportedServices, features: ServiceFeatures): void;
    provideSignatureHelp(documentIdentifier: ComboDocumentIdentifier, position: lsp.Position, callback?: (signatureHelp: lsp.SignatureHelp[]) => void): any;
    findDocumentHighlights(documentIdentifier: ComboDocumentIdentifier, position: lsp.Position, callback?: (documentHighlights: lsp.DocumentHighlight[]) => void): any;
    getSemanticTokens(documentIdentifier: ComboDocumentIdentifier, range: lsp.Range, callback?: (semanticTokens: lsp.SemanticTokens | null) => void): any;
    getCodeActions(documentIdentifier: ComboDocumentIdentifier, range: lsp.Range, context: lsp.CodeActionContext, callback?: (codeActions: CodeActionsByService[]) => void): any;
    executeCommand(serviceName: string, command: string, args?: any[], callback?: (result: any) => void): any;
    setWorkspace(workspaceUri: string, callback?: () => void): void;
}
