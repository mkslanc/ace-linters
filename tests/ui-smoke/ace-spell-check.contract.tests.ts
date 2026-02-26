import {expect} from "chai";
import {createUiHarness} from "./shared/harness";

describe("ace-spell-check UI contract tests", function () {
    this.timeout(40000);
    const harness = createUiHarness();
    const invalidDictBaseUrl = "http://127.0.0.1:8080/non-existent-dicts";
    const javascriptSmokeText = "// npm tsconfig";
    type EditorAnnotation = { text?: string };

    async function setSpellCheckGlobalOptions(options: Record<string, any>) {
        const page = harness.getPage();
        await page.evaluate((nextOptions) => {
            window.testFlags.globalOptionsChanged = false;
            window.languageProvider.setGlobalOptions("ace-spell-check", nextOptions);
        }, options);
        await harness.waitForFlag("globalOptionsChanged");
    }

    async function setDocumentAndReadAnnotations(text: string): Promise<EditorAnnotation[]> {
        const page = harness.getPage();
        await page.evaluate((value) => {
            window.testFlags.validateReceived = false;
            window.testFlags.hasDiagnostics = false;
            window.testFlags.diagnosticsCount = 0;
            window.editor.setValue(value);
            window.editor.clearSelection();
        }, text);

        await harness.waitForFlag("validateReceived", 30000);
        await harness.sleep(100);

        return await page.evaluate(() => window.editor?.session?.getAnnotations?.() || []);
    }

    async function setDocumentAndReadDiagnostics(text: string): Promise<number> {
        const annotations = await setDocumentAndReadAnnotations(text);
        return annotations.length;
    }

    before(async function () {
        await harness.start();
    });

    after(async function () {
        await harness.stop();
    });

    it("works with en_us baseline dictionary only", async function () {
        await harness.openScenario("ace-spell-check");
        await harness.initAceLinterFlags();
        await harness.switchMode("text");
        await setSpellCheckGlobalOptions({
            spellCheckOptions: {
                dictionaries: ["en_us"],
            },
        });

        const cleanDiagnostics = await setDocumentAndReadDiagnostics("hello world");
        expect(cleanDiagnostics).to.equal(0);

        const typoDiagnostics = await setDocumentAndReadDiagnostics("Thiss sentencea hass a typo.");
        expect(typoDiagnostics).to.be.greaterThan(0);

        const errors = harness.getConsoleErrors();
        expect(errors, `Console errors: ${errors.join("\n")}`).to.be.empty;
    });

    it("loads javascript/typescript dictionaries", async function () {
        await harness.openScenario("ace-spell-check");
        await harness.initAceLinterFlags();
        await harness.switchMode("typescript");

        await setSpellCheckGlobalOptions({
            enableAllDefaultDictionaries: true
        });

        const typoDiagnostics = await setDocumentAndReadDiagnostics(
            "consta g = new Greeter();",
        );
        expect(typoDiagnostics).to.be.greaterThan(0);

        const typoDiagnostics1 = await setDocumentAndReadDiagnostics(
            "const g = new Greeter();",
        );

        expect(typoDiagnostics1).to.equal(0);

        const errors = harness.getConsoleErrors();
        expect(errors, `Console errors: ${errors.join("\n")}`).to.be.empty;
    });

    it("supports user dictionary together with javascript/typescript + en_us", async function () {
        await harness.openScenario("ace-spell-check");
        await harness.initAceLinterFlags();
        await harness.switchMode("javascript");

        const customWord = "myhandwrittenlexeme";
        const customDictionaryPath = "/__cspell_vfs/@user/dict-custom/dict/custom.txt";
        const customPayload = {
            package: "@user/dict-custom",
            entries: [
                [customDictionaryPath, Buffer.from(`${customWord}\n`, "utf8").toString("base64")],
            ],
        };
        const customDictionaryAssetUrl = `data:application/json;base64,${Buffer.from(JSON.stringify(customPayload), "utf8").toString("base64")}`;

        harness.clearConsoleErrors();
        await setSpellCheckGlobalOptions({
            dictBaseUrl: invalidDictBaseUrl,
            dictAssetUrls: {
                "@user/dict-custom": customDictionaryAssetUrl,
            },
            spellCheckOptions: {
                dictionaries: ["user-custom"],
                dictionaryDefinitions: [
                    {
                        name: "user-custom",
                        path: customDictionaryPath,
                        description: "user custom dictionary",
                    },
                ],
                languageSettings: [
                    {
                        languageId: "javascript,typescript",
                        dictionaries: ["typescript", "user-custom"],
                    },
                ],
            },
        });

        const acceptedDiagnostics = await setDocumentAndReadDiagnostics(
          `// ${customWord}\n${javascriptSmokeText}\nconst g = new Greeter();`,
        );
        expect(acceptedDiagnostics).to.equal(0);

        const rejectedDiagnostics = await setDocumentAndReadDiagnostics(
          `// ${customWord}x\nThiss sentencea hass a typo.\nconst g = new Greeter();`,
        );
        expect(rejectedDiagnostics).to.be.greaterThan(0);

        const errors = harness.getConsoleErrors();
        expect(errors, `Console errors: ${errors.join("\n")}`).to.be.empty;
    });

    it("does not leak javascript/typescript dictionaries into text mode", async function () {
        await harness.openScenario("ace-spell-check");
        await harness.initAceLinterFlags();
        await harness.switchMode("text");

        await setSpellCheckGlobalOptions({
            enableAllDefaultDictionaries: true
        });

        const annotations = await setDocumentAndReadAnnotations(javascriptSmokeText);
        expect(annotations.length).to.be.greaterThan(0);
        const messages = annotations.map((annotation) => `${annotation?.text || ""}`.toLowerCase());
        expect(messages.some((text) => text.includes("npm") || text.includes("tsconfig"))).to.equal(true);

        const errors = harness.getConsoleErrors();
        expect(errors, `Console errors: ${errors.join("\n")}`).to.be.empty;
    });

    it("merges user dictionary with defaults in javascript mode", async function () {
        await harness.openScenario("ace-spell-check");
        await harness.initAceLinterFlags();
        await harness.switchMode("javascript");

        const customWord = "myhandwrittenlexeme";
        const customDictionaryPath = "/__cspell_vfs/@user/dict-custom-merge/dict/custom.txt";
        const customPayload = {
            package: "@user/dict-custom-merge",
            entries: [
                [customDictionaryPath, Buffer.from(`${customWord}\n`, "utf8").toString("base64")],
            ],
        };
        const customDictionaryAssetUrl = `data:application/json;base64,${Buffer.from(JSON.stringify(customPayload), "utf8").toString("base64")}`;

        await setSpellCheckGlobalOptions({
            dictAssetUrls: {
                "@user/dict-custom-merge": customDictionaryAssetUrl,
            },
            spellCheckOptions: {
                dictionaries: ["user-custom-merge"],
                dictionaryDefinitions: [
                    {
                        name: "user-custom-merge",
                        path: customDictionaryPath,
                        description: "user custom dictionary merged with defaults",
                    },
                ],
            },
        });

        const mergedOkDiagnostics = await setDocumentAndReadDiagnostics(
            `// ${customWord}\nconst g = new Greeter();\n${javascriptSmokeText}`,
        );
        expect(mergedOkDiagnostics).to.equal(0);

        const mergedTypoAnnotations = await setDocumentAndReadAnnotations(
            `// ${customWord}x\nconsta g = new Greeter();`,
        );
        expect(mergedTypoAnnotations.length).to.be.greaterThan(0);
        const messages = mergedTypoAnnotations.map((annotation) => `${annotation?.text || ""}`.toLowerCase());
        expect(messages.some((text) => text.includes("consta") || text.includes(`${customWord}x`))).to.equal(true);

        const errors = harness.getConsoleErrors();
        expect(errors, `Console errors: ${errors.join("\n")}`).to.be.empty;
    });

    it("diagnostics contain typo words in annotation text", async function () {
        await harness.openScenario("ace-spell-check");
        await harness.initAceLinterFlags();
        await harness.switchMode("text");
        await setSpellCheckGlobalOptions({
            spellCheckOptions: {
                dictionaries: ["en_us"],
            },
        });

        const annotations = await setDocumentAndReadAnnotations("Thiss sentencea hass a typo.");
        expect(annotations.length).to.be.greaterThan(0);
        const messages = annotations.map((annotation) => `${annotation?.text || ""}`);
        expect(messages.some((text) => text.includes("Typo in word"))).to.equal(true);
        expect(messages.some((text) => text.includes("Thiss"))).to.equal(true);

        const errors = harness.getConsoleErrors();
        expect(errors, `Console errors: ${errors.join("\n")}`).to.be.empty;
    });
});
