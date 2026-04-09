import {expect} from "chai";
import {Ace} from "ace-code";
import {parse} from "@babel/parser";
import {JavaScriptWorker} from "../src/workers/javascript-worker";
import {JsOptions, ScopesAnalyzer} from "../src/workers/eslint-rules/scopes-analyzer";
import {MockWorker} from "ace-linters/src/misc/mock-worker";

function createWorker(options?: JsOptions) {
    const sender = new MockWorker(true);
    const emitted: Array<{name: string, data: Ace.Annotation[]}> = [];
    const worker = new JavaScriptWorker(sender);

    sender.on("annotate", (data) => {
        emitted.push({name: "annotate", data});
    });

    if (options) {
        worker.setOptions(options);
    }

    return {sender, worker, emitted};
}

function annotate(code: string, options?: JsOptions) {
    const {worker, emitted} = createWorker(options);
    worker.doc.setValue(code);
    worker.onUpdate();

    const annotationEvent = [...emitted].reverse().find((event) => event.name === "annotate");

    expect(annotationEvent, "worker should emit annotate").to.exist;
    return annotationEvent!.data;
}

function analyzeScopes(code: string, options: JsOptions) {
    const plugins = ["estree"];

    if (options.jsx ?? options.parserOptions?.ecmaFeatures?.jsx) {
        plugins.push("jsx");
    }

    const parserOptions: any = {
        sourceType: options.sourceType,
        errorRecovery: true,
        plugins,
        ranges: true,
        strictMode: true,
    };

    if (options.parserOptions?.allowImportExportEverywhere !== undefined) {
        parserOptions.allowImportExportEverywhere = options.parserOptions.allowImportExportEverywhere;
    }

    if (options.sourceType !== "commonjs" && options.parserOptions?.allowAwaitOutsideFunction !== undefined) {
        parserOptions.allowAwaitOutsideFunction = options.parserOptions.allowAwaitOutsideFunction;
    }

    if (options.sourceType !== "commonjs" && options.parserOptions?.ecmaFeatures?.globalReturn) {
        parserOptions.allowReturnOutsideFunction = true;
    }

    const ast = parse(code, parserOptions);
    const analyzer = new ScopesAnalyzer(options);
    analyzer.analyze(ast.program);
    return analyzer.scopeManager;
}

function texts(annotations: Ace.Annotation[]) {
    return annotations.map((annotation) => annotation.text);
}

function textsByType(annotations: Ace.Annotation[], type: Ace.Annotation["type"]) {
    return annotations
        .filter((annotation) => annotation.type === type)
        .map((annotation) => annotation.text);
}

function errorTexts(annotations: Ace.Annotation[]) {
    return textsByType(annotations, "error");
}

function hasAnnotationForVariable(
    annotations: Ace.Annotation[],
    type: Ace.Annotation["type"],
    variableName: string,
    pattern?: RegExp
) {
    return annotations.some((annotation) =>
        annotation.type === type &&
        new RegExp(`['"]${variableName}['"]`).test(annotation.text) &&
        (!pattern || pattern.test(annotation.text))
    );
}

