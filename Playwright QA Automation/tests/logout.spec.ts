import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { InventoryPage } from '../pages/inventory-page';

test.describe('Logout Tests', () => {
  test('should log out from the hamburger menu', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    await inventoryPage.waitForLoad();
    await expect(inventoryPage.isOnInventoryPage()).resolves.toBe(true);

    await inventoryPage.clickHamburgerMenu();
    await expect(inventoryPage.isHamburgerMenuDisplayed()).resolves.toBe(true);

    await Promise.all([
      page.waitForNavigation(),
      inventoryPage.clickLogout(),
    ]);

    await expect(loginPage.isOnLoginPage()).resolves.toBe(true);
    await expect(page).toHaveURL(/https:\/\/www\.saucedemo\.com\/$/);
    await expect(page.locator('#user-name')).toBeVisible();
    await expect(page.locator('#password')).toBeVisible();
    await expect(page.locator('#login-button')).toBeVisible();
    await expect(page.locator('#user-name')).toHaveValue('');
    await expect(page.locator('#password')).toHaveValue('');
  });
});
