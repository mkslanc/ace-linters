import * as lsp from 'vscode-languageserver-protocol';
import { LSPAny, TextDocumentIdentifier, TextDocumentItem } from 'vscode-languageserver-protocol';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { Command, CompletionItem, CompletionItemKind, CompletionItemTag, CompletionList, Diagnostic, DocumentHighlight, DocumentHighlightKind, DocumentUri, FoldingRangeKind, FormattingOptions, Hover, InsertReplaceEdit, InsertTextFormat, InsertTextMode, Location as Location$1, MarkedString, MarkupContent, MarkupKind, Position, Range as Range$1, SignatureHelp, SymbolKind, TextEdit, WorkspaceEdit } from 'vscode-languageserver-types';

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
export interface HtmlServiceOptions extends ServiceOptionsWithErrorMessages {
	validationOptions?: {
		[option: string]: boolean;
	};
	formatOptions?: {};
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
export interface HTMLFormatConfiguration {
	tabSize?: number;
	insertSpaces?: boolean;
	indentEmptyLines?: boolean;
	wrapLineLength?: number;
	unformatted?: string;
	contentUnformatted?: string;
	indentInnerHtml?: boolean;
	wrapAttributes?: "auto" | "force" | "force-aligned" | "force-expand-multiline" | "aligned-multiple" | "preserve" | "preserve-aligned";
	wrapAttributesIndentSize?: number;
	preserveNewLines?: boolean;
	maxPreserveNewLines?: number;
	indentHandlebars?: boolean;
	endWithNewline?: boolean;
	extraLiners?: string;
	indentScripts?: "keep" | "separate" | "normal";
	templating?: ("auto" | "none" | "angular" | "django" | "erb" | "handlebars" | "php" | "smarty")[] | boolean;
	unformattedContentDelimiter?: string;
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
export declare class HtmlService extends BaseService<HtmlServiceOptions> implements LanguageService {
	private $service;
	defaultValidationOptions: {
		"attr-no-duplication": boolean;
		"body-no-duplicates": boolean;
		"head-body-descendents-html": boolean;
		"head-no-duplicates": boolean;
		"head-valid-children": boolean;
		"html-no-duplicates": boolean;
		"html-root-node": boolean;
		"html-valid-children": boolean;
		"html-valid-children-order": boolean;
		"img-src-required": boolean;
		"invalid-attribute-char": boolean;
		"nested-paragraphs": boolean;
		"spec-char-escape": boolean;
		"src-not-empty": boolean;
		"tag-pair": boolean;
	};
	$defaultFormatOptions: HTMLFormatConfiguration;
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
		documentHighlightProvider: boolean;
		hoverProvider: boolean;
	};
	constructor(mode: string);
	getFormattingOptions(options: HTMLFormatConfiguration): HTMLFormatConfiguration;
	format(document: lsp.TextDocumentIdentifier, range: lsp.Range, options: HTMLFormatConfiguration): Promise<lsp.TextEdit[]>;
	doHover(document: lsp.TextDocumentIdentifier, position: lsp.Position): Promise<lsp.Hover | null>;
	doValidation(document: lsp.TextDocumentIdentifier): Promise<lsp.Diagnostic[]>;
	doComplete(document: lsp.TextDocumentIdentifier, position: lsp.Position): Promise<lsp.CompletionItem[] | lsp.CompletionList | null>;
	doResolve(item: lsp.CompletionItem): Promise<lsp.CompletionItem>;
	findDocumentHighlights(document: lsp.TextDocumentIdentifier, position: lsp.Position): Promise<lsp.DocumentHighlight[]>;
}

export {};
