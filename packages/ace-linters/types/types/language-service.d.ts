import { CommonConverter } from "../type-converters/common-converters";
import * as ts from "../services/typescript/lib/typescriptServices";
import * as lsp from "vscode-languageserver-protocol";
import { TextDocument } from "vscode-languageserver-textdocument";
import { TextDocumentIdentifier, TextDocumentItem } from "vscode-languageserver-protocol";
import { MarkDownConverter } from "./converters";
export interface LanguageService {
    documents: {
        [documentUri: string]: TextDocument;
    };
    $service: any;
    serviceName: string;
    mode: string;
    globalOptions: any;
    serviceData: LanguageClientConfig | ServiceConfig;
    serviceCapabilities: lsp.ServerCapabilities;
    workspaceUri?: string;
    format(document: lsp.TextDocumentIdentifier, range: lsp.Range, options: lsp.FormattingOptions): Promise<lsp.TextEdit[]>;
    doHover(document: lsp.TextDocumentIdentifier, position: lsp.Position): Promise<lsp.Hover | null>;
    doValidation(document: lsp.TextDocumentIdentifier): Promise<lsp.Diagnostic[]>;
    doComplete(document: lsp.TextDocumentIdentifier, position: lsp.Position): Promise<lsp.CompletionItem[] | lsp.CompletionList | null>;
    doResolve(item: lsp.CompletionItem): Promise<lsp.CompletionItem | null>;
    setValue(identifier: lsp.VersionedTextDocumentIdentifier, value: string): any;
    applyDeltas(identifier: lsp.VersionedTextDocumentIdentifier, deltas: lsp.TextDocumentContentChangeEvent[]): any;
    addDocument(document: TextDocumentItem): any;
    setOptions(documentUri: string, options: ServiceOptions, merge?: boolean): any;
    setGlobalOptions(options: ServiceOptions): any;
    getDocument(uri: string): TextDocument;
    removeDocument(document: TextDocumentIdentifier): any;
    renameDocument(document: TextDocumentIdentifier, newDocumentUri: string): any;
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
}
interface TooltipContent {
    type: CommonConverter.TooltipType;
    text: string;
}
export interface Tooltip {
    content: TooltipContent;
    range?: AceRangeData;
}
export interface TextChange {
    range: AceRangeData;
    newText: string;
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
interface ExtraLib {
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
export interface ServiceConfig extends BaseConfig {
    className: string;
    options?: ServiceOptions;
}
export interface BaseConfig {
    initializationOptions?: ServiceOptions;
    options?: ServiceOptions;
    serviceInstance?: LanguageService;
    modes: string;
    className?: string;
    features?: ServiceFeatures;
    module: () => any;
    id?: string;
}
interface WebWorkerConnection {
    type: "webworker";
    worker: Worker;
}
interface SocketConnection {
    type: "socket";
    socket: WebSocket;
}
interface StdioConnection {
    type: "stdio";
    command: string;
}
interface IpcConnection {
    type: "ipc";
    ipcPath: string;
}
type ConnectionType = WebWorkerConnection | SocketConnection | StdioConnection | IpcConnection;
export type LanguageClientConfig = BaseConfig & ConnectionType;
export interface FilterDiagnosticsOptions {
    errorCodesToIgnore?: string[];
    errorCodesToTreatAsWarning?: string[];
    errorCodesToTreatAsInfo?: string[];
    errorMessagesToIgnore?: RegExp[];
    errorMessagesToTreatAsWarning?: RegExp[];
    errorMessagesToTreatAsInfo?: RegExp[];
}
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
export {};
