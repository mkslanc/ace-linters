import {Ace} from "ace-code";
import {
    BaseMessage,
    ChangeMessage,
    ChangeModeMessage, ChangeOptionsMessage,
    CompleteMessage,
    DeltasMessage, DisposeMessage,
    FormatMessage, GlobalOptionsMessage,
    HoverMessage,
    InitMessage,
    ResolveCompletionMessage,
    ValidateMessage
} from "./message-types";
import * as oop from "ace-code/src/lib/oop";
import {EventEmitter} from "ace-code/src/lib/event_emitter";
import {FormattingOptions} from "vscode-languageserver-protocol";
import {IMessageController} from "./types/message-controller-interface";
import ServiceOptionsMap = AceLinters.ServiceOptionsMap;
import {AceLinters} from "./types";

export class MessageController implements IMessageController {
    private $worker: Worker;

    constructor(worker: Worker) {
        this.$worker = worker;

        this.$worker.onmessage = (e) => {
            let message = e.data;

            this["_signal"](message.type + "-" + message.sessionId, message.value);
        };
    }

    init(sessionId: string, value: string, mode: string, options: AceLinters.ServiceOptions, callback?: () => void) {
        this.postMessage(new InitMessage(sessionId, value, mode, options), callback);
    }

    doValidation(sessionId: string, callback?: (annotations: Ace.Annotation[]) => void) {
        this.postMessage(new ValidateMessage(sessionId), callback);
    }

    doComplete(sessionId: string, position: Ace.Point, callback?: (completionList: Ace.Completion[]) => void) {
        this.postMessage(new CompleteMessage(sessionId, position), callback);
    }

    doResolve(sessionId: string, completion: Ace.Completion, callback?: (completion: Ace.Completion) => void) {
        this.postMessage(new ResolveCompletionMessage(sessionId, completion), callback);
    }

    format(sessionId: string, range: Ace.Range, format: FormattingOptions, callback?: (edits: AceLinters.TextEdit[]) => void) {
        this.postMessage(new FormatMessage(sessionId, range, format), callback);
    }

    doHover(sessionId: string, position: Ace.Point, callback?: (hover: AceLinters.Tooltip) => void) {
        this.postMessage(new HoverMessage(sessionId, position), callback)
    }

    change(sessionId: string, deltas: Ace.Delta[], value: string, docLength: number, callback?: () => void) {
        let message: BaseMessage;
        if (deltas.length > 50 && deltas.length > docLength >> 1) {
            message = new ChangeMessage(sessionId, value);
        } else {
            message = new DeltasMessage(sessionId, deltas);
        }

        this.postMessage(message, callback)
    }

    changeMode(sessionId: string, value: string, mode: string, options: AceLinters.ServiceOptions, callback?: () => void) {
        this.postMessage(new ChangeModeMessage(sessionId, value, mode, options), callback);
    }

    changeOptions(sessionId: string, options: AceLinters.ServiceOptions, callback?: () => void) {
        this.postMessage(new ChangeOptionsMessage(sessionId, options), callback);
    }

    dispose(sessionId: string, callback?: () => void) {
        this.postMessage(new DisposeMessage(sessionId), callback);
    }

    setGlobalOptions<T extends keyof ServiceOptionsMap>(serviceName: T, options: ServiceOptionsMap[T], merge = false) {
        this.$worker.postMessage(new GlobalOptionsMessage(serviceName, options, merge));
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
