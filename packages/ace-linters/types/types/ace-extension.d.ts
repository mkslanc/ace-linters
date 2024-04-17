/// <reference types="node" />
import { DecodedSemanticTokens } from "../type-converters/lsp/semantic-tokens";
declare module "ace-code" {
    namespace Ace {
        interface EditSession {
            bgTokenizer: BackgroundTokenizer;
            setSemanticTokens: (tokens: DecodedSemanticTokens | undefined) => void;
        }
        interface Tokenizer {
            getLineTokens(line: string, startState: string | string[], row?: any): {
                tokens: Ace.Token[];
                state: string | string[];
            };
        }
        class BackgroundTokenizer {
            constructor(tokenizer: Tokenizer, session?: EditSession);
            semanticTokens: DecodedSemanticTokens | undefined;
            running: false | number | NodeJS.Timeout;
            lines: any[];
            states: any[];
            currentLine: number;
            tokenizer: Ace.Tokenizer;
            $worker: () => void;
            setTokenizer(tokenizer: Ace.Tokenizer): void;
            setDocument(doc: Ace.Document): void;
            doc: Ace.Document;
            fireUpdateEvent(firstRow: number, lastRow: number): void;
            start(startRow: number): void;
            scheduleStart(): void;
            $updateOnChange(delta: Ace.Delta): void;
            stop(): void;
            getTokens(row: number): Ace.Token[];
            getState(row: number): string;
            $tokenizeRow(row: number): Ace.Token[];
            cleanup(): void;
        }
    }
}
