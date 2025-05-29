import {expect} from "chai";
import {validateAcePrototypes} from "../../src/ace/inline-completer-adapter/prototype-validation";
import {createInlineCompleterAdapter} from "../../src/ace/inline_autocomplete";
import {InlineAutocomplete} from "ace-code/src/ext/inline_autocomplete";
import {CompletionProvider} from "ace-code/src/autocomplete";
import {CommandBarTooltip} from "ace-code/src/ext/command_bar";
import * as ace from "ace-code";
import {Ace} from "ace-code";
import "ace-code/src/test/mockdom";

describe('Inline Autocomplete Tests', () => {
    describe('Prototype Validation Tests', () => {
        class MockInlineAutocomplete {
            detach() {
            }

            // Missing: destroy, show, getCompletionProvider, getInlineTooltip
        }

        class MockCommandBarTooltip {
            registerCommand() {
            }

            // Missing: setAlwaysShow, getAlwaysShow
        }

        class MockCompletionProvider {
            // Missing: gatherCompletions
        }

        class ValidInlineAutocomplete {
            detach() {
            }

            destroy() {
            }

            show() {
            }

            getCompletionProvider() {
            }

            getInlineTooltip() {
            }
        }

        class ValidCommandBarTooltip {
            registerCommand() {
            }

            setAlwaysShow() {
            }

            getAlwaysShow() {
            }
        }

        class ValidCompletionProvider {
            gatherCompletions() {
            }
        }

        it('should throw error for missing InlineAutocomplete methods', () => {
            expect(() => validateAcePrototypes(
                MockInlineAutocomplete,
                ValidCommandBarTooltip,
                ValidCompletionProvider
            )).to.throw(/InlineAutocomplete\.prototype missing method/);
        });

        it('should throw error for missing CommandBarTooltip methods', () => {
            expect(() => validateAcePrototypes(
                ValidInlineAutocomplete,
                MockCommandBarTooltip,
                ValidCompletionProvider
            )).to.throw(/CommandBarTooltip\.prototype missing method/);
        });

        it('should throw error for missing CompletionProvider methods', () => {
            expect(() => validateAcePrototypes(
                ValidInlineAutocomplete,
                ValidCommandBarTooltip,
                MockCompletionProvider
            )).to.throw(/CompletionProvider\.prototype missing method: gatherCompletions/);
        });

        it('should not throw errors for valid prototypes', () => {
            expect(() => validateAcePrototypes(
                ValidInlineAutocomplete,
                ValidCommandBarTooltip,
                ValidCompletionProvider
            )).to.not.throw();
        });


    });

    describe('validateAceInlineCompleterWithEditor Tests', () => {
        let editorEl: HTMLElement;
        let editor: Ace.Editor;
        let adapter: any;

        before(() => {
            // Set up the DOM and editor
            editorEl = document.createElement('div');

            editor = ace.edit(editorEl, {
                value: "function test() {\n  console.log('Hello world');\n}",
                mode: "ace/mode/javascript"
            });

            editor.inlineCompleters = [];

            // Create a real adapter with actual Ace components
            adapter = createInlineCompleterAdapter(
                InlineAutocomplete,
                CommandBarTooltip,
                CompletionProvider
            );
        });

        it('should validate editor with real Ace components without errors', () => {
            expect(() => adapter.validateAceInlineCompleterWithEditor(editor))
                .to.not.throw();
        });

        it('should handle common editor operations during validation', () => {
            // Set up some editor state that might be accessed during validation
            editor.inlineCompleters = [];
            editor.session.setUndoManager(new ace.UndoManager());

            expect(() => adapter.validateAceInlineCompleterWithEditor(editor))
                .to.not.throw();
        });

        // Test what happens when validation is called with different editor states
        it('should handle editor with existing inline completer', () => {
            // Set up editor with an existing inline completer
            editor.inlineCompleter = {
                detach: () => {
                },
                destroy: () => {
                }
            } as any;

            expect(() => adapter.validateAceInlineCompleterWithEditor(editor))
                .to.not.throw();

            // Clean up
            editor.inlineCompleter = null;
        });

        it('should handle editor focus and blur during validation', () => {
            // Simulate focus and blur events during validation
            const originalOn = editor.on;
            let handlers: { [key: string]: Function } = {};

            editor.on = function (eventName: string, handler: Function) {
                handlers[eventName] = handler;
                return originalOn.call(this, eventName, handler);
            };

            expect(() => {
                adapter.validateAceInlineCompleterWithEditor(editor);
                // Trigger any event handlers that might have been registered
                if (handlers["focus"]) handlers["focus"]();
                if (handlers["blur"]) handlers["blur"]();
            }).to.not.throw();

            // Restore original on method
            editor.on = originalOn;
        });

        after(() => {
            // Clean up
            editor.destroy();
        });
    });
});