import {Ace} from "ace-code";
import {CommonConverter} from "../type-converters/common-converters";
import * as ts from "./typescript/lib/typescriptServices";
import type {FormattingOptions} from "vscode-languageserver-types";
import {TextDocument} from "vscode-json-languageservice";

export declare namespace AceLinters {
    export interface LanguageService {
        documents: { [sessionID: string]: Ace.Document };
        $service;
        mode: string;

        $getDocument(sessionID: string): TextDocument;

        format(sessionID: string, range: Ace.Range, format: FormattingOptions): TextEdit[];

        doHover(sessionID: string, position: Ace.Point): Promise<Tooltip>;

        doValidation(sessionID: string): Promise<Ace.Annotation[]>;

        doComplete(sessionID: string, position: Ace.Point): Promise<Ace.Completion[]>;

        resolveCompletion(sessionID: string, completion: Ace.Completion): Promise<Ace.Completion>;

        setValue(sessionID: string, value: string);

        applyDeltas(sessionID: string, delta: Ace.Delta[]);

        addDocument(sessionID: string, document: Ace.Document, options: ServiceOptions);

        setOptions(sessionID: string, options: ServiceOptions);

        setGlobalOptions(options: ServiceOptions);

        getDocument(sessionID: string): Ace.Document;

        removeDocument(sessionID: string);

        getDocumentValue(sessionID: string): string;
    }

    interface TooltipContent {
        type: CommonConverter.TooltipType,
        text: string
    }

    export interface Tooltip {
        content: TooltipContent
        range?: Ace.Range
    }

    export interface TextEdit {
        range: Ace.Range;
        newText: string;
    }

    export interface ServiceOptions {
        [name: string]: any
    }

    export interface JsonServiceOptions {
        jsonSchema?: string,
        allowComments?: boolean,
        trailingCommas?: boolean
    }

    export interface TsServiceOptions {
        compilerOptions?: ts.CompilerOptions
    }

    export interface ServiceOptionsMap {
        json: JsonServiceOptions,
        typescript: TsServiceOptions
    }
}