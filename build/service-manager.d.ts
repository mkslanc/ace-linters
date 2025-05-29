import * as lsp from 'vscode-languageserver-protocol';
import { TextDocumentIdentifier, TextDocumentItem, VersionedTextDocumentIdentifier } from 'vscode-languageserver-protocol';
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
export declare class ServiceManager {
	$services: {
		[serviceName: string]: ServiceConfig | LanguageClientConfig;
	};
	serviceInitPromises: {
		[serviceName: string]: Promise<LanguageService>;
	};
	private $sessionIDToMode;
	ctx: {
		postMessage: any;
		addEventListener: any;
	};
	workspaceUri?: string;
	constructor(ctx: {
		postMessage: any;
		addEventListener: any;
	});
	private getServicesCapabilitiesAfterCallback;
	aggregateFeatureResponses(serviceInstances: LanguageService[], feature: SupportedFeatures, methodName: string, documentIdentifier: VersionedTextDocumentIdentifier, attrs: any | any[]): Promise<any>;
	applyOptionsToServices(serviceInstances: LanguageService[], documentUri: string, options: ServiceOptions): void;
	closeAllConnections(): Promise<void>;
	private static $initServiceInstance;
	private $getServicesInstancesByMode;
	private initializeService;
	setGlobalOptions(serviceName: string, options: ServiceOptions, merge?: boolean): void;
	setWorkspace(workspaceUri: string): void;
	addDocument(documentIdentifier: VersionedTextDocumentIdentifier, documentValue: string, mode: string, options?: ServiceOptions): Promise<never[] | {
		[serviceName: string]: LanguageClientConfig | ServiceConfig;
	} | undefined>;
	renameDocument(documentIdentifier: VersionedTextDocumentIdentifier, newDocumentUri: string): Promise<void>;
	changeDocumentMode(documentIdentifier: VersionedTextDocumentIdentifier, value: string, mode: string, options: ServiceOptions): Promise<never[] | {
		[serviceName: string]: LanguageClientConfig | ServiceConfig;
	} | undefined>;
	removeDocument(document: TextDocumentIdentifier): void;
	getServicesInstances(documentUri: string): LanguageService[];
	filterByFeature(serviceInstances: LanguageService[], feature: SupportedFeatures): LanguageService[];
	findServicesByMode(mode: string): {
		[serviceName: string]: (ServiceConfig | LanguageClientConfig);
	};
	registerService(name: string, service: ServiceConfig): void;
	registerServer(name: string, clientConfig: LanguageClientConfig): void;
	configureFeatures(name: string, features?: ServiceFeatures): void;
	setDefaultFeaturesState(serviceFeatures?: ServiceFeatures): ServiceFeatures;
}

export {};
