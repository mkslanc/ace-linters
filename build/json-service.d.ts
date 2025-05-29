import * as lsp from 'vscode-languageserver-protocol';
import { LSPAny, TextDocumentIdentifier, TextDocumentItem } from 'vscode-languageserver-protocol';
import { TextDocument, TextDocumentContentChangeEvent } from 'vscode-languageserver-textdocument';
import { CodeAction, CodeActionContext, CodeActionKind, Command, CompletionItem, CompletionItemKind, CompletionItemTag, CompletionList, Diagnostic, DiagnosticSeverity, DocumentHighlight, DocumentHighlightKind, DocumentUri, FoldingRangeKind, Hover, InsertTextFormat, Location as Location$1, MarkedString, MarkupContent, MarkupKind, Position, Range as Range$1, SymbolKind, TextDocumentEdit, TextEdit, VersionedTextDocumentIdentifier, WorkspaceEdit } from 'vscode-languageserver-types';

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
export interface JsonServiceOptions extends ServiceOptionsWithErrorMessages {
	schemas?: {
		uri: string;
		fileMatch?: string[];
		schema?: string;
	}[];
	schemaUri?: string;
	allowComments?: boolean;
	trailingCommas?: boolean;
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
export type JSONSchemaRef = JSONSchema | boolean;
export interface JSONSchema {
	id?: string;
	$id?: string;
	$schema?: string;
	type?: string | string[];
	title?: string;
	default?: any;
	definitions?: {
		[name: string]: JSONSchema;
	};
	description?: string;
	properties?: JSONSchemaMap;
	patternProperties?: JSONSchemaMap;
	additionalProperties?: JSONSchemaRef;
	minProperties?: number;
	maxProperties?: number;
	dependencies?: JSONSchemaMap | {
		[prop: string]: string[];
	};
	items?: JSONSchemaRef | JSONSchemaRef[];
	minItems?: number;
	maxItems?: number;
	uniqueItems?: boolean;
	additionalItems?: JSONSchemaRef;
	pattern?: string;
	minLength?: number;
	maxLength?: number;
	minimum?: number;
	maximum?: number;
	exclusiveMinimum?: boolean | number;
	exclusiveMaximum?: boolean | number;
	multipleOf?: number;
	required?: string[];
	$ref?: string;
	anyOf?: JSONSchemaRef[];
	allOf?: JSONSchemaRef[];
	oneOf?: JSONSchemaRef[];
	not?: JSONSchemaRef;
	enum?: any[];
	format?: string;
	const?: any;
	contains?: JSONSchemaRef;
	propertyNames?: JSONSchemaRef;
	examples?: any[];
	$comment?: string;
	if?: JSONSchemaRef;
	then?: JSONSchemaRef;
	else?: JSONSchemaRef;
	unevaluatedProperties?: boolean | JSONSchemaRef;
	unevaluatedItems?: boolean | JSONSchemaRef;
	minContains?: number;
	maxContains?: number;
	deprecated?: boolean;
	dependentRequired?: {
		[prop: string]: string[];
	};
	dependentSchemas?: JSONSchemaMap;
	$defs?: {
		[name: string]: JSONSchema;
	};
	$anchor?: string;
	$recursiveRef?: string;
	$recursiveAnchor?: string;
	$vocabulary?: any;
	prefixItems?: JSONSchemaRef[];
	$dynamicRef?: string;
	$dynamicAnchor?: string;
	defaultSnippets?: {
		label?: string;
		description?: string;
		markdownDescription?: string;
		body?: any;
		bodyText?: string;
	}[];
	errorMessage?: string;
	patternErrorMessage?: string;
	deprecationMessage?: string;
	enumDescriptions?: string[];
	markdownEnumDescriptions?: string[];
	markdownDescription?: string;
	doNotSuggest?: boolean;
	suggestSortText?: string;
	allowComments?: boolean;
	allowTrailingCommas?: boolean;
	completionDetail?: string;
}
export interface JSONSchemaMap {
	[name: string]: JSONSchemaRef;
}
export interface SchemaConfiguration {
	/**
	 * The URI of the schema, which is also the identifier of the schema.
	 */
	uri: string;
	/**
	 * A list of glob patterns that describe for which file URIs the JSON schema will be used.
	 * '*' and '**' wildcards are supported. Exclusion patterns start with '!'.
	 * For example '*.schema.json', 'package.json', '!foo*.schema.json', 'foo/**\/BADRESP.json'.
	 * A match succeeds when there is at least one pattern matching and last matching pattern does not start with '!'.
	 */
	fileMatch?: string[];
	/**
	 * The schema for the given URI.
	 * If no schema is provided, the schema will be fetched with the schema request service (if available).
	 */
	schema?: JSONSchema;
	/**
	 * A parent folder for folder specifc associations. An association that has a folder URI set is only used
	 * if the document that is validated has the folderUri as parent
	 */
	folderUri?: string;
}
export declare class JsonService extends BaseService<JsonServiceOptions> implements LanguageService {
	private $service;
	schemas: {
		[schemaUri: string]: string;
	};
	serviceCapabilities: {
		completionProvider: {
			triggerCharacters: string[];
		};
		diagnosticProvider: {
			interFileDependencies: boolean;
			workspaceDiagnostics: boolean;
		};
		documentRangeFormattingProvider: boolean;
		documentFormattingProvider: boolean;
		hoverProvider: boolean;
	};
	constructor(mode: string);
	private $getJsonSchemaUri;
	addDocument(document: TextDocumentItem): void;
	getSchemaOption(documentUri?: string): {
		uri: string;
		fileMatch?: string[];
		schema?: string;
	}[] | undefined;
	private $configureService;
	$configureJsonService(schemas: SchemaConfiguration[]): void;
	removeDocument(document: TextDocumentIdentifier): void;
	setOptions(documentUri: string, options: JsonServiceOptions, merge?: boolean): void;
	setGlobalOptions(options: JsonServiceOptions): void;
	format(document: lsp.TextDocumentIdentifier, range: lsp.Range, options: lsp.FormattingOptions): Promise<lsp.TextEdit[]>;
	doHover(document: lsp.TextDocumentIdentifier, position: lsp.Position): Promise<lsp.Hover | null>;
	doValidation(document: lsp.TextDocumentIdentifier): Promise<lsp.Diagnostic[]>;
	doComplete(document: lsp.TextDocumentIdentifier, position: lsp.Position): Promise<lsp.CompletionItem[] | lsp.CompletionList | null>;
	doResolve(item: lsp.CompletionItem): Promise<lsp.CompletionItem>;
}

export {};
