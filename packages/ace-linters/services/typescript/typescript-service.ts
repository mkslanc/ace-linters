import {Ace} from "ace-code";
import {BaseService} from "../base-service";
import * as ts from './lib/typescriptServices';
import {Diagnostic} from './lib/typescriptServices';
import {libFileMap} from "./lib/lib";
import {
    fromTsDiagnostics,
    ScriptTarget,
    toAceTextEdits, toIndex,
    toTsOffset, toTooltip, toCompletions
} from "../../type-converters/typescript-converters";


export class TypescriptService extends BaseService implements ts.LanguageServiceHost {
    $service: ts.LanguageService;
    $compilerOptions = {allowNonTsExtensions: true, target: ScriptTarget.ESNext};

    constructor(mode: string) {
        super(mode);
        this.$service = ts.createLanguageService(this);
    }

    getCompilationSettings(): ts.CompilerOptions {
        return this.$compilerOptions;
    }

    getScriptFileNames(): string[] {
        return Object.keys(this.documents);
    }

    getScriptVersion(fileName: string): string {
        let document = this.getDocument(fileName);
        if (document) {
            if (document["version"])
                return document["version"].toString();
            else return "1";
        } else if (fileName === this.getDefaultLibFileName(this.$compilerOptions)) {
            return '1';
        }
        return '';
    }

    getScriptSnapshot(fileName: string): ts.IScriptSnapshot {
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
            text = document.getValue();
        } else if (fileName in libFileMap) {
            text = libFileMap[fileName];
        } else {
            return;
        }
        return text;
    }

    getScriptKind?(fileName: string): ts.ScriptKind { //TODO: get scriptkind by suffix or mode?
        return this.getCompilationSettings().allowJs ? ts.ScriptKind.JS : ts.ScriptKind.TS;
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
        const diagnostics = this.$service.getSyntacticDiagnostics(fileName);
        return diagnostics;
    }

    getSemanticDiagnostics(fileName: string): Diagnostic[] {
        const diagnostics = this.$service.getSemanticDiagnostics(fileName);
        return diagnostics;
    }

    format(sessionID: string, range: Ace.Range, format) {
        let document = this.getDocument(sessionID);
        if (!document || !range) {
            return [];
        }
        let offset = toTsOffset(range, document);
        let textEdits = this.$service.getFormattingEditsForRange(sessionID, offset.start, offset.end, {
            PlaceOpenBraceOnNewLineForFunctions: false,
            InsertSpaceAfterFunctionKeywordForAnonymousFunctions: false,
            InsertSpaceAfterCommaDelimiter: false,
            InsertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets: false,
            InsertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis: false,
            InsertSpaceAfterSemicolonInForStatements: false,
            InsertSpaceBeforeAndAfterBinaryOperators: false,
            PlaceOpenBraceOnNewLineForControlBlocks: false,
            InsertSpaceAfterKeywordsInControlFlowStatements: false,
            ConvertTabsToSpaces: format.insertSpaces,
            TabSize: format.tabSize,
            IndentStyle: undefined,
            InsertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces: false,
            IndentSize: format.tabSize,
            NewLineCharacter: '\n'
        });//TODO: separate format options?
        return toAceTextEdits(textEdits, document);
    }

    async doHover(sessionID: string, position: Ace.Point) {
        let document = this.getDocument(sessionID);
        if (!document) {
            return null;
        }
        let hover = this.$service.getQuickInfoAtPosition(sessionID, toIndex(position, document))
        //TODO: position is wrong in some cases
        return Promise.resolve(toTooltip(hover, document));
    }

    //TODO: more validators?
    async doValidation(sessionID: string) {
        let document = this.getDocument(sessionID);
        if (!document) {
            return null;
        }
        let semanticDiagnostics = this.getSemanticDiagnostics(sessionID);
        let syntacticDiagnostics = this.getSyntacticDiagnostics(sessionID);

        return fromTsDiagnostics([...syntacticDiagnostics, ...semanticDiagnostics], document);
    }

    async doComplete(sessionID: string, position: Ace.Point) {
        let document = this.getDocument(sessionID);
        if (!document) {
            return null;
        }
        let completions = this.$service.getCompletionsAtPosition(sessionID, toIndex(position, document), undefined);
        return toCompletions(completions, document);
    }
}
