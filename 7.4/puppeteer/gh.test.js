const puppeteer = require("puppeteer");

let browser;
let page;

beforeEach(async () => {
  browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized"]
  });
  page = await browser.newPage();
});

afterEach(async () => {
  if (page) {
    await page.close();
  }
  if (browser) {
    await browser.close();
  }
});


describe("Github main page tests", () => {

  beforeEach(async () => {
    await page.goto("https://github.com/team", {
      waitUntil: "networkidle2",
    });
  });

  test("The h1 header content", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();

    await page.waitForSelector("h1");

    const title2 = await page.title();
    expect(title2).toContain("GitHub");
  }, 30000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", link =>
      link.getAttribute("href")
    );
    expect(actual).toBeTruthy();
  }, 15000);

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-mktg";

    await page.waitForSelector(btnSelector, { visible: true });
    const actual = await page.$eval(
      btnSelector,
      el => el.textContent.trim()
    );

    expect(actual.length).toBeGreaterThan(0);
  }, 20000);

});


describe("Github other pages header tests", () => {

  beforeEach(async () => {
    await page.goto("https://github.com/features", {
      waitUntil: "networkidle2",
    });
  });

  test("Features page header", async () => {
    const title = await page.title();
    expect(title).toContain("Features");
  }, 20000);

  test("Enterprise page header", async () => {
    await page.goto("https://github.com/enterprise", {
      waitUntil: "networkidle2",
    });
    const title = await page.title();
    expect(title).toContain("Enterprise");
  }, 20000);

  test("Explore page header", async () => {
    await page.goto("https://github.com/explore", {
      waitUntil: "networkidle2",
    });
    const title = await page.title();
    expect(title).toContain("Explore");
  }, 20000);

});