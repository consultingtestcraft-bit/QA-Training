import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { InventoryPage } from '../pages/inventory-page';

test.describe('Name Dropdown Sorting Tests', () => {
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

  test('should sort products A to Z by name', async () => {
    console.log('Test: Sort products A to Z');
    
    // Select Name (A to Z) option
    await inventoryPage.selectSortOption('Name (A to Z)');
    
    // Get product names after sorting
    const productNames = await inventoryPage.getProductNames();
    
    // Create a sorted copy to compare
    const sortedNames = [...productNames].sort((a, b) => a.localeCompare(b));
    
    // Validate that products are sorted A to Z
    expect(productNames).toEqual(sortedNames);
    console.log('✓ Products are sorted A to Z:', productNames);
  });

  test('should sort products Z to A by name', async () => {
    console.log('Test: Sort products Z to A');
    
    // Select Name (Z to A) option
    await inventoryPage.selectSortOption('Name (Z to A)');
    
    // Get product names after sorting
    const productNames = await inventoryPage.getProductNames();
    
    // Create a reverse sorted copy to compare
    const sortedNames = [...productNames].sort((a, b) => b.localeCompare(a));
    
    // Validate that products are sorted Z to A
    expect(productNames).toEqual(sortedNames);
    console.log('✓ Products are sorted Z to A:', productNames);
  });

  test('should sort products by price low to high', async () => {
    console.log('Test: Sort products by price (low to high)');
    
    // Select Price (low to high) option
    await inventoryPage.selectSortOption('Price (low to high)');
    
    // Get product prices after sorting
    const prices = await inventoryPage.getProductPrices();
    
    // Create a sorted copy to compare
    const sortedPrices = [...prices].sort((a, b) => a - b);
    
    // Validate that products are sorted by price low to high
    expect(prices).toEqual(sortedPrices);
    console.log('✓ Products are sorted by price (low to high):', prices);
  });

  test('should sort products by price high to low', async () => {
    console.log('Test: Sort products by price (high to low)');
    
    // Select Price (high to low) option
    await inventoryPage.selectSortOption('Price (high to low)');
    
    // Get product prices after sorting
    const prices = await inventoryPage.getProductPrices();
    
    // Create a reverse sorted copy to compare
    const sortedPrices = [...prices].sort((a, b) => b - a);
    
    // Validate that products are sorted by price high to low
    expect(prices).toEqual(sortedPrices);
    console.log('✓ Products are sorted by price (high to low):', prices);
  });
});
