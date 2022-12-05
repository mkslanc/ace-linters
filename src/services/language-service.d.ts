import type {TextDocument} from "vscode-languageserver-textdocument";
import type {Ace} from "ace-code";
import type {FormattingOptions, Hover, TextEdit} from "vscode-languageserver-types";
import type {CSSFormatConfiguration} from "vscode-css-languageservice/lib/umd/cssLanguageTypes";
import type {HTMLFormatConfiguration} from "vscode-html-languageservice/lib/umd/htmlLanguageTypes";
import {TooltipType} from "../type-converters";
import {CompletionList} from "vscode-json-languageservice/lib/umd/jsonLanguageTypes";

interface LanguageService {
    doc: Ace.Document;
    $service;
    $formatConfig: CSSFormatConfiguration | HTMLFormatConfiguration | FormattingOptions;

    $getDocument(): TextDocument;

    format(range: Ace.Range): TextEdit[];

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
    format?: {
        tabSize: number,
        insertSpaces: boolean
    },
    other?: {
        [name: string]: any
    }
}