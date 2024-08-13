import * as lsp from "vscode-languageserver-protocol";
import {mergeObjects} from "../utils";
import {TextDocument} from "vscode-languageserver-textdocument";
import {FilterDiagnosticsOptions, LanguageService, ServiceConfig, ServiceOptions} from "../types/language-service";

export abstract class BaseService<OptionsType extends ServiceOptions = ServiceOptions> implements LanguageService {
    abstract $service;
    serviceName: string;
    mode: string;
    documents: { [documentUri: lsp.DocumentUri]: TextDocument } = {};
    options: { [documentUri: string]: OptionsType } = {};
    globalOptions: OptionsType = {} as OptionsType;
    serviceData: ServiceConfig;
    serviceCapabilities: lsp.ServerCapabilities = {};
    workspaceUri?: string;
    
    clientCapabilities: lsp.ClientCapabilities = {
        textDocument: {
            diagnostic: {
                dynamicRegistration: true,
                relatedDocumentSupport: true
            },
            publishDiagnostics: {
                relatedInformation: true,
                versionSupport: false,
                tagSupport: {
                    valueSet: [lsp.DiagnosticTag.Unnecessary, lsp.DiagnosticTag.Deprecated]
                }
            },
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
            },
            codeAction: {
                dynamicRegistration: true
            }
        },
        workspace: {
            didChangeConfiguration: {
                dynamicRegistration: true,
            },
            executeCommand: {
                dynamicRegistration: true
            },
            applyEdit: true,
            workspaceEdit: {
                failureHandling: "abort",
                normalizesLineEndings: false,
                documentChanges: false
            },
        } as lsp.WorkspaceClientCapabilities,
    };

    protected constructor(mode: string, workspaceUri?: string) {
        this.mode = mode;
        this.workspaceUri = workspaceUri;
    }

    addDocument(document: lsp.TextDocumentItem) {
        this.documents[document.uri] = TextDocument.create(document.uri, document.languageId, document.version,
            (document as lsp.TextDocumentItem).text)
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


    setWorkspace(workspaceUri: string) {
        this.workspaceUri = workspaceUri;
    }

    setOptions(documentUri: string, options: OptionsType, merge = false) {
        this.options[documentUri] = merge ? mergeObjects(options, this.options[documentUri]) : options;
    }

    getOption<T extends keyof OptionsType>(documentUri: string, optionName: T): OptionsType[T] {
        if (this.options[documentUri] && this.options[documentUri][optionName]) {
            return this.options[documentUri][optionName];
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

    closeConnection() {
        return Promise.resolve();
    }

    getCodeActions(document: lsp.TextDocumentIdentifier, range: lsp.Range, context: lsp.CodeActionContext): Promise<(lsp.Command | lsp.CodeAction)[] | null> {
        return Promise.resolve(null);
    }

    executeCommand(command: string, args?: any[]): Promise<any | null> {
        return Promise.resolve(null);
    }

    sendAppliedResult(result: lsp.ApplyWorkspaceEditResult, callbackId: number) {
    }
}
