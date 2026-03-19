import {expect} from "chai";
import {createUiHarness} from "./shared/harness";
import {phpContent} from "./fixtures/php";
import {luaContent} from "./fixtures/lua";
import {htmlContent} from "./fixtures/html";

describe("ace-legacy-linters UI contract tests", function () {
    this.timeout(40000);
    const harness = createUiHarness();

    before(async function () {
        await harness.start();
    });

    after(async function () {
        await harness.stop();
    });

    it("uses the custom workers replacements with ace-builds", async function () {
        await harness.openScenario("ace-legacy-linters");
        const page = harness.getPage();

        const cases = [
            {
                mode: "php",
                content: phpContent,
                label: "PHP",
            },
            {
                mode: "lua",
                content: luaContent,
                label: "Lua",
            },
            {
                mode: "html",
                content: htmlContent,
                label: "HTML",
            },
        ];

        for (const testCase of cases) {
            harness.clearConsoleErrors();
            await harness.switchMode(testCase.mode);
            await page.evaluate((content) => {
                window.testFlags.workerReady = false;
                window.testFlags.hasAnnotations = false;
                window.editor.setValue(content);
                window.editor.clearSelection();
            }, testCase.content);

            await harness.waitForFlag("workerReady");
            await harness.waitForFlag("hasAnnotations");

            const annotations = await page.evaluate(() => window.editor.session.getAnnotations());
            expect(annotations, `${testCase.label} worker annotations`).to.be.an("array").that.is.not.empty;

            const errors = harness.getConsoleErrors();
            expect(errors, `Console errors for ${testCase.label}: ${errors.join("\n")}`).to.be.empty;
        }
    });
});
