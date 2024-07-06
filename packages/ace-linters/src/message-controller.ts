import {Ace} from "ace-code";
import {
    BaseMessage,
    ChangeMessage,
    ChangeModeMessage, ChangeOptionsMessage,
    CompleteMessage,
    DeltasMessage, CloseDocumentMessage, DocumentHighlightMessage,
    FormatMessage, GlobalOptionsMessage,
    HoverMessage,
    InitMessage, MessageType,
    ResolveCompletionMessage, SignatureHelpMessage,
    ConfigureFeaturesMessage,
    ValidateMessage, DisposeMessage, GetSemanticTokensMessage, GetCodeActionsMessage, ExecuteCommandMessage
} from "./message-types";
import {ComboDocumentIdentifier, IMessageController} from "./types/message-controller-interface";
import * as lsp from "vscode-languageserver-protocol";
import {
    CodeActionsByService,
    CompletionService,
    ServiceFeatures,
    ServiceOptions,
    ServiceOptionsMap,
    SupportedServices
} from "./types/language-service";
import type {LanguageProvider} from "./language-provider";

export class MessageController implements IMessageController {
    $worker: Worker;
    callbacks = {};
    callbackId = 1;
    private provider: LanguageProvider;

    constructor(worker: Worker, provider: LanguageProvider) {
        this.$worker = worker;
        this.provider = provider;

        this.$worker.addEventListener("message", (e) => {
            const message = e.data;
            const callbackId = message.callbackId;
            
            if (message.type === MessageType.validate || message.type === MessageType.capabilitiesChange) {
                if (!message.documentUri) {
                    return;
                }
                const sessionId = this.provider.$urisToSessionsIds[message.documentUri];
                if (!sessionId) {
                    return;
                }
                if (message.type === MessageType.validate) {
                    this.provider.$sessionLanguageProviders[sessionId]?.$showAnnotations(message.value); 
                } else {
                    this.provider.$sessionLanguageProviders[sessionId]?.setServerCapabilities(message.value);
                }
            } else {
                if (this.callbacks[callbackId]) {
                    this.callbacks[callbackId](message.value);
                    delete this.callbacks[callbackId];
                }
            }
        });

    }
    
    init(documentIdentifier: ComboDocumentIdentifier, document: Ace.Document, mode: string, options: any, initCallback: (capabilities: { [serviceName: string]: lsp.ServerCapabilities }) => void): void {
        this.postMessage(new InitMessage(documentIdentifier, this.callbackId++, document.getValue(), document["version"], mode, options), initCallback);
    }

    doValidation(documentIdentifier: ComboDocumentIdentifier, callback?: (annotations: lsp.Diagnostic[]) => void) {
        this.postMessage(new ValidateMessage(documentIdentifier, this.callbackId++), callback);
    }

    doComplete(documentIdentifier: ComboDocumentIdentifier, position: lsp.Position, callback?: (completions: CompletionService[]) => void) {
        this.postMessage(new CompleteMessage(documentIdentifier, this.callbackId++, position), callback);
    }

    doResolve(documentIdentifier: ComboDocumentIdentifier, completion: lsp.CompletionItem, callback?: (completion: lsp.CompletionItem | null) => void) {
        this.postMessage(new ResolveCompletionMessage(documentIdentifier, this.callbackId++, completion), callback);
    }

    format(documentIdentifier: ComboDocumentIdentifier, range: lsp.Range, format: lsp.FormattingOptions, callback?: (edits: lsp.TextEdit[]) => void) {
        this.postMessage(new FormatMessage(documentIdentifier, this.callbackId++, range, format), callback);
    }

    doHover(documentIdentifier: ComboDocumentIdentifier, position: lsp.Position, callback?: (hover: lsp.Hover[]) => void) {
        this.postMessage(new HoverMessage(documentIdentifier, this.callbackId++, position), callback)
    }

    change(documentIdentifier: ComboDocumentIdentifier, deltas: lsp.TextDocumentContentChangeEvent[], document: Ace.Document, callback?: () => void) {
        let message: BaseMessage;
        if (deltas.length > 50 && deltas.length > document.getLength() >> 1) {
            message = new ChangeMessage(documentIdentifier, this.callbackId++, document.getValue(), document["version"]);
        } else {
            message = new DeltasMessage(documentIdentifier, this.callbackId++, deltas, document["version"]);
        }

        this.postMessage(message, callback)
    }

    changeMode(documentIdentifier: ComboDocumentIdentifier, value: string, version: number, mode: string, callback?: (capabilities) => void) {
        this.postMessage(new ChangeModeMessage(documentIdentifier, this.callbackId++, value, version, mode), callback);
    }

    changeOptions(documentIdentifier: ComboDocumentIdentifier, options: ServiceOptions, callback?: () => void, merge = false) {
        this.postMessage(new ChangeOptionsMessage(documentIdentifier, this.callbackId++, options, merge), callback);
    }

    closeDocument(documentIdentifier: ComboDocumentIdentifier, callback?: () => void) {
        this.postMessage(new CloseDocumentMessage(documentIdentifier, this.callbackId++), callback);
    }
    
    dispose(callback: () => void) {
        this.postMessage(new DisposeMessage(this.callbackId++), callback);
    }

    setGlobalOptions<T extends keyof ServiceOptionsMap>(serviceName: T, options: ServiceOptionsMap[T], merge = false) {
        // @ts-ignore
        this.$worker.postMessage(new GlobalOptionsMessage(serviceName, options, merge));
    }

    provideSignatureHelp(documentIdentifier: ComboDocumentIdentifier, position: lsp.Position, callback?: (signatureHelp: lsp.SignatureHelp[]) => void) {
        this.postMessage(new SignatureHelpMessage(documentIdentifier, this.callbackId++, position), callback)
    }

    findDocumentHighlights(documentIdentifier: ComboDocumentIdentifier, position: lsp.Position, callback?: (documentHighlights: lsp.DocumentHighlight[]) => void) {
        this.postMessage(new DocumentHighlightMessage(documentIdentifier, this.callbackId++, position), callback)
    }

    configureFeatures(serviceName: SupportedServices, features: ServiceFeatures): void {
        this.$worker.postMessage(new ConfigureFeaturesMessage(serviceName, features));
    }

    getSemanticTokens(documentIdentifier: ComboDocumentIdentifier, range: lsp.Range,  callback?: (semanticTokens: lsp.SemanticTokens | null) => void) {
        this.postMessage(new GetSemanticTokensMessage(documentIdentifier, this.callbackId++, range), callback);
    }

    getCodeActions(documentIdentifier: ComboDocumentIdentifier, range: lsp.Range, context: lsp.CodeActionContext,  callback?: (codeActions: CodeActionsByService[]) => void) {
        this.postMessage(new GetCodeActionsMessage(documentIdentifier, this.callbackId++, range, context), callback);
    }

    executeCommand(serviceName: string, command: string, args?: any[],  callback?: (result: any) => void) {
        this.postMessage(new ExecuteCommandMessage(serviceName, this.callbackId++, command, args), callback);
    }

    postMessage(message: BaseMessage | DisposeMessage | ExecuteCommandMessage, callback?: (any) => void) {
        if (callback) {
            this.callbacks[message.callbackId] = callback;
        }
        this.$worker.postMessage(message);
    }
    
}
