import {expect} from "chai";
import {createUiHarness} from "./shared/harness";
import {phpContent} from "./fixtures/php";

describe("ace-legacy-linters UI contract tests", function () {
    this.timeout(40000);
    const harness = createUiHarness();

    before(async function () {
        await harness.start();
    });

    after(async function () {
        await harness.stop();
    });

    it("uses the custom src-noconflict php worker with ace-builds", async function () {
        await harness.openScenario("ace-legacy-linters");
        const page = harness.getPage();

        await page.evaluate((content) => {
            window.testFlags.workerReady = false;
            window.testFlags.hasAnnotations = false;
            window.editor.setValue(content);
            window.editor.clearSelection();
        }, phpContent);

        await harness.waitForFlag("workerReady");
        await harness.waitForFlag("hasAnnotations");

        const annotations = await page.evaluate(() => window.editor.session.getAnnotations());

        expect(annotations, "PHP worker annotations").to.be.an("array").that.is.not.empty;

        const errors = harness.getConsoleErrors();
        expect(errors, `Console errors: ${errors.join("\n")}`).to.be.empty;
    });
});
