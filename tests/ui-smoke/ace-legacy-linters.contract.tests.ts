import {expect} from "chai";
import {createUiHarness} from "./shared/harness";
import {phpContent} from "./fixtures/php";
import {luaContent} from "./fixtures/lua";
import {htmlContent} from "./fixtures/html";
import {jsonContent} from "./fixtures/json";
import {cssContent} from "./fixtures/css";
import {lessContent} from "./fixtures/less";
import {scssContent} from "./fixtures/scss";
import {xmlContent} from "./fixtures/xml";
import {yamlContent} from "./fixtures/yaml";
import {javascriptContent} from "./fixtures/javascript";
import {jsxContent} from "./fixtures/jsx";

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
            {
                mode: "json",
                content: jsonContent,
                label: "JSON",
            },
            {
                mode: "css",
                content: cssContent,
                label: "CSS",
            },
            {
                mode: "less",
                content: lessContent,
                label: "LESS",
            },
            {
                mode: "scss",
                content: scssContent,
                label: "SCSS",
            },
            {
                mode: "xml",
                content: xmlContent,
                label: "XML",
            },
            {
                mode: "yaml",
                content: yamlContent,
                label: "YAML",
            },
            {
                mode: "javascript",
                content: javascriptContent,
                label: "JavaScript",
            },
            {
                mode: "jsx",
                content: jsxContent,
                label: "JSX",
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
