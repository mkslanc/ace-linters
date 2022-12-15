import {Ace} from "ace-code";
import {
    BaseMessage,
    ChangeMessage,
    ChangeModeMessage, ChangeOptionsMessage,
    CompleteMessage,
    DeltasMessage, DisposeMessage,
    FormatMessage,
    HoverMessage,
    InitMessage,
    MessageType,
    ValidateMessage
} from "./message-types";
import * as oop from "ace-code/src/lib/oop";
import {EventEmitter} from "ace-code/src/lib/event_emitter";
import {AceLinters} from "./index";
import {FormattingOptions} from "vscode-languageserver-types";

export class MessageController {
    private static _instance: MessageController;

    static get instance() {
        if (!MessageController._instance) {
            MessageController._instance = new MessageController();
        }
        return MessageController._instance;
    }

    private $worker: Worker;

    constructor() {
        //@ts-ignore
        this.$worker = new Worker(new URL('./webworker.ts', import.meta.url));

        this.$worker.onmessage = (e) => {
            let message = e.data;
            let data = null;
            switch (message.type as MessageType) {
                case MessageType.format:
                    data = message.edits;
                    break;
                case MessageType.complete:
                    data = message.completions;
                    break;
                case MessageType.hover:
                    data = message.hover;
                    break;
                case MessageType.validate:
                    data = message.annotations;
                    break;
                default:
                    break;
            }

            this["_signal"](message.type + "-" + message.sessionId, data);
        };
    }

    init(sessionId: string, value: string, mode: string, options: AceLinters.ServiceOptions, callback?: () => void) {
        this.postMessage(new InitMessage(sessionId, value, mode, options), callback);
    }

    doValidation(sessionId: string, callback?: (annotations: Ace.Annotation[]) => void) {
        this.postMessage(new ValidateMessage(sessionId), callback);
    }

    doComplete(sessionId: string, position: Ace.Point, callback?: (CompletionList) => void) {
        this.postMessage(new CompleteMessage(sessionId, position), callback);
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

    changeMode(sessionId: string, mode: string, options: AceLinters.ServiceOptions, callback?: () => void) {
        this.postMessage(new ChangeModeMessage(sessionId, mode, options), callback);
    }

    changeOptions(sessionId: string, options: AceLinters.ServiceOptions, callback?: () => void) {
        this.postMessage(new ChangeOptionsMessage(sessionId, options), callback);
    }

    dispose(sessionId: string, callback?: () => void) {
        this.postMessage(new DisposeMessage(sessionId), callback);
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