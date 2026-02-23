import {expect} from "chai";
import {createUiHarness} from "./shared/harness";

describe("ace-dart-linter UI contract tests", function () {
    this.timeout(40000);
    const harness = createUiHarness();

    before(async function () {
        await harness.start();
    });

    after(async function () {
        await harness.stop();
    });

    it("formats dart code and returns format edits", async function () {
        await harness.openScenario("ace-dart-linter");
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
