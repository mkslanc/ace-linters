import { Ace } from "ace-code";
import { SemanticTokens } from "vscode-languageserver-types";
type TokenModifier = 'declaration' | 'static' | 'async' | 'readonly' | 'defaultLibrary' | 'local' | string;
type TokenType = 'class' | 'enum' | 'interface' | 'namespace' | 'typeParameter' | 'type' | 'parameter' | 'variable' | 'enumMember' | 'property' | 'function' | 'method' | 'event' | string;
export interface DecodedToken {
    row: number;
    startColumn: number;
    length: number;
    type: string;
}
export interface OriginalSemanticTokens {
    tokens: number[];
    tokenTypes: TokenType[];
    tokenModifiersLegend: TokenModifier[];
}
export declare function parseSemanticTokens(originalTokens: OriginalSemanticTokens | undefined, additionalTokens?: DecodedToken[]): DecodedSemanticTokens | undefined;
export declare function mergeTokens(aceTokens: Ace.Token[], decodedTokens: DecodedToken[]): Ace.Token[];
export declare class DecodedSemanticTokens {
    tokens: DecodedToken[];
    constructor(tokens: DecodedToken[]);
    private normalize;
    getByRow(row: number): DecodedToken[];
    private sortTokens;
}
export declare class SemanticTokensBuilder {
    private _id;
    private _prevLine;
    private _prevChar;
    private _data;
    private _dataLen;
    private _prevData;
    constructor();
    private initialize;
    push(line: number, char: number, length: number, tokenType: number, tokenModifiers: number): void;
    get id(): string;
    previousResult(id: string): void;
    build(): SemanticTokens;
    canBuildEdits(): boolean;
}
export {};
