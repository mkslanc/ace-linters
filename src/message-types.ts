import {Ace} from "ace-code";

export class InitMessage {
    type: MessageType = MessageType.init;
    sessionId: string;
    options: { [key: string]: any };
    value: string;

    constructor(sessionId: string, value: string, options: { [p: string]: any }) {
        this.sessionId = sessionId;
        this.options = options;
        this.value = value;
    }
}

export class FormatMessage {
    type: MessageType = MessageType.format;
    sessionId: string;
    value: Ace.Range;

    constructor(sessionId: string, value: Ace.Range) {
        this.sessionId = sessionId;
        this.value = value;
    }
}

export class CompleteMessage {
    type: MessageType = MessageType.complete;
    sessionId: string;
    value: Ace.Point;

    constructor(sessionId: string, value: Ace.Point) {
        this.sessionId = sessionId;
        this.value = value;
    }
}

export class HoverMessage {
    type: MessageType = MessageType.hover;
    sessionId: string;
    value: Ace.Point;

    constructor(sessionId: string, value: Ace.Point) {
        this.sessionId = sessionId;
        this.value = value;
    }
}

export class ValidateMessage {
    type: MessageType = MessageType.validate;
    sessionId: string;

    constructor(sessionId: string) {
        this.sessionId = sessionId;
    }
}

export class ChangeMessage {
    type: MessageType = MessageType.change;
    sessionId: string;
    value: string;

    constructor(sessionId: string, value: string) {
        this.sessionId = sessionId;
        this.value = value;
    }
}

export class DeltasMessage {
    type: MessageType = MessageType.applyDelta;
    sessionId: string;
    value: Ace.Delta[];

    constructor(sessionId: string, value: Ace.Delta[]) {
        this.sessionId = sessionId;
        this.value = value;
    }
}

export enum MessageType {
    init, format, complete, change, hover, validate, applyDelta
}