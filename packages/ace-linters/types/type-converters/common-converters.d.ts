import { Ace } from "ace-code";
import { CompletionItemKind } from "vscode-languageserver-protocol";
export declare namespace CommonConverter {
    function normalizeRanges(completions: Ace.Completion[]): Ace.Completion[];
    function cleanHtml(html: string): string;
    function toRange(range: {
        start: any;
        end: any;
    }): any;
    type TooltipType = 'plaintext' | 'markdown';
    function convertKind(kind?: string): CompletionItemKind;
    function excludeByErrorMessage<T>(diagnostics: T[], errorMessagesToIgnore?: RegExp[], fieldName?: string): T[];
}
