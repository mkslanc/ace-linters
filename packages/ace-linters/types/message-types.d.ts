import { FormattingOptions } from "vscode-languageserver-protocol";
import * as lsp from "vscode-languageserver-protocol";
import { ServiceFeatures, ServiceOptions, SupportedServices } from "./types/language-service";
import { ComboDocumentIdentifier } from "./types/message-controller-interface";
export declare abstract class BaseMessage {
    abstract type: MessageType;
    sessionId: string;
    documentUri: lsp.DocumentUri;
    version?: number;
    callbackId: number;
    protected constructor(documentIdentifier: ComboDocumentIdentifier, callbackId: number);
}
export declare class InitMessage extends BaseMessage {
    type: MessageType.init;
    mode: string;
    options?: {
        [key: string]: any;
    };
    value: string;
    version: number;
    constructor(documentIdentifier: ComboDocumentIdentifier, callbackId: number, value: string, version: number, mode: string, options?: {
        [p: string]: any;
    });
}
export declare class FormatMessage extends BaseMessage {
    type: MessageType.format;
    value: lsp.Range;
    format: FormattingOptions;
    constructor(documentIdentifier: ComboDocumentIdentifier, callbackId: number, value: lsp.Range, format: any);
}
export declare class CompleteMessage extends BaseMessage {
    type: MessageType.complete;
    value: lsp.Position;
    constructor(documentIdentifier: ComboDocumentIdentifier, callbackId: number, value: lsp.Position);
}
export declare class ResolveCompletionMessage extends BaseMessage {
    type: MessageType.resolveCompletion;
    value: lsp.CompletionItem;
    constructor(documentIdentifier: ComboDocumentIdentifier, callbackId: number, value: lsp.CompletionItem);
}
export declare class HoverMessage extends BaseMessage {
    type: MessageType.hover;
    value: lsp.Position;
    constructor(documentIdentifier: ComboDocumentIdentifier, callbackId: number, value: lsp.Position);
}
export declare class ValidateMessage extends BaseMessage {
    type: MessageType.validate;
    constructor(documentIdentifier: ComboDocumentIdentifier, callbackId: number);
}
export declare class ChangeMessage extends BaseMessage {
    type: MessageType.change;
    value: string;
    version: number;
    constructor(documentIdentifier: ComboDocumentIdentifier, callbackId: number, value: string, version: number);
}
export declare class DeltasMessage extends BaseMessage {
    type: MessageType.applyDelta;
    value: lsp.TextDocumentContentChangeEvent[];
    version: number;
    constructor(documentIdentifier: ComboDocumentIdentifier, callbackId: number, value: lsp.TextDocumentContentChangeEvent[], version: number);
}
export declare class ChangeModeMessage extends BaseMessage {
    type: MessageType.changeMode;
    mode: string;
    value: string;
    version: number;
    constructor(documentIdentifier: ComboDocumentIdentifier, callbackId: number, value: string, version: number, mode: string);
}
export declare class ChangeOptionsMessage extends BaseMessage {
    type: MessageType.changeOptions;
    options: ServiceOptions;
    merge: boolean;
    constructor(documentIdentifier: ComboDocumentIdentifier, callbackId: number, options: ServiceOptions, merge?: boolean);
}
export declare class CloseDocumentMessage extends BaseMessage {
    type: MessageType.closeDocument;
    constructor(documentIdentifier: ComboDocumentIdentifier, callbackId: number);
}
export declare class CloseConnectionMessage {
    type: MessageType.closeConnection;
    callbackId: number;
    constructor(callbackId: number);
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
    constructor(documentIdentifier: ComboDocumentIdentifier, callbackId: number, value: lsp.Position);
}
export declare class DocumentHighlightMessage extends BaseMessage {
    type: MessageType.documentHighlight;
    value: lsp.Position;
    constructor(documentIdentifier: ComboDocumentIdentifier, callbackId: number, value: lsp.Position);
}
export declare class GetSemanticTokensMessage extends BaseMessage {
    type: MessageType.getSemanticTokens;
    value: lsp.Range;
    constructor(documentIdentifier: ComboDocumentIdentifier, callbackId: number, value: lsp.Range);
}
export declare class GetCodeActionsMessage extends BaseMessage {
    type: MessageType.getCodeActions;
    value: lsp.Range;
    context: lsp.CodeActionContext;
    constructor(documentIdentifier: ComboDocumentIdentifier, callbackId: number, value: lsp.Range, context: lsp.CodeActionContext);
}
export declare class SetWorkspaceMessage {
    type: MessageType.setWorkspace;
    value: string;
    constructor(value: string);
}
export declare class ExecuteCommandMessage {
    callbackId: number;
    serviceName: string;
    type: MessageType.executeCommand;
    value: string;
    args: any[] | undefined;
    constructor(serviceName: string, callbackId: number, command: string, args?: any[]);
}
export declare class AppliedEditMessage {
    callbackId: number;
    serviceName: string;
    type: MessageType.appliedEdit;
    value: lsp.ApplyWorkspaceEditResult;
    constructor(value: lsp.ApplyWorkspaceEditResult, serviceName: string, callbackId: number);
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
    closeConnection = 15,
    capabilitiesChange = 16,
    getSemanticTokens = 17,
    getCodeActions = 18,
    executeCommand = 19,
    applyEdit = 20,
    appliedEdit = 21,
    setWorkspace = 22
}
export type AllMessages = InitMessage | FormatMessage | CompleteMessage | ResolveCompletionMessage | ChangeMessage | HoverMessage | ValidateMessage | DeltasMessage | ChangeModeMessage | ChangeOptionsMessage | CloseDocumentMessage | GlobalOptionsMessage | ConfigureFeaturesMessage | SignatureHelpMessage | DocumentHighlightMessage | CloseConnectionMessage | GetSemanticTokensMessage | GetCodeActionsMessage | ExecuteCommandMessage | AppliedEditMessage | SetWorkspaceMessage;
