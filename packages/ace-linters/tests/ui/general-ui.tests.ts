import {expect} from "chai";
import * as puppeteer from 'puppeteer';

const opts: puppeteer.PuppeteerLaunchOptions = {
    headless: false,
    slowMo: 0,
    devtools: true
};

describe("General ui tests", function () {
    let browser: puppeteer.Browser;
    let page: puppeteer.Page;
    let errors = [];
    this.timeout(10000);

    function delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }

    before(async function () {
        browser = await puppeteer.launch(opts);
        page = (await browser.pages())[0];
        page.on("console", function(err) {
            if (err.type() == "error" && err.location().url != "http://localhost:8080/favicon.ico")
                errors.push(err.text());
        }).on('pageerror', ({message}) => errors.push(message));
        await page.goto("http://localhost:8080/test.html", {
            waitUntil: 'domcontentloaded',
        });
    });

    it('should not have errors', async function () {
        await page.waitForSelector("#finish");
        expect(errors.length).to.eql(0);
    })

    it('should have annotation', async function () {
        await page.waitForSelector(".ace_error");
        await page.hover(".ace_error");
    })

    it('should show tooltip on hover', async function () {
        await page.waitForSelector(".ace_line > .ace_constant");
        await page.hover(".ace_line > .ace_constant");
        const n = await page.$(".ace_line > .ace_constant")
        const t = await (await n.getProperty('textContent')).jsonValue()
        console.log(t);
    })

    after(async function () {
        await browser.close();
    });
});