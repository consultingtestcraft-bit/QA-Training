import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';

test.describe('Login Tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('should login with standard user', async ({ page }) => {
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/.*inventory\.html/);
  });

  test('should show error for locked out user', async ({ page }) => {
    await loginPage.login('locked_out_user', 'secret_sauce');
    expect(await loginPage.isErrorMessageVisible()).toBe(true);
    expect(await loginPage.getErrorMessage()).toContain('locked out');
  });

  test('should show error for invalid credentials', async ({ page }) => {
    await loginPage.login('invalid_user', 'wrong_password');
    expect(await loginPage.isErrorMessageVisible()).toBe(true);
  });

  test('should display the login page UI elements and guidance text', async ({ page }) => {
    await expect(loginPage.isLogoVisible()).resolves.toBe(true);
    await expect(loginPage.isUsernameInputVisible()).resolves.toBe(true);
    await expect(loginPage.isPasswordInputVisible()).resolves.toBe(true);
    await expect(loginPage.isLoginButtonVisible()).resolves.toBe(true);

    const guidanceText = await loginPage.getGuidanceText();
    expect(guidanceText).toContain('Accepted usernames are:');
    expect(guidanceText).toContain('Password for all users:');
    expect(guidanceText).toContain('secret_sauce');
    await expect(page.locator('text=Accepted usernames are:')).toBeVisible();
    await expect(page.locator('text=Password for all users:')).toBeVisible();
  });

  // Add more tests for other users if needed
  test('should login with problem user', async ({ page }) => {
    await loginPage.login('problem_user', 'secret_sauce');
    await expect(page).toHaveURL(/.*inventory\.html/);
  });

  test('should login with performance glitch user', async ({ page }) => {
    await loginPage.login('performance_glitch_user', 'secret_sauce');
    await expect(page).toHaveURL(/.*inventory\.html/);
  });

  test('should login with error user', async ({ page }) => {
    await loginPage.login('error_user', 'secret_sauce');
    await expect(page).toHaveURL(/.*inventory\.html/);
  });

  test('should login with visual user', async ({ page }) => {
    await loginPage.login('visual_user', 'secret_sauce');
    await expect(page).toHaveURL(/.*inventory\.html/);
  });
});