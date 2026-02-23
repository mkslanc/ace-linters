import {expect} from "chai";
import {createUiHarness} from "./shared/harness";

describe("ace-clang-linter UI contract tests", function () {
    this.timeout(40000);
    const harness = createUiHarness();

    before(async function () {
        await harness.start();
    });

    after(async function () {
        await harness.stop();
    });

    it("formats c/cpp code and returns non-empty format edits", async function () {
        await harness.openScenario("ace-clang-linter");
        await harness.initAceLinterFlags();
        const page = harness.getPage();

        await page.evaluate(() => {
            window.testFlags.formatResponseReceived = false;
            window.testFlags.formatHasEdits = false;
            window.editor.setValue("int   main(){return 0;}");
            window.editor.clearSelection();
            const sessionProvider = window.languageProvider.$sessionLanguageProviders[window.editor.session.id];
            sessionProvider.format();
        });

        await harness.waitForFlag("formatResponseReceived");
        await harness.waitForFlag("formatHasEdits");

        const formatted = await page.evaluate(() => window.editor.getValue());
        expect(formatted).to.contain("int main()");
        expect(formatted).to.contain("return 0;");

        const errors = harness.getConsoleErrors();
        expect(errors, `Console errors: ${errors.join("\n")}`).to.be.empty;
    });
});
