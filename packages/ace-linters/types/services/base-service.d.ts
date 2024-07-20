import * as lsp from "vscode-languageserver-protocol";
import { TextDocument } from "vscode-languageserver-textdocument";
import { FilterDiagnosticsOptions, LanguageService, ServiceConfig, ServiceOptions } from "../types/language-service";
export declare abstract class BaseService<OptionsType extends ServiceOptions = ServiceOptions> implements LanguageService {
    abstract $service: any;
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
    clientCapabilities: lsp.ClientCapabilities;
    protected constructor(mode: string);
    addDocument(document: lsp.TextDocumentItem): void;
    getDocument(uri: string): TextDocument;
    removeDocument(document: lsp.TextDocumentIdentifier): void;
    getDocumentValue(uri: string): string | undefined;
    setValue(identifier: lsp.VersionedTextDocumentIdentifier, value: string): void;
    setGlobalOptions(options: OptionsType): void;
    setOptions(documentUri: string, options: OptionsType, merge?: boolean): void;
    getOption<T extends keyof OptionsType>(documentUri: string, optionName: T): OptionsType[T];
    applyDeltas(identifier: lsp.VersionedTextDocumentIdentifier, deltas: lsp.TextDocumentContentChangeEvent[]): void;
    doComplete(document: any, position: lsp.Position): Promise<lsp.CompletionItem[] | lsp.CompletionList | null>;
    doHover(document: any, position: lsp.Position): Promise<lsp.Hover | null>;
    doResolve(item: lsp.CompletionItem): Promise<lsp.CompletionItem | null>;
    doValidation(document: lsp.TextDocumentIdentifier): Promise<lsp.Diagnostic[]>;
    format(document: any, range: lsp.Range, options: lsp.FormattingOptions): Promise<lsp.TextEdit[]>;
    provideSignatureHelp(document: lsp.TextDocumentIdentifier, position: lsp.Position): Promise<lsp.SignatureHelp | null>;
    findDocumentHighlights(document: lsp.TextDocumentIdentifier, position: lsp.Position): Promise<lsp.DocumentHighlight[]>;
    get optionsToFilterDiagnostics(): FilterDiagnosticsOptions;
    getSemanticTokens(document: lsp.TextDocumentIdentifier, range: lsp.Range): Promise<lsp.SemanticTokens | null>;
    dispose(): Promise<void>;
    getCodeActions(document: lsp.TextDocumentIdentifier, range: lsp.Range, context: lsp.CodeActionContext): Promise<(lsp.Command | lsp.CodeAction)[] | null>;
    executeCommand(command: string, args?: any[]): Promise<any | null>;
}
