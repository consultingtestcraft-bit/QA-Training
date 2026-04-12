import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { InventoryPage } from '../pages/inventory-page';

test.describe('Inventory Page Tests', () => {
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

  test('should display inventory products', async ({ page }) => {
    expect(await inventoryPage.getProductCount()).toBeGreaterThan(0);
    await expect(page.locator('.inventory_item_name')).toHaveText([
      'Sauce Labs Backpack',
      'Sauce Labs Bike Light',
      'Sauce Labs Bolt T-Shirt',
      'Sauce Labs Fleece Jacket',
      'Sauce Labs Onesie',
      'Test.allTheThings() T-Shirt (Red)',
    ]);
  });

  test('should add one item to the cart and validate cart badge updates to 1', async ({ page }) => {
    const productName = 'Sauce Labs Backpack';

    expect(await inventoryPage.getCartItemCount()).toBe(0);
    await inventoryPage.addProductToCart(productName);

    await inventoryPage.expectCartItemCount(1);
    expect(await inventoryPage.getCartItemCount()).toBe(1);
  });

  test('should add and remove item in cart', async ({ page }) => {
    const productName = 'Sauce Labs Backpack';

    expect(await inventoryPage.getCartItemCount()).toBe(0);
    await inventoryPage.addProductToCart(productName);

    // Explicit cart assertions
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
    expect(await inventoryPage.getCartItemCount()).toBe(1);

    await inventoryPage.removeProductFromCart(productName);
    await expect(page.locator('.shopping_cart_badge')).toBeHidden();
    expect(await inventoryPage.getCartItemCount()).toBe(0);
  });

  test('should navigate to cart from inventory', async ({ page }) => {
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await inventoryPage.goToCart();
    await expect(page).toHaveURL(/.*cart.html/);
    await expect(page.locator('.cart_item')).toBeVisible();
  });
});
