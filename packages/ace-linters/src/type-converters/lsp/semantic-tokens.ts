import {Ace} from "ace-code";
import {SemanticTokens} from "vscode-languageserver-types";

type TokenModifier = 'declaration' | 'static' | 'async' | 'readonly' | 'defaultLibrary' | 'local' | string;
type TokenType = 'class' | 'enum' | 'interface' | 'namespace' | 'typeParameter' | 'type' | 'parameter' | 'variable' | 'enumMember' | 'property' | 'function' | 'method' | 'event' | string;

export interface DecodedToken {
    row: number;
    startColumn: number;
    length: number;
    type: string,
}

export interface OriginalSemanticTokens {
    tokens: number[],
    tokenTypes: TokenType[],
    tokenModifiersLegend: TokenModifier[]
}

function decodeModifiers(modifierFlag: number, tokenModifiersLegend: string[]): TokenModifier[] {
    const modifiers: TokenModifier[] = [];
    for (let i = 0; i < tokenModifiersLegend.length; i++) {
        if (modifierFlag & (1 << i)) {
            modifiers.push(tokenModifiersLegend[i]);
        }
    }
    return modifiers;
}

export function parseSemanticTokens(originalTokens: OriginalSemanticTokens | undefined, additionalTokens?: DecodedToken[]): DecodedSemanticTokens | undefined {
    const hasValidTokens = originalTokens?.tokens && originalTokens.tokens.length % 5 === 0;
    const hasAdditionalTokens = additionalTokens && additionalTokens.length > 0;
    if (!hasValidTokens && !hasAdditionalTokens) {
        return;
    }
    const decodedTokens: DecodedToken[] = additionalTokens ?? [];
    if (originalTokens) {
        const {tokens, tokenTypes, tokenModifiersLegend} = originalTokens;
        let line = 0;
        let startColumn = 0;
        for (let i = 0; i < tokens.length; i += 5) {
            line += tokens[i];
            if (tokens[i] === 0) {
                startColumn += tokens[i + 1];
            } else {
                startColumn = tokens[i + 1];
            }
            const length = tokens[i + 2];
            const tokenTypeIndex = tokens[i + 3];
            const tokenModifierFlag = tokens[i + 4];

            const tokenType = tokenTypes[tokenTypeIndex];
            const tokenModifiers = decodeModifiers(tokenModifierFlag, tokenModifiersLegend);

            decodedTokens.push({
                row: line,
                startColumn: startColumn,
                length,
                type: toAceTokenType(tokenType, tokenModifiers),
            });
        }
    }

    return new DecodedSemanticTokens(decodedTokens);
}

function toAceTokenType(tokenType: TokenType, tokenModifiers: TokenModifier[]): string {
    let modifiers = "";
    let type = tokenType;
    if (tokenModifiers.length > 0) {
        modifiers = "." + tokenModifiers.join(".");
    }
    
    switch (tokenType) {
        case "class":
            type = "entity.name.type.class";
            break;
        case "struct": 
            type = "storage.type.struct";
            break;
        case "enum":
            type = "entity.name.type.enum";
            break;
        case "interface":
            type = "entity.name.type.interface";
            break;
        case "namespace":
            type = "entity.name.namespace";
            break;
        case "typeParameter":
            break;
        case "type":
            type = "entity.name.type";
            break;
        case "parameter":
            type = "variable.parameter";
            break;
        case "variable":
            type = "entity.name.variable";
            break;
        case "enumMember":
            type = "variable.other.enummember";
            break;
        case "property":
            type = "variable.other.property";
            break;
        case "function":
            type = "entity.name.function";
            break;
        case "method":
            type = "entity.name.function.member";
            break;
        case "event":
            type = "variable.other.event";
            break;
        case "highlight_unnecessary": {
            type = "highlight_unnecessary";
        }
    }
    return type + modifiers; 
}

