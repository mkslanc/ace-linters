import type {TextDocument} from "vscode-languageserver-textdocument";
import {Ace} from "ace-code";
import {Hover, TextEdit, Diagnostic} from "vscode-languageserver-types";

interface LanguageWorker {
    session: Ace.EditSession;
    $service;

    $getDocument(): TextDocument;

    format(range: Ace.Range): TextEdit[];

    doHover(position: Ace.Point): Hover;

    doValidation(): Diagnostic[];
}