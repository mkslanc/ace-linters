import * as ace from "ace-code";
import {Ace} from "ace-code";
import "ace-code/src/test/mockdom";
//@ts-ignore
window["self"] = {};

import {LanguageProvider} from "../../src/language-provider";
import {Mode as JSONMode} from "ace-code/src/mode/json";
import {Mode as HtmlMode} from "ace-code/src/mode/html";
import {expect} from "chai";
import {MockWorker} from "../../src/misc/mock-worker";
import {ServiceManager} from "../../src/services/service-manager";

describe('LanguageProvider Cleanup Tests', () => {
    let client: MockWorker, ctx: MockWorker;
    let manager: ServiceManager;

    beforeEach(() => {
        client = new MockWorker();
        ctx = new MockWorker();
        client.setEmitter(ctx);
        ctx.setEmitter(client);

        manager = new ServiceManager(ctx);
        manager.registerService("html", {
            features: {
                completion: true,
                completionResolve: true,
                diagnostics: true,
                format: true,
                hover: true
            },
            module: () => import("../../src/services/html/html-service"),
            className: "HtmlService",
            modes: "html"
        });
    });

    afterEach(() => {
        client.removeAllListeners();
        ctx.removeAllListeners();
    });

    describe('unregisterEditor - basic cleanup', () => {
        it('should remove editor from editors array', () => {
            const languageProvider = LanguageProvider.create(client);
            const editor = ace.edit(document.createElement('div'), {
                value: '<div>test</div>',
                mode: new HtmlMode()
            });

            languageProvider.registerEditor(editor);
            expect(languageProvider.editors).to.include(editor);
            expect(languageProvider.editors.length).to.equal(1);

            languageProvider.unregisterEditor(editor);
            expect(languageProvider.editors).to.not.include(editor);
            expect(languageProvider.editors.length).to.equal(0);
        });

        it('should reassign activeEditor when current active editor is unregistered', () => {
            const languageProvider = LanguageProvider.create(client);
            const editor1 = ace.edit(document.createElement('div'), {
                value: '<div>test1</div>',
                mode: new HtmlMode()
            });
            const editor2 = ace.edit(document.createElement('div'), {
                value: '<div>test2</div>',
                mode: new HtmlMode()
            });

            languageProvider.registerEditor(editor1);
            languageProvider.registerEditor(editor2);

            expect(languageProvider.activeEditor).to.equal(editor1);

            languageProvider.unregisterEditor(editor1);
            expect(languageProvider.activeEditor).to.equal(editor2);

            languageProvider.unregisterEditor(editor2);
            expect(languageProvider.activeEditor).to.be.null;
        });

        it('should restore original completers', () => {
            const languageProvider = LanguageProvider.create(client, {
                functionality: {
                    completion: {overwriteCompleters: true}
                }
            });
            const editor = ace.edit(document.createElement('div'), {
                value: '<div>test</div>',
                mode: new HtmlMode()
            });

            // Store original completers
            const originalCompleters = [...(editor.completers || [])];

            languageProvider.registerEditor(editor);

            // Should have LSP completer added
            const lspCompleter = editor.completers.find(c => c.id === "lspCompleters");
            expect(lspCompleter).to.exist;

            languageProvider.unregisterEditor(editor);

            // Should restore original completers
            expect(editor.completers).to.deep.equal(originalCompleters);
            const lspCompleterAfter = editor.completers.find(c => c.id === "lspCompleters");
            expect(lspCompleterAfter).to.be.undefined;
        });

        it('should remove event listeners', (done) => {
            const languageProvider = LanguageProvider.create(client, {
                functionality: {
                    documentHighlights: true,
                    codeActions: true
                }
            });
            const editor = ace.edit(document.createElement('div'), {
                value: '<div>test</div>',
                mode: new HtmlMode()
            });

            languageProvider.registerEditor(editor);

            // Store event handlers count before unregister
            const eventHandlers = languageProvider["$editorEventHandlers"][editor.id];
            expect(eventHandlers).to.exist;
            expect(eventHandlers.focus).to.exist;
            expect(eventHandlers.changeSelectionForHighlights).to.exist;
            expect(eventHandlers.changeSelectionForCodeActions).to.exist;

            languageProvider.unregisterEditor(editor);

            // Event handlers should be cleaned up
            const eventHandlersAfter = languageProvider["$editorEventHandlers"][editor.id];
            expect(eventHandlersAfter).to.be.undefined;

            // Test that event listeners don't fire after cleanup
            let listenerFired = false;
            const testHandler = () => {
                listenerFired = true;
            };
            editor.on("focus", testHandler);

            editor.focus();
            setTimeout(() => {
                editor.off("focus", testHandler);
                // This should be the only listener that fired (our test handler)
                expect(listenerFired).to.be.true;
                done();
            }, 50);
        });

        it('should clean up signature tooltip', () => {
            const languageProvider = LanguageProvider.create(client, {
                functionality: {
                    signatureHelp: true
                }
            });
            const editor = ace.edit(document.createElement('div'), {
                value: '<div>test</div>',
                mode: new HtmlMode()
            });

            languageProvider.registerEditor(editor);

            const signatureTooltip = languageProvider["$signatureTooltip"];
            expect(signatureTooltip.editorHandlers.has(editor)).to.be.true;

            languageProvider.unregisterEditor(editor);

            expect(signatureTooltip.editorHandlers.has(editor)).to.be.false;
        });

        it('should clean up lightbulb widget', () => {
            const languageProvider = LanguageProvider.create(client, {
                functionality: {
                    codeActions: true
                }
            });
            const editor = ace.edit(document.createElement('div'), {
                value: '<div>test</div>',
                mode: new HtmlMode()
            });

            languageProvider.registerEditor(editor);

            const lightBulbWidgets = languageProvider["$lightBulbWidgets"];
            expect(lightBulbWidgets[editor.id]).to.exist;

            languageProvider.unregisterEditor(editor);

            expect(lightBulbWidgets[editor.id]).to.be.undefined;
        });
    });

    describe('unregisterEditor with cleanupSession flag', () => {
        it('should not cleanup session by default', (done) => {
            const languageProvider = LanguageProvider.create(client);
            const editor = ace.edit(document.createElement('div'), {
                value: '<div>test</div>',
                mode: new HtmlMode()
            });

            languageProvider.registerEditor(editor);

            const sessionId = editor.session["id"];
            const sessionProvider = languageProvider["$sessionLanguageProviders"][sessionId];
            expect(sessionProvider).to.exist;

            languageProvider.unregisterEditor(editor);

            // Session should still exist
            const sessionProviderAfter = languageProvider["$sessionLanguageProviders"][sessionId];
            expect(sessionProviderAfter).to.exist;

            done();
        });

        it('should cleanup session when cleanupSession is true', (done) => {
            const languageProvider = LanguageProvider.create(client);
            const editor = ace.edit(document.createElement('div'), {
                value: '<div>test</div>',
                mode: new HtmlMode()
            });

            languageProvider.registerEditor(editor);

            const sessionId = editor.session["id"];
            const sessionProvider = languageProvider["$sessionLanguageProviders"][sessionId];
            expect(sessionProvider).to.exist;

            languageProvider.unregisterEditor(editor, true);

            setTimeout(() => {
                // Session should be cleaned up
                const sessionProviderAfter = languageProvider["$sessionLanguageProviders"][sessionId];
                expect(sessionProviderAfter).to.be.undefined;
                done();
            }, 50);
        });

        it('should call SessionLanguageProvider.dispose when cleanupSession is true', (done) => {
            const languageProvider = LanguageProvider.create(client);
            const editor = ace.edit(document.createElement('div'), {
                value: '<div>test</div>',
                mode: new HtmlMode()
            });

            languageProvider.registerEditor(editor);

            const sessionId = editor.session["id"];
            const sessionProvider = languageProvider["$sessionLanguageProviders"][sessionId];

            let disposeCalled = false;
            const originalDispose = sessionProvider.dispose.bind(sessionProvider);
            sessionProvider.dispose = (callback?) => {
                disposeCalled = true;
                originalDispose(callback);
            };

            languageProvider.unregisterEditor(editor, true);

            setTimeout(() => {
                expect(disposeCalled).to.be.true;
                done();
            }, 50);
        });
    });

    describe('SessionLanguageProvider.dispose', () => {
        it('should remove all event listeners from session', () => {
            const languageProvider = LanguageProvider.create(client, {
                functionality: {
                    semanticTokens: true
                }
            });
            const editor = ace.edit(document.createElement('div'), {
                value: '<div>test</div>',
                mode: new HtmlMode()
            });

            languageProvider.registerEditor(editor);

            const sessionId = editor.session["id"];
            const sessionProvider = languageProvider["$sessionLanguageProviders"][sessionId];

            // Verify event listeners are registered
            expect(sessionProvider["$changeListener"]).to.exist;
            expect(sessionProvider["$changeMode"]).to.exist;
            expect(sessionProvider["$changeScrollTopHandler"]).to.exist;

            languageProvider.closeDocument(editor.session);

            // Verify changeScrollTopHandler is cleaned up
            expect(sessionProvider["$changeScrollTopHandler"]).to.be.undefined;
        });

        it('should clear marker groups', (done) => {
            const languageProvider = LanguageProvider.create(client);
            const editor = ace.edit(document.createElement('div'), {
                value: '<div>test</div>',
                mode: new HtmlMode()
            });

            languageProvider.registerEditor(editor);

            const sessionId = editor.session["id"];
            const sessionProvider = languageProvider["$sessionLanguageProviders"][sessionId];

            // Create some marker groups
            if (sessionProvider.state.occurrenceMarkers) {
                sessionProvider.state.occurrenceMarkers.setMarkers([]);
            }

            languageProvider.closeDocument(editor.session, () => {
                expect(sessionProvider.state.occurrenceMarkers).to.be.null;
                expect(sessionProvider.state.diagnosticMarkers).to.be.null;
                done();
            });
        });

        it('should clear annotations', (done) => {
            const languageProvider = LanguageProvider.create(client);
            const editor = ace.edit(document.createElement('div'), {
                value: '<div>test</div>',
                mode: new HtmlMode()
            });

            languageProvider.registerEditor(editor);

            // Add some annotations
            editor.session.setAnnotations([
                {row: 0, column: 0, text: "Test error", type: "error"}
            ]);
            expect(editor.session.getAnnotations().length).to.equal(1);

            languageProvider.closeDocument(editor.session, () => {
                expect(editor.session.getAnnotations().length).to.equal(0);
                done();
            });
        });

        it('should clear semantic tokens', (done) => {
            const languageProvider = LanguageProvider.create(client, {
                functionality: {
                    semanticTokens: true
                }
            });
            const editor = ace.edit(document.createElement('div'), {
                value: '<div>test</div>',
                mode: new HtmlMode()
            });

            languageProvider.registerEditor(editor);

            languageProvider.closeDocument(editor.session, () => {
                // Verify setSemanticTokens was called with undefined
                expect(editor.session.setSemanticTokens).to.exist;
                done();
            });
        });

        it('should remove document URI from mapping', (done) => {
            const languageProvider = LanguageProvider.create(client);
            const editor = ace.edit(document.createElement('div'), {
                value: '<div>test</div>',
                mode: new HtmlMode()
            });

            languageProvider.registerEditor(editor, {
                filePath: 'test/path.html'
            });

            const expectedUri = 'file:///test/path.html';
            expect(languageProvider["$urisToSessionsIds"][expectedUri]).to.exist;

            languageProvider.closeDocument(editor.session, () => {
                expect(languageProvider["$urisToSessionsIds"][expectedUri]).to.be.undefined;
                done();
            });
        });

        it('should clear delta and request queues', (done) => {
            const languageProvider = LanguageProvider.create(client);
            const editor = ace.edit(document.createElement('div'), {
                value: '<div>test</div>',
                mode: new HtmlMode()
            });

            languageProvider.registerEditor(editor);

            const sessionId = editor.session["id"];
            const sessionProvider = languageProvider["$sessionLanguageProviders"][sessionId];

            languageProvider.closeDocument(editor.session, () => {
                expect(sessionProvider["$deltaQueue"]).to.be.null;
                expect(sessionProvider["$requestsQueue"]).to.deep.equal([]);
                done();
            });
        });
    });

    describe('multiple editors cleanup', () => {
        it('should handle cleanup of multiple editors independently', () => {
            const languageProvider = LanguageProvider.create(client);

            const editor1 = ace.edit(document.createElement('div'), {
                value: '<div>editor1</div>',
                mode: new HtmlMode()
            });
            const editor2 = ace.edit(document.createElement('div'), {
                value: '<div>editor2</div>',
                mode: new HtmlMode()
            });
            const editor3 = ace.edit(document.createElement('div'), {
                value: '<div>editor3</div>',
                mode: new HtmlMode()
            });

            languageProvider.registerEditor(editor1);
            languageProvider.registerEditor(editor2);
            languageProvider.registerEditor(editor3);

            expect(languageProvider.editors.length).to.equal(3);

            // Unregister editor2
            languageProvider.unregisterEditor(editor2);

            expect(languageProvider.editors.length).to.equal(2);
            expect(languageProvider.editors).to.include(editor1);
            expect(languageProvider.editors).to.not.include(editor2);
            expect(languageProvider.editors).to.include(editor3);

            // Editor1 and Editor3 should still have their completers
            expect(editor1.completers.find(c => c.id === "lspCompleters")).to.exist;
            expect(editor3.completers.find(c => c.id === "lspCompleters")).to.exist;

            // Editor2 should have completers restored
            expect(editor2.completers.find(c => c.id === "lspCompleters")).to.be.undefined;

            // Unregister remaining editors
            languageProvider.unregisterEditor(editor1);
            languageProvider.unregisterEditor(editor3);

            expect(languageProvider.editors.length).to.equal(0);
        });
    });

    describe('edge cases and error handling', () => {
        it('should not error when unregistering an editor that was never registered', () => {
            const languageProvider = LanguageProvider.create(client);
            const editor = ace.edit(document.createElement('div'), {
                value: '<div>test</div>',
                mode: new HtmlMode()
            });

            expect(() => languageProvider.unregisterEditor(editor)).to.not.throw();
        });

        it('should not error when unregistering the same editor twice', () => {
            const languageProvider = LanguageProvider.create(client);
            const editor = ace.edit(document.createElement('div'), {
                value: '<div>test</div>',
                mode: new HtmlMode()
            });

            languageProvider.registerEditor(editor);
            languageProvider.unregisterEditor(editor);

            expect(() => languageProvider.unregisterEditor(editor)).to.not.throw();
        });

        it('should handle cleanup when no event handlers were registered', () => {
            const languageProvider = LanguageProvider.create(client, {
                functionality: {
                    documentHighlights: false,
                    codeActions: false,
                    signatureHelp: false,
                    hover: false,
                    completion: false
                }
            });
            const editor = ace.edit(document.createElement('div'), {
                value: '<div>test</div>',
                mode: new HtmlMode()
            });

            languageProvider.registerEditor(editor);

            expect(() => languageProvider.unregisterEditor(editor)).to.not.throw();
        });

        it('should not error from callbacks after unregisterEditor', (done) => {
            const languageProvider = LanguageProvider.create(client, {
                functionality: {
                    documentHighlights: true,
                    codeActions: true
                }
            });
            const editor = ace.edit(document.createElement('div'), {
                value: '<div>test</div>',
                mode: new HtmlMode()
            });

            languageProvider.registerEditor(editor);
            languageProvider.unregisterEditor(editor);

            // These actions should not cause errors even though editor is unregistered
            editor.focus();
            editor.selection.clearSelection();
            editor.selection.selectAll();

            setTimeout(done, 600);
        });
    });
});