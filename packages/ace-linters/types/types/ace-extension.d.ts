import { DecodedSemanticTokens } from "../type-converters/lsp/semantic-tokens";
declare module "ace-code/src/edit_session" {
    interface EditSession {
        setSemanticTokens: (tokens: DecodedSemanticTokens | undefined) => void;
    }
}
declare module "ace-code/src/background_tokenizer" {
    interface BackgroundTokenizer {
        semanticTokens: DecodedSemanticTokens | undefined;
        $tokenizeRow(row: number): import("ace-code").Ace.Token[];
        $worker: () => void;
        $updateOnChange: () => void;
    }
}
declare module "ace-code/src/tokenizer" {
    interface Tokenizer {
        getLineTokens(line: string, startState: string | string[], row?: any): {
            tokens: import("ace-code").Ace.Token[];
            state: string | string[];
        };
    }
}
declare module "ace-code/src/document" {
    interface Document {
        version: number;
    }
}
