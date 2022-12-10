import {Ace} from "ace-code";
import {FormattingOptions} from "vscode-languageserver-types";
import {AceLinters} from "./services/language-service";
import ServiceOptions = AceLinters.ServiceOptions;

export abstract class BaseMessage {
    abstract type: MessageType;
    sessionId: string;

    protected constructor(sessionId) {
        this.sessionId = sessionId;
    }
}

export class InitMessage extends BaseMessage {
    type: MessageType = MessageType.init;
    mode: string;
    options: { [key: string]: any };
    value: string;

    constructor(sessionId: string, value: string, mode: string, options: { [p: string]: any }) {
        super(sessionId);
        this.options = options;
        this.mode = mode;
        this.value = value;
    }
}

export class FormatMessage extends BaseMessage {
    type: MessageType = MessageType.format;
    value: Ace.Range;
    format: FormattingOptions;

    constructor(sessionId: string, value: Ace.Range, format) {
        super(sessionId);
        this.value = value;
        this.format = format;
    }
}

export class CompleteMessage extends BaseMessage {
    type: MessageType = MessageType.complete;
    value: Ace.Point;

    constructor(sessionId: string, value: Ace.Point) {
        super(sessionId);
        this.value = value;
    }
}

export class HoverMessage extends BaseMessage {
    type: MessageType = MessageType.hover;
    value: Ace.Point;

    constructor(sessionId: string, value: Ace.Point) {
        super(sessionId);
        this.value = value;
    }
}

export class ValidateMessage extends BaseMessage {
    type: MessageType = MessageType.validate;

    constructor(sessionId: string) {
        super(sessionId);
    }
}

export class ChangeMessage extends BaseMessage {
    type: MessageType = MessageType.change;
    value: string;

    constructor(sessionId: string, value: string) {
        super(sessionId);
        this.value = value;
    }
}

export class DeltasMessage extends BaseMessage {
    type: MessageType = MessageType.applyDelta;
    value: Ace.Delta[];

    constructor(sessionId: string, value: Ace.Delta[]) {
        super(sessionId);
        this.value = value;
    }
}

export class ChangeModeMessage extends BaseMessage {
    type: MessageType = MessageType.changeMode;
    mode: string;
    options: ServiceOptions;

    constructor(sessionId: string, mode: string, options: ServiceOptions) {
        super(sessionId);
        this.mode = mode;
        this.options = options;
    }
}

export class ChangeOptionsMessage extends BaseMessage {
    type: MessageType = MessageType.changeOptions;
    options: ServiceOptions;

    constructor(sessionId: string, options: ServiceOptions) {
        super(sessionId);
        this.options = options;
    }
}

export enum MessageType {
    init, format, complete, change, hover, validate, applyDelta, changeMode, changeOptions
}