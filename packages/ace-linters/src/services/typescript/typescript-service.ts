import {BaseService} from "../base-service";
import * as ts from './lib/typescriptServices';
import {Diagnostic} from './lib/typescriptServices';
import {libFileMap} from "./lib/lib";
import {
    fromTsDiagnostics,
    JsxEmit,
    ScriptTarget,
    toCompletions,
    toDocumentHighlights,
    toHover,
    toResolvedCompletion,
    toSignatureHelp,
    toTextEdits,
    toTsOffset
} from "./typescript-converters";
import * as lsp from "vscode-languageserver-protocol";
import {mergeObjects} from "../../utils";
import {LanguageService, TsServiceOptions} from "../../types/language-service";

export class TypescriptService extends BaseService<TsServiceOptions> implements ts.LanguageServiceHost, LanguageService {
    $service: ts.LanguageService;
    $defaultCompilerOptions: ts.CompilerOptions = {
        allowJs: true,
        checkJs: true,
        jsx: JsxEmit.Preserve,
        allowNonTsExtensions: true,
        target: ScriptTarget.ES2020,
        noSemanticValidation: true,
        noSyntaxValidation: false,
        onlyVisible: false,
        module: 99,
        moduleResolution: 99,
        allowSyntheticDefaultImports: true,
        moduleDetection: 3
    };

    $defaultFormatOptions = {
        insertSpaceAfterCommaDelimiter: true,
        insertSpaceAfterSemicolonInForStatements: true,
        insertSpaceBeforeAndAfterBinaryOperators: true,
        insertSpaceAfterConstructor: false,
        insertSpaceAfterKeywordsInControlFlowStatements: true,
        insertSpaceAfterFunctionKeywordForAnonymousFunctions: true,
        insertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis: false,
        insertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets: false,
        insertSpaceAfterOpeningAndBeforeClosingNonemptyBraces: true,
        insertSpaceAfterOpeningAndBeforeClosingEmptyBraces: true,
        insertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces: false,
        insertSpaceAfterOpeningAndBeforeClosingJsxExpressionBraces: false,
        insertSpaceAfterTypeAssertion: false,
        insertSpaceBeforeFunctionParenthesis: false,
        placeOpenBraceOnNewLineForFunctions: false,
        placeOpenBraceOnNewLineForControlBlocks: false,
        indentSize: 4,
        tabSize: 4,
        newLineCharacter: "\n",
        convertTabsToSpaces: true,
    }

    serviceCapabilities = {
        completionProvider: {
            triggerCharacters: ['.', '"', '\'', '`', '/', '@', '<', '#']
        },
        diagnosticProvider: {
            interFileDependencies: true,
            workspaceDiagnostics: true
        },
        documentRangeFormattingProvider: true,
        documentFormattingProvider: true,
        documentHighlightProvider: true,
        hoverProvider: true,
        signatureHelpProvider: {}
    }

    constructor(mode: string) {
        super(mode);
        this.$service = ts.createLanguageService(this);
    }

    getCompilationSettings(): ts.CompilerOptions {
        const parseConfigHost = {
            fileExists: () => {
                return true
            },
            readFile: () => {
                return ""
            },
            readDirectory: () => {
                return []
            },
            useCaseSensitiveFileNames: true
        };
        let options = ts.parseJsonConfigFileContent(this.globalOptions, parseConfigHost, "");
        options = mergeObjects(options.options, this.globalOptions?.compilerOptions, true);
        return mergeObjects(options, this.$defaultCompilerOptions);
    }

    getScriptFileNames(): string[] {
        let fileNames = Object.keys(this.documents);
        return fileNames.concat(Object.keys(this.$extraLibs));
    }

    private get $extraLibs() {
        return this.globalOptions["extraLibs"] ?? [];
    }

    getScriptVersion(fileName: string): string {
        let document = this.getDocument(fileName);
        if (document) {
            if (document.version)
                return document["version"].toString();
            else return "1";
        } else if (fileName === this.getDefaultLibFileName(this.getCompilationSettings())) {
            return '1';
        }
        return '';
    }

    getScriptSnapshot(fileName: string): ts.IScriptSnapshot | undefined {
        const text = this.$getDocument(fileName);
        if (text === undefined) {
            return;
        }

        return <ts.IScriptSnapshot>{
            getText: (start, end) => text.substring(start, end),
            getLength: () => text.length,
            getChangeRange: () => undefined
        };
    }

    $getDocument(fileName: string): string | undefined {
        let text: string;
        let document = this.getDocument(fileName);
        if (document) {
            text = document.getText();
        } else if (fileName in libFileMap) {
            text = libFileMap[fileName];
        } else if (fileName in this.$extraLibs) {
            text = this.$extraLibs[fileName].content;
        } else {
            return;
        }
        return text;
    }

    getScriptKind?(fileName: string): ts.ScriptKind {
        const ext = fileName.substring(fileName.lastIndexOf('.') + 1);
        switch (ext) {
            case 'ts':
                return ts.ScriptKind.TS;
            case 'tsx':
                return ts.ScriptKind.TSX;
            case 'js':
                return ts.ScriptKind.JS;
            case 'jsx':
                return ts.ScriptKind.JSX;
            default:
                return this.getCompilationSettings().allowJs ? ts.ScriptKind.JS : ts.ScriptKind.TS;
        }
    }

