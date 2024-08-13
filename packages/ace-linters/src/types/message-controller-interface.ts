import {Ace} from "ace-code";
import * as lsp from "vscode-languageserver-protocol";
import {
    CodeActionsByService,
    CompletionService,
    ServiceFeatures,
    ServiceOptions,
    SupportedServices
} from "./language-service";

export interface ComboDocumentIdentifier {
    sessionId: string;
    documentUri: lsp.DocumentUri;
}

export interface IMessageController {
    $worker: Worker;
    
    init(documentIdentifier: ComboDocumentIdentifier, document: Ace.Document, mode: string, options: any, initCallback: (capabilities: { [serviceName: string]: lsp.ServerCapabilities }) => void): void;

    doValidation(documentIdentifier: ComboDocumentIdentifier, callback?: (annotations: lsp.Diagnostic[]) => void)

    doComplete(documentIdentifier: ComboDocumentIdentifier, position: lsp.Position, callback?: (completions: CompletionService[]) => void);

    doResolve(documentIdentifier: ComboDocumentIdentifier, completion: lsp.CompletionItem, callback?: (completion: lsp.CompletionItem | null) => void);

    format(documentIdentifier: ComboDocumentIdentifier, range: lsp.Range, format: lsp.FormattingOptions, callback?: (edits: lsp.TextEdit[]) => void);

    doHover(documentIdentifier: ComboDocumentIdentifier, position: lsp.Position, callback?: (hover: lsp.Hover[]) => void);

    change(documentIdentifier: ComboDocumentIdentifier, deltas: lsp.TextDocumentContentChangeEvent[], document: Ace.Document, callback?: () => void): void;

    changeMode(documentIdentifier: ComboDocumentIdentifier, value: string, version: number, mode: string, callback?: (capabilities: { [serviceName: string]: lsp.ServerCapabilities }) => void);

    changeOptions(documentIdentifier: ComboDocumentIdentifier, options: ServiceOptions, callback?: () => void);

    closeDocument(documentIdentifier: ComboDocumentIdentifier, callback?: () => void): void;
    
    closeConnection(callback: () => void): void;
    
    setGlobalOptions(serviceName: string, options: any, merge?: boolean): void;

    configureFeatures(serviceName: SupportedServices, features: ServiceFeatures): void;
    
    provideSignatureHelp(documentIdentifier: ComboDocumentIdentifier, position: lsp.Position, callback?: (signatureHelp: lsp.SignatureHelp[]) => void);

    findDocumentHighlights(documentIdentifier: ComboDocumentIdentifier, position: lsp.Position, callback?: (documentHighlights: lsp.DocumentHighlight[]) => void);

    getSemanticTokens(documentIdentifier: ComboDocumentIdentifier, range: lsp.Range, callback?: (semanticTokens: lsp.SemanticTokens | null) => void);

    getCodeActions(documentIdentifier: ComboDocumentIdentifier, range: lsp.Range, context: lsp.CodeActionContext,  callback?: (codeActions: CodeActionsByService[]) => void);

    executeCommand(serviceName: string, command: string, args?: any[],  callback?: (result: any) => void);

    setWorkspace(workspaceUri: string, callback?: () => void): void;
}
