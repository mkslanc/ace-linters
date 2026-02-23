import {expect} from "chai";
import {createUiHarness} from "./shared/harness";
import {yamlContent, yamlSchema} from "./fixtures/yaml";

describe("ace-linters UI contract tests", function () {
    this.timeout(40000);
    const harness = createUiHarness();

    before(async function () {
        await harness.start();
    });

    after(async function () {
        await harness.stop();
    });

    it("switches default linter modes without runtime errors", async function () {
        await harness.openScenario("ace-linters");
        await harness.initAceLinterFlags();
        const page = harness.getPage();

        const modes = [
            "typescript", "json", "css", "html", "yaml", "php", "xml", "javascript", "lua", "less", "scss"
        ];

        for (const mode of modes) {
            harness.clearConsoleErrors();
            await page.evaluate((targetMode) => {
                window.testFlags.modeChanged = false;
                window.editor.session.setMode(`ace/mode/${targetMode}`);
            }, mode);
            await harness.waitForFlag("modeChanged");

            const errors = harness.getConsoleErrors();
            expect(errors, `Console errors for mode "${mode}": ${errors.join("\n")}`).to.be.empty;
        }
    });

    it("handles YAML schema options without critical runtime errors", async function () {
        await harness.openScenario("ace-linters");
        await harness.initAceLinterFlags();
        const page = harness.getPage();

        const yamlOptions = {
            schemas: [
                {
                    uri: "yamlSchema.json",
                    schema: yamlSchema
                }
            ],
        };

        harness.clearConsoleErrors();
        await page.evaluate((options) => {
            window.testFlags.globalOptionsChanged = false;
            window.testFlags.modeChanged = false;
            window.editor.session.setMode("ace/mode/yaml");
            window.languageProvider.setGlobalOptions("yaml", options);
        }, yamlOptions);
        await harness.waitForFlag("globalOptionsChanged");

        await page.evaluate(() => {
            window.testFlags.optionsChanged = false;
            window.languageProvider.setSessionOptions(window.editor.session, {schemaUri: "yamlSchema.json"});
        });
        await harness.waitForFlag("optionsChanged");

        await page.evaluate((content) => {
            window.editor.setValue(content);
            window.editor.clearSelection();
        }, yamlContent);

        await harness.sleep(1000);
        await page.hover(".ace_meta.ace_tag:first-of-type");
        await harness.sleep(2000);

        const errors = harness.getConsoleErrors();
        expect(errors, `Console errors: ${errors.join("\n")}`).to.be.empty;
    });

    it("keeps TypeScript autocompletion behavior stable", async function () {
        await harness.openScenario("ace-linters");
        await harness.initAceLinterFlags();
        const page = harness.getPage();

        await page.evaluate(() => {
            window.testFlags.modeChanged = false;
            window.editor.session.setMode("ace/mode/typescript");
            window.editor.setValue("");
        });
        await harness.waitForFlag("modeChanged");

        await page.click(".ace_content");
        await page.keyboard.type("win");
        await page.waitForSelector(".ace_selected");
        await page.keyboard.press("Enter");

        const completed = await page.evaluate(() => window.editor.getValue().trim());
        expect(completed, "Autocompletion result").to.equal("window");

        await page.evaluate(() => {
            window.testFlags.modeChanged = false;
            window.editor.setValue(`class A {
    "with-dashes" = 2;
};

let a = new A();`);
            window.editor.clearSelection();
        });
        await page.keyboard.press("Enter");
        await page.keyboard.type("a.");
        await harness.sleep(100);
        await page.keyboard.press("Enter");

        const result = await page.evaluate(() => window.editor.getValue().trim());
        expect(result, "Autocompletion result").to.equal(`class A {
    "with-dashes" = 2;
};

let a = new A();
a.["with-dashes"]`);

        const errors = harness.getConsoleErrors();
        expect(errors, `Console errors: ${errors.join("\n")}`).to.be.empty;
    });
});
