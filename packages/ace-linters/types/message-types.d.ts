import { Ace } from "ace-code";
import { FormattingOptions } from "vscode-languageserver-protocol";
import * as lsp from "vscode-languageserver-protocol";
import { ServiceFeatures, ServiceOptions, SupportedServices } from "./types/language-service";
export declare abstract class BaseMessage {
    abstract type: MessageType;
    sessionId: string;
    version?: number;
    protected constructor(sessionId: any);
}
export declare class InitMessage extends BaseMessage {
    type: MessageType.init;
    mode: string;
    options?: {
        [key: string]: any;
    };
    value: string;
    version: number;
    constructor(sessionId: string, value: string, version: number, mode: string, options?: {
        [p: string]: any;
    });
}
export declare class FormatMessage extends BaseMessage {
    type: MessageType.format;
    value: lsp.Range;
    format: FormattingOptions;
    constructor(sessionId: string, value: lsp.Range, format: any);
}
export declare class CompleteMessage extends BaseMessage {
    type: MessageType.complete;
    value: lsp.Position;
    constructor(sessionId: string, value: lsp.Position);
}
export declare class ResolveCompletionMessage extends BaseMessage {
    type: MessageType.resolveCompletion;
    value: lsp.CompletionItem;
    constructor(sessionId: string, value: lsp.CompletionItem);
}
export declare class HoverMessage extends BaseMessage {
    type: MessageType.hover;
    value: lsp.Position;
    constructor(sessionId: string, value: lsp.Position);
}
export declare class ValidateMessage extends BaseMessage {
    type: MessageType.validate;
    constructor(sessionId: string);
}
export declare class ChangeMessage extends BaseMessage {
    type: MessageType.change;
    value: string;
    version: number;
    constructor(sessionId: string, value: string, version: number);
}
export declare class DeltasMessage extends BaseMessage {
    type: MessageType.applyDelta;
    value: Ace.Delta[];
    version: number;
    constructor(sessionId: string, value: Ace.Delta[], version: number);
}
export declare class ChangeModeMessage extends BaseMessage {
    type: MessageType.changeMode;
    mode: string;
    value: string;
    constructor(sessionId: string, value: string, mode: string);
}
export declare class ChangeOptionsMessage extends BaseMessage {
    type: MessageType.changeOptions;
    options: ServiceOptions;
    merge: boolean;
    constructor(sessionId: string, options: ServiceOptions, merge?: boolean);
}
export declare class CloseDocumentMessage extends BaseMessage {
    type: MessageType.closeDocument;
    constructor(sessionId: string);
}
export declare class DisposeMessage extends BaseMessage {
    type: MessageType.dispose;
    constructor();
}
export declare class GlobalOptionsMessage {
    type: MessageType.globalOptions;
    serviceName: SupportedServices;
    options: ServiceOptions;
    merge: boolean;
    constructor(serviceName: SupportedServices, options: ServiceOptions, merge: boolean);
}
export declare class ConfigureFeaturesMessage {
    type: MessageType.configureFeatures;
    serviceName: SupportedServices;
    options: ServiceFeatures;
    constructor(serviceName: SupportedServices, options: ServiceFeatures);
}
export declare class SignatureHelpMessage extends BaseMessage {
    type: MessageType.signatureHelp;
    value: lsp.Position;
    constructor(sessionId: string, value: lsp.Position);
}
export declare class DocumentHighlightMessage extends BaseMessage {
    type: MessageType.documentHighlight;
    value: lsp.Position;
    constructor(sessionId: string, value: lsp.Position);
}
export declare class GetSemanticTokensMessage extends BaseMessage {
    type: MessageType.getSemanticTokens;
    value: lsp.Range;
    constructor(sessionId: string, value: lsp.Range);
}
export declare enum MessageType {
    init = 0,
    format = 1,
    complete = 2,
    resolveCompletion = 3,
    change = 4,
    hover = 5,
    validate = 6,
    applyDelta = 7,
    changeMode = 8,
    changeOptions = 9,
    closeDocument = 10,
    globalOptions = 11,
    configureFeatures = 12,
    signatureHelp = 13,
    documentHighlight = 14,
    dispose = 15,
    capabilitiesChange = 16,
    getSemanticTokens = 17
}
export type AllMessages = InitMessage | FormatMessage | CompleteMessage | ResolveCompletionMessage | ChangeMessage | HoverMessage | ValidateMessage | DeltasMessage | ChangeModeMessage | ChangeOptionsMessage | CloseDocumentMessage | GlobalOptionsMessage | ConfigureFeaturesMessage | SignatureHelpMessage | DocumentHighlightMessage | DisposeMessage | GetSemanticTokensMessage;