describe("JavaScriptWorker", () => {
    describe("rule annotations", () => {
        it("reports no-unused-vars by default", () => {
            const annotations = annotate("const foo = 1;");

            expect(hasAnnotationForVariable(annotations, "info", "foo", /never used/i)).to.equal(true);
        });

        it("reports no-undef by default", () => {
            const annotations = annotate("foo = 1;");

            expect(hasAnnotationForVariable(annotations, "warning", "foo", /not defined/i)).to.equal(true);
        });

        it("can disable no-unused-vars while keeping no-undef", () => {
            const annotations = annotate("const foo = bar;", {
                "no-unused-vars": false,
                "no-undef": true,
                sourceType: "module"
            });

            expect(hasAnnotationForVariable(annotations, "info", "foo", /never used/i)).to.equal(false);
            expect(hasAnnotationForVariable(annotations, "warning", "bar", /not defined/i)).to.equal(true);
        });

        it("can disable no-undef while keeping no-unused-vars", () => {
            const annotations = annotate("const foo = bar;", {
                "no-unused-vars": true,
                "no-undef": false,
                sourceType: "module"
            });

            expect(hasAnnotationForVariable(annotations, "info", "foo", /never used/i)).to.equal(true);
            expect(hasAnnotationForVariable(annotations, "warning", "bar", /not defined/i)).to.equal(false);
        });

        it("updates analyzer behavior when options change on the same worker", () => {
            const {worker, emitted} = createWorker();

            worker.doc.setValue("const foo = bar;");
            worker.onUpdate();

            let first = emitted.at(-1)?.data || [];
            expect(hasAnnotationForVariable(first, "info", "foo", /never used/i)).to.equal(true);
            expect(hasAnnotationForVariable(first, "warning", "bar", /not defined/i)).to.equal(true);

            worker.setOptions({
                "no-unused-vars": false,
                "no-undef": true,
                sourceType: "module"
            });
            worker.doc.setValue("const foo = bar;");
            worker.onUpdate();

            let second = emitted.at(-1)?.data || [];
            expect(hasAnnotationForVariable(second, "info", "foo", /never used/i)).to.equal(false);
            expect(hasAnnotationForVariable(second, "warning", "bar", /not defined/i)).to.equal(true);
        });

        it("handles jsx fragments without overflowing analyze", () => {
            const annotations = annotate("const View = <></>; const foo = bar;");

            expect(errorTexts(annotations)).to.deep.equal([]);
            expect(hasAnnotationForVariable(annotations, "info", "View", /never used/i)).to.equal(true);
            expect(hasAnnotationForVariable(annotations, "info", "foo", /never used/i)).to.equal(true);
            expect(hasAnnotationForVariable(annotations, "warning", "bar", /not defined/i)).to.equal(true);
        });

        it("does not report standard browser globals", () => {
            const annotations = annotate("console.log(window.location.href); document.title;");

            expect(hasAnnotationForVariable(annotations, "warning", "console", /not defined/i)).to.equal(false);
            expect(hasAnnotationForVariable(annotations, "warning", "window", /not defined/i)).to.equal(false);
            expect(hasAnnotationForVariable(annotations, "warning", "document", /not defined/i)).to.equal(false);
        });

        it("supports default node, amd and mocha globals", () => {
            const annotations = annotate("define(['x'], function () { describe('suite', function () { console.log(process.version); }); });");

            expect(hasAnnotationForVariable(annotations, "warning", "define", /not defined/i)).to.equal(false);
            expect(hasAnnotationForVariable(annotations, "warning", "describe", /not defined/i)).to.equal(false);
            expect(hasAnnotationForVariable(annotations, "warning", "process", /not defined/i)).to.equal(false);
        });

        it("can enable node globals", () => {
            const annotations = annotate("console.log(process.version, __dirname);", {
                "no-unused-vars": true,
                "no-undef": true,
                sourceType: "script",
                env: {
                    browser: false,
                    node: true,
                }
            });

            expect(hasAnnotationForVariable(annotations, "warning", "process", /not defined/i)).to.equal(false);
            expect(hasAnnotationForVariable(annotations, "warning", "__dirname", /not defined/i)).to.equal(false);
        });

        it("adds commonjs globals for commonjs source type", () => {
            const annotations = annotate("module.exports = require('./x');", {
                "no-unused-vars": true,
                "no-undef": true,
                sourceType: "commonjs",
                env: {
                    browser: false,
                }
            });

            expect(errorTexts(annotations)).to.deep.equal([]);
            expect(hasAnnotationForVariable(annotations, "warning", "module", /not defined/i)).to.equal(false);
            expect(hasAnnotationForVariable(annotations, "warning", "exports", /not defined/i)).to.equal(false);
            expect(hasAnnotationForVariable(annotations, "warning", "require", /not defined/i)).to.equal(false);
        });

        it("can declare custom globals through options", () => {
            const annotations = annotate("customApi.doThing();", {
                "no-unused-vars": true,
                "no-undef": true,
                sourceType: "module",
                globals: {
                    customApi: "readonly",
                }
            });

            expect(hasAnnotationForVariable(annotations, "warning", "customApi", /not defined/i)).to.equal(false);
        });
    });

    describe("parser errors", () => {
        it("reports recoverable parser errors from ast.errors", () => {
            const annotations = annotate("class A { #x; #x; }");

            expect(errorTexts(annotations).length).to.be.greaterThan(0);
            expect(errorTexts(annotations).some((text) => /#x/.test(text))).to.equal(true);
        });

        it("can report several parser errors from ast.errors", () => {
            const annotations = annotate([
                "\"use strict\";",
                "let first = 1;",
                "let first = 2;",
                "let second = 3;",
                "let second = 4;",
            ].join("\n"));

            const errors = errorTexts(annotations);

            expect(errors.length).to.be.greaterThan(1);
            expect(errors.some((text) => /['"]first['"].*already been declared/i.test(text))).to.equal(true);
            expect(errors.some((text) => /['"]second['"].*already been declared/i.test(text))).to.equal(true);
        });

        it("reports thrown syntax errors", () => {
            const annotations = annotate("const value = ;");

            expect(errorTexts(annotations).length).to.be.greaterThan(0);
        });

        it("allows return outside function without parser errors", () => {
            const annotations = annotate("return 1;");

            expect(errorTexts(annotations)).to.deep.equal([]);
        });

        it("allows await outside function by default", () => {
            const annotations = annotate("await foo();");

            expect(errorTexts(annotations)).to.deep.equal([]);
        });

        it("reports recoverable parser errors together with scope-analyzer annotations", () => {
            const annotations = annotate([
                "({ __proto__: 1, __proto__: 2 });",
                "const foo = bar;",
            ].join("\n"));

            expect(errorTexts(annotations).length).to.be.greaterThan(0);
            expect(errorTexts(annotations).some((text) => /__proto__/i.test(text))).to.equal(true);
            expect(hasAnnotationForVariable(annotations, "info", "foo", /never used/i)).to.equal(true);
            expect(hasAnnotationForVariable(annotations, "warning", "bar", /not defined/i)).to.equal(true);
        });
    });

    describe("scope analysis options", () => {
        it("uses globalReturn to enable nodejsScope semantics", () => {
            const enabled = annotate("arguments;", {
                "no-unused-vars": true,
                "no-undef": true,
                sourceType: "script",
                globals: {},
                parserOptions: {
                    ecmaFeatures: {
                        globalReturn: true,
                    },
                },
            });
            const disabled = annotate("arguments;", {
                "no-unused-vars": true,
                "no-undef": true,
                sourceType: "script",
                globals: {},
                parserOptions: {
                    ecmaFeatures: {
                        globalReturn: false,
                    },
                },
            });

            expect(hasAnnotationForVariable(enabled, "warning", "arguments", /not defined/i)).to.equal(false);
            expect(hasAnnotationForVariable(disabled, "warning", "arguments", /not defined/i)).to.equal(true);
        });

        it("uses impliedStrict in scope analysis", () => {
            const strictScopes = analyzeScopes("foo = 1;", {
                "no-unused-vars": true,
                "no-undef": true,
                sourceType: "script",
                globals: {},
                parserOptions: {
                    ecmaFeatures: {
                        impliedStrict: true,
                    },
                },
            });
            const sloppyScopes = analyzeScopes("foo = 1;", {
                "no-unused-vars": true,
                "no-undef": true,
                sourceType: "script",
                globals: {},
                parserOptions: {
                    ecmaFeatures: {
                        impliedStrict: false,
                    },
                },
            });

            expect(strictScopes.scopes[0].isStrict).to.equal(true);
            expect(sloppyScopes.scopes[0].isStrict).to.equal(false);
        });
    });
});
