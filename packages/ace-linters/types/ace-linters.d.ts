import { Ace } from 'ace-code';
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
		start: any;
		end: any;
	}): any;
	type TooltipType = "plaintext" | "markdown";
	function convertKind(kind?: string): CompletionItemKind;
	function excludeByErrorMessage<T>(diagnostics: T[], errorMessagesToIgnore?: RegExp[], fieldName?: string): T[];
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
export interface JavascriptServiceOptions extends ServiceOptionsWithErrorMessages {
	env?: {
		[name: string]: boolean;
	} | undefined;
	extends?: string | string[] | undefined;
	globals?: {
		[name: string]: boolean | "off" | "readonly" | "readable" | "writable" | "writeable";
	} | undefined;
	noInlineConfig?: boolean | undefined;
	overrides?: Array<any> | undefined;
	parser?: string | undefined;
	parserOptions?: {
		[option: string]: any;
	} | undefined;
	plugins?: string[] | undefined;
	processor?: string | undefined;
	reportUnusedDisableDirectives?: boolean | undefined;
	settings?: {
		[name: string]: any;
	} | undefined;
	rules?: {
		[rule: string]: any;
	};
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
export interface ProviderOptions {
	functionality?: {
		hover?: boolean;
		completion?: {
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
	requireFilePath?: boolean;
	workspacePath?: string;
}
export type ServiceFeatures = {
	[feature in SupportedFeatures]?: boolean;
};
export type SupportedFeatures = "hover" | "completion" | "completionResolve" | "format" | "diagnostics" | "signatureHelp" | "documentHighlight" | "semanticTokens" | "codeAction" | "executeCommand";
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
export declare class LanguageProvider {
	activeEditor: Ace.Editor;
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
	requireFilePath: boolean;
	private $lightBulbWidgets;
	private stylesEmbedded;
	private constructor();
	/**
	 *  Creates LanguageProvider using our transport protocol with ability to register different services on same
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
	/**
	 * @param session
	 * @param filePath - The full file path associated with the editor.
	 */
	setSessionFilePath(session: Ace.EditSession, filePath: string): void;
	private $registerSession;
	private $getSessionLanguageProvider;
	private $getFileName;
	/**
	 * Registers an Ace editor instance with the language provider.
	 * @param editor - The Ace editor instance to register.
	 */
	registerEditor(editor: Ace.Editor): void;
	codeActionCallback: (codeActions: CodeActionsByService[]) => void;
	setCodeActionCallback(callback: (codeActions: CodeActionsByService[]) => void): void;
	executeCommand(command: string, serviceName: string, args?: any[], callback?: (something: any) => void): void;
	applyEdit(workspaceEdit: lsp.WorkspaceEdit, serviceName: string, callback?: (result: lsp.ApplyWorkspaceEditResult, serviceName: string) => void): void;
	$registerEditor(editor: Ace.Editor): void;
	private $provideCodeActions;
	private $initHoverTooltip;
	private createHoverNode;
	private createErrorNode;
	private setStyles;
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
	setSessionOptions<OptionsType extends ServiceOptions>(session: Ace.EditSession, options: OptionsType): void;
	configureServiceFeatures(serviceName: SupportedServices, features: ServiceFeatures): void;
	doHover(session: Ace.EditSession, position: Ace.Point, callback?: (hover: Tooltip | undefined) => void): void;
	provideSignatureHelp(session: Ace.EditSession, position: Ace.Point, callback?: (signatureHelp: Tooltip | undefined) => void): void;
	getTooltipText(hover: Tooltip): string;
	format: () => void;
	getSemanticTokens(): void;
	doComplete(editor: Ace.Editor, session: Ace.EditSession, callback: (CompletionList: Ace.Completion[] | null) => void): void;
	doResolve(item: Ace.Completion, callback: (completionItem: lsp.CompletionItem | null) => void): void;
	$registerCompleters(editor: Ace.Editor): void;
	closeConnection(): void;
	/**
	 * Removes document from all linked services by session id
	 * @param session
	 * @param [callback]
	 */
	closeDocument(session: Ace.EditSession, callback?: any): void;
}
declare class SessionLanguageProvider {
	session: Ace.EditSession;
	documentUri: string;
	private $messageController;
	private $deltaQueue;
	private $isConnected;
	private $options?;
	private $filePath;
	private $isFilePathRequired;
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
	/**
	 * Constructs a new instance of the `SessionLanguageProvider` class.
	 *
	 * @param provider - The `LanguageProvider` instance.
	 * @param session - The Ace editor session.
	 * @param editor - The Ace editor instance.
	 * @param messageController - The `IMessageController` instance for handling messages.
	 */
	constructor(provider: LanguageProvider, session: Ace.EditSession, editor: Ace.Editor, messageController: IMessageController);
	enqueueIfNotConnected(callback: () => void): void;
	get comboDocumentIdentifier(): ComboDocumentIdentifier;
	/**
	 * @param filePath
	 */
	setFilePath(filePath: string): void;
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
	closeDocument(callback?: any): void;
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
	renameDocument = 23
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
	postMessage(message: BaseMessage | CloseConnectionMessage | ExecuteCommandMessage, callback?: (any: any) => void): void;
}

export {};
