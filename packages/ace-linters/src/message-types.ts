import {FormattingOptions} from "vscode-languageserver-protocol";
import * as lsp from "vscode-languageserver-protocol";
import {ServiceFeatures, ServiceOptions, SupportedServices} from "./types/language-service";
import {ComboDocumentIdentifier} from "./types/message-controller-interface";

export abstract class BaseMessage {
    abstract type: MessageType;
    sessionId: string;
    documentUri: lsp.DocumentUri;
    version?: number;
    callbackId: number;

    constructor(documentIdentifier: ComboDocumentIdentifier, callbackId: number) {
        this.sessionId = documentIdentifier.sessionId;
        this.documentUri = documentIdentifier.documentUri;
        this.callbackId = callbackId;
    }
}

export class InitMessage extends BaseMessage {
    type: MessageType.init = MessageType.init;
    mode: string;
    options?: { [key: string]: any };
    value: string;
    version: number;

    constructor(documentIdentifier: ComboDocumentIdentifier, callbackId: number, value: string, version: number, mode: string, options?: {
        [p: string]: any
    }) {
        super(documentIdentifier, callbackId);
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

    constructor(documentIdentifier: ComboDocumentIdentifier, callbackId: number, value: lsp.Range, format) {
        super(documentIdentifier, callbackId);
        this.value = value;
        this.format = format;
    }
}

export class CompleteMessage extends BaseMessage {
    type: MessageType.complete = MessageType.complete;
    value: lsp.Position;

    constructor(documentIdentifier: ComboDocumentIdentifier, callbackId: number, value: lsp.Position) {
        super(documentIdentifier, callbackId);
        this.value = value;
    }
}

export class ResolveCompletionMessage extends BaseMessage {
    type: MessageType.resolveCompletion = MessageType.resolveCompletion;
    value: lsp.CompletionItem;

    constructor(documentIdentifier: ComboDocumentIdentifier, callbackId: number, value: lsp.CompletionItem) {
        super(documentIdentifier, callbackId);
        this.value = value;
    }
}

export class HoverMessage extends BaseMessage {
    type: MessageType.hover = MessageType.hover;
    value: lsp.Position;

    constructor(documentIdentifier: ComboDocumentIdentifier, callbackId: number, value: lsp.Position) {
        super(documentIdentifier, callbackId);
        this.value = value;
    }
}

export class ValidateMessage extends BaseMessage {
    type: MessageType.validate = MessageType.validate;

    constructor(documentIdentifier: ComboDocumentIdentifier, callbackId: number) {
        super(documentIdentifier, callbackId);
    }
}

export class ChangeMessage extends BaseMessage {
    type: MessageType.change = MessageType.change;
    value: string;
    version: number

    constructor(documentIdentifier: ComboDocumentIdentifier, callbackId: number, value: string, version: number) {
        super(documentIdentifier, callbackId);
        this.value = value;
        this.version = version;
    }
}

export class DeltasMessage extends BaseMessage {
    type: MessageType.applyDelta = MessageType.applyDelta;
    value: lsp.TextDocumentContentChangeEvent[];
    version: number;

    constructor(documentIdentifier: ComboDocumentIdentifier, callbackId: number, value: lsp.TextDocumentContentChangeEvent[], version: number) {
        super(documentIdentifier, callbackId);
        this.value = value;
        this.version = version;
    }
}

export class ChangeModeMessage extends BaseMessage {
    type: MessageType.changeMode = MessageType.changeMode;
    mode: string;
    value: string;
    version: number;

    constructor(documentIdentifier: ComboDocumentIdentifier, callbackId: number, value: string, version: number, mode: string) {
        super(documentIdentifier, callbackId);
        this.value = value;
        this.mode = mode;
        this.version = version;
    }
}

export class ChangeOptionsMessage extends BaseMessage {
    type: MessageType.changeOptions = MessageType.changeOptions;
    options: ServiceOptions;
    merge: boolean;

    constructor(documentIdentifier: ComboDocumentIdentifier, callbackId: number, options: ServiceOptions, merge: boolean = false) {
        super(documentIdentifier, callbackId);
        this.options = options;
        this.merge = merge;
    }
}

export class CloseDocumentMessage extends BaseMessage {
    type: MessageType.closeDocument = MessageType.closeDocument;

