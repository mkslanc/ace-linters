import {expect} from "chai";
import {createUiHarness} from "./shared/harness";

describe("ace-python-ruff-linter UI contract tests", function () {
    this.timeout(40000);
    const harness = createUiHarness();

    before(async function () {
        await harness.start();
    });

    after(async function () {
        await harness.stop();
    });

    it("produces diagnostics for invalid python code", async function () {
        await harness.openScenario("ace-python-ruff-linter");
        await harness.initAceLinterFlags();
        const page = harness.getPage();

        await page.evaluate(() => {
            window.testFlags.validateReceived = false;
            window.testFlags.hasDiagnostics = false;
            window.testFlags.diagnosticsCount = 0;
            window.editor.setValue("print(undefined_name)\n");
            window.editor.clearSelection();
        });

        await harness.waitForFlag("validateReceived");
        await harness.waitForFlag("hasDiagnostics");
        const diagnosticsCount = await page.evaluate(() => window.testFlags.diagnosticsCount);
        expect(diagnosticsCount).to.be.greaterThan(0);

        const errors = harness.getConsoleErrors();
        expect(errors, `Console errors: ${errors.join("\n")}`).to.be.empty;
    });

    it("formats python code and returns format edits", async function () {
        await harness.openScenario("ace-python-ruff-linter");
        await harness.initAceLinterFlags();
        const page = harness.getPage();

        const before = await page.evaluate(() => window.editor.getValue());
        await page.evaluate(() => {
            window.testFlags.formatResponseReceived = false;
            window.testFlags.formatHasEdits = false;
            const sessionProvider = window.languageProvider.$sessionLanguageProviders[window.editor.session.id];
            sessionProvider.format();
        });

        await harness.waitForFlag("formatResponseReceived");
        await harness.waitForFlag("formatHasEdits");
        const after = await page.evaluate(() => window.editor.getValue());

        expect(after).to.not.equal(before);
        const errors = harness.getConsoleErrors();
        expect(errors, `Console errors: ${errors.join("\n")}`).to.be.empty;
    });
});
