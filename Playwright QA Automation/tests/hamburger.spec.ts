import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { InventoryPage } from '../pages/inventory-page';

test.describe('Hamburger Menu Tests', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.waitForLoad();
    await expect(inventoryPage.isOnInventoryPage()).resolves.toBe(true);
  });

  test('should display hamburger menu when clicked', async ({ page }) => {
    // Click on the hamburger menu
    await inventoryPage.clickHamburgerMenu();

    // Verify that the menu is displayed
    expect(await inventoryPage.isHamburgerMenuDisplayed()).toBe(true);
  });

  test('should show menu items in hamburger menu', async ({ page }) => {
    // Click on the hamburger menu
    await inventoryPage.clickHamburgerMenu();

    // Verify menu items are visible
    await expect(page.locator('text=All Items')).toBeVisible();
    await expect(page.locator('text=About')).toBeVisible();
    await expect(page.locator('text=Logout')).toBeVisible();
    await expect(page.locator('text=Reset App State')).toBeVisible();
  });

  test('should click on About and verify visibility', async ({ page }) => {
    // Click on the hamburger menu
    await inventoryPage.clickHamburgerMenu();

    // Verify About menu item is visible in the sidebar
    expect(await inventoryPage.isAboutMenuItemVisible()).toBe(true);

    // Verify the About menu item is displayed
    const aboutMenuItem = page.locator('.bm-menu-wrap').locator('text=About').first();
    await expect(aboutMenuItem).toBeVisible();
  });
});
