import type {TextDocument} from "vscode-languageserver-textdocument";
import type {Ace} from "ace-code";
import type {FormattingOptions, TextEdit} from "vscode-languageserver-types";
import {TooltipType} from "../type-converters";
import {CompletionList} from "vscode-json-languageservice/lib/umd/jsonLanguageTypes";

interface LanguageService {
    doc: Ace.Document;
    $service;

    $getDocument(): TextDocument;

    format(range: Ace.Range, format: FormattingOptions): TextEdit[];

    doHover(position: Ace.Point): Promise<Tooltip>;

    doValidation(): Promise<Ace.Annotation[]>;

    doComplete(position: Ace.Point): Promise<CompletionList>;

    setValue(value: string);

    applyDeltas(delta: Ace.Delta[]);
}

interface TooltipContent {
    type: TooltipType,
    text: string
}

interface Tooltip {
    content: TooltipContent
    range?: Ace.Range
}

interface ServiceOptions {
    mode?: string,
    other?: {
        [name: string]: any
    }
}