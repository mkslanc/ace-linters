import {Ace} from "ace-code";
import {FormattingOptions} from "vscode-languageserver-protocol";
import * as lsp from "vscode-languageserver-protocol";
import {ServiceFeatures, ServiceOptions, SupportedServices} from "./types/language-service";

export abstract class BaseMessage {
    abstract type: MessageType;
    sessionId: string;
    version?: number;

    protected constructor(sessionId) {
        this.sessionId = sessionId;
    }
}

export class InitMessage extends BaseMessage {
    type: MessageType.init = MessageType.init;
    mode: string;
    options?: { [key: string]: any };
    value: string;
    version: number;

    constructor(sessionId: string, value: string, version: number, mode: string, options?: { [p: string]: any }) {
        super(sessionId);
        this.version = version;
        this.options = options;
        this.mode = mode;
        this.value = value;
    }
}

export class FormatMessage extends BaseMessage {
    type: MessageType.format = MessageType.format;
    value: lsp.Range;
    format: FormattingOptions;

    constructor(sessionId: string, value: lsp.Range, format) {
        super(sessionId);
        this.value = value;
        this.format = format;
    }
}

export class CompleteMessage extends BaseMessage {
    type: MessageType.complete = MessageType.complete;
    value: lsp.Position;

    constructor(sessionId: string, value: lsp.Position) {
        super(sessionId);
        this.value = value;
    }
}

export class ResolveCompletionMessage extends BaseMessage {
    type: MessageType.resolveCompletion = MessageType.resolveCompletion;
    value: lsp.CompletionItem;

    constructor(sessionId: string, value: lsp.CompletionItem) {
        super(sessionId);
        this.value = value;
    }
}

export class HoverMessage extends BaseMessage {
    type: MessageType.hover = MessageType.hover;
    value: lsp.Position;

    constructor(sessionId: string, value: lsp.Position) {
        super(sessionId);
        this.value = value;
    }
}

export class ValidateMessage extends BaseMessage {
    type: MessageType.validate = MessageType.validate;

    constructor(sessionId: string) {
        super(sessionId);
    }
}

export class ChangeMessage extends BaseMessage {
    type: MessageType.change = MessageType.change;
    value: string;
    version: number

    constructor(sessionId: string, value: string, version: number) {
        super(sessionId);
        this.value = value;
        this.version = version;
    }
}

export class DeltasMessage extends BaseMessage {
    type: MessageType.applyDelta = MessageType.applyDelta;
    value: Ace.Delta[];
    version: number;

    constructor(sessionId: string, value: Ace.Delta[], version: number) {
        super(sessionId);
        this.value = value;
        this.version = version;
    }
}

export class ChangeModeMessage extends BaseMessage {
    type: MessageType.changeMode = MessageType.changeMode;
    mode: string;
    value: string;
    version: number;

    constructor(sessionId: string, value: string, version: number, mode: string) {
        super(sessionId);
        this.value = value;
        this.mode = mode;
        this.version = version;
    }
}

export class ChangeOptionsMessage extends BaseMessage {
    type: MessageType.changeOptions = MessageType.changeOptions;
    options: ServiceOptions;
    merge: boolean;

    constructor(sessionId: string, options: ServiceOptions, merge: boolean = false) {
        super(sessionId);
        this.options = options;
        this.merge = merge;
    }
}

export class CloseDocumentMessage extends BaseMessage {
    type: MessageType.closeDocument = MessageType.closeDocument;

    constructor(sessionId: string) {
        super(sessionId);
    }
}

export class DisposeMessage extends BaseMessage {
    type: MessageType.dispose = MessageType.dispose;
    constructor() {
        super("");
    }
}

export class GlobalOptionsMessage {
    type: MessageType.globalOptions = MessageType.globalOptions;
    serviceName: SupportedServices;
    options: ServiceOptions;
    merge: boolean;

    constructor(serviceName: SupportedServices, options: ServiceOptions, merge: boolean) {
        this.serviceName = serviceName;
        this.options = options;
        this.merge = merge;
    }
}

export class ConfigureFeaturesMessage {
    type: MessageType.configureFeatures = MessageType.configureFeatures;
    serviceName: SupportedServices;
    options: ServiceFeatures;

    constructor(serviceName: SupportedServices, options: ServiceFeatures) {
        this.serviceName = serviceName;
        this.options = options;
    }
}

export class SignatureHelpMessage extends BaseMessage {
    type: MessageType.signatureHelp = MessageType.signatureHelp;
    value: lsp.Position;

    constructor(sessionId: string, value: lsp.Position) {
        super(sessionId);
        this.value = value;
    }
}

export class DocumentHighlightMessage extends BaseMessage {
    type: MessageType.documentHighlight = MessageType.documentHighlight;
    value: lsp.Position;

    constructor(sessionId: string, value: lsp.Position) {
        super(sessionId);
        this.value = value;
    }
}

export class GetSemanticTokensMessage extends BaseMessage {
    type: MessageType.getSemanticTokens = MessageType.getSemanticTokens;
    value: lsp.Range; 

    constructor(sessionId: string, value: lsp.Range) {
        super(sessionId);
        this.value = value;
    }
}

export enum MessageType {
    init,
    format,
    complete,
    resolveCompletion,
    change,
    hover,
    validate,
    applyDelta,
    changeMode,
    changeOptions,
    closeDocument,
    globalOptions,
    configureFeatures,
    signatureHelp,
    documentHighlight,
    dispose,
    capabilitiesChange,
    getSemanticTokens
}

export type AllMessages = InitMessage | FormatMessage | CompleteMessage | ResolveCompletionMessage | ChangeMessage | 
    HoverMessage | ValidateMessage | DeltasMessage | ChangeModeMessage | ChangeOptionsMessage | CloseDocumentMessage | 
    GlobalOptionsMessage | ConfigureFeaturesMessage | SignatureHelpMessage | DocumentHighlightMessage | DisposeMessage | GetSemanticTokensMessage; 
