import puppeteer, {Browser, Page} from "puppeteer";
import type {UiTestFlags} from "./types";

export const MessageType = {
    init: 0,
    format: 1,
    validate: 6,
    changeMode: 8,
    changeOptions: 9,
    globalOptions: 11,
} as const;

export function createUiHarness() {
    let browser: Browser;
    let page: Page;
    let consoleErrors: string[] = [];

    const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    async function start() {
        browser = await puppeteer.launch({headless: true, args: ["--no-sandbox", "--disable-setuid-sandbox"]});
        page = await browser.newPage();
    }

    async function stop() {
        if (browser) {
            await browser.close();
        }
    }

    function getPage() {
        return page;
    }

    function clearConsoleErrors() {
        consoleErrors.length = 0;
    }

    function getConsoleErrors() {
        return [...consoleErrors];
    }

    async function openScenario(scenarioName: string, query = "") {
        clearConsoleErrors();
        page.removeAllListeners("console");
        page.removeAllListeners("pageerror");

        page.on("console", (msg) => {
            if (msg.type() === "error") {
                consoleErrors.push(msg.text());
            }
        });
        page.on("pageerror", (error) => {
            consoleErrors.push(error.message);
        });

        const querySuffix = query ? `?${query}` : "";
        await page.goto(`http://127.0.0.1:8080/${scenarioName}.html${querySuffix}`, {
            waitUntil: "domcontentloaded",
        });
    }

    async function waitForFlag(flag: keyof UiTestFlags, timeout = 15000) {
        await page.waitForFunction(
            (flagName) => (window as any).testFlags && (window as any).testFlags[flagName] === true,
            {timeout},
            flag
        );
    }

    async function switchMode(mode: string, timeout = 15000) {
        const currentModeId = await page.evaluate(() => {
            return (window as any).editor?.session?.getMode?.()?.$id || "";
        });
        if (currentModeId === `ace/mode/${mode}`) {
            return;
        }
        await page.evaluate((targetMode) => {
            window.testFlags.modeChanged = false;
            window.editor.session.setMode(`ace/mode/${targetMode}`);
        }, mode);
        await waitForFlag("modeChanged", timeout);
    }

    async function initAceLinterFlags() {
        await page.evaluate((msgTypes: typeof MessageType) => {
            window.testFlags = {
                ...(window.testFlags || {}),
                isInit: false,
                modeChanged: false,
                globalOptionsChanged: false,
                optionsChanged: false,
                validateReceived: false,
                validateCount: 0,
                diagnosticsCount: 0,
                hasDiagnostics: false,
                formatResponseReceived: false,
                formatHasEdits: false,
            };

            window.languageProvider["$messageController"].$worker.addEventListener("message", (e: any) => {
                const message = e.data;
                switch (message.type) {
                    case msgTypes.init:
                        window.testFlags.isInit = true;
                        break;
                    case msgTypes.changeMode:
                        window.testFlags.modeChanged = true;
                        break;
                    case msgTypes.globalOptions:
                        window.testFlags.globalOptionsChanged = true;
                        break;
                    case msgTypes.changeOptions:
                        window.testFlags.optionsChanged = true;
                        break;
                    case msgTypes.validate:
                        window.testFlags.validateReceived = true;
                        window.testFlags.validateCount = (window.testFlags.validateCount || 0) + 1;
                        window.testFlags.diagnosticsCount = Array.isArray(message.value) ? message.value.length : 0;
                        if (window.testFlags.diagnosticsCount > 0) {
                            window.testFlags.hasDiagnostics = true;
                        }
                        break;
                    case msgTypes.format:
                        window.testFlags.formatResponseReceived = true;
                        if (Array.isArray(message.value) && message.value.length > 0) {
                            window.testFlags.formatHasEdits = true;
                        }
                        break;
                }
            });
        }, MessageType);

        await waitForFlag("isInit");
    }

    return {
        start,
        stop,
        sleep,
        getPage,
        openScenario,
        waitForFlag,
        switchMode,
        initAceLinterFlags,
        clearConsoleErrors,
        getConsoleErrors,
    };
}
