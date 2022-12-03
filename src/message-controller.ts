import {Ace} from "ace-code";
import {CompleteMessage, FormatMessage, HoverMessage, InitMessage, ValidateMessage} from "./message-types";
import * as oop from "ace-code/src/lib/oop";
import {EventEmitter} from "ace-code/src/lib/event_emitter";

export class MessageController {
    private static _instance: MessageController;

    static get instance() {
        if (!MessageController._instance) {
            MessageController._instance = new MessageController();
        }
        return MessageController._instance;
    }

    private worker: Worker;

    constructor() {
        //@ts-ignore
        this.worker = new Worker(new URL('./webworker.ts', import.meta.url));

        this.worker.onmessage = (e) => {
            this["_signal"]("message-" + e.data.sessionId, e);
        }
    }

    init(sessionId: string, value: string, options: { [key: string]: any }) {
        this.worker.postMessage(new InitMessage(sessionId, value, options));
    }

    doValidation(sessionId: string) {
        this.worker.postMessage(new ValidateMessage(sessionId))
    }

    doComplete(sessionId: string, position: Ace.Point) {
        this.worker.postMessage(new CompleteMessage(sessionId, position))
    }

    format(sessionId: string, range: Ace.Range) {
        this.worker.postMessage(new FormatMessage(sessionId, range));
    }

    doHover(sessionId: string, position: Ace.Point) {
        this.worker.postMessage(new HoverMessage(sessionId, position))
    }

    postMessage(message: any ) {
        this.worker.postMessage(message);
    }
}

oop.implement(MessageController.prototype, EventEmitter);