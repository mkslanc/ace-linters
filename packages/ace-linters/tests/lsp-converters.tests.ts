import {expect} from "chai";

import * as Converter from "../type-converters/lsp-converters";

import {Range as AceRange} from "ace-code/src/range";
import {
    CompletionItem,
    CompletionItemKind,
    Diagnostic,
    DiagnosticSeverity,
    Hover,
    InsertTextFormat
} from "vscode-languageserver-protocol";
import {
    toAnnotations,
    toCompletionItem,
    toCompletions,
    toResolvedCompletion, toTooltip
} from "../type-converters/lsp-converters";
import {AceLinters} from "../types";
import Tooltip = AceLinters.Tooltip;


describe('Converters from/to Language Server Protocol', () => {
    describe('fromRange', () => {
        it('should convert an Ace.Range to a Range', () => {
            const aceRange = new AceRange(0, 1, 2, 3);

            const expectedRange = {
                start: {
                    line: 0,
                    character: 1
                },
                end: {
                    line: 2,
                    character: 3
                }
            };

            const result = Converter.fromRange(aceRange);

            expect(result).to.deep.equal(expectedRange);
        });
    });

    describe('rangeFromPositions', () => {
        it('should create a Range from two Positions', () => {
            const start = {
                line: 0,
                character: 1
            };
            const end = {
                line: 2,
                character: 3
            };

            const expectedRange = {
                start,
                end
            };

            const result = Converter.rangeFromPositions(start, end);

            expect(result).to.deep.equal(expectedRange);
        });
    });

    describe('toRange', () => {
        it('should convert a Range to an Ace.Range', () => {
            const range = {
                start: {
                    line: 0,
                    character: 1
                },
                end: {
                    line: 2,
                    character: 3
                }
            };

            const expectedAceRange = new AceRange(0, 1, 2, 3);

            const result = Converter.toRange(range);

            expect(result).to.deep.include(expectedAceRange);
        });
    });

    describe('fromPoint', () => {
        it('should convert an Ace.Point to a Position', () => {
            const acePoint = {
                row: 0,
                column: 1
            };

            const expectedPosition = {
                line: 0,
                character: 1
            };

            const result = Converter.fromPoint(acePoint);

            expect(result).to.deep.equal(expectedPosition);
        });
    });

    describe('toPoint', () => {
        it('should convert a Position to an Ace.Point', () => {
            const position = {
                line: 0,
                character: 1
            };

            const expectedAcePoint = {
                row: 0,
                column: 1
            };

            const result = Converter.toPoint(position);

            expect(result).to.deep.equal(expectedAcePoint);
        });
    });

    describe('toAnnotations', () => {
        it('should correctly convert Diagnostics to Annotations', () => {
            const diagnostics: Diagnostic[] = [
                {
                    range: {
                        start: {line: 0, character: 0},
                        end: {line: 0, character: 10},
                    },
                    severity: DiagnosticSeverity.Error,
                    message: 'Error message 1',
                },
                {
                    range: {
                        start: {line: 5, character: 0},
                        end: {line: 5, character: 20},
                    },
                    severity: DiagnosticSeverity.Warning,
                    message: 'Warning message 2',
                },
            ];
            const expectedAnnotations = [
                {
                    row: 0,
                    column: 0,
                    text: "Error message 1",
                    type: "error"
                }, {
                    row: 5,
                    column: 0,
                    text: "Warning message 2",
                    type: "warning"
                },
            ];

            const annotations = toAnnotations(diagnostics);
            expect(annotations).deep.equal(expectedAnnotations);
        });
    });

    describe('toCompletions', () => {
        it('should convert a list of CompletionItem to Ace.Completion[]', () => {
            const completionItems: CompletionItem[] = [{
                label: 'html',
                kind: CompletionItemKind.Function,
                detail: 'Test detail',
                documentation: {
                    kind: "markdown",
                    value: "Test value"
                },
                textEdit: {
                    newText: "Test text",
                    range: {
                        start: {
                            line: 0,
                            character: 1
                        },
                        end: {
                            line: 0,
                            character: 5
                        }
                    }
                },
                insertTextFormat: InsertTextFormat.Snippet,
                command: {
                    title: "Suggestion",
                    command: "editor.action.triggerSuggest"
                }
            },
                {
                    label: 'TestCompletionItem2',
                    kind: CompletionItemKind.Color,
                    documentation: 'Test documentation',
                    insertText: 'TestInsertText',
                    insertTextFormat: InsertTextFormat.PlainText
                }
            ];

            const expectedCompletions = [{
                meta: 'Function',
                caption: 'html',
                snippet: "Test text",
                range: new AceRange(0, 1, 0, 5),
                documentation: {
                    kind: "markdown",
                    value: "Test value"
                },
                command: "startAutocomplete",
                item: completionItems[0],
                value: "",
                score: undefined,
                position: undefined
            }, {
                meta: 'Color',
                caption: 'TestCompletionItem2',
                documentation: 'Test documentation',
                item: completionItems[1],
                value: "TestInsertText",
                score: undefined,
                position: undefined,
                range: undefined,
                command: undefined
            }
            ];
            let completionList = {
                isIncomplete: false,
                items: completionItems
            }
            expect(toCompletions(completionItems)).to.have.deep.members(expectedCompletions);
            expect(toCompletions(completionList)).to.have.deep.members(expectedCompletions);
        });
    });

    describe('toResolvedCompletion', () => {
        it('converts a resolved completion from LSP format to Ace format (Plain Text)', () => {
            const aceCompletion = {
                value: 'value',
                snippet: 'snippet',
                score: 10,
                meta: 'meta',
                caption: 'caption'
            };

            const item: CompletionItem = {
                label: 'value',
                documentation: 'Test documentation',
                insertText: 'TestInsertText',
                insertTextFormat: InsertTextFormat.PlainText
            }

            const item1: CompletionItem = {
                label: 'value',
                documentation: {
                    kind: "plaintext",
                    value: 'Test documentation'
                },
                insertText: 'TestInsertText',
                insertTextFormat: InsertTextFormat.PlainText
            }

            const expectedAceCompletion = {
                value: 'value',
                snippet: 'snippet',
                score: 10,
                meta: 'meta',
                caption: 'caption',
                docText: 'Test documentation'
            };

            expect(toResolvedCompletion(aceCompletion, item)).to.deep.equal(expectedAceCompletion);
            expect(toResolvedCompletion(aceCompletion, item1)).to.deep.equal(expectedAceCompletion);
        });

        it('converts a resolved completion from LSP format to Ace format (Markdown Text)', () => {
            const aceCompletion = {
                value: 'value',
                snippet: 'snippet',
                score: 10,
                meta: 'meta',
                caption: 'caption'
            };

            const itemWithMarkdown: CompletionItem = {
                label: 'value',
                insertText: 'TestInsertText',
                insertTextFormat: InsertTextFormat.PlainText,
                documentation: {
                    kind: "markdown",
                    value: "Test value"
                }
            }

            const expectedAceCompletionWithMarkdown = {
                value: 'value',
                snippet: 'snippet',
                score: 10,
                meta: 'meta',
                caption: 'caption',
                docMarkdown: "Test value"
            };

            expect(toResolvedCompletion(aceCompletion, itemWithMarkdown)).to.deep.equal(expectedAceCompletionWithMarkdown);
        });
    });

    describe("toCompletionItem", () => {
        it("should correctly map a basic Ace completion to a LSP CompletionItem", () => {
            const aceCompletion = {
                value: "value",
                snippet: "snippet",
                score: 100,
                meta: "meta",
                caption: "caption",
                docHTML: "docHTML",
                docText: "docText",
                completerId: "completerId",
                range: {
                    start: {row: 0, column: 0},
                    end: {row: 0, column: 5},
                },
                fileName: "session1.text",
                position: 5,
                documentation: {kind: "markdown", value: "docText"}
            };
            const expected: CompletionItem = {
                label: "caption",
                documentation: {kind: "markdown", value: "docText"},
                insertTextFormat: InsertTextFormat.Snippet,
                kind: 10,
                textEdit: {
                    range: {start: {line: 0, character: 0}, end: {line: 0, character: 5}},
                    newText: "snippet",
                },
                command: undefined,
            };
            expected["fileName"] = "session1.text";
            expected["position"] = 5;
            expected["item"] = undefined;
            expect(toCompletionItem(aceCompletion)).to.deep.equal(expected);
        });

    });

    describe("toTooltip", () => {
        it("converts Hover to Tooltip", () => {
            const hover: Hover = {
                contents: [
                    {
                        language: "markdown",
                        value: "This is a *markdown* hover."
                    },
                    "Plain text hover."
                ],
                range: {
                    start: {line: 0, character: 0},
                    end: {line: 1, character: 1}
                }
            };
            const expected: Tooltip = {
                content: {
                    type: "markdown",
                    "text": "```This is a *markdown* hover.```\n\nPlain text hover."
                },
                range: new AceRange(0, 0, 1, 1)
            };
            expect(toTooltip(hover)).to.deep.equal(expected);
        });
    });

});
