import {Ace} from "ace-code";

export class InitMessage {
    type: MessageType;
    options: { [key: string]: any };
    value: string;

    constructor(options, value: string) {
        this.type = MessageType.init;
        this.options = options;
        this.value = value;
    }
}

export class FormatMessage {
    type: MessageType;
    value: Ace.Range;

    constructor(value: Ace.Range) {
        this.type = MessageType.format;
        this.value = value;
    }
}

export class CompleteMessage {
    type: MessageType;
    value: Ace.Point;

    constructor(value: Ace.Point) {
        this.type = MessageType.complete;
        this.value = value;
    }
}

export class HoverMessage {
    type: MessageType;
    value: Ace.Point;

    constructor(value: Ace.Point) {
        this.type = MessageType.hover;
        this.value = value;
    }
}

export class ValidateMessage {
    type: MessageType;

    constructor() {
        this.type = MessageType.validate;
    }
}

export enum MessageType {
    init, format, complete, change, hover, validate
}