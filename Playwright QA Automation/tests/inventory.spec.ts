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

  test('should add second item to cart and validate cart badge updates to 2', async ({ page }) => {
    const firstProduct = 'Sauce Labs Backpack';
    const secondProduct = 'Sauce Labs Bike Light';

    expect(await inventoryPage.getCartItemCount()).toBe(0);

    await inventoryPage.addProductToCart(firstProduct);
    await inventoryPage.addProductToCart(secondProduct);

    await inventoryPage.expectCartItemCount(2);
    await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
    expect(await inventoryPage.getCartItemCount()).toBe(2);
  });

  test('should add third item to cart and validate cart badge updates to 3', async ({ page }) => {
    const firstProduct = 'Sauce Labs Backpack';
    const secondProduct = 'Sauce Labs Bike Light';
    const thirdProduct = 'Sauce Labs Bolt T-Shirt';

    expect(await inventoryPage.getCartItemCount()).toBe(0);

    await inventoryPage.addProductToCart(firstProduct);
    await inventoryPage.addProductToCart(secondProduct);
    await inventoryPage.addProductToCart(thirdProduct);

    await inventoryPage.expectCartItemCount(3);
    await expect(page.locator('.shopping_cart_badge')).toHaveText('3');
    expect(await inventoryPage.getCartItemCount()).toBe(3);
  });

  test('should add fourth item to cart and validate cart badge updates to 4', async ({ page }) => {
    const firstProduct = 'Sauce Labs Backpack';
    const secondProduct = 'Sauce Labs Bike Light';
    const thirdProduct = 'Sauce Labs Bolt T-Shirt';
    const fourthProduct = 'Sauce Labs Fleece Jacket';

    expect(await inventoryPage.getCartItemCount()).toBe(0);

    await inventoryPage.addProductToCart(firstProduct);
    await inventoryPage.addProductToCart(secondProduct);
    await inventoryPage.addProductToCart(thirdProduct);
    await inventoryPage.addProductToCart(fourthProduct);

    await inventoryPage.expectCartItemCount(4);
    await expect(page.locator('.shopping_cart_badge')).toHaveText('4');
    expect(await inventoryPage.getCartItemCount()).toBe(4);
  });

  test('should add fifth item to cart and validate cart badge updates to 5', async ({ page }) => {
    const firstProduct = 'Sauce Labs Backpack';
    const secondProduct = 'Sauce Labs Bike Light';
    const thirdProduct = 'Sauce Labs Bolt T-Shirt';
    const fourthProduct = 'Sauce Labs Fleece Jacket';
    const fifthProduct = 'Sauce Labs Onesie';

    expect(await inventoryPage.getCartItemCount()).toBe(0);

    await inventoryPage.addProductToCart(firstProduct);
    await inventoryPage.addProductToCart(secondProduct);
    await inventoryPage.addProductToCart(thirdProduct);
    await inventoryPage.addProductToCart(fourthProduct);
    await inventoryPage.addProductToCart(fifthProduct);

    await inventoryPage.expectCartItemCount(5);
    await expect(page.locator('.shopping_cart_badge')).toHaveText('5');
    expect(await inventoryPage.getCartItemCount()).toBe(5);
  });

  test('should add sixth item to cart and validate cart badge updates to 6', async ({ page }) => {
    const firstProduct = 'Sauce Labs Backpack';
    const secondProduct = 'Sauce Labs Bike Light';
    const thirdProduct = 'Sauce Labs Bolt T-Shirt';
    const fourthProduct = 'Sauce Labs Fleece Jacket';
    const fifthProduct = 'Sauce Labs Onesie';
    const sixthProduct = 'Test.allTheThings() T-Shirt (Red)';

    expect(await inventoryPage.getCartItemCount()).toBe(0);

    await inventoryPage.addProductToCart(firstProduct);
    await inventoryPage.addProductToCart(secondProduct);
    await inventoryPage.addProductToCart(thirdProduct);
    await inventoryPage.addProductToCart(fourthProduct);
    await inventoryPage.addProductToCart(fifthProduct);
    await inventoryPage.addProductToCart(sixthProduct);

    await inventoryPage.expectCartItemCount(6);
    await expect(page.locator('.shopping_cart_badge')).toHaveText('6');
    expect(await inventoryPage.getCartItemCount()).toBe(6);
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
