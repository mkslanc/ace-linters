import { Ace } from 'ace-code';
import { CompletionProvider } from 'ace-code/src/autocomplete';
import { CommandBarTooltip } from 'ace-code/src/ext/command_bar';
import { InlineAutocomplete } from 'ace-code/src/ext/inline_autocomplete';
import { Linter } from 'eslint';
import * as lsp from 'vscode-languageserver-protocol';
import { CompletionItemKind } from 'vscode-languageserver-protocol';

export interface DecodedToken {
	row: number;
	startColumn: number;
	length: number;
	type: string;
}
declare class DecodedSemanticTokens {
	tokens: DecodedToken[];
	constructor(tokens: DecodedToken[]);
	getByRow(row: number): DecodedToken[];
	private sortTokens;
}
declare namespace CommonConverter {
	function normalizeRanges(completions: Ace.Completion[]): Ace.Completion[];
	function cleanHtml(html: string): string;
	function toRange(range: {
		start: Ace.Point;
		end: Ace.Point;
	}): any;
	type TooltipType = "plaintext" | "markdown";
	function convertKind(kind?: string): CompletionItemKind;
	function excludeByErrorMessage<T extends {
		[key: string]: any;
	}>(diagnostics: T[], errorMessagesToIgnore?: RegExp[], fieldName?: string): T[];
}
declare namespace ts {
	interface CompilerOptionsWithoutEnums {
		allowImportingTsExtensions?: boolean;
		allowJs?: boolean;
		allowArbitraryExtensions?: boolean;
		allowSyntheticDefaultImports?: boolean;
		allowUmdGlobalAccess?: boolean;
		allowUnreachableCode?: boolean;
		allowUnusedLabels?: boolean;
		alwaysStrict?: boolean;
		baseUrl?: string;
		/** @deprecated */
		charset?: string;
		checkJs?: boolean;
		customConditions?: string[];
		declaration?: boolean;
		declarationMap?: boolean;
		emitDeclarationOnly?: boolean;
		declarationDir?: string;
		disableSizeLimit?: boolean;
		disableSourceOfProjectReferenceRedirect?: boolean;
		disableSolutionSearching?: boolean;
		disableReferencedProjectLoad?: boolean;
		downlevelIteration?: boolean;
		emitBOM?: boolean;
		emitDecoratorMetadata?: boolean;
		exactOptionalPropertyTypes?: boolean;
		experimentalDecorators?: boolean;
		forceConsistentCasingInFileNames?: boolean;
		ignoreDeprecations?: string;
		importHelpers?: boolean;
		/** @deprecated */
		importsNotUsedAsValues?: "remove" | "preserve" | "error";
		inlineSourceMap?: boolean;
		inlineSources?: boolean;
		isolatedModules?: boolean;
		isolatedDeclarations?: boolean;
		jsx?: "none" | "preserve" | "react" | "reactnative" | "reactjsx" | "reactjsxdev";
		/** @deprecated */
		keyofStringsOnly?: boolean;
		lib?: string[];
		locale?: string;
		mapRoot?: string;
		maxNodeModuleJsDepth?: number;
		module?: "none" | "commonjs" | "amd" | "umd" | "system" | "es2015" | "es2020" | "es2022" | "esnext" | "node16" | "nodenext" | "preserve";
		moduleResolution?: "classic" | "nodejs" | "node10" | "node16" | "nodenext" | "bundler";
		moduleSuffixes?: string[];
		moduleDetection?: "legacy" | "auto" | "force";
		newLine?: "carriagereturnlinefeed" | "linefeed";
		noEmit?: boolean;
		noEmitHelpers?: boolean;
		noEmitOnError?: boolean;
		noErrorTruncation?: boolean;
		noFallthroughCasesInSwitch?: boolean;
		noImplicitAny?: boolean;
		noImplicitReturns?: boolean;
		noImplicitThis?: boolean;
		/** @deprecated */
		noStrictGenericChecks?: boolean;
		noUnusedLocals?: boolean;
		noUnusedParameters?: boolean;
		/** @deprecated */
		noImplicitUseStrict?: boolean;
		noPropertyAccessFromIndexSignature?: boolean;
		assumeChangesOnlyAffectDirectDependencies?: boolean;
		noLib?: boolean;
		noResolve?: boolean;
		noUncheckedIndexedAccess?: boolean;
		/** @deprecated */
		out?: string;
		outDir?: string;
		outFile?: string;
		paths?: MapLike<string[]>;
		preserveConstEnums?: boolean;
		noImplicitOverride?: boolean;
		preserveSymlinks?: boolean;
		/** @deprecated */
		preserveValueImports?: boolean;
		project?: string;
		reactNamespace?: string;
		jsxFactory?: string;
		jsxFragmentFactory?: string;
		jsxImportSource?: string;
		composite?: boolean;
		incremental?: boolean;
		tsBuildInfoFile?: string;
		removeComments?: boolean;
		resolvePackageJsonExports?: boolean;
		resolvePackageJsonImports?: boolean;
		rootDir?: string;
		rootDirs?: string[];
		skipLibCheck?: boolean;
		skipDefaultLibCheck?: boolean;
		sourceMap?: boolean;
		sourceRoot?: string;
		strict?: boolean;
		strictFunctionTypes?: boolean;
		strictBindCallApply?: boolean;
		strictNullChecks?: boolean;
		strictPropertyInitialization?: boolean;
		strictBuiltinIteratorReturn?: boolean;
		stripInternal?: boolean;
		/** @deprecated */
		suppressExcessPropertyErrors?: boolean;
		/** @deprecated */
		suppressImplicitAnyIndexErrors?: boolean;
		target?: "es3" | "es5" | "es2015" | "es2016" | "es2017" | "es2018" | "es2019" | "es2020" | "es2021" | "es2022" | "es2023" | "esnext" | "json" | "latest";
		traceResolution?: boolean;
		useUnknownInCatchVariables?: boolean;
		noUncheckedSideEffectImports?: boolean;
		resolveJsonModule?: boolean;
		types?: string[];
		/** Paths used to compute primary types search locations */
		typeRoots?: string[];
		verbatimModuleSyntax?: boolean;
		esModuleInterop?: boolean;
		useDefineForClassFields?: boolean;
		[option: string]: any;
	}
	interface CompilerOptions {
		allowImportingTsExtensions?: boolean;
		allowJs?: boolean;
		allowArbitraryExtensions?: boolean;
		allowSyntheticDefaultImports?: boolean;
		allowUmdGlobalAccess?: boolean;
		allowUnreachableCode?: boolean;
		allowUnusedLabels?: boolean;
		alwaysStrict?: boolean;
		baseUrl?: string;
		/** @deprecated */
		charset?: string;
		checkJs?: boolean;
		customConditions?: string[];
		declaration?: boolean;
		declarationMap?: boolean;
		emitDeclarationOnly?: boolean;
		declarationDir?: string;
		disableSizeLimit?: boolean;
		disableSourceOfProjectReferenceRedirect?: boolean;
		disableSolutionSearching?: boolean;
		disableReferencedProjectLoad?: boolean;
		downlevelIteration?: boolean;
		emitBOM?: boolean;
		emitDecoratorMetadata?: boolean;
		exactOptionalPropertyTypes?: boolean;
		experimentalDecorators?: boolean;
		forceConsistentCasingInFileNames?: boolean;
		ignoreDeprecations?: string;
		importHelpers?: boolean;
		/** @deprecated */
		importsNotUsedAsValues?: ImportsNotUsedAsValues;
		inlineSourceMap?: boolean;
		inlineSources?: boolean;
		isolatedModules?: boolean;
		isolatedDeclarations?: boolean;
		jsx?: JsxEmit;
		/** @deprecated */
		keyofStringsOnly?: boolean;
		lib?: string[];
		locale?: string;
		mapRoot?: string;
		maxNodeModuleJsDepth?: number;
		module?: ModuleKind;
		moduleResolution?: ModuleResolutionKind;
		moduleSuffixes?: string[];
		moduleDetection?: ModuleDetectionKind;
		newLine?: NewLineKind;
		noEmit?: boolean;
		noEmitHelpers?: boolean;
		noEmitOnError?: boolean;
		noErrorTruncation?: boolean;
		noFallthroughCasesInSwitch?: boolean;
		noImplicitAny?: boolean;
		noImplicitReturns?: boolean;
		noImplicitThis?: boolean;
		/** @deprecated */
		noStrictGenericChecks?: boolean;
		noUnusedLocals?: boolean;
		noUnusedParameters?: boolean;
		/** @deprecated */
		noImplicitUseStrict?: boolean;
		noPropertyAccessFromIndexSignature?: boolean;
		assumeChangesOnlyAffectDirectDependencies?: boolean;
		noLib?: boolean;
		noResolve?: boolean;
		noUncheckedIndexedAccess?: boolean;
		/** @deprecated */
		out?: string;
		outDir?: string;
		outFile?: string;
		paths?: MapLike<string[]>;
		preserveConstEnums?: boolean;
		noImplicitOverride?: boolean;
		preserveSymlinks?: boolean;
		/** @deprecated */
		preserveValueImports?: boolean;
		project?: string;
		reactNamespace?: string;
		jsxFactory?: string;
		jsxFragmentFactory?: string;
		jsxImportSource?: string;
		composite?: boolean;
		incremental?: boolean;
		tsBuildInfoFile?: string;
		removeComments?: boolean;
		resolvePackageJsonExports?: boolean;
		resolvePackageJsonImports?: boolean;
		rootDir?: string;
		rootDirs?: string[];
		skipLibCheck?: boolean;
		skipDefaultLibCheck?: boolean;
		sourceMap?: boolean;
		sourceRoot?: string;
		strict?: boolean;
		strictFunctionTypes?: boolean;
		strictBindCallApply?: boolean;
		strictNullChecks?: boolean;
		strictPropertyInitialization?: boolean;
		strictBuiltinIteratorReturn?: boolean;
		stripInternal?: boolean;
		/** @deprecated */
		suppressExcessPropertyErrors?: boolean;
		/** @deprecated */
		suppressImplicitAnyIndexErrors?: boolean;
		target?: ScriptTarget;
		traceResolution?: boolean;
		useUnknownInCatchVariables?: boolean;
		noUncheckedSideEffectImports?: boolean;
		resolveJsonModule?: boolean;
		types?: string[];
		/** Paths used to compute primary types search locations */
		typeRoots?: string[];
		verbatimModuleSyntax?: boolean;
		esModuleInterop?: boolean;
		useDefineForClassFields?: boolean;
		[option: string]: any;
	}
	interface FormatCodeSettings extends EditorSettings {
		readonly insertSpaceAfterCommaDelimiter?: boolean;
		readonly insertSpaceAfterSemicolonInForStatements?: boolean;
		readonly insertSpaceBeforeAndAfterBinaryOperators?: boolean;
		readonly insertSpaceAfterConstructor?: boolean;
		readonly insertSpaceAfterKeywordsInControlFlowStatements?: boolean;
		readonly insertSpaceAfterFunctionKeywordForAnonymousFunctions?: boolean;
		readonly insertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis?: boolean;
		readonly insertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets?: boolean;
		readonly insertSpaceAfterOpeningAndBeforeClosingNonemptyBraces?: boolean;
		readonly insertSpaceAfterOpeningAndBeforeClosingEmptyBraces?: boolean;
		readonly insertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces?: boolean;
		readonly insertSpaceAfterOpeningAndBeforeClosingJsxExpressionBraces?: boolean;
		readonly insertSpaceAfterTypeAssertion?: boolean;
		readonly insertSpaceBeforeFunctionParenthesis?: boolean;
		readonly placeOpenBraceOnNewLineForFunctions?: boolean;
		readonly placeOpenBraceOnNewLineForControlBlocks?: boolean;
		readonly insertSpaceBeforeTypeAnnotation?: boolean;
		readonly indentMultiLineObjectLiteralBeginningOnBlankLine?: boolean;
		readonly semicolons?: SemicolonPreference;
		readonly indentSwitchCase?: boolean;
	}
	interface EditorSettings {
		baseIndentSize?: number;
		indentSize?: number;
		tabSize?: number;
		newLineCharacter?: string;
		convertTabsToSpaces?: boolean;
		indentStyle?: IndentStyle;
		trimTrailingWhitespace?: boolean;
	}
	/** @deprecated */
	enum ImportsNotUsedAsValues {
		Remove = 0,
		Preserve = 1,
		Error = 2
	}
	enum JsxEmit {
		None = 0,
		Preserve = 1,
		React = 2,
		ReactNative = 3,
		ReactJSX = 4,
		ReactJSXDev = 5
	}
	enum ModuleKind {
		None = 0,
		CommonJS = 1,
		AMD = 2,
		UMD = 3,
		System = 4,
		ES2015 = 5,
		ES2020 = 6,
		ES2022 = 7,
		ESNext = 99,
		Node16 = 100,
		NodeNext = 199,
		Preserve = 200
	}
	enum ModuleResolutionKind {
		Classic = 1,
		/**
		 * @deprecated
		 * `NodeJs` was renamed to `Node10` to better reflect the version of Node that it targets.
		 * Use the new name or consider switching to a modern module resolution target.
		 */
		NodeJs = 2,
		Node10 = 2,
		Node16 = 3,
		NodeNext = 99,
		Bundler = 100
	}
	enum ModuleDetectionKind {
		/**
		 * Files with imports, exports and/or import.meta are considered modules
		 */
		Legacy = 1,
		/**
		 * Legacy, but also files with jsx under react-jsx or react-jsxdev and esm mode files under moduleResolution: node16+
		 */
		Auto = 2,
		/**
		 * Consider all non-declaration files modules, regardless of present syntax
		 */
		Force = 3
	}
	enum NewLineKind {
		CarriageReturnLineFeed = 0,
		LineFeed = 1
	}
	/**
	 * Type of objects whose values are all of the same type.
	 * The `in` and `for-in` operators can *not* be safely used,
	 * since `Object.prototype` may be modified by outside code.
	 */
	interface MapLike<T> {
		[index: string]: T;
	}
	enum ScriptTarget {
		/** @deprecated */
		ES3 = 0,
		ES5 = 1,
		ES2015 = 2,
		ES2016 = 3,
		ES2017 = 4,
		ES2018 = 5,
		ES2019 = 6,
		ES2020 = 7,
		ES2021 = 8,
		ES2022 = 9,
		ES2023 = 10,
		ESNext = 99,
		JSON = 100,
		Latest = 99
	}
	enum SemicolonPreference {
		Ignore = "ignore",
		Insert = "insert",
		Remove = "remove"
	}
	enum IndentStyle {
		None = 0,
		Block = 1,
		Smart = 2
	}
}
export interface MarkDownConverter {
	makeHtml(markdownText: string): string;
}
export interface TooltipContent {
	type: CommonConverter.TooltipType;
	text: string;
}
export interface Tooltip {
	content: TooltipContent;
	range?: AceRangeData;
}
export interface CompletionService {
	completions: lsp.CompletionItem[] | lsp.CompletionList | null;
	service: string;
}
export interface InlineCompletionService {
	completions: lsp.InlineCompletionItem[] | lsp.InlineCompletionList | null;
	service: string;
}
export interface ServiceOptions {
	[name: string]: any;
}
export interface ServiceOptionsWithErrorCodes {
	errorCodesToIgnore?: string[];
	errorCodesToTreatAsWarning?: string[];
	errorCodesToTreatAsInfo?: string[];
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
export interface YamlServiceOptions extends ServiceOptionsWithErrorMessages {
	schemas?: {
		uri: string;
		fileMatch?: string[];
		schema?: string;
	}[];
	schemaUri?: string;
}
export interface ExtraLib {
	content: string;
	version: number;
}
export interface TsServiceOptions extends ServiceOptionsWithErrorCodes, ServiceOptionsWithErrorMessages {
	compilerOptions?: ts.CompilerOptions | ts.CompilerOptionsWithoutEnums;
	extraLibs?: {
		[path: string]: ExtraLib;
	};
	formatOptions?: ts.FormatCodeSettings;
}
export interface HtmlServiceOptions extends ServiceOptionsWithErrorMessages {
	validationOptions?: {
		[option: string]: boolean;
	};
	formatOptions?: {};
}
export interface XmlServiceOptions extends ServiceOptionsWithErrorMessages {
	schemas?: {
		uri: string;
		fileMatch?: string[];
		schema?: string;
	}[];
	schemaUri?: string;
}
export interface PhpServiceOptions extends ServiceOptionsWithErrorMessages {
	inline?: boolean;
}
export interface LuaServiceOptions extends ServiceOptionsWithErrorMessages {
}
export interface JavascriptServiceOptions extends ServiceOptionsWithErrorMessages, Linter.FlatConfig {
}
export interface PythonServiceOptions extends ServiceOptionsWithErrorCodes, ServiceOptionsWithErrorMessages {
	configuration: {
		[name: string]: any;
	};
}
export interface CssServiceOptions extends ServiceOptionsWithErrorMessages {
}
export interface ServiceOptionsMap {
	json: JsonServiceOptions;
	json5: JsonServiceOptions;
	typescript: TsServiceOptions;
	html: HtmlServiceOptions;
	yaml: YamlServiceOptions;
	php: PhpServiceOptions;
	xml: XmlServiceOptions;
	/**
	 * @deprecated would be removed in next iterations
	 */
	javascript: JavascriptServiceOptions;
	eslint: JavascriptServiceOptions;
	python: PythonServiceOptions;
	css: CssServiceOptions;
	less: CssServiceOptions;
	scss: CssServiceOptions;
	lua: LuaServiceOptions;
	[serviceName: string]: any;
}
export type SupportedServices = "json" | "json5" | "typescript" | "css" | "html" | "yaml" | "php" | "xml" | /** @deprecated would be removed in next iterations */ "javascript" | "eslint" | "lua" | "less" | "scss" | "python";
/** Options for the completer coming from the LSP server */
export interface LspCompleterOptions {
	triggerCharacters: TriggerCharacterOptions;
}
/** Options regarding the trigger characters */
export interface TriggerCharacterOptions {
	add?: string[];
	remove?: string[];
}
export interface ProviderOptions {
	functionality?: {
		hover?: boolean;
		completion?: {
			overwriteCompleters: boolean;
			lspCompleterOptions?: LspCompleterOptions;
		} | false;
		inlineCompletion?: {
			overwriteCompleters: boolean;
		} | false;
		completionResolve?: boolean;
		format?: boolean;
		documentHighlights?: boolean;
		signatureHelp?: boolean;
		semanticTokens?: boolean;
		codeActions?: boolean;
	};
	markdownConverter?: MarkDownConverter;
	workspacePath?: string;
	aceComponents?: {
		"InlineAutocomplete"?: typeof InlineAutocomplete;
		"CommandBarTooltip"?: typeof CommandBarTooltip;
		"CompletionProvider"?: typeof CompletionProvider;
	};
	/**
	 * When true, disables automatic session registration on editor session changes.
	 * Users must manually call registerSession() and handle session change events themselves.
	 * @default false
	 */
	manualSessionControl?: boolean;
}
export interface SessionLspConfig {
	/**
	 * Absolute or relative path of the file for the session
	 */
	filePath: string;
	/**
	 * When `true` the given path is treated as relative and will be joined with
	 * the workspace’s root URI to form the final canonical URI. When false (or omitted) filePath is just transformed to
	 * URI.
	 * @default `false`
	 */
	joinWorkspaceURI?: boolean;
}
export type ServiceFeatures = {
	[feature in SupportedFeatures]?: boolean;
};
export type SupportedFeatures = "hover" | "completion" | "completionResolve" | "format" | "diagnostics" | "signatureHelp" | "documentHighlight" | "semanticTokens" | "codeAction" | "executeCommand" | "inlineCompletion";
export interface AceRangeData {
	start: {
		row: number;
		column: number;
	};
	end: {
		row: number;
		column: number;
	};
}
export type ServiceStruct = {
	name: string;
	script: string;
	className: string;
	modes: string;
	cdnUrl?: string;
};
export interface CodeActionsByService {
	codeActions: (lsp.Command | lsp.CodeAction)[] | null;
	service: string;
}
export interface ComboDocumentIdentifier {
	sessionId: string;
	documentUri: lsp.DocumentUri;
}
export interface IMessageController {
	$worker: Worker;
	init(documentIdentifier: ComboDocumentIdentifier, document: Ace.Document, mode: string, options: any, initCallback: (capabilities: {
		[serviceName: string]: lsp.ServerCapabilities;
	}) => void): void;
	doValidation(documentIdentifier: ComboDocumentIdentifier, callback?: (annotations: lsp.Diagnostic[]) => void): any;
	doComplete(documentIdentifier: ComboDocumentIdentifier, position: lsp.Position, callback?: (completions: CompletionService[]) => void): any;
	doInlineComplete(documentIdentifier: ComboDocumentIdentifier, position: lsp.Position, callback?: (completions: InlineCompletionService[]) => void): void;
	doResolve(documentIdentifier: ComboDocumentIdentifier, completion: lsp.CompletionItem, callback?: (completion: lsp.CompletionItem | null) => void): any;
	format(documentIdentifier: ComboDocumentIdentifier, range: lsp.Range, format: lsp.FormattingOptions, callback?: (edits: lsp.TextEdit[]) => void): any;
	doHover(documentIdentifier: ComboDocumentIdentifier, position: lsp.Position, callback?: (hover: lsp.Hover[]) => void): any;
	change(documentIdentifier: ComboDocumentIdentifier, deltas: lsp.TextDocumentContentChangeEvent[], document: Ace.Document, callback?: () => void): void;
	changeMode(documentIdentifier: ComboDocumentIdentifier, value: string, version: number, mode: string, callback?: (capabilities: {
		[serviceName: string]: lsp.ServerCapabilities;
	}) => void): any;
	changeOptions(documentIdentifier: ComboDocumentIdentifier, options: ServiceOptions, callback?: () => void): any;
	closeDocument(documentIdentifier: ComboDocumentIdentifier, callback?: () => void): void;
	closeConnection(callback: () => void): void;
	setGlobalOptions(serviceName: string, options: any, merge?: boolean): void;
	configureFeatures(serviceName: SupportedServices, features: ServiceFeatures): void;
	provideSignatureHelp(documentIdentifier: ComboDocumentIdentifier, position: lsp.Position, callback?: (signatureHelp: lsp.SignatureHelp[]) => void): any;
	findDocumentHighlights(documentIdentifier: ComboDocumentIdentifier, position: lsp.Position, callback?: (documentHighlights: lsp.DocumentHighlight[]) => void): any;
	getSemanticTokens(documentIdentifier: ComboDocumentIdentifier, range: lsp.Range, callback?: (semanticTokens: lsp.SemanticTokens | null) => void): any;
	getCodeActions(documentIdentifier: ComboDocumentIdentifier, range: lsp.Range, context: lsp.CodeActionContext, callback?: (codeActions: CodeActionsByService[]) => void): any;
	executeCommand(serviceName: string, command: string, args?: any[], callback?: (result: any) => void): any;
	setWorkspace(workspaceUri: string, callback?: () => void): void;
	renameDocument(documentIdentifier: ComboDocumentIdentifier, newDocumentUri: string, version: number): void;
	sendRequest(serviceName: string, requestName: string, options: any, callback?: (result: any) => void): void;
}
declare class MarkerGroup {
	private markers;
	private session;
	MAX_MARKERS: number;
	constructor(session: any);
	/**
	 * Finds the first marker containing pos
	 * @param {Position} pos
	 * @returns Ace.MarkerGroupItem
	 */
	getMarkerAtPosition(pos: any): any;
	/**
	 * Finds all markers that contain the given position.
	 * @param {Position} pos - The position to search for.
	 * @returns {Ace.MarkerGroupItem[]} - An array of all markers that contain the given position.
	 */
	getMarkersAtPosition(pos: any): any[];
	/**
	 * Comparator for Array.sort function, which sorts marker definitions by their positions
	 *
	 * @param {Ace.MarkerGroupItem} a first marker.
	 * @param {Ace.MarkerGroupItem} b second marker.
	 * @returns {number} negative number if a should be before b, positive number if b should be before a, 0 otherwise.
	 */
	markersComparator(a: any, b: any): number;
	/**
	 * Sets marker definitions to be rendered. Limits the number of markers at MAX_MARKERS.
	 * @param {Ace.MarkerGroupItem[]} markers an array of marker definitions.
	 */
	setMarkers(markers: any): void;
	update(html: any, markerLayer: any, session: any, config: any): void;
}
declare class SessionLanguageProvider {
	session: Ace.EditSession;
	documentUri: string;
	private $messageController;
	private $deltaQueue;
	private $isConnected;
	private $options?;
	private $filePath;
	private $servicesCapabilities?;
	private $requestsQueue;
	state: {
		occurrenceMarkers: MarkerGroup | null;
		diagnosticMarkers: MarkerGroup | null;
	};
	private extensions;
	editor: Ace.Editor;
	private semanticTokensLegend?;
	private $provider;
	private $changeScrollTopHandler?;
	/**
	 * Constructs a new instance of the `SessionLanguageProvider` class.
	 *
	 * @param provider - The `LanguageProvider` instance.
	 * @param session - The Ace editor session.
	 * @param editor - The Ace editor instance.
	 * @param messageController - The `IMessageController` instance for handling messages.
	 * @param config
	 */
	constructor(provider: LanguageProvider, session: Ace.EditSession, editor: Ace.Editor, messageController: IMessageController, config?: SessionLspConfig);
	enqueueIfNotConnected(callback: () => void): void;
	get comboDocumentIdentifier(): ComboDocumentIdentifier;
	/**
	 * Sets the file path for the current document and optionally joins it with the workspace URI.
	 * Increments the document version and updates the internal document URI and identifier.
	 *
	 * @param {string} filePath - The new file path for the document.
	 * @param {boolean} [joinWorkspaceURI] - when true the given path is treated as relative and will be joined with
	 * the workspace’s root URI to form the final canonical URI. When false (or omitted) filePath is just transformed to
	 * URI.
	 */
	setFilePath(filePath: string, joinWorkspaceURI?: boolean): void;
	private $init;
	addSemanticTokenSupport(session: Ace.EditSession): void;
	private $connected;
	private $changeMode;
	setServerCapabilities: (capabilities: {
		[serviceName: string]: lsp.ServerCapabilities;
	}) => void;
	private initDocumentUri;
	private get $extension();
	private get $mode();
	private get $format();
	private $changeListener;
	$sendDeltaQueue: (callback?: any) => any;
	$showAnnotations: (diagnostics: lsp.Diagnostic[]) => void;
	setOptions<OptionsType extends ServiceOptions>(options: OptionsType): void;
	validate: () => void;
	format: () => void;
	applyEdits: (edits: lsp.TextEdit[]) => void;
	getSemanticTokens(): void;
	$applyDocumentHighlight: (documentHighlights: lsp.DocumentHighlight[]) => void;
	/**
	 * Disposes of the SessionLanguageProvider, cleaning up all event listeners,
	 * marker groups, and notifying the server to close the document.
	 * This method should be called when the session is no longer needed.
	 *
	 * @param callback - Optional callback to execute after the document is closed
	 */
	dispose(callback?: any): void;
	closeDocument(callback?: any): void;
}
export declare class LanguageProvider {
	activeEditor: Ace.Editor | null;
	private readonly $messageController;
	private $signatureTooltip;
	$sessionLanguageProviders: {
		[sessionID: string]: SessionLanguageProvider;
	};
	editors: Ace.Editor[];
	options: ProviderOptions;
	private $hoverTooltip;
	$urisToSessionsIds: {
		[uri: string]: string;
	};
	workspaceUri: string;
	private $lightBulbWidgets;
	private stylesEmbedded;
	private inlineCompleter?;
	private doLiveAutocomplete;
	private completerAdapter?;
	private $editorEventHandlers;
	private $editorOriginalState;
	private constructor();
	/**
	 *  Creates LanguageProvider using our transport protocol with the ability to register different services on the same
	 *  webworker
	 * @param {Worker} worker
	 * @param {ProviderOptions} options
	 */
	static create(worker: Worker, options?: ProviderOptions): LanguageProvider;
	/**
	 * method to create LanguageProvider from CDN
	 * @param customServices
	 * @param options
	 * @param includeDefaultLinters by default would include all linters
	 */
	static fromCdn(customServices: {
		services: ServiceStruct[];
		serviceManagerCdn: string;
		includeDefaultLinters?: {
			[name in SupportedServices]?: boolean;
		} | boolean;
	}, options?: ProviderOptions, includeDefaultLinters?: {
		[name in SupportedServices]?: boolean;
	} | boolean): LanguageProvider;
	static fromCdn(cdnUrl: string, options?: ProviderOptions, includeDefaultLinters?: {
		[name in SupportedServices]?: boolean;
	} | boolean): LanguageProvider;
	setProviderOptions(options?: ProviderOptions): void;
	private checkInlineCompletionAdapter;
	/**
	 * Sets the file path for the given Ace edit session. Optionally allows the file path to
	 * be joined with the workspace URI.
	 *
	 * @param session The Ace edit session to update with the file path.
	 * @param config config to set
	 */
	setSessionFilePath(session: Ace.EditSession, config: SessionLspConfig): void;
	/**
	 * Registers a new editing session with the editor and associates it with a language provider.
	 * If a language provider for the specified editing session does not already exist, it initializes
	 * and stores a new session-specific language provider.
	 *
	 * @param session - The Ace EditSession object to be registered, representing a specific editing session.
	 * @param editor - The Ace Editor instance associated with the editing session.
	 * @param [config] - An optional configuration object for initializing the session.
	 */
	registerSession: (session: Ace.EditSession, editor: Ace.Editor, config?: SessionLspConfig) => void;
	/**
	 * Sets the Language Server Protocol (LSP) configuration for the given session.
	 *
	 * @param session - The editor session to which the LSP configuration will be applied.
	 * @param config - The LSP configuration to set for the session.
	 * @return The updated editor session with the applied LSP configuration.
	 */
	setSessionLspConfig(session: Ace.EditSession, config: SessionLspConfig): import("ace-code").EditSession;
	private $getSessionLanguageProvider;
	private $getFileName;
	/**
	 * Registers an Ace editor instance along with the session's configuration settings.
	 *
	 * @param editor - The Ace editor instance to be registered.
	 * @param [config] - Configuration options for the session.
	 */
	registerEditor(editor: Ace.Editor, config?: SessionLspConfig): void;
	/**
	 * Unregisters an Ace editor instance, removing all event listeners, completers, tooltips,
	 * and cleaning up associated resources. This is the counterpart to registerEditor.
	 *
	 * @param editor - The Ace editor instance to be unregistered.
	 * @param cleanupSession - Optional flag to also dispose the current session. When true,
	 *                         calls closeDocument on the editor's session, cleaning up all
	 *                         session-related resources. Default: false.
	 */
	unregisterEditor(editor: Ace.Editor, cleanupSession?: boolean): void;
	codeActionCallback: (codeActions: CodeActionsByService[]) => void;
	/**
	 * Sets a callback function that will be triggered with an array of code actions grouped by service.
	 *
	 * @param {function} callback - A function that receives an array of code actions, categorized by service, as its argument.
	 */
	setCodeActionCallback(callback: (codeActions: CodeActionsByService[]) => void): void;
	executeCommand(command: string, serviceName: string, args?: any[], callback?: (something: any) => void): void;
	applyEdit(workspaceEdit: lsp.WorkspaceEdit, serviceName: string, callback?: (result: lsp.ApplyWorkspaceEditResult, serviceName: string) => void): void;
	$registerEditor(editor: Ace.Editor): void;
	$unregisterEditor(editor: Ace.Editor, cleanupSession?: boolean): void;
	private $provideCodeActions;
	private $initHoverTooltip;
	private createHoverNode;
	private createErrorNode;
	private setStyles;
	/**
	 * Configures global options that apply to all documents handled by the specified language service.
	 *
	 * Global options serve as default settings for all documents processed by a service when no
	 * document-specific options are provided. These options affect language service behavior across
	 * the entire workspace, including validation rules, formatting preferences, completion settings,
	 * and service-specific configurations.
	 *
	 * @param serviceName - The identifier of the language service to configure. Must be a valid
	 *                      service name from the supported services (e.g., 'typescript', 'json', 'html').
	 * @param options - The global configuration options specific to the language service. The structure
	 *                  varies by service type.
	 * @param {boolean} [merge=false] - Indicates whether to merge the provided options with the existing options.
	 *                  Defaults to false.
	 */
	setGlobalOptions<T extends keyof ServiceOptionsMap>(serviceName: T & string, options: ServiceOptionsMap[T], merge?: boolean): void;
	/**
	 * Sets the workspace URI for the language provider.
	 *
	 * If the provided URI is the same as the current workspace URI, no action is taken.
	 * Otherwise, the workspace URI is updated and the message controller is notified.
	 *
	 * Not all servers support changing of workspace URI.
	 *
	 * @param workspaceUri - The new workspace URI. Could be simple path, not URI itself.
	 */
	changeWorkspaceFolder(workspaceUri: string): void;
	/**
	 * Sets the options for a specified editor session.
	 *
	 * @param session - The Ace editor session to configure.
	 * @param options - The configuration options to be applied to the session.
	 * @deprecated Use `setDocumentOptions` instead. This method will be removed in the future.
	 */
	setSessionOptions<OptionsType extends ServiceOptions>(session: Ace.EditSession, options: OptionsType): void;
	/**
	 * Sets configuration options for a document associated with the specified editor session.
	 *
	 * @param session - The Ace editor session representing the document to configure.
	 * @param options - The service options to apply. The exact shape depends on the language services
	 *                  active for this session (e.g. JSON schema settings).
	 */
	setDocumentOptions<OptionsType extends ServiceOptions>(session: Ace.EditSession, options: OptionsType): void;
	/**
	 * Configures the specified features for a given service.
	 *
	 * @param {SupportedServices} serviceName - The name of the service for which features are being configured.
	 * @param {ServiceFeatures} features - The features to be configured for the given service.
	 * @return {void} Does not return a value.
	 */
	configureServiceFeatures(serviceName: SupportedServices, features: ServiceFeatures): void;
	doHover(session: Ace.EditSession, position: Ace.Point, callback?: (hover: Tooltip | undefined) => void): void;
	provideSignatureHelp(session: Ace.EditSession, position: Ace.Point, callback?: (signatureHelp: Tooltip | undefined) => void): void;
	getTooltipText(hover: Tooltip): string;
	format: () => void;
	getSemanticTokens(): void;
	doComplete(editor: Ace.Editor, session: Ace.EditSession, callback: (completionList: Ace.Completion[] | null) => void): void;
	doInlineComplete(editor: Ace.Editor, session: Ace.EditSession, callback: (completionList: Ace.Completion[] | null) => void): void;
	doResolve(item: Ace.Completion, callback: (completionItem: lsp.CompletionItem | null) => void): void;
	$registerCompleters(editor: Ace.Editor): void;
	closeConnection(): void;
	/**
	 * Removes document from all linked services by session id and cleans up all associated resources.
	 * This includes removing event listeners, clearing marker groups, annotations, and notifying the server.
	 * @param session - The Ace EditSession to close
	 * @param [callback] - Optional callback to execute after the document is closed
	 */
	closeDocument(session: Ace.EditSession, callback?: any): void;
	/**
	 * Sends a request to the message controller.
	 * @param serviceName - The name of the service/server to send the request to.
	 * @param method - The method name for the request.
	 * @param params - The parameters for the request.
	 * @param callback - An optional callback function that will be called with the result of the request.
	 */
	sendRequest(serviceName: string, method: string, params: any, callback?: (result: any) => void): void;
	showDocument(params: lsp.ShowDocumentParams, serviceName: string, callback?: (result: lsp.LSPAny, serviceName: string) => void): void;
}
declare abstract class BaseMessage {
	abstract type: MessageType;
	sessionId: string;
	documentUri: lsp.DocumentUri;
	version?: number;
	callbackId: number;
	constructor(documentIdentifier: ComboDocumentIdentifier, callbackId: number);
}
declare class CloseConnectionMessage {
	type: MessageType.closeConnection;
	callbackId: number;
	constructor(callbackId: number);
}
declare class ExecuteCommandMessage {
	callbackId: number;
	serviceName: string;
	type: MessageType.executeCommand;
	value: string;
	args: any[] | undefined;
	constructor(serviceName: string, callbackId: number, command: string, args?: any[]);
}
declare class SendRequestMessage {
	callbackId: number;
	serviceName: string;
	type: MessageType.sendRequest;
	value: string;
	args?: any;
	constructor(serviceName: string, callbackId: number, requestName: string, args?: any);
}
declare enum MessageType {
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
	setWorkspace = 22,
	renameDocument = 23,
	sendRequest = 24,
	showDocument = 25,
	sendResponse = 26,
	inlineComplete = 27
}
export declare class MessageController implements IMessageController {
	$worker: Worker;
	callbacks: {};
	callbackId: number;
	private provider;
	constructor(worker: Worker, provider: LanguageProvider);
	private getSessionIdByUri;
	init(documentIdentifier: ComboDocumentIdentifier, document: Ace.Document, mode: string, options: any, initCallback: (capabilities: {
		[serviceName: string]: lsp.ServerCapabilities;
	}) => void): void;
	doValidation(documentIdentifier: ComboDocumentIdentifier, callback?: (annotations: lsp.Diagnostic[]) => void): void;
	doComplete(documentIdentifier: ComboDocumentIdentifier, position: lsp.Position, callback?: (completions: CompletionService[]) => void): void;
	doInlineComplete(documentIdentifier: ComboDocumentIdentifier, position: lsp.Position, callback?: (completions: InlineCompletionService[]) => void): void;
	doResolve(documentIdentifier: ComboDocumentIdentifier, completion: lsp.CompletionItem, callback?: (completion: lsp.CompletionItem | null) => void): void;
	format(documentIdentifier: ComboDocumentIdentifier, range: lsp.Range, format: lsp.FormattingOptions, callback?: (edits: lsp.TextEdit[]) => void): void;
	doHover(documentIdentifier: ComboDocumentIdentifier, position: lsp.Position, callback?: (hover: lsp.Hover[]) => void): void;
	change(documentIdentifier: ComboDocumentIdentifier, deltas: lsp.TextDocumentContentChangeEvent[], document: Ace.Document, callback?: () => void): void;
	changeMode(documentIdentifier: ComboDocumentIdentifier, value: string, version: number, mode: string, callback?: (capabilities: any) => void): void;
	changeOptions(documentIdentifier: ComboDocumentIdentifier, options: ServiceOptions, callback?: () => void, merge?: boolean): void;
	closeDocument(documentIdentifier: ComboDocumentIdentifier, callback?: () => void): void;
	closeConnection(callback: () => void): void;
	setGlobalOptions<T extends keyof ServiceOptionsMap>(serviceName: T, options: ServiceOptionsMap[T], merge?: boolean): void;
	provideSignatureHelp(documentIdentifier: ComboDocumentIdentifier, position: lsp.Position, callback?: (signatureHelp: lsp.SignatureHelp[]) => void): void;
	findDocumentHighlights(documentIdentifier: ComboDocumentIdentifier, position: lsp.Position, callback?: (documentHighlights: lsp.DocumentHighlight[]) => void): void;
	configureFeatures(serviceName: SupportedServices, features: ServiceFeatures): void;
	getSemanticTokens(documentIdentifier: ComboDocumentIdentifier, range: lsp.Range, callback?: (semanticTokens: lsp.SemanticTokens | null) => void): void;
	getCodeActions(documentIdentifier: ComboDocumentIdentifier, range: lsp.Range, context: lsp.CodeActionContext, callback?: (codeActions: CodeActionsByService[]) => void): void;
	executeCommand(serviceName: string, command: string, args?: any[], callback?: (result: any) => void): void;
	setWorkspace(workspaceUri: string, callback?: () => void): void;
	renameDocument(documentIdentifier: ComboDocumentIdentifier, newDocumentUri: string, version: number): void;
	sendRequest(serviceName: string, requestName: string, args?: any, callback?: (result: any) => void): void;
	postMessage(message: BaseMessage | CloseConnectionMessage | ExecuteCommandMessage | SendRequestMessage, callback?: (any: any) => void): void;
}

export {};
