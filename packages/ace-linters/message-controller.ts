import {Ace} from "ace-code";
import {
    BaseMessage,
    ChangeMessage,
    ChangeModeMessage, ChangeOptionsMessage,
    CompleteMessage,
    DeltasMessage, DisposeMessage, DocumentHighlightMessage,
    FormatMessage, GlobalOptionsMessage,
    HoverMessage,
    InitMessage, MessageType,
    ResolveCompletionMessage, SignatureHelpMessage,
    ConfigureFeaturesMessage,
    ValidateMessage
} from "./message-types";
import * as oop from "ace-code/src/lib/oop";
import {EventEmitter} from "ace-code/src/lib/event_emitter";
import {IMessageController} from "./types/message-controller-interface";
import * as lsp from "vscode-languageserver-protocol";
import {CompletionService, ServiceFeatures, ServiceOptions, ServiceOptionsMap, SupportedServices} from "./types";

export class MessageController implements IMessageController {
    private $worker: Worker;

    constructor(worker: Worker) {
        this.$worker = worker;

        this.$worker.addEventListener("message", (e) => {
            let message = e.data;
            this["_signal"](message.type + "-" + message.sessionId, message.value);
        });

    }
    
    init(sessionId: string, document: Ace.Document, mode: string, options: any, initCallback: () => void, validationCallback: (annotations: lsp.Diagnostic[]) => void): void {
        this["on"](MessageType.validate.toString() + "-" + sessionId, validationCallback);

        this.postMessage(new InitMessage(sessionId, document.getValue(), document["version"], mode, options), initCallback);
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

    changeMode(sessionId: string, value: string, mode: string, callback?: () => void) {
        this.postMessage(new ChangeModeMessage(sessionId, value, mode), callback);
    }

    changeOptions(sessionId: string, options: ServiceOptions, callback?: () => void, merge = false) {
        this.postMessage(new ChangeOptionsMessage(sessionId, options, merge), callback);
    }

    dispose(sessionId: string, callback?: () => void) {
        this.postMessage(new DisposeMessage(sessionId), callback);
    }

    setGlobalOptions<T extends keyof ServiceOptionsMap>(serviceName: T, options: ServiceOptionsMap[T], merge = false) {
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

    postMessage(message: BaseMessage, callback?: (any) => void) {
        if (callback) {
            let eventName = message.type.toString() + "-" + message.sessionId;
            let callbackFunction = (data) => {
                this["off"](eventName, callbackFunction);
                callback(data);
            }
            this["on"](eventName, callbackFunction);
        }
        this.$worker.postMessage(message);
    }
}

oop.implement(MessageController.prototype, EventEmitter);