export function mergeTokens(aceTokens: Ace.Token[], decodedTokens: DecodedToken[]): Ace.Token[] {
    let mergedTokens: Ace.Token[] = [];
    let currentCharIndex = 0; // Keeps track of the character index across Ace tokens
    let aceTokenIndex = 0; // Index within the aceTokens array

    decodedTokens.forEach((semanticToken) => {
        let semanticStart = semanticToken.startColumn;
        let semanticEnd = semanticStart + semanticToken.length;

        // Process leading Ace tokens that don't overlap with the semantic token
        while (aceTokenIndex < aceTokens.length && currentCharIndex + aceTokens[aceTokenIndex].value.length <= semanticStart) {
            mergedTokens.push(aceTokens[aceTokenIndex]);
            currentCharIndex += aceTokens[aceTokenIndex].value.length;
            aceTokenIndex++;
        }

        // Process overlapping Ace tokens
        while (aceTokenIndex < aceTokens.length && currentCharIndex < semanticEnd) {
            let aceToken = aceTokens[aceTokenIndex];
            let aceTokenEnd = currentCharIndex + aceToken.value.length;
            let overlapStart = Math.max(currentCharIndex, semanticStart);
            let overlapEnd = Math.min(aceTokenEnd, semanticEnd);

            if (currentCharIndex < semanticStart) {
                // Part of Ace token is before semantic token; add this part to mergedTokens
                let beforeSemantic = {
                    ...aceToken,
                    value: aceToken.value.substring(0, semanticStart - currentCharIndex)
                };
                mergedTokens.push(beforeSemantic);
            }

            // Middle part (overlapped by semantic token)
            let middle = {
                type: semanticToken.type, // Use semantic token's type
                value: aceToken.value.substring(overlapStart - currentCharIndex, overlapEnd - currentCharIndex)
            };
            mergedTokens.push(middle);

            if (aceTokenEnd > semanticEnd) {
                // If Ace token extends beyond the semantic token, prepare the remaining part for future processing
                let afterSemantic = {
                    ...aceToken,
                    value: aceToken.value.substring(semanticEnd - currentCharIndex)
                };
                // Add the afterSemantic as a new token to process in subsequent iterations
                currentCharIndex = semanticEnd; // Update currentCharIndex to reflect the start of afterSemantic
                aceTokens.splice(aceTokenIndex, 1, afterSemantic); // Replace the current token with afterSemantic for correct processing in the next iteration
                break; // Move to the next semantic token without incrementing aceTokenIndex
            }

            // If the entire Ace token is covered by the semantic token, proceed to the next Ace token
            currentCharIndex = aceTokenEnd;
            aceTokenIndex++;
        }
    });

    // Add remaining Ace tokens that were not overlapped by any semantic tokens
    while (aceTokenIndex < aceTokens.length) {
        mergedTokens.push(aceTokens[aceTokenIndex]);
        aceTokenIndex++;
    }

    return mergedTokens;
}


export class DecodedSemanticTokens {
    tokens: DecodedToken[];

    constructor(tokens: DecodedToken[]) {
        this.tokens = this.sortTokens(tokens);
        this.normalize();
    }

    private normalize() {
        const tokenMap = new Map<string, DecodedToken>();

        this.tokens.forEach(token => {
            const key = `${token.row}:${token.startColumn}:${token.length}`;
            const existing = tokenMap.get(key);

            if (existing) {
                existing.type = `${existing.type}.${token.type}`;
            } else {
                tokenMap.set(key, {...token});
            }
        });

        this.tokens = Array.from(tokenMap.values());
    }

    getByRow(row: number) {
        return this.tokens.filter(token => token.row === row);
    }

    private sortTokens(tokens: DecodedToken[]): DecodedToken[] {
        return tokens.sort((a, b) => {
            if (a.row === b.row) {
                return a.startColumn - b.startColumn;
            }
            return a.row - b.row;
        });
    }
}

//vscode-languageserver
export class SemanticTokensBuilder {

    private _id!: number;

    private _prevLine!: number;
    private _prevChar!: number;
    private _data!: number[];
    private _dataLen!: number;

    private _prevData: number[] | undefined;

    constructor() {
        this._prevData = undefined;
        this.initialize();
    }

    private initialize() {
        this._id = Date.now();
        this._prevLine = 0;
        this._prevChar = 0;
        this._data = [];
        this._dataLen = 0;
    }

    public push(line: number, char: number, length: number, tokenType: number, tokenModifiers: number): void {
        let pushLine = line;
        let pushChar = char;
        if (this._dataLen > 0) {
            pushLine -= this._prevLine;
            if (pushLine === 0) {
                pushChar -= this._prevChar;
            }
        }

        this._data[this._dataLen++] = pushLine;
        this._data[this._dataLen++] = pushChar;
        this._data[this._dataLen++] = length;
        this._data[this._dataLen++] = tokenType;
        this._data[this._dataLen++] = tokenModifiers;

        this._prevLine = line;
        this._prevChar = char;
    }

    public get id(): string {
        return this._id.toString();
    }

    public previousResult(id: string) {
        if (this.id === id) {
            this._prevData = this._data;
        }
        this.initialize();
    }

    public build(): SemanticTokens {
        this._prevData = undefined;
        return {
            resultId: this.id,
            data: this._data
        };
    }

    public canBuildEdits(): boolean {
        return this._prevData !== undefined;
    }
}
