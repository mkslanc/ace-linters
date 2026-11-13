import {expect} from "chai";
import {createUiHarness} from "./shared/harness";

describe("AceSpellCheck LaTeX", function () {
    this.timeout(40000);
    const harness = createUiHarness();

    before(async function () {
        await harness.start();
    });

    after(async function () {
        await harness.stop();
    });

    beforeEach(async function () {
        await harness.openScenario("ace-spell-check");
        await harness.initAceLinterFlags();
        await harness.switchMode("latex");
    });

    async function validate(text: string): Promise<{text?: string}[]> {
        await harness.getPage().evaluate((value) => {
            window.testFlags.validateReceived = false;
            window.editor.setValue(value);
            window.editor.clearSelection();
        }, text);
        await harness.waitForFlag("validateReceived", 30000);
        await harness.sleep(100);
        return harness.getPage().evaluate(() => window.editor.session.getAnnotations());
    }

    it("reports spelling errors with the generated LaTeX settings", async function () {
        const annotations = await validate("Thiss sentencea hass a typo.");
        expect(annotations.map((annotation) => annotation.text)).to.have.members([
            "Typo in word: `Thiss`",
            "Typo in word: `sentencea`",
            "Typo in word: `hass`",
        ]);
        expect(harness.getConsoleErrors()).to.be.empty;
    });

    it("applies accent substitutions while continuing to report typos", async function () {
        await harness.getPage().evaluate(() => {
            window.testFlags.globalOptionsChanged = false;
            window.languageProvider.setGlobalOptions("ace-spell-check", {
                spellCheckOptions: {words: ["codéxword"]},
            });
        });
        await harness.waitForFlag("globalOptionsChanged");

        const annotations = await validate("cod\\'exword Thiss");
        expect(annotations.map((annotation) => annotation.text)).to.deep.equal([
            "Typo in word: `Thiss`",
        ]);
        expect(harness.getConsoleErrors()).to.be.empty;
    });
});
