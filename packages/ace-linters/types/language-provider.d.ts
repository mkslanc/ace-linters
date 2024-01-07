import { Ace } from "ace-code";
import { IMessageController } from "./types/message-controller-interface";
import * as lsp from "vscode-languageserver-protocol";
import { ProviderOptions, ServiceFeatures, ServiceOptions, ServiceOptionsMap, ServiceStruct, SupportedServices, Tooltip } from "./types/language-service";
export declare class LanguageProvider {
    activeEditor: Ace.Editor;
    private readonly $messageController;
    private $signatureTooltip;
    private $sessionLanguageProviders;
    editors: Ace.Editor[];
    options: ProviderOptions;
    private $hoverTooltip;
    constructor(messageController: IMessageController, options?: ProviderOptions);
    /**
     *  Creates LanguageProvider using our transport protocol with ability to register different services on same
     *  webworker
     * @param {Worker} worker
     * @param {ProviderOptions} options
     */
    static create(worker: Worker, options?: ProviderOptions): LanguageProvider;
    static fromCdn(customServices: {
        services: ServiceStruct[];
        serviceManagerCdn: string;
        includeDefaultLinters?: {
            [name in SupportedServices]: boolean;
        } | true;
    }, options?: ProviderOptions): LanguageProvider;
    static fromCdn(cdnUrl: string, options?: ProviderOptions): LanguageProvider;
    private $registerSession;
    private $getSessionLanguageProvider;
    private $getFileName;
    registerEditor(editor: Ace.Editor): void;
    $registerEditor(editor: Ace.Editor): void;
    private $initHoverTooltip;
    setStyle(editor: any): void;
    setSessionOptions<OptionsType extends ServiceOptions>(session: Ace.EditSession, options: OptionsType): void;
    setGlobalOptions<T extends keyof ServiceOptionsMap>(serviceName: T & string, options: ServiceOptionsMap[T], merge?: boolean): void;
    configureServiceFeatures(serviceName: SupportedServices, features: ServiceFeatures): void;
    doHover(session: Ace.EditSession, position: Ace.Point, callback?: (hover: Tooltip | undefined) => void): void;
    provideSignatureHelp(session: Ace.EditSession, position: Ace.Point, callback?: (signatureHelp: Tooltip | undefined) => void): void;
    getTooltipText(hover: Tooltip): string;
    format: () => void;
    doComplete(editor: Ace.Editor, session: Ace.EditSession, callback: (CompletionList: Ace.Completion[] | null) => void): void;
    doResolve(item: Ace.Completion, callback: (completionItem: lsp.CompletionItem | null) => void): void;
    $registerCompleters(editor: Ace.Editor): void;
    dispose(): void;
    /**
     * Removes document from all linked services by session id
     * @param session
     */
    closeDocument(session: Ace.EditSession, callback?: any): void;
}