    constructor(documentIdentifier: ComboDocumentIdentifier, callbackId: number) {
        super(documentIdentifier, callbackId);
    }
}

export class CloseConnectionMessage {
    type: MessageType.closeConnection = MessageType.closeConnection;
    callbackId: number;

    constructor(callbackId: number) {
        this.callbackId = callbackId;
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

    constructor(documentIdentifier: ComboDocumentIdentifier, callbackId: number, value: lsp.Position) {
        super(documentIdentifier, callbackId);
        this.value = value;
    }
}

export class DocumentHighlightMessage extends BaseMessage {
    type: MessageType.documentHighlight = MessageType.documentHighlight;
    value: lsp.Position;

    constructor(documentIdentifier: ComboDocumentIdentifier, callbackId: number, value: lsp.Position) {
        super(documentIdentifier, callbackId);
        this.value = value;
    }
}

export class GetSemanticTokensMessage extends BaseMessage {
    type: MessageType.getSemanticTokens = MessageType.getSemanticTokens;
    value: lsp.Range;

    constructor(documentIdentifier: ComboDocumentIdentifier, callbackId: number, value: lsp.Range) {
        super(documentIdentifier, callbackId);
        this.value = value;
    }
}

export class GetCodeActionsMessage extends BaseMessage {
    type: MessageType.getCodeActions = MessageType.getCodeActions;
    value: lsp.Range;
    context: lsp.CodeActionContext;

    constructor(documentIdentifier: ComboDocumentIdentifier, callbackId: number, value: lsp.Range, context: lsp.CodeActionContext) {
        super(documentIdentifier, callbackId);
        this.value = value;
        this.context = context;
    }
}

export class SetWorkspaceMessage {
    type: MessageType.setWorkspace = MessageType.setWorkspace;
    value: string;

    constructor(value: string) {
        this.value = value;
    }
}

export class ExecuteCommandMessage {
    callbackId: number;
    serviceName: string;
    type: MessageType.executeCommand = MessageType.executeCommand;
    value: string;
    args: any[] | undefined;

    constructor(serviceName: string, callbackId: number, command: string, args?: any[]) {
        this.serviceName = serviceName;
        this.callbackId = callbackId;
        this.value = command;
        this.args = args;
    }
}

export class AppliedEditMessage {
    callbackId: number;
    serviceName: string;
    type: MessageType.appliedEdit = MessageType.appliedEdit;
    value: lsp.ApplyWorkspaceEditResult;

    constructor(value: lsp.ApplyWorkspaceEditResult, serviceName: string, callbackId: number) {
        this.serviceName = serviceName;
        this.callbackId = callbackId;
        this.value = value;
    }
}

export class RenameDocumentMessage extends BaseMessage {
    type: MessageType.renameDocument = MessageType.renameDocument;
    value: string;
    version: number;

    constructor(documentIdentifier: ComboDocumentIdentifier, callbackId: number, value: string, version: number) {
        super(documentIdentifier, callbackId);
        this.value = value;
        this.version = version;
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
    closeConnection,
    capabilitiesChange,
    getSemanticTokens,
    getCodeActions,
    executeCommand,
    applyEdit,
    appliedEdit,
    setWorkspace,
    renameDocument
}

export type AllMessages =
    InitMessage
    | FormatMessage
    | CompleteMessage
    | ResolveCompletionMessage
    | ChangeMessage
    |
    HoverMessage
    | ValidateMessage
    | DeltasMessage
    | ChangeModeMessage
    | ChangeOptionsMessage
    | CloseDocumentMessage
    |
    GlobalOptionsMessage
    | ConfigureFeaturesMessage
    | SignatureHelpMessage
    | DocumentHighlightMessage
    | CloseConnectionMessage
    | GetSemanticTokensMessage
    | GetCodeActionsMessage
    | ExecuteCommandMessage
    | AppliedEditMessage
    | SetWorkspaceMessage
    | RenameDocumentMessage;
