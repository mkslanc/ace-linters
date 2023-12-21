import {expect} from "chai";
import * as puppeteer from 'puppeteer';

const opts: puppeteer.PuppeteerLaunchOptions = {
    headless: "new",
    slowMo: 0,
    devtools: false
};

describe("General ui tests", function () {
    let browser: puppeteer.Browser;
    let page: puppeteer.Page;
    let errors = [];

    before(async function () {
        this.timeout(10000);
        browser = await puppeteer.launch(opts);
        page = (await browser.pages())[0];
        page.on("console", function(err) {
            if (err.type() == "error" && err.location().url != "http://localhost:8080/favicon.ico")
                errors.push(err.text());
        }).on('pageerror', ({message}) => errors.push(message));
        await page.goto("http://localhost:8080/test.html", {
            timeout: 10000,
            waitUntil: 'domcontentloaded',
        });
    });

    it('should not have errors', async function () {
        this.timeout(10000);
        await page.waitForSelector("#finish");
        expect(errors.length).to.eql(0);
    })

    after(async function () {
        await browser.close();
    });
});
