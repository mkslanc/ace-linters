import { expect } from 'chai';
import {
    parseSemanticTokens,
    mergeTokens,
    OriginalSemanticTokens,
    DecodedToken
} from '../../src/type-converters/lsp/semantic-tokens';

describe('semanticTokens', () => {

    describe('parseSemanticTokens', () => {
        it('should return undefined for undefined input without additional tokens', () => {
            expect(parseSemanticTokens(undefined)).to.be.undefined;
        });

        it('should return undefined for invalid token length', () => {
            const invalidTokens: OriginalSemanticTokens = {
                tokens: [1, 2, 3], // Invalid length (not divisible by 5)
                tokenTypes: ['class'],
                tokenModifiersLegend: ['static']
            };
            expect(parseSemanticTokens(invalidTokens)).to.be.undefined;
        });

        it('should parse valid semantic tokens', () => {
            const originalTokens: OriginalSemanticTokens = {
                tokens: [0, 5, 3, 0, 1], // line, column, length, typeIndex, modifierFlag
                tokenTypes: ['class'],
                tokenModifiersLegend: ['static']
            };

            const result = parseSemanticTokens(originalTokens);
            expect(result?.tokens).to.have.length(1);
            expect(result?.tokens[0]).to.deep.equal({
                row: 0,
                startColumn: 5,
                length: 3,
                type: 'entity.name.type.class.static'
            });
        });

        it('should handle additional tokens', () => {
            const additionalTokens: DecodedToken[] = [{
                row: 1,
                startColumn: 0,
                length: 5,
                type: 'entity.name.function'
            }];

            const result = parseSemanticTokens(undefined, additionalTokens);
            expect(result?.tokens).to.have.length(1);
            expect(result?.tokens[0]).to.deep.equal(additionalTokens[0]);
        });

        it('should handle multiple tokens with relative positioning', () => {
            const originalTokens: OriginalSemanticTokens = {
                tokens: [
                    0, 5, 3, 0, 1,  // First token
                    0, 3, 2, 1, 0   // Second token on same line
                ],
                tokenTypes: ['class', 'method'],
                tokenModifiersLegend: ['static']
            };

            const result = parseSemanticTokens(originalTokens);
            expect(result?.tokens).to.have.length(2);
            expect(result?.tokens[0].startColumn).to.be.equal(5);
            expect(result?.tokens[1].startColumn).to.be.equal(8); // 5 + 3
        });

        it('should handle tokens across multiple lines', () => {
            const originalTokens: OriginalSemanticTokens = {
                tokens: [
                    0, 5, 3, 0, 1,  // First line
                    2, 0, 4, 1, 0   // Jump 2 lines
                ],
                tokenTypes: ['class', 'method'],
                tokenModifiersLegend: ['static']
            };

            const result = parseSemanticTokens(originalTokens);
            expect(result?.tokens).to.have.length(2);
            expect(result?.tokens[0].row).to.be.equal(0);
            expect(result?.tokens[1].row).to.be.equal(2);
        });
    });



    describe('mergeTokens', () => {
        it('should handle complete overlap of decodedTokens over aceTokens', () => {
            const aceTokens = [{ type: 'text', value: 'hello world' }];
            const decodedTokens = [{ type: 'keyword', startColumn: 0, length: 11, row: 5 }];

            const merged = mergeTokens(aceTokens, decodedTokens);
            expect(merged).to.deep.equal([{ type: 'keyword', value: 'hello world' }]);
        });

        it('should handle partial overlap of decodedTokens over aceTokens', () => {
            const aceTokens = [{ type: 'text', value: 'hello ' }, { type: 'text', value: 'world' }];
            const decodedTokens = [{ type: 'keyword', startColumn: 6, length: 5, row: 5 }];

            const merged = mergeTokens(aceTokens, decodedTokens);
            expect(merged).to.deep.equal([
                { type: 'text', value: 'hello ' },
                { type: 'keyword', value: 'world' }
            ]);
        });

        it('should handle no overlap between decodedTokens and aceTokens', () => {
            const aceTokens = [{ type: 'text', value: 'hello world' }];
            const decodedTokens = [{ type: 'keyword', startColumn: 12, length: 4, row: 5 }];

            const merged = mergeTokens(aceTokens, decodedTokens);
            expect(merged).to.deep.equal(aceTokens); // No change expected
        });

        it('should handle alternating overlaps', () => {
            const aceTokens = [{ type: 'text', value: 'hello world example' }];
            const decodedTokens = [
                { type: 'keyword', startColumn: 0, length: 5, row: 5 },
                { type: 'string', startColumn: 12, length: 7, row: 5 }
            ];

            const merged = mergeTokens(aceTokens, decodedTokens);
            expect(merged).to.deep.equal([
                { type: 'keyword', value: 'hello' },
                { type: 'text', value: ' world ' },
                { type: 'string', value: 'example' }
            ]);
        });

        it('should handle edge cases with empty inputs', () => {
            const aceTokens = [];
            const decodedTokens = [];

            const merged = mergeTokens(aceTokens, decodedTokens);
            expect(merged).to.deep.equal([]);
        });

        it('should handle multiple decodedTokens affecting aceTokens of varying types', () => {
            const aceTokens = [
                { type: 'text', value: 'function' },
                { type: 'whitespace', value: ' ' },
                { type: 'identifier', value: 'myFunction' },
                { type: 'text', value: '(' }
            ];
            const decodedTokens = [
                { row: 0, startColumn: 0, length: 8, type: 'keyword' },
                { row: 0, startColumn: 9, length: 10, type: 'function-name' }
            ];

            const merged = mergeTokens(aceTokens, decodedTokens);
            expect(merged).to.deep.equal([
                { type: 'keyword', value: 'function' },
                { type: 'whitespace', value: ' ' },
                { type: 'function-name', value: 'myFunction' },
                { type: 'text', value: '(' }
            ]);
        });

        it('should handle a single decodedToken overlapping multiple aceTokens of different types', () => {
            const aceTokens = [
                { type: 'text', value: 'return ' },
                { type: 'number', value: '42' },
                { type: 'text', value: ';' }
            ];
            const decodedTokens = [{ row: 0, startColumn: 7, length: 2, type: 'magic-number' }];

            const merged = mergeTokens(aceTokens, decodedTokens);
            expect(merged).to.deep.equal([
                { type: 'text', value: 'return ' },
                { type: 'magic-number', value: '42' },
                { type: 'text', value: ';' }
            ]);
        });
        
        it('should handle complex cases with overlapping and non-overlapping decodedTokens and aceTokens', () => {
            const aceTokens = [
                { type: 'text', value: 'if' },
                { type: 'whitespace', value: ' ' },
                { type: 'text', value: '(condition)' },
                { type: 'whitespace', value: ' ' },
                { type: 'text', value: '{' }
            ];
            const decodedTokens = [
                { row: 0, startColumn: 0, length: 2, type: 'keyword' },
                { row: 0, startColumn: 4, length: 9, type: 'expression' }
            ];

            const merged = mergeTokens(aceTokens, decodedTokens);
            expect(merged).to.deep.equal([
                {type: 'keyword', value: 'if'},
                {type: 'whitespace', value: ' '},
                {
                    "type": "text",
                    "value": "("
                },
                {type: 'expression', value: 'condition'},
                {
                    "type": "text",
                    "value": ")"
                },
                {type: 'whitespace', value: ' '},
                {type: 'text', value: '{'}
            ]);
        });

    });
    
});
