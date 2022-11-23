import type {TextDocument} from "vscode-languageserver-textdocument";
import type {Ace} from "ace-code";
import type {FormattingOptions, Hover, TextEdit} from "vscode-languageserver-types";
import type {CSSFormatConfiguration} from "vscode-css-languageservice/lib/umd/cssLanguageTypes";
import type {HTMLFormatConfiguration} from "vscode-html-languageservice/lib/umd/htmlLanguageTypes";

interface LanguageWorker {
    session: Ace.EditSession;
    $service;
    $formatConfig: CSSFormatConfiguration | HTMLFormatConfiguration | FormattingOptions;

    $getDocument(): TextDocument;

    $setFormatConfiguration(configuration?: FormattingOptions);

    format(range: Ace.Range): TextEdit[];

    doHover(position: Ace.Point): Promise<Hover>;

    doValidation(): Promise<Ace.Annotation[]>;

    doComplete(position: Ace.Point);
}