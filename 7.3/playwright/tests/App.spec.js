const { test, expect } = require("@playwright/test");
const { email, password } = require("../user");

test("Успешная авторизация", async ({ page }) => {
  await page.goto("https://netology.ru/?modal=sign_in");

  const loginByEmailButton = page.locator('div.styles_button__MYGdj', { hasText: 'Войти по почте' });
  await loginByEmailButton.waitFor({ state: 'visible', timeout: 15000 });
  await loginByEmailButton.click();

  const emailInput = page.locator('input[placeholder="Email"]');
  const passwordInput = page.locator('input[name="password"]');
  await emailInput.waitFor({ state: 'visible', timeout: 10000 });
  await passwordInput.waitFor({ state: 'visible', timeout: 10000 });

  await emailInput.fill(email);
  await passwordInput.fill(password);

  const submitButton = page.locator('button[data-testid="login-submit-btn"]');
  await submitButton.waitFor({ state: 'visible', timeout: 5000 });
  await submitButton.click();

  // await expect(page).toHaveURL(/profile/);
  // await expect(page.locator("h2")).toBeVisible();
});

test("Неуспешная авторизация", async ({ page }) => {
  await page.goto("https://netology.ru/?modal=sign_in");

  const loginByEmailButton = page.locator('div.styles_button__MYGdj', { hasText: 'Войти по почте' });
  await loginByEmailButton.waitFor({ state: 'visible', timeout: 15000 });
  await loginByEmailButton.click();

  const emailInput = page.locator('input[placeholder="Email"]');
  const passwordInput = page.locator('input[name="password"]');
  await emailInput.waitFor({ state: 'visible', timeout: 10000 });
  await passwordInput.waitFor({ state: 'visible', timeout: 10000 });

  await emailInput.fill("12345");
  await passwordInput.focus(); 

  const errorMessage = page.locator('div.Input_error__R_3Gz > span', { hasText: 'Неверный email' });
  await expect(errorMessage).toBeVisible();

 
  // await passwordInput.fill("любое_значение");
  // await page.locator('button[data-testid="login-submit-btn"]').click();
});