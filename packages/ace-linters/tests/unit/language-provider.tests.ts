import * as ace from "ace-code";
import {Ace} from "ace-code";
import "ace-code/src/test/mockdom";
//@ts-ignore
window["self"] = {};

import {LanguageProvider} from "../../src/language-provider";
import {Mode as JSONMode} from "ace-code/src/mode/json";
import {Mode as HtmlMode} from "ace-code/src/mode/html";
import {assert, expect} from "chai";
import {MockWorker} from "../../src/misc/mock-worker";
import {ServiceManager} from "../../src/services/service-manager";
import {Done} from "mocha";
import Completion = Ace.Completion;

describe('LanguageProvider tests', () => {
    let editorEl: HTMLElement;
    let editor: Ace.Editor;
    let languageProvider: LanguageProvider;
    let client: MockWorker, ctx: MockWorker;
    let manager: ServiceManager;

    let $checkAnnotations = function (currEditor: Ace.Editor, done: Done, count: number) {
        let checkAnnotations = function () {
            expect(currEditor.session.getAnnotations().length).to.equal(count);
            currEditor.session.off("changeAnnotation", checkAnnotations);
            done();
        }

        currEditor.session.on("changeAnnotation", checkAnnotations);
    }

    before((done) => {
        editorEl = document.createElement('div');

        editor = ace.edit(editorEl, {
            value: `
    <!DOCTYPE html>
<html>
    <head>

    <style type="text/css">
        .text-layer {
            font-family: Monaco, "Courier New", monospace;
            font-size: 12px;
            cursor: text;
        }
    </style>

    </head>
    <body>
        <h1 style="color:red">Juhu Kinners</h1>
    </body>
</html>
    `,
            mode: new HtmlMode()
        });

        client = new MockWorker();
        ctx = new MockWorker();
        client.setEmitter(ctx);
        ctx.setEmitter(client);

        manager = new ServiceManager(ctx);
        manager.registerService("html", {
            features: {completion: true, completionResolve: true, diagnostics: true, format: true, hover: true},
            module: () => import("../../src/services/html/html-service"),
            className: "HtmlService",
            modes: "html"
        });

        $checkAnnotations(editor, done, 0);

        languageProvider = LanguageProvider.create(client, {
            functionality: {
                hover: true,
                completion: {
                    overwriteCompleters: true
                },
                completionResolve: true,
                format: true,
                documentHighlights: false,
                signatureHelp: false,
                codeActions: false
            }
        });
        languageProvider.registerEditor(editor);
    });

    describe('cdn', function () {
        it('wrong cdn url', () => {
            assert.throws(
                () => LanguageProvider.fromCdn("invalid url"),
                "Url is not valid"
            )
        })
    })

    it('get plain tooltip text', () => {
        let hoverText = languageProvider.getTooltipText({content: {type: "plaintext", text: "Plain text"}});
        expect(hoverText).to.equal("Plain text");
    })

    it('completer should have html trigger characters', () => {
        let completer = languageProvider.activeEditor.completers.find((item) => item.id === "lspCompleters");
        expect(completer.triggerCharacters).to.eql(['.', ':', '<', '"', '=', '/']);
    });

    it('do hover or not, depending on service feature state', (done) => {
        languageProvider.doHover(editor.session, {row: 2, column: 2}, hover => {
            let hoverText = languageProvider.getTooltipText(hover);
            expect(hoverText).not.to.be.empty;

            languageProvider.configureServiceFeatures("html", {
                hover: false,
                diagnostics: false,
            });

            languageProvider.doHover(editor.session, {row: 2, column: 2}, hover => {
                expect(hover).to.be.undefined;
                done();
            })
        })
    })

    it('should format', (done) => {
        let timeout;
        let changeListener = () => {
            timeout ??= setTimeout(() => {
                expect(editor.session.getValue()).to.equal(`<!DOCTYPE html>
<html>

<head>

    <style type="text/css">
        .text-layer {
            font-family: Monaco, "Courier New", monospace;
            font-size: 12px;
            cursor: text;
        }
    </style>

</head>

<body>
    <h1 style="color:red">Juhu Kinners</h1>
</body>

</html>`);
                editor.session.off("change", changeListener);
                done();
            }, 0);
        }

        editor.session.on("change", changeListener);

        languageProvider.format();
    });

    describe('registerEditor with file paths - worker side verification', function () {
        let testProvider: LanguageProvider;
        let testClient: MockWorker, testCtx: MockWorker;
        let testManager: ServiceManager;

        beforeEach(() => {
            testClient = new MockWorker();
            testCtx = new MockWorker();
            testClient.setEmitter(testCtx);
            testCtx.setEmitter(testClient);

            testManager = new ServiceManager(testCtx);
            testManager.registerService("html", {
                features: {completion: true, completionResolve: true, diagnostics: true, format: true, hover: true},
                module: () => import("../../src/services/html/html-service"),
                className: "HtmlService",
                modes: "html"
            });
        });

        it('should register editor with custom file path and verify worker service document URI', (done) => {
            testProvider = LanguageProvider.create(testClient, { functionality: {
                    codeActions: false
                }});

            let testEditor = ace.edit(document.createElement('div'), {
                value: '<div>test content</div>',
                mode: new HtmlMode()
            });

            // Wait for the service to be connected and document to be added
            setTimeout(() => {
                testProvider.registerEditor(testEditor, {
                    filePath: 'custom/path/test.html'
                });

                setTimeout(() => {
                    const expectedDocumentUri = 'file:///custom/path/test.html';
                    const htmlService = testManager.getServicesInstances(expectedDocumentUri)[0];

                    expect(htmlService).to.exist;
                    expect(htmlService.documents[expectedDocumentUri]).to.exist;
                    done();
                }, 100);
            }, 50);
        });

        it('should register editor with workspace URI and verify worker service document URI', (done) => {
            testProvider = LanguageProvider.create(testClient, {
                workspacePath: '/workspace/project',
                functionality: {
                    codeActions: false
                }
            });

            let testEditor = ace.edit(document.createElement('div'), {
                value: '<div>workspace test</div>',
                mode: new HtmlMode()
            });

            setTimeout(() => {
                testProvider.registerEditor(testEditor, {
                    filePath: 'src/components/test.html',
                    joinWorkspaceURI: true,
                });

                setTimeout(() => {
                    const expectedDocumentUri = 'file:///workspace/project/src/components/test.html';
                    const htmlService = testManager.getServicesInstances(expectedDocumentUri)[0];

                    expect(htmlService).to.exist;
                    expect(htmlService.documents[expectedDocumentUri]).to.exist;
                    done();
                }, 100);
            }, 50);
        });

        it('should register editor without joinWorkspaceURI and verify worker service document URI', (done) => {
            testProvider = LanguageProvider.create(testClient, {
                workspacePath: '/workspace/project',
                functionality: {
                    codeActions: false
                }
            });

            let testEditor = ace.edit(document.createElement('div'), {
                value: '<div>no join test</div>',
                mode: new HtmlMode()
            });

            setTimeout(() => {
                testProvider.registerEditor(testEditor, {
                    filePath: '/absolute/path/test.html',
                    joinWorkspaceURI: false
                });

                setTimeout(() => {
                    const expectedDocumentUri = 'file:///absolute/path/test.html';
                    const htmlService = testManager.getServicesInstances(expectedDocumentUri)[0];

                    expect(htmlService).to.exist;
                    expect(htmlService.documents[expectedDocumentUri]).to.exist;
                    done();
                }, 100);
            }, 50);
        });

        it('should register editor without config and verify default document URI', (done) => {
            testProvider = LanguageProvider.create(testClient, {
                functionality: {
                    codeActions: false
                }
            });

            let testEditor = ace.edit(document.createElement('div'), {
                value: '<div>default test</div>',
                mode: new HtmlMode()
            });

            setTimeout(() => {
                testProvider.registerEditor(testEditor);

                setTimeout(() => {
                    // Should use session ID with .html extension
                    const expectedPattern = `file:///${testEditor.session["id"]}.html`;
                    const htmlService = testManager.getServicesInstances(expectedPattern)[0];

                    expect(htmlService).to.exist;
                    expect(htmlService.documents[expectedPattern]).to.exist;
                    done();
                }, 100);
            }, 50);
        });

        it('should handle setSessionFilePath after registration', (done) => {
            testProvider = LanguageProvider.create(testClient, {
                workspacePath: '/workspace/project',
            });

            let testEditor = ace.edit(document.createElement('div'), {
                value: '<div>dynamic path test</div>',
                mode: new HtmlMode()
            });

            setTimeout(() => {
                // First register with default
                testProvider.registerEditor(testEditor);

                setTimeout(() => {
                    // Then change the file path
                    testProvider.setSessionFilePath(testEditor.session, {
                        filePath: 'dynamic/new-path.html',
                        joinWorkspaceURI: true
                    });

                    setTimeout(() => {
                        const expectedDocumentUri = 'file:///workspace/project/dynamic/new-path.html';
                        const htmlService = testManager.getServicesInstances(expectedDocumentUri)[0];

                        expect(htmlService).to.exist;
                        expect(htmlService.documents[expectedDocumentUri]).to.exist;
                        done();
                    }, 100);
                }, 100);
            }, 50);
        });

        afterEach(() => {
            testClient.removeAllListeners();
            testCtx.removeAllListeners();
        });
    });

    describe('json functionality', function () {
        let jsonEditorEl: HTMLElement;
        let jsonEditor: Ace.Editor;

        before((done) => {
            jsonEditorEl = document.createElement('div');
            jsonEditor = ace.edit(jsonEditorEl, {
                value: '{"property": "value"}',
                mode: new JSONMode()
            });

            client = new MockWorker();
            ctx = new MockWorker();
            client.setEmitter(ctx);
            ctx.setEmitter(client);

            manager.registerService("json", {
                features: {completion: true, completionResolve: true, diagnostics: true, format: true, hover: true},
                module: () => import("../../src/services/json/json-service"),
                className: "JsonService",
                modes: "json"
            });

            $checkAnnotations(jsonEditor, done, 0);
            languageProvider.registerEditor(jsonEditor);
        });

        it('focus editor', (done) => {
            jsonEditor.focus();
            setTimeout(() => {
                expect(languageProvider.activeEditor.id).equals(jsonEditor.id);
                done();
            }, 0);
        })

        describe('should set schema', function () {
            before((done) => {
                let shouldSetSchema = function () {
                    let schema = `{
  "type": "object",
  "description": "basic json object",
  "properties": {
    "property": {
      "description": "basic property",
      "type": "string",
      "minLength": 8,
      "maxLength": 50
    }
  }
}`;
                    //TODO: check why this is not working
                    //$checkAnnotations(jsonEditor, done, 1);
                    done();
                    languageProvider.setGlobalOptions("json", {
                        schemas: [
                            {
                                uri: "basicSchema.json",
                                schema: schema

                            }
                        ]
                    });
                };

                $checkAnnotations(jsonEditor, shouldSetSchema, 0);
                languageProvider.setSessionOptions(jsonEditor.session, {schemaUri: "basicSchema.json"});
            })

            describe('completions', function () {
                let completions: Completion[];
                before(function (done) {
                    jsonEditor.session.setValue("{}");
                    jsonEditor.moveCursorTo(0, 1);
                    languageProvider.doComplete(jsonEditor, jsonEditor.session, (resultCompletions) => {
                        completions = resultCompletions;
                        completions.forEach((item) => {
                            item["fileName"] = languageProvider["$getFileName"](jsonEditor.session);
                        });
                        done();
                    })
                })

                it('do complete', function () {
                    expect(completions.length).to.equal(1);
                    expect(completions[0].caption).to.equal("property");
                })

                /* it('do resolve', function (done) {
                     languageProvider.doResolve(completions[0], function (completionItem) {
                         expect(completionItem.documentation).to.equal("basic property");
                         done();
                     })
                 })*/
            });

        });
    })

    it('should remove document from linked services', (done) => {
        let $sessionIDToMode = manager["$sessionIDToMode"];
        let name = "file:///" + editor.session["id"] + ".html";
        let htmlService = manager.getServicesInstances(name)[0];

        expect(htmlService.documents[name]).exist;
        expect($sessionIDToMode[name]).exist;

        languageProvider.closeDocument(editor.session, () => {

            expect(htmlService.documents[name]).not.exist;
            expect($sessionIDToMode[name]).not.exist;
            done()
        });

    })

    after(() => {
        client.removeAllListeners();
        ctx.removeAllListeners();
    });
});