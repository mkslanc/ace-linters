import { Ace } from "ace-code";
import { CompletionItemKind } from "vscode-languageserver-protocol";
export declare namespace CommonConverter {
    function normalizeRanges(completions: Ace.Completion[], editor: Ace.Editor): Ace.Completion[];
    function cleanHtml(html: string): string;
    function toRange(range: {
        start: any;
        end: any;
    }, Range: any): any;
    type TooltipType = 'plaintext' | 'markdown';
    function convertKind(kind?: string): CompletionItemKind;
    function excludeByErrorMessage<T>(diagnostics: T[], errorMessagesToIgnore?: RegExp[], fieldName?: string): T[];
}
