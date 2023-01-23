import {CommonConverter} from "../type-converters/common-converters";
import * as ts from "../services/typescript/lib/typescriptServices";
import * as lsp from "vscode-languageserver-protocol";
import {TextDocument} from "vscode-languageserver-textdocument";
import {Ace} from "ace-code";
import {TextDocumentIdentifier, TextDocumentItem} from "vscode-languageserver-protocol";

export declare namespace AceLinters {
    export interface LanguageService {
        documents: { [sessionID: string]: TextDocument };
        $service;
        mode: string;
        globalOptions;

        format(document: lsp.TextDocumentIdentifier, range: lsp.Range, options: lsp.FormattingOptions): lsp.TextEdit[] | null;

        doHover(document: lsp.TextDocumentIdentifier, position: lsp.Position): Promise<lsp.Hover | null>;

        doValidation(document: lsp.TextDocumentIdentifier): Promise<lsp.Diagnostic[]>;

        doComplete(document: lsp.TextDocumentIdentifier, position: lsp.Position): Promise<lsp.CompletionItem[] | lsp.CompletionList | null>;

        doResolve(item: lsp.CompletionItem): Promise<lsp.CompletionItem>;

        setValue(identifier: lsp.VersionedTextDocumentIdentifier, value: string);

        applyDeltas(identifier: lsp.VersionedTextDocumentIdentifier, deltas: lsp.TextDocumentContentChangeEvent[]);

        addDocument(document: TextDocumentItem);

        setOptions(sessionID: string, options: ServiceOptions, merge?: boolean); //TODO:

        setGlobalOptions(options: ServiceOptions); //TODO:

        getDocument(uri: string): TextDocument;

        removeDocument(document: TextDocumentIdentifier);

        getDocumentValue(uri: string): string;
    }

    interface TooltipContent {
        type: CommonConverter.TooltipType,
        text: string
    }

    export interface Tooltip {
        content: TooltipContent
        range?: Ace.Range
    }

    export interface TextChange {
        range: Ace.Range;
        newText: string;
    }

    export interface ServiceOptions {
        [name: string]: any
    }

    export interface JsonServiceOptions {
        jsonSchemas?: {
            uri: string,
            fileMatch?: string[],
            schema: string,
        }[],
        jsonSchemaUri?: string,
        allowComments?: boolean,
        trailingCommas?: boolean
    }

    export interface TsServiceOptions {
        compilerOptions?: ts.CompilerOptions
    }

    export interface ServiceOptionsMap {
        json: JsonServiceOptions,
        json5: JsonServiceOptions,
        typescript: TsServiceOptions
    }
}
