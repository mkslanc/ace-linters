import type {FormattingOptions} from "vscode-languageserver-types";
import type {Ace} from "ace-code/ace";
import {TooltipType} from "../type-converters/common-converters";

export namespace AceLinters {
    export interface LanguageService {
        doc: Ace.Document;
        $service;

        $getDocument(): any; //TODO: TextDocument

        format(range: Ace.Range, format: FormattingOptions): TextEdit[];

        doHover(position: Ace.Point): Promise<Tooltip>;

        doValidation(): Promise<Ace.Annotation[]>;

        doComplete(position: Ace.Point): Promise<Ace.Completion[]>;

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

    export interface TextEdit {
        range: Ace.Range;
        newText: string;
    }
}

