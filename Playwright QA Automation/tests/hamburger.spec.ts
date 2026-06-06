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
    // Click on the hamburger menu Arjun
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

  test('should navigate to About page when About menu item is clicked', async ({ page }) => {
    // Click on the hamburger menu
    await inventoryPage.clickHamburgerMenu();

    // Verify About menu item is visible
    await expect(inventoryPage.isAboutMenuItemVisible()).resolves.toBe(true);

    // Click About menu item - this navigates to external Sauce Labs page
    await Promise.all([
      page.waitForNavigation(),
      inventoryPage.clickAbout(),
    ]);

    // Verify that navigation happened to Sauce Labs
    expect(page.url()).toContain('saucelabs.com');
  });

  test('should stay on inventory and clear cart when All Items is clicked', async ({ page }) => {
    // Add an item to cart to ensure we're still on inventory
    await inventoryPage.addProductToCart('Sauce Labs Backpack');

    // Verify item was added
    const cartCount = await inventoryPage.getCartItemCount();
    expect(cartCount).toBe(1);

    // Click on the hamburger menu
    await inventoryPage.clickHamburgerMenu();

    // Verify menu is displayed
    expect(await inventoryPage.isHamburgerMenuDisplayed()).toBe(true);

    // Click All Items
    await inventoryPage.clickAllItems();

    // Verify we are still on inventory page
    await expect(inventoryPage.isOnInventoryPage()).resolves.toBe(true);

    // Verify the item is still in cart (cart state preserved)
    const updatedCartCount = await inventoryPage.getCartItemCount();
    expect(updatedCartCount).toBe(1);
  });

  test('should logout when Logout menu item is clicked', async ({ page }) => {
    // Click on the hamburger menu
    await inventoryPage.clickHamburgerMenu();

    // Verify menu is displayed
    expect(await inventoryPage.isHamburgerMenuDisplayed()).toBe(true);

    // Click Logout
    await Promise.all([
      page.waitForNavigation(),
      inventoryPage.clickLogout(),
    ]);

    // Verify we are on login page
    await expect(loginPage.isOnLoginPage()).resolves.toBe(true);

    // Verify login inputs are visible
    await expect(page.locator('#user-name')).toBeVisible();
    await expect(page.locator('#password')).toBeVisible();
    await expect(page.locator('#login-button')).toBeVisible();
  });

  test('should reset app state and clear cart when Reset App State is clicked', async ({ page }) => {
    // Add multiple items to cart
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await inventoryPage.addProductToCart('Sauce Labs Bike Light');

    // Verify items were added (cart count = 2)
    let cartCount = await inventoryPage.getCartItemCount();
    expect(cartCount).toBe(2);

    // Click on the hamburger menu
    await inventoryPage.clickHamburgerMenu();

    // Verify menu is displayed
    expect(await inventoryPage.isHamburgerMenuDisplayed()).toBe(true);

    // Click Reset App State
    await inventoryPage.clickResetAppState();

    // Close the menu to check cart state properly
    await inventoryPage.closeHamburgerMenu();

    // Verify we are still on inventory page
    await expect(inventoryPage.isOnInventoryPage()).resolves.toBe(true);

    // Verify cart count is reset to 0
    cartCount = await inventoryPage.getCartItemCount();
    expect(cartCount).toBe(0);
  });

  test('should close hamburger menu when close button is clicked', async ({ page }) => {
    // Click on the hamburger menu
    await inventoryPage.clickHamburgerMenu();

    // Verify menu is displayed
    expect(await inventoryPage.isHamburgerMenuDisplayed()).toBe(true);

    // Verify close button exists
    const closeButton = page.locator('.bm-cross-button');
    await expect(closeButton).toBeVisible();

    // Click close button
    await closeButton.click();

    // Wait a moment for the menu to close
    await page.waitForTimeout(500);

    // Verify we are still on inventory page
    await expect(inventoryPage.isOnInventoryPage()).resolves.toBe(true);
  });
});
