import {DecodedSemanticTokens} from "../type-converters/lsp/semantic-tokens";
import {SessionLspConfig} from "./language-service";

declare module "ace-code/src/edit_session" {

    interface EditSession {
        setSemanticTokens: (tokens: DecodedSemanticTokens | undefined) => void;
        lspConfig?: SessionLspConfig
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
        getLineTokens(line: string, startState: string | string[], row?): {
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

declare module "ace-code/src/editor" {
    interface Editor {
        inlineCompleter: any;
        inlineCompleters: import("ace-code").Ace.Completer[];
    }
}