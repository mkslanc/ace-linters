import * as lsp from 'vscode-languageserver-protocol';
import { LSPAny, TextDocumentIdentifier, TextDocumentItem } from 'vscode-languageserver-protocol';
import { TextDocument } from 'vscode-languageserver-textdocument';

export interface LanguageService {
	documents: {
		[documentUri: string]: TextDocument;
	};
	serviceName: string;
	mode: string;
	globalOptions: ServiceOptions;
	serviceData: LanguageClientConfig | ServiceConfig;
	serviceCapabilities: lsp.ServerCapabilities;
	workspaceUri?: string;
	format(document: lsp.TextDocumentIdentifier, range: lsp.Range, options: lsp.FormattingOptions): Promise<lsp.TextEdit[]>;
	doHover(document: lsp.TextDocumentIdentifier, position: lsp.Position): Promise<lsp.Hover | null>;
	doValidation(document: lsp.TextDocumentIdentifier): Promise<lsp.Diagnostic[]>;
	doComplete(document: lsp.TextDocumentIdentifier, position: lsp.Position): Promise<lsp.CompletionItem[] | lsp.CompletionList | null>;
	doInlineComplete(document: lsp.VersionedTextDocumentIdentifier, position: lsp.Position): Promise<lsp.InlineCompletionList | lsp.InlineCompletionItem[] | null>;
	doResolve(item: lsp.CompletionItem): Promise<lsp.CompletionItem | null>;
	setValue(identifier: lsp.VersionedTextDocumentIdentifier, value: string): void;
	applyDeltas(identifier: lsp.VersionedTextDocumentIdentifier, deltas: lsp.TextDocumentContentChangeEvent[]): void;
	addDocument(document: TextDocumentItem): void;
	setOptions(documentUri: string, options: ServiceOptions, merge?: boolean): void;
	setGlobalOptions(options: ServiceOptions): void;
	getDocument(uri: string): TextDocument;
	removeDocument(document: TextDocumentIdentifier): void;
	renameDocument(document: TextDocumentIdentifier, newDocumentUri: string): void;
	getDocumentValue(uri: string): string | undefined;
	provideSignatureHelp(document: lsp.TextDocumentIdentifier, position: lsp.Position): Promise<lsp.SignatureHelp | null>;
	findDocumentHighlights(document: lsp.TextDocumentIdentifier, position: lsp.Position): Promise<lsp.DocumentHighlight[]>;
	getSemanticTokens(document: lsp.TextDocumentIdentifier, range: lsp.Range): Promise<lsp.SemanticTokens | null>;
	getCodeActions(document: lsp.TextDocumentIdentifier, range: lsp.Range, context: lsp.CodeActionContext): Promise<(lsp.Command | lsp.CodeAction)[] | null>;
	executeCommand(command: string, args?: lsp.LSPAny[]): Promise<any | null>;
	sendAppliedResult(result: lsp.ApplyWorkspaceEditResult, callbackId: number): void;
	dispose(): Promise<void>;
	closeConnection(): Promise<void>;
	setWorkspace(workspaceUri: string): void;
	sendRequest(name: string, args?: lsp.LSPAny): Promise<any>;
	sendResponse(callbackId: number, args?: lsp.LSPAny): void;
}
export interface ServiceOptions {
	[name: string]: any;
}
export interface ServiceOptionsWithErrorMessages {
	errorMessagesToIgnore?: RegExp[];
	errorMessagesToTreatAsWarning?: RegExp[];
	errorMessagesToTreatAsInfo?: RegExp[];
}
export interface PhpServiceOptions extends ServiceOptionsWithErrorMessages {
	inline?: boolean;
}
export type ServiceFeatures = {
	[feature in SupportedFeatures]?: boolean;
};
export type SupportedFeatures = "hover" | "completion" | "completionResolve" | "format" | "diagnostics" | "signatureHelp" | "documentHighlight" | "semanticTokens" | "codeAction" | "executeCommand" | "inlineCompletion";
export interface ServiceConfig extends BaseConfig {
	className: string;
	options?: ServiceOptions;
}
export interface BaseConfig {
	serviceName?: string;
	initializationOptions?: ServiceOptions;
	options?: ServiceOptions;
	serviceInstance?: LanguageService;
	modes: string;
	className?: string;
	features?: ServiceFeatures;
	module: () => any;
	id?: string;
}
export interface WebWorkerConnection {
	type: "webworker";
	worker: Worker;
}
export interface SocketConnection {
	type: "socket";
	socket: WebSocket;
}
export interface StdioConnection {
	type: "stdio";
	command: string;
}
export interface IpcConnection {
	type: "ipc";
	ipcPath: string;
}
export type ConnectionType = WebWorkerConnection | SocketConnection | StdioConnection | IpcConnection;
export type LanguageClientConfig = BaseConfig & ConnectionType;
export interface FilterDiagnosticsOptions {
	errorCodesToIgnore?: string[];
	errorCodesToTreatAsWarning?: string[];
	errorCodesToTreatAsInfo?: string[];
	errorMessagesToIgnore?: RegExp[];
	errorMessagesToTreatAsWarning?: RegExp[];
	errorMessagesToTreatAsInfo?: RegExp[];
}
declare abstract class BaseService<OptionsType extends ServiceOptions = ServiceOptions> implements LanguageService {
	serviceName: string;
	mode: string;
	documents: {
		[documentUri: lsp.DocumentUri]: TextDocument;
	};
	options: {
		[documentUri: string]: OptionsType;
	};
	globalOptions: OptionsType;
	serviceData: ServiceConfig;
	serviceCapabilities: lsp.ServerCapabilities;
	workspaceUri?: string;
	clientCapabilities: lsp.ClientCapabilities;
	protected constructor(mode: string, workspaceUri?: string);
	addDocument(document: lsp.TextDocumentItem): void;
	getDocument(uri: string): TextDocument;
	removeDocument(document: lsp.TextDocumentIdentifier): void;
	renameDocument(document: lsp.TextDocumentIdentifier, newDocumentUri: string): void;
	getDocumentValue(uri: string): string | undefined;
	setValue(identifier: lsp.VersionedTextDocumentIdentifier, value: string): void;
	setGlobalOptions(options: OptionsType): void;
	setWorkspace(workspaceUri: string): void;
	setOptions(documentUri: string, options: OptionsType, merge?: boolean): void;
	getOption<T extends keyof OptionsType>(documentUri: string, optionName: T): OptionsType[T];
	applyDeltas(identifier: lsp.VersionedTextDocumentIdentifier, deltas: lsp.TextDocumentContentChangeEvent[]): void;
	doComplete(document: lsp.TextDocumentIdentifier, position: lsp.Position): Promise<lsp.CompletionItem[] | lsp.CompletionList | null>;
	doInlineComplete(document: lsp.TextDocumentIdentifier, position: lsp.Position): Promise<lsp.InlineCompletionItem[] | lsp.InlineCompletionList | null>;
	doHover(document: lsp.TextDocumentIdentifier, position: lsp.Position): Promise<lsp.Hover | null>;
	doResolve(item: lsp.CompletionItem): Promise<lsp.CompletionItem | null>;
	doValidation(document: lsp.TextDocumentIdentifier): Promise<lsp.Diagnostic[]>;
	format(document: lsp.TextDocumentIdentifier, range: lsp.Range, options: lsp.FormattingOptions): Promise<lsp.TextEdit[]>;
	provideSignatureHelp(document: lsp.TextDocumentIdentifier, position: lsp.Position): Promise<lsp.SignatureHelp | null>;
	findDocumentHighlights(document: lsp.TextDocumentIdentifier, position: lsp.Position): Promise<lsp.DocumentHighlight[]>;
	get optionsToFilterDiagnostics(): FilterDiagnosticsOptions;
	getSemanticTokens(document: lsp.TextDocumentIdentifier, range: lsp.Range): Promise<lsp.SemanticTokens | null>;
	dispose(): Promise<void>;
	closeConnection(): Promise<void>;
	getCodeActions(document: lsp.TextDocumentIdentifier, range: lsp.Range, context: lsp.CodeActionContext): Promise<(lsp.Command | lsp.CodeAction)[] | null>;
	executeCommand(command: string, args?: any[]): Promise<any | null>;
	sendAppliedResult(result: lsp.ApplyWorkspaceEditResult, callbackId: number): void;
	sendRequest(name: string, args?: LSPAny): Promise<any>;
	sendResponse(callbackId: number, args?: LSPAny): void;
}
export declare class PhpService extends BaseService<PhpServiceOptions> implements LanguageService {
	private $service;
	serviceCapabilities: {
		diagnosticProvider: {
			interFileDependencies: boolean;
			workspaceDiagnostics: boolean;
		};
	};
	constructor(mode: string);
	doValidation(document: lsp.TextDocumentIdentifier): Promise<lsp.Diagnostic[]>;
}

export {};
