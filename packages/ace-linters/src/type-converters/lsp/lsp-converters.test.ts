import {expect} from "chai";

import * as Converter from "./lsp-converters";

import {Range as AceRange} from "ace-code/src/range";
import {
    CompletionItem,
    CompletionItemKind,
    Diagnostic,
    DiagnosticSeverity,
    Hover,
    InsertTextFormat,
    MarkupKind
} from "vscode-languageserver-protocol";
import {
    fromSignatureHelp,
    toAnnotations,
    toCompletionItem,
    toCompletions,
    toResolvedCompletion, toTooltip
} from "./lsp-converters";
import {CompletionService, Tooltip} from "../../types/language-service";


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
                    type: "error",
                    code: undefined,
                    data: undefined
                }, {
                    row: 5,
                    column: 0,
                    text: "Warning message 2",
                    type: "warning",
                    code: undefined,
                    data: undefined
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

            let expectedFirstCompletionItem = JSON.parse(JSON.stringify(completionItems[0]));
            expectedFirstCompletionItem.service = "test";
            let expectedSecondCompletionItem = JSON.parse(JSON.stringify(completionItems[1]));
            expectedSecondCompletionItem.service = "test";
            let expectedThirdCompletionItem = JSON.parse(JSON.stringify(completionItems[0]));
            expectedThirdCompletionItem.service = "test1";
            let expectedFourthCompletionItem = JSON.parse(JSON.stringify(completionItems[1]));
            expectedFourthCompletionItem.service = "test1";

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
                item: expectedFirstCompletionItem,
                score: undefined,
                position: undefined,
                service: "test"
            }, {
                meta: 'Color',
                caption: 'TestCompletionItem2',
                documentation: 'Test documentation',
                item: expectedSecondCompletionItem,
                value: "TestInsertText",
                score: undefined,
                position: undefined,
                range: undefined,
                command: undefined,
                service: "test"
            }, {
                meta: 'Function',
                caption: 'html',
                snippet: "Test text",
                range: new AceRange(0, 1, 0, 5),
                documentation: {
                    kind: "markdown",
                    value: "Test value"
                },
                command: "startAutocomplete",
                item: expectedThirdCompletionItem,
                score: undefined,
                position: undefined,
                service: "test1"
            }, {
                meta: 'Color',
                caption: 'TestCompletionItem2',
                documentation: 'Test documentation',
                item: expectedFourthCompletionItem,
                value: "TestInsertText",
                score: undefined,
                position: undefined,
                range: undefined,
                command: undefined,
                service: "test1"
            }
            ];
            let completionList = {
                isIncomplete: false,
                items: JSON.parse(JSON.stringify(completionItems))
            }

            let completionsService: CompletionService = {
                service: "test",
                completions: completionItems
            }
            let completionsService1: CompletionService = {
                service: "test1",
                completions: completionList
            }
            expect(toCompletions([completionsService, completionsService1])).to.have.deep.members(expectedCompletions);
        });
    });

    describe('toResolvedCompletion', () => {

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
            expected["service"] = undefined;
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
            const anotherHover: Hover = {
                contents: [
                    {
                        language: "plainText",
                        value: "This is another plain text hover."
                    }
                ]
            }
            const expected: Tooltip = {
                content: {
                    type: "markdown",
                    "text": "```This is a *markdown* hover.```\n\nPlain text hover.\n\n```This is another plain text hover.```"
                },
                range: {
                    end: {
                        column: 1,
                        row: 1
                    },
                    start: {
                        column: 0,
                        row: 0
                    }
                }
            };
            expect(toTooltip([hover, anotherHover])).to.deep.equal(expected);
        });

        it("should handle empty tooltips", () => {
            expect(toTooltip([undefined])).to.be.undefined;
            expect(toTooltip(undefined)).to.be.undefined;
        });
    });

    describe('fromSignatureHelp', () => {
        it('should return undefined when no signature help is provided or where is no signatures', () => {
            let result = fromSignatureHelp(undefined);
            expect(result).to.be.undefined;

            const signatureHelp = {
                activeSignature: 0,
                activeParameter: 0,
                signatures: []
            };
            result = fromSignatureHelp([signatureHelp]);
            expect(result).to.be.undefined;
        });

        it('should return a tooltip with markdown content when signature help is provided', () => {
            const signatureHelp = {
                activeSignature: 0,
                activeParameter: 0,
                signatures: [{
                    label: 'method(param: string)',
                    documentation: 'This is a documentation string',
                    parameters: [
                        {label: 'param: string'},
                        {label: 'param2'}
                    ]
                }]
            };
            const result = fromSignatureHelp([signatureHelp]);
            expect(result).to.deep.equal({
                content: {
                    type: 'markdown',
                    text: 'method(**param: string**)\n\nThis is a documentation string'
                }
            });
        });

        it('should highlight the active parameter in the tooltip content', () => {
            const signatureHelp = {
                activeSignature: 0,
                activeParameter: 1,
                signatures: [{
                    label: 'method(param1: string, param2: number)',
                    parameters: [
                        {label: 'param1: string'},
                        {label: 'param2: number'}
                    ]
                }]
            };
            const result = fromSignatureHelp([signatureHelp]);
            expect(result).to.deep.equal({
                content: {
                    type: 'markdown',
                    text: 'method(param1: string, **param2: number**)'
                }
            });
        });

        it('should handle MarkupContent documentation in the signature', () => {
            const signatureHelp = {
                activeSignature: 0,
                activeParameter: 0,
                signatures: [{
                    label: 'method(param: string)',
                    documentation: {
                        kind: MarkupKind.Markdown,
                        value: 'This is a **documentation** string'
                    }
                }]
            };
            const result = fromSignatureHelp([signatureHelp]);
            expect(result).to.deep.equal({
                content: {
                    type: 'markdown',
                    text: 'method(param: string)\n\nThis is a **documentation** string'
                }
            });
        });

    });

});
