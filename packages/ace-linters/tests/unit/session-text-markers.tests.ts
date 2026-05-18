import {expect} from "chai";
import * as ace from "ace-code";
import "ace-code/src/test/mockdom";
import {DiagnosticSeverity, DiagnosticTag} from "vscode-languageserver-protocol";
import {LanguageProvider} from "../../src/language-provider";
import {MockWorker} from "../../src/misc/mock-worker";

describe("SessionLanguageProvider text marker rendering", () => {
    function createRegisteredEditor(functionality: any) {
        const client = new MockWorker(true);
        const ctx = new MockWorker(true);
        client.setEmitter(ctx);
        ctx.setEmitter(client);

        const provider = LanguageProvider.create(client, {functionality});
        const editor = ace.edit(document.createElement("div"), {
            value: "class First {}\nclass Second {}\nconst unused = 1;",
            mode: "ace/mode/typescript"
        });

        provider.registerEditor(editor);
        const sessionProvider = provider["$sessionLanguageProviders"][editor.session["id"]];

        return {provider, editor, sessionProvider, client, ctx};
    }

    function activeMarkers(session: ace.Ace.EditSession) {
        return (session.getTextMarkers?.() || []).filter(Boolean);
    }

    function markerClasses(session: ace.Ace.EditSession) {
        return activeMarkers(session).map((marker) => marker.className);
    }

    function setSemanticLegend(sessionProvider: any) {
        sessionProvider.setServerCapabilities({
            typescript: {
                semanticTokensProvider: {
                    legend: {
                        tokenTypes: ["class", "variable"],
                        tokenModifiers: []
                    },
                    range: true,
                    full: true
                }
            }
        });
    }

    afterEach(() => {
        document.body.innerHTML = "";
    });

    it("creates text markers for semantic tokens without patching the tokenizer", () => {
        const {editor, sessionProvider} = createRegisteredEditor({
            semanticTokens: true,
            showUnusedDeclarations: false
        });
        setSemanticLegend(sessionProvider);

        const bgTokenizer = editor.session.bgTokenizer;
        const tokenizeRow = bgTokenizer.$tokenizeRow;
        const lines = bgTokenizer.lines;
        lines[0] = [{type: "identifier", value: "cached"}];

        sessionProvider.$applySemanticTokens({
            data: [0, 6, 5, 0, 0]
        });

        const markers = activeMarkers(editor.session);
        expect(markers).to.have.lengthOf(1);
        expect(markers[0].range).to.deep.equal({
            start: {row: 0, column: 6},
            end: {row: 0, column: 11}
        });
        expect(markers[0].className).to.equal("ace_entity ace_name ace_type ace_class");
        expect(bgTokenizer.$tokenizeRow).to.equal(tokenizeRow);
        expect(bgTokenizer.lines).to.equal(lines);
        expect(bgTokenizer.lines[0]).to.deep.equal([{type: "identifier", value: "cached"}]);

        editor.destroy();
    });

    it("replaces old semantic text markers on refresh", () => {
        const {editor, sessionProvider} = createRegisteredEditor({
            semanticTokens: true,
            showUnusedDeclarations: false
        });
        setSemanticLegend(sessionProvider);

        sessionProvider.$applySemanticTokens({
            data: [0, 6, 5, 0, 0]
        });
        expect(activeMarkers(editor.session).map((marker) => marker.range.start.column)).to.deep.equal([6]);

        sessionProvider.$applySemanticTokens({
            data: [1, 6, 6, 0, 0]
        });

        const markers = activeMarkers(editor.session);
        expect(markers).to.have.lengthOf(1);
        expect(markers[0].range).to.deep.equal({
            start: {row: 1, column: 6},
            end: {row: 1, column: 12}
        });

        editor.destroy();
    });

    it("clears semantic text markers on null semantic response", () => {
        const {editor, sessionProvider} = createRegisteredEditor({
            semanticTokens: true,
            showUnusedDeclarations: false
        });
        setSemanticLegend(sessionProvider);

        sessionProvider.$applySemanticTokens({
            data: [0, 6, 5, 0, 0]
        });
        expect(activeMarkers(editor.session)).to.have.lengthOf(1);

        sessionProvider.$applySemanticTokens(null);

        expect(activeMarkers(editor.session)).to.have.lengthOf(0);

        editor.destroy();
    });

    it("creates unused and deprecated diagnostic text markers for tagged diagnostics", () => {
        const {editor, sessionProvider} = createRegisteredEditor({
            semanticTokens: false,
            showUnusedDeclarations: true
        });

        sessionProvider.$showAnnotations([
            {
                range: {
                    start: {line: 2, character: 6},
                    end: {line: 2, character: 12}
                },
                message: "unused",
                severity: DiagnosticSeverity.Warning,
                tags: [DiagnosticTag.Unnecessary]
            },
            {
                range: {
                    start: {line: 0, character: 6},
                    end: {line: 0, character: 11}
                },
                message: "deprecated",
                severity: DiagnosticSeverity.Warning,
                tags: [DiagnosticTag.Deprecated]
            },
            {
                range: {
                    start: {line: 1, character: 6},
                    end: {line: 1, character: 12}
                },
                message: "plain",
                severity: DiagnosticSeverity.Warning
            }
        ]);

        expect(markerClasses(editor.session)).to.have.members([
            "ace_highlight_unnecessary",
            "ace_highlight_deprecated"
        ]);

        editor.destroy();
    });

    it("uses deprecated text marker when a diagnostic has deprecated and unnecessary tags", () => {
        const {editor, sessionProvider} = createRegisteredEditor({
            semanticTokens: false,
            showUnusedDeclarations: true
        });

        sessionProvider.$showAnnotations([
            {
                range: {
                    start: {line: 2, character: 6},
                    end: {line: 2, character: 12}
                },
                message: "deprecated unused",
                severity: DiagnosticSeverity.Warning,
                tags: [DiagnosticTag.Unnecessary, DiagnosticTag.Deprecated]
            }
        ]);

        expect(markerClasses(editor.session)).to.deep.equal(["ace_highlight_deprecated"]);

        editor.destroy();
    });

    it("does not create diagnostic text markers when unused declaration rendering is disabled", () => {
        const {editor, sessionProvider} = createRegisteredEditor({
            semanticTokens: false,
            showUnusedDeclarations: false
        });

        sessionProvider.$showAnnotations([
            {
                range: {
                    start: {line: 2, character: 6},
                    end: {line: 2, character: 12}
                },
                message: "unused",
                severity: DiagnosticSeverity.Warning,
                tags: [DiagnosticTag.Unnecessary]
            }
        ]);

        expect(activeMarkers(editor.session)).to.have.lengthOf(0);
        expect(editor.session.getAnnotations()).to.have.lengthOf(1);

        editor.destroy();
    });

    it("clears semantic and diagnostic text markers on mode change and dispose", () => {
        const {editor, sessionProvider} = createRegisteredEditor({
            semanticTokens: true,
            showUnusedDeclarations: true
        });
        setSemanticLegend(sessionProvider);
        sessionProvider["$connected"]({});

        sessionProvider.$applySemanticTokens({
            data: [0, 6, 5, 0, 0]
        });
        sessionProvider.$showAnnotations([
            {
                range: {
                    start: {line: 2, character: 6},
                    end: {line: 2, character: 12}
                },
                message: "unused",
                severity: DiagnosticSeverity.Warning,
                tags: [DiagnosticTag.Unnecessary]
            }
        ]);
        expect(activeMarkers(editor.session)).to.have.lengthOf(2);

        sessionProvider["$changeMode"]();
        expect(activeMarkers(editor.session)).to.have.lengthOf(0);

        sessionProvider.$applySemanticTokens({
            data: [0, 6, 5, 0, 0]
        });
        sessionProvider.$showAnnotations([
            {
                range: {
                    start: {line: 2, character: 6},
                    end: {line: 2, character: 12}
                },
                message: "unused",
                severity: DiagnosticSeverity.Warning,
                tags: [DiagnosticTag.Unnecessary]
            }
        ]);
        expect(activeMarkers(editor.session)).to.have.lengthOf(2);

        sessionProvider.dispose();
        expect(activeMarkers(editor.session)).to.have.lengthOf(0);

        editor.destroy();
    });
});