    getCurrentDirectory(): string {
        return '';
    }

    getDefaultLibFileName(options: ts.CompilerOptions): string {
        switch (options.target as ScriptTarget) {
            case ScriptTarget.ESNext:
                return 'lib.esnext.full.d.ts';
            case ScriptTarget.ES3:
            case ScriptTarget.ES5:
                return 'lib.d.ts';
            default:
                // Support a dynamic lookup for the ES20XX version based on the target
                // which is safe unless TC39 changes their numbering system
                const eslib = `lib.es${2013 + (options.target || 99)}.full.d.ts`;
                // Note: This also looks in _extraLibs, If you want
                // to add support for additional target options, you will need to
                // add the extra dts files to _extraLibs via the API.
                if (eslib in libFileMap /*|| eslib in this._extraLibs*/) {
                    return eslib;
                }
                return 'lib.es6.d.ts'; // We don't use lib.es2015.full.d.ts due to breaking change.
        }
    }

    readFile(path: string): string | undefined {
        return this.$getDocument(path);
    }

    fileExists(path: string): boolean {
        return this.$getDocument(path) !== undefined;
    }

    getSyntacticDiagnostics(fileName: string): Diagnostic[] {
        return this.$service.getSyntacticDiagnostics(fileName);
    }

    getSemanticDiagnostics(fileName: string): Diagnostic[] {
        return this.$service.getSemanticDiagnostics(fileName);
    }

    getFormattingOptions(options: lsp.FormattingOptions): ts.FormatCodeSettings {
        this.$defaultFormatOptions.convertTabsToSpaces = options.insertSpaces;
        this.$defaultFormatOptions.tabSize = options.tabSize;
        this.$defaultFormatOptions.indentSize = options.tabSize
        if (this.globalOptions && this.globalOptions["formatOptions"]) {
            return mergeObjects(this.globalOptions["formatOptions"], this.$defaultFormatOptions);
        }
        return this.$defaultFormatOptions;
    }

    format(document: lsp.TextDocumentIdentifier, range: lsp.Range, options: lsp.FormattingOptions): Promise<lsp.TextEdit[]> {
        let fullDocument = this.getDocument(document.uri);
        if (!fullDocument || !range)
            return Promise.resolve([]);

        let offset = toTsOffset(range, fullDocument);
        let textEdits = this.$service.getFormattingEditsForRange(document.uri, offset.start, offset.end, this.getFormattingOptions(options));
        return Promise.resolve(toTextEdits(textEdits, fullDocument));
    }

    async doHover(document: lsp.TextDocumentIdentifier, position: lsp.Position): Promise<lsp.Hover | null> {
        let fullDocument = this.getDocument(document.uri);
        if (!fullDocument)
            return null;

        let hover = this.$service.getQuickInfoAtPosition(document.uri, fullDocument.offsetAt(position) + 1)
        return toHover(hover, fullDocument);
    }

    //TODO: more validators?
    async doValidation(document: lsp.TextDocumentIdentifier): Promise<lsp.Diagnostic[]> {
        let fullDocument = this.getDocument(document.uri);
        if (!fullDocument)
            return [];

        let semanticDiagnostics = this.getSemanticDiagnostics(document.uri);
        let syntacticDiagnostics = this.getSyntacticDiagnostics(document.uri);
        return fromTsDiagnostics([...syntacticDiagnostics, ...semanticDiagnostics], fullDocument, this.optionsToFilterDiagnostics);
    }

    async doComplete(document: lsp.TextDocumentIdentifier, position: lsp.Position): Promise<lsp.CompletionItem[] | lsp.CompletionList | null> {
        let fullDocument = this.getDocument(document.uri);
        if (!fullDocument)
            return null;
        let offset = fullDocument.offsetAt(position);
        let completions = this.$service.getCompletionsAtPosition(document.uri, offset, undefined);
        if (!completions)
            return null;

        return toCompletions(completions, fullDocument, offset);
    }

    async doResolve(item: lsp.CompletionItem): Promise<lsp.CompletionItem | null> {
        let resolvedCompletion = this.$service.getCompletionEntryDetails(
            item["fileName"],
            item["position"],
            item.label,
            undefined,
            undefined,
            undefined,
            undefined
        );

        if (!resolvedCompletion)
            return null;

        return toResolvedCompletion(resolvedCompletion);
    }

    async provideSignatureHelp(document: lsp.TextDocumentIdentifier, position: lsp.Position): Promise<lsp.SignatureHelp | null> {
        let fullDocument = this.getDocument(document.uri);
        if (!fullDocument)
            return null;
        let offset = fullDocument.offsetAt(position);
        //TODO: options
        return toSignatureHelp(this.$service.getSignatureHelpItems(document.uri, offset, undefined));
    };

    async findDocumentHighlights(document: lsp.TextDocumentIdentifier, position: lsp.Position): Promise<lsp.DocumentHighlight[]> {
        let fullDocument = this.getDocument(document.uri);
        if (!fullDocument)
            return [];
        let offset = fullDocument.offsetAt(position);
        //TODO: this could work with all opened documents
        let highlights = this.$service.getDocumentHighlights(document.uri, offset, [document.uri]);
        return toDocumentHighlights(highlights, fullDocument);
    }
}
