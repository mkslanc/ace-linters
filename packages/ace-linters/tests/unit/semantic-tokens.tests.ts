import { expect } from 'chai';
import { parseSemanticTokens, mergeTokens } from '../../src/type-converters/lsp/semantic-tokens';

describe('semanticTokens', () => {

    describe('parseSemanticTokens', () => {

        it('should parse valid tokens', () => {
            const tokens = [0, 0, 3, 0, 0];
            const types = ['type'];
            const modifiers = [];

            const expected = {
                "tokens": [
                    {
                        "length": 3,
                        "row": 0,
                        "startColumn": 0,
                        "type": "entity.name.type"
                    }
                ]
            };

            expect(parseSemanticTokens(tokens, types, modifiers)).to.deep.equal(expected);
        });

        it('should return undefined for invalid tokens', () => {
            const tokens = [0, 0, 3];
            expect(parseSemanticTokens(tokens, [], [])).to.be.undefined;
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
