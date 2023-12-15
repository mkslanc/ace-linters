import * as lsp from "vscode-languageserver-protocol";
import { TextDocument } from "vscode-languageserver-textdocument";
import { FilterDiagnosticsOptions, LanguageService, ServiceConfig, ServiceOptions } from "../types/language-service";
export declare abstract class BaseService<OptionsType extends ServiceOptions = ServiceOptions> implements LanguageService {
    abstract $service: any;
    mode: string;
    documents: {
        [sessionID: string]: TextDocument;
    };
    options: {
        [sessionID: string]: OptionsType;
    };
    globalOptions: OptionsType;
    serviceData: ServiceConfig;
    serviceCapabilities: lsp.ServerCapabilities;
    protected constructor(mode: string);
    addDocument(document: lsp.TextDocumentItem): void;
    getDocument(uri: string): TextDocument;
    removeDocument(document: lsp.TextDocumentIdentifier): void;
    getDocumentValue(uri: string): string | undefined;
    setValue(identifier: lsp.VersionedTextDocumentIdentifier, value: string): void;
    setGlobalOptions(options: OptionsType): void;
    setOptions(sessionID: string, options: OptionsType, merge?: boolean): void;
    getOption<T extends keyof OptionsType>(sessionID: string, optionName: T): OptionsType[T];
    applyDeltas(identifier: lsp.VersionedTextDocumentIdentifier, deltas: lsp.TextDocumentContentChangeEvent[]): void;
    doComplete(document: any, position: lsp.Position): Promise<lsp.CompletionItem[] | lsp.CompletionList | null>;
    doHover(document: any, position: lsp.Position): Promise<lsp.Hover | null>;
    doResolve(item: lsp.CompletionItem): Promise<lsp.CompletionItem | null>;
    doValidation(document: lsp.TextDocumentIdentifier): Promise<lsp.Diagnostic[]>;
    format(document: any, range: lsp.Range, options: lsp.FormattingOptions): Promise<lsp.TextEdit[]>;
    provideSignatureHelp(document: lsp.TextDocumentIdentifier, position: lsp.Position): Promise<lsp.SignatureHelp | null>;
    findDocumentHighlights(document: lsp.TextDocumentIdentifier, position: lsp.Position): Promise<lsp.DocumentHighlight[]>;
    get optionsToFilterDiagnostics(): FilterDiagnosticsOptions;
}
