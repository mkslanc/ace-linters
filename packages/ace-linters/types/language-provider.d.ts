import { Ace } from "ace-code";
import { ComboDocumentIdentifier, IMessageController } from "./types/message-controller-interface";
import * as lsp from "vscode-languageserver-protocol";
import { CodeActionsByService, ProviderOptions, ServiceFeatures, ServiceOptions, ServiceOptionsMap, ServiceStruct, SupportedServices, Tooltip } from "./types/language-service";
import { MarkerGroup } from "./ace/marker_group";
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
    private $modeIsChanged;
    private $options?;
    private $filePath;
    private $isFilePathRequired;
    private $servicesCapabilities?;
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
        [serviceName: string]: lsp.ServerCapabilities<any>;
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
export {};
