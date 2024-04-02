import {Ace} from "ace-code";

type TokenModifier = 'declaration' | 'static' | 'async' | 'readonly' | 'defaultLibrary' | 'local' | string;
type TokenType = 'class' | 'enum' | 'interface' | 'namespace' | 'typeParameter' | 'type' | 'parameter' | 'variable' | 'enumMember' | 'property' | 'function' | 'method' | 'event' | string;

export interface DecodedToken {
    row: number;
    startColumn: number;
    length: number;
    type: string,
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

export function parseSemanticTokens(tokens: number[], tokenTypes: TokenType[], tokenModifiersLegend: TokenModifier[]): DecodedSemanticTokens | undefined {
    if (tokens.length % 5 !== 0) {
        return ;
    }
    const decodedTokens: DecodedToken[] = [];
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
    
    return new DecodedSemanticTokens(decodedTokens);
}

function toAceTokenType(tokenType: TokenType, tokenModifiers: TokenModifier[]): string {
    switch (tokenType) {
        case "class":
            return "support.class";
        case "enum":
            break;
        case "interface":
            break;
        case "namespace":
            break;
        case "typeParameter":
            break;
        case "type":
            break;
        case "parameter":
            break;
        case "variable":
            return "variable";
        case "enumMember":
            break;
        case "property":
            return "keyword";
        case "function":
            return "entity.name.function";
        case "method":
            return "entity.name.function";
        case "event":
            break;
    }
    return tokenType; //TODO: 
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
