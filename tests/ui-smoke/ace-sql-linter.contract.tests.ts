import {expect} from "chai";
import {createUiHarness} from "./shared/harness";

describe("ace-sql-linter UI contract tests", function () {
    this.timeout(40000);
    const harness = createUiHarness();

    before(async function () {
        await harness.start();
    });

    after(async function () {
        await harness.stop();
    });

    it("emits diagnostics for all supported SQL dialect services", async function () {
        const dialects = ["mysql", "pgsql", "flinksql", "sparksql", "hivesql", "trinosql", "impalasql"];
        for (const dialect of dialects) {
            await harness.openScenario("ace-sql-linter", `dialect=${dialect}`);
            await harness.initAceLinterFlags();
            const page = harness.getPage();
            await page.evaluate(() => {
                window.testFlags.validateReceived = false;
                window.testFlags.diagnosticsCount = 0;
                window.testFlags.hasDiagnostics = false;
                window.editor.setValue("SELEC FROM");
                window.editor.clearSelection();
            });
            await harness.waitForFlag("hasDiagnostics");
        }

        const errors = harness.getConsoleErrors();
        expect(errors, `Console errors: ${errors.join("\n")}`).to.be.empty;
    });
});
