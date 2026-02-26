let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("https://github.com/team", {
    waitUntil: "networkidle2",
  });
});

afterEach(async () => {
  if (page) {
    await page.close();
  }
});

describe("Github page tests", () => {

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

    await page.waitForSelector(btnSelector, {
      visible: true,
    });

    const actual = await page.$eval(
      btnSelector,
      el => el.textContent.trim()
    );

    expect(actual.length).toBeGreaterThan(0);

  }, 20000);

});