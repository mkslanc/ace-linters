import {Ace} from "ace-code";
import {CompleteMessage, FormatMessage, HoverMessage, InitMessage, ValidateMessage} from "./message-types";

export class MessageAdapter {
    private worker: Worker;

    constructor(worker: Worker) {
        this.worker = worker;
    }

    init(options: { [key: string]: any }, value: string) {
        this.worker.postMessage(new InitMessage(options, value));
    }

    doValidation() {
        this.worker.postMessage(new ValidateMessage())
    }

    doComplete(position: Ace.Point) {
        this.worker.postMessage(new CompleteMessage(position))
    }

    format(range: Ace.Range) {
        this.worker.postMessage(new FormatMessage(range));
    }

    doHover(position: Ace.Point) {
        this.worker.postMessage(new HoverMessage(position))
    }
}