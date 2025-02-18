import { expect } from "chai";
import * as puppeteer from 'puppeteer';

const launchOptions: puppeteer.PuppeteerLaunchOptions = {
    headless: true,
    devtools: false,
};

describe("General UI Tests", function () {
    this.timeout(30000);

    let browser: puppeteer.Browser;
    let page: puppeteer.Page;
    const consoleErrors: string[] = [];

    before(async function () {
        browser = await puppeteer.launch(launchOptions);
        page = (await browser.pages())[0];

        page.on("console", (msg) => {
            if (msg.type() === "error" && msg.location().url !== "http://localhost:8080/favicon.ico") {
                consoleErrors.push(msg.text());
            }
        });
        page.on('pageerror', (error) => consoleErrors.push(error.message));

        try {
            await page.goto("http://localhost:8080/test.html", {
                timeout: 30000,
                waitUntil: 'domcontentloaded',
            });
        } catch (error) {
            console.error("Navigation error:", error);
            throw error;
        }
    });

    it('should not have errors', async function () {
        await page.waitForSelector("#finish", { timeout: 30000 });
        expect(consoleErrors).to.be.empty;
    });

    after(async function () {
        await browser.close();
    });
});
