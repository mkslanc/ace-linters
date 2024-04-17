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
    ValidateMessage, DisposeMessage, GetSemanticTokensMessage
} from "./message-types";
import {IMessageController, InitCallbacks} from "./types/message-controller-interface";
import * as lsp from "vscode-languageserver-protocol";
import {CompletionService, ServiceFeatures, ServiceOptions, ServiceOptionsMap, SupportedServices} from "./types/language-service";
import EventEmitter from "events";

export class MessageController extends EventEmitter implements IMessageController {
    $worker: Worker;

    constructor(worker: Worker) {
        super();
        this.$worker = worker;

        this.$worker.addEventListener("message", (e) => {
            let message = e.data;
            this.emit(message.type + "-" + message.sessionId, message.value);
        });

    }
    
    init(sessionId: string, document: Ace.Document, mode: string, options: any, callbacks: InitCallbacks): void {
        this.on(MessageType.validate.toString() + "-" + sessionId, callbacks.validationCallback); //TODO: need off
        // somewhere
        this.on(MessageType.capabilitiesChange.toString() + "-" + sessionId, callbacks.changeCapabilitiesCallback);

        this.postMessage(new InitMessage(sessionId, document.getValue(), document["version"], mode, options), callbacks.initCallback);
    }

    doValidation(sessionId: string, callback?: (annotations: lsp.Diagnostic[]) => void) {
        this.postMessage(new ValidateMessage(sessionId), callback);
    }

    doComplete(sessionId: string, position: lsp.Position, callback?: (completions: CompletionService[]) => void) {
        this.postMessage(new CompleteMessage(sessionId, position), callback);
    }

    doResolve(sessionId: string, completion: lsp.CompletionItem, callback?: (completion: lsp.CompletionItem | null) => void) {
        this.postMessage(new ResolveCompletionMessage(sessionId, completion), callback);
    }

    format(sessionId: string, range: lsp.Range, format: lsp.FormattingOptions, callback?: (edits: lsp.TextEdit[]) => void) {
        this.postMessage(new FormatMessage(sessionId, range, format), callback);
    }

    doHover(sessionId: string, position: lsp.Position, callback?: (hover: lsp.Hover[]) => void) {
        this.postMessage(new HoverMessage(sessionId, position), callback)
    }

    change(sessionId: string, deltas, document: Ace.Document, callback?: () => void) {
        let message: BaseMessage;
        if (deltas.length > 50 && deltas.length > document.getLength() >> 1) {
            message = new ChangeMessage(sessionId, document.getValue(), document["version"]);
        } else {
            message = new DeltasMessage(sessionId, deltas, document["version"]);
        }

        this.postMessage(message, callback)
    }

    changeMode(sessionId: string, value: string, mode: string, callback?: (capabilities) => void) {
        this.postMessage(new ChangeModeMessage(sessionId, value, mode), callback);
    }

    changeOptions(sessionId: string, options: ServiceOptions, callback?: () => void, merge = false) {
        this.postMessage(new ChangeOptionsMessage(sessionId, options, merge), callback);
    }

    closeDocument(sessionId: string, callback?: () => void) {
        this.postMessage(new CloseDocumentMessage(sessionId), callback);
    }
    
    dispose(callback: () => void) {
        this.postMessage(new DisposeMessage(), callback);
    }

    setGlobalOptions<T extends keyof ServiceOptionsMap>(serviceName: T, options: ServiceOptionsMap[T], merge = false) {
        // @ts-ignore
        this.$worker.postMessage(new GlobalOptionsMessage(serviceName, options, merge));
    }

    provideSignatureHelp(sessionId: string, position: lsp.Position, callback?: (signatureHelp: lsp.SignatureHelp[]) => void) {
        this.postMessage(new SignatureHelpMessage(sessionId, position), callback)
    }

    findDocumentHighlights(sessionId: string, position: lsp.Position, callback?: (documentHighlights: lsp.DocumentHighlight[]) => void) {
        this.postMessage(new DocumentHighlightMessage(sessionId, position), callback)
    }

    configureFeatures(serviceName: SupportedServices, features: ServiceFeatures): void {
        this.$worker.postMessage(new ConfigureFeaturesMessage(serviceName, features));
    }

    getSemanticTokens(sessionId: string, range: lsp.Range,  callback?: (semanticTokens: lsp.SemanticTokens | null) => void) {
        this.postMessage(new GetSemanticTokensMessage(sessionId, range), callback);
    }

    postMessage(message: BaseMessage, callback?: (any) => void) {
        if (callback) {
            let eventName = message.type.toString() + "-" + message.sessionId;
            let callbackFunction = (data) => {
                this.off(eventName, callbackFunction);
                callback(data);
            }
            this.on(eventName, callbackFunction);
        }
        this.$worker.postMessage(message);
    }
}
