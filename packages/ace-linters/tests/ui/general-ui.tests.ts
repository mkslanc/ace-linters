import {expect} from "chai";
import puppeteer, {Browser, Page} from "puppeteer";
import {MessageType} from "../../src/message-types";
import {Ace} from "ace-code";
import {LanguageProvider} from "../../src";
import {yamlContent, yamlSchema} from "./yaml-example";

interface TestFlags {
    isInit: boolean;
    modeChanged: boolean;
    globalOptionsChanged: boolean;
    optionsChanged: boolean;
    changeText: boolean;
}

declare global {
    interface Window {
        testFlags: TestFlags;
        editor: Ace.Editor;
        languageProvider: LanguageProvider;
    }
}


describe("Editor Console Error Tests", function () {
    this.timeout(30000);
    let browser: Browser, page: Page;
    let consoleErrors = [];

    const waitForFlag = async (flag: keyof TestFlags, timeout = 10000) => {
        await page.waitForFunction(
            (flagName) => window.testFlags && window.testFlags[flagName] === true,
            {timeout},
            flag
        );
    };

    before(async function () {
        browser = await puppeteer.launch({headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox']});
        page = await browser.newPage();

        consoleErrors = [];
        page.on("console", (msg) => {
            if (msg.type() === "error") {
                consoleErrors.push(msg.text());
            }
        });
        page.on("pageerror", (error) => {
            consoleErrors.push(error.message);
        });

        await page.goto("http://localhost:8080/test.html", {waitUntil: "domcontentloaded"});
        await page.evaluate(function (msgTypes: typeof MessageType) {
            window.testFlags = {
                isInit: false,
                modeChanged: false,
                globalOptionsChanged: false,
                optionsChanged: false,
                changeText: false,
            };

            window.languageProvider["$messageController"].$worker.addEventListener("message", (e) => {
                const message = e.data;
                switch (message.type as MessageType) {
                    case msgTypes.init:
                        window.testFlags.isInit = true;
                        break;
                    case msgTypes.changeMode:
                        window.testFlags.modeChanged = true;
                        console.log(message.value);
                        break;
                    case msgTypes.globalOptions:
                        window.testFlags.globalOptionsChanged = true;
                        break;
                    case msgTypes.changeOptions:
                        window.testFlags.optionsChanged = true;
                        break;
                }
            });
        }, MessageType);

        await waitForFlag("isInit");
    });

    after(async function () {
        if (browser) {
            await browser.close();
        }
    });

    it("should not produce errors when switching modes (without extra settings)", async function () {

        const modes = [
            "typescript", "json", "css", "html", "yaml", "php", "xml", "javascript", "lua", "less", "scss"
        ];
        for (const mode of modes) {
            // Clear errors for each mode.
            consoleErrors.length = 0;
            console.log(mode);

            await page.evaluate(function (mode) {
                window.testFlags.modeChanged = false;
                window.editor.session.setMode("ace/mode/" + mode);
            }, mode);
            await waitForFlag("modeChanged");
            expect(consoleErrors, `Errors found for mode ${mode}`).to.be.empty;
        }
    });

    it("should not produce critical errors in YAML mode with specific configuration", async function () {
        const yamlOptions = {
            schemas: [
                {
                    uri: "yamlSchema.json",
                    schema: yamlSchema
                }
            ],
        };

        consoleErrors.length = 0;
        await page.evaluate(function (options) {
            window.testFlags.globalOptionsChanged = false;
            window.testFlags.modeChanged = false;
            window.editor.session.setMode("ace/mode/yaml");
            window.languageProvider.setGlobalOptions("yaml", options);
        }, yamlOptions);

        await waitForFlag("globalOptionsChanged");

        await page.evaluate(function () {
            window.testFlags.optionsChanged = false;
            window.languageProvider.setSessionOptions(window.editor.session, {schemaUri: "yamlSchema.json"});
        });

        await waitForFlag("optionsChanged");

        await page.evaluate(function (content) {
            window.editor.setValue(content);
            window.editor.clearSelection();
        }, yamlContent)

        await new Promise(r => setTimeout(r, 1000));

        await page.hover(".ace_meta.ace_tag:first-of-type");

        await new Promise(r => setTimeout(r, 2000));

        expect(consoleErrors, "Critical errors in YAML mode").to.be.empty;
    });

    it("should handle typescript autocompletion correctly for different cases", async function () {
        await page.evaluate(() => {
            window.testFlags.modeChanged = false;
            window.editor.session.setMode("ace/mode/typescript");
            window.editor.setValue("");
        });
        await waitForFlag("modeChanged");

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
        await new Promise(r => setTimeout(r, 100));
        await page.keyboard.press("Enter");

        const result = await page.evaluate(() => window.editor.getValue().trim());
        expect(result, "Autocompletion result").to.equal(`class A {
    "with-dashes" = 2;
};

let a = new A();
a.["with-dashes"]`);

    });

});
