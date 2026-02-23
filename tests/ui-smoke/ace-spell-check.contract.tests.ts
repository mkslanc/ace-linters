import {expect} from "chai";
import {createUiHarness} from "./shared/harness";

describe("ace-spell-check UI contract tests", function () {
    this.timeout(40000);
    const harness = createUiHarness();

    before(async function () {
        await harness.start();
    });

    after(async function () {
        await harness.stop();
    });

    it("emits diagnostics via validate messages", async function () {
        await harness.openScenario("ace-spell-check");
        await harness.initAceLinterFlags();
        const page = harness.getPage();

        await page.evaluate(() => {
            window.testFlags.validateReceived = false;
            window.testFlags.diagnosticsCount = 0;
            window.testFlags.hasDiagnostics = false;
            window.editor.setValue("zzzxxyyqqq");
            window.editor.clearSelection();
        });

        await harness.waitForFlag("hasDiagnostics");
        const errors = harness.getConsoleErrors();
        expect(errors, `Console errors: ${errors.join("\n")}`).to.be.empty;
    });
});
