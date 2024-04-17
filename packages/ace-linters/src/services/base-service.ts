import * as lsp from "vscode-languageserver-protocol";
import {mergeObjects} from "../utils";
import {TextDocument} from "vscode-languageserver-textdocument";
import {FilterDiagnosticsOptions, LanguageService, ServiceConfig, ServiceOptions} from "../types/language-service";

export abstract class BaseService<OptionsType extends ServiceOptions = ServiceOptions> implements LanguageService {
    abstract $service;
    serviceName: string;
    mode: string;
    documents: { [sessionID: string]: TextDocument } = {};
    options: { [sessionID: string]: OptionsType } = {};
    globalOptions: OptionsType = {} as OptionsType;
    serviceData: ServiceConfig;
    serviceCapabilities: lsp.ServerCapabilities = {};
    
    clientCapabilities: lsp.ClientCapabilities = {
        textDocument: {
            hover: {
                dynamicRegistration: true,
                contentFormat: ['markdown', 'plaintext'],
            },
            synchronization: {
                dynamicRegistration: true,
                willSave: false,
                didSave: false,
                willSaveWaitUntil: false,
            },
            formatting: {
                dynamicRegistration: true
            },
            completion: {
                dynamicRegistration: true,
                completionItem: {
                    snippetSupport: true,
                    commitCharactersSupport: false,
                    documentationFormat: ['markdown', 'plaintext'],
                    deprecatedSupport: false,
                    preselectSupport: false,
                },
                contextSupport: false,
            },
            signatureHelp: {
                signatureInformation: {
                    documentationFormat: ['markdown', 'plaintext'],
                    activeParameterSupport: true
                }
            },
            documentHighlight: {
                dynamicRegistration: true
            },
            semanticTokens: {
                multilineTokenSupport: false,
                overlappingTokenSupport: false,
                tokenTypes: [],
                tokenModifiers: [],
                formats: ["relative"],
                requests: {
                    full: {
                        delta: false
                    },
                    range: true
                },
                augmentsSyntaxTokens: true
            }
        },
        workspace: {
            didChangeConfiguration: {
                dynamicRegistration: true,
            },
        } as lsp.WorkspaceClientCapabilities,
    };

    protected constructor(mode: string) {
        this.mode = mode;
    }

    addDocument(document: lsp.TextDocumentItem) {
        this.documents[document.uri] = TextDocument.create(document.uri, document.languageId, document.version,
            (document as lsp.TextDocumentItem).text)
        //TODO:
        /*if (options)
            this.setSessionOptions(sessionID, options);*/
    }

    getDocument(uri: string): TextDocument {
        return this.documents[uri];
    }

    removeDocument(document: lsp.TextDocumentIdentifier) {
        delete this.documents[document.uri];
        if (this.options[document.uri]) {
            delete this.options[document.uri];
        }
    }

    getDocumentValue(uri: string): string | undefined {
        return this.getDocument(uri)?.getText();
    }

    setValue(identifier: lsp.VersionedTextDocumentIdentifier, value: string) {
        let document = this.getDocument(identifier.uri);
        if (document) {
            document = TextDocument.create(document.uri, document.languageId, document.version, value);
            this.documents[document.uri] = document;
        }
    }

    setGlobalOptions(options: OptionsType) {
        this.globalOptions = options ?? {} as OptionsType;
    }

    setOptions(sessionID: string, options: OptionsType, merge = false) {
        this.options[sessionID] = merge ? mergeObjects(options, this.options[sessionID]) : options;
    }

    getOption<T extends keyof OptionsType>(sessionID: string, optionName: T): OptionsType[T] {
        if (this.options[sessionID] && this.options[sessionID][optionName]) {
            return this.options[sessionID][optionName];
        } else {
            return this.globalOptions[optionName];
        }
    }

    applyDeltas(identifier: lsp.VersionedTextDocumentIdentifier, deltas: lsp.TextDocumentContentChangeEvent[]) {
        let document = this.getDocument(identifier.uri);
        if (document)
            TextDocument.update(document, deltas, identifier.version);
    }

    async doComplete(document, position: lsp.Position): Promise<lsp.CompletionItem[] | lsp.CompletionList | null> {
        return null;
    }

    async doHover(document, position: lsp.Position): Promise<lsp.Hover | null> {
        return null;
    }

    async doResolve(item: lsp.CompletionItem): Promise<lsp.CompletionItem | null> {
        return null;
    }

    async doValidation(document: lsp.TextDocumentIdentifier): Promise<lsp.Diagnostic[]> {
        return [];
    }

    format(document, range: lsp.Range, options: lsp.FormattingOptions): Promise<lsp.TextEdit[]> {
        return Promise.resolve([]);
    }

    async provideSignatureHelp(document: lsp.TextDocumentIdentifier, position: lsp.Position): Promise<lsp.SignatureHelp | null> {
        return null;
    }

    async findDocumentHighlights(document: lsp.TextDocumentIdentifier, position: lsp.Position): Promise<lsp.DocumentHighlight[]> {
        return [];
    }

    get optionsToFilterDiagnostics(): FilterDiagnosticsOptions {
        return {
            errorCodesToIgnore: this.globalOptions.errorCodesToIgnore ?? [],
            errorCodesToTreatAsWarning: this.globalOptions.errorCodesToTreatAsWarning ?? [],
            errorCodesToTreatAsInfo: this.globalOptions.errorCodesToTreatAsInfo ?? [],
            errorMessagesToIgnore: this.globalOptions.errorMessagesToIgnore ?? [],
            errorMessagesToTreatAsWarning: this.globalOptions.errorMessagesToTreatAsWarning ?? [],
            errorMessagesToTreatAsInfo: this.globalOptions.errorMessagesToTreatAsInfo ?? [],
        }
    }
    
    getSemanticTokens(document: lsp.TextDocumentIdentifier, range: lsp.Range): Promise<lsp.SemanticTokens | null> {
        return Promise.resolve(null);
    }

    dispose() {
        return Promise.resolve();
    }

}
