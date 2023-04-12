import {CommonConverter} from "../type-converters/common-converters";
import * as ts from "../services/typescript/lib/typescriptServices";
import * as lsp from "vscode-languageserver-protocol";
import {TextDocument} from "vscode-languageserver-textdocument";
import {Ace} from "ace-code";
import {TextDocumentIdentifier, TextDocumentItem} from "vscode-languageserver-protocol";
import {MarkDownConverter} from "./converters";

export declare namespace AceLinters {

    export interface LanguageService {
        documents: { [sessionID: string]: TextDocument };
        $service;
        mode: string;
        globalOptions;
        serviceData: ServiceData;

        format(document: lsp.TextDocumentIdentifier, range: lsp.Range, options: lsp.FormattingOptions): lsp.TextEdit[];

        doHover(document: lsp.TextDocumentIdentifier, position: lsp.Position): Promise<lsp.Hover | null>;

        doValidation(document: lsp.TextDocumentIdentifier): Promise<lsp.Diagnostic[]>;

        doComplete(document: lsp.TextDocumentIdentifier, position: lsp.Position): Promise<lsp.CompletionItem[] | lsp.CompletionList | null>;

        doResolve(item: lsp.CompletionItem): Promise<lsp.CompletionItem | null>;

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
        content: TooltipContent,
        range?: Ace.Range
    }

    export interface TextChange {
        range: Ace.Range;
        newText: string;
    }

    export interface CompletionService {
        completions: lsp.CompletionItem[] | lsp.CompletionList | null,
        service: string
    }

    export interface ServiceOptions {
        [name: string]: any
    }

    export interface JsonServiceOptions {
        schemas?: {
            uri: string,
            fileMatch?: string[],
            schema?: string,
        }[],
        schemaUri?: string,
        allowComments?: boolean,
        trailingCommas?: boolean
    }

    export interface YamlServiceOptions {
        schemas?: {
            uri: string,
            fileMatch?: string[],
            schema?: string,
        }[],
        schemaUri?: string,
    }

    interface ExtraLib {
        content: string;
        version: number;
    }

    export interface TsServiceOptions {
        compilerOptions?: ts.CompilerOptions,
        extraLibs?: {
            [path: string]: ExtraLib;
        }
    }

    export interface HtmlServiceOptions {
        validationOptions?: { [option: string]: boolean }
    }

    export interface XmlServiceOptions {
        schemas?: {
            uri: string,
            fileMatch?: string[],
            schema?: string,
        }[],
        schemaUri?: string,
    }

    export interface PhpServiceOptions {
        inline: boolean
    }

    export interface JavascriptServiceOptions {
        env?: { [name: string]: boolean } | undefined;
        extends?: string | string[] | undefined;
        globals?: { [name: string]: boolean | "off" | "readonly" | "readable" | "writable" | "writeable" } | undefined;
        noInlineConfig?: boolean | undefined;
        overrides?: Array<any> | undefined;
        parser?: string | undefined;
        parserOptions?: { [option: string]: any } | undefined;
        plugins?: string[] | undefined;
        processor?: string | undefined;
        reportUnusedDisableDirectives?: boolean | undefined;
        settings?: { [name: string]: any } | undefined;
        rules?: { [rule: string]: any };
    }

    export interface PythonServiceOptions {
        configuration: { [name: string]: any }
    }

    export interface ServiceOptionsMap {
        json: JsonServiceOptions,
        json5: JsonServiceOptions,
        typescript: TsServiceOptions,
        html: HtmlServiceOptions,
        yaml: YamlServiceOptions,
        php: PhpServiceOptions,
        xml: XmlServiceOptions,
        javascript: JavascriptServiceOptions,
        python: PythonServiceOptions
    }
    
    export type SupportedServices = "json" | "json5" | "typescript" | "css" | "html" | "yaml" | "php" | "xml" | "javascript" | "lua" | "less" | "scss" | "python";

    export interface ProviderOptions {
        functionality: {
            hover: boolean,
            completion: {
                overwriteCompleters: boolean    
            } | false,
            completionResolve: boolean,
            format: boolean
        },
        markdownConverter?: MarkDownConverter
    }

    export type ServiceFeatures = {
        [feature in SupportedFeatures]?: boolean;
    };
    
    export type SupportedFeatures = "hover" | "completion" | "completionResolve" | "format" | "diagnostics";

    export interface ServiceData {
        module: () => any,
        className: string,
        modes: string,
        serviceInstance?: LanguageService,
        options?: ServiceOptions,
        features?: AceLinters.ServiceFeatures
    }
}
