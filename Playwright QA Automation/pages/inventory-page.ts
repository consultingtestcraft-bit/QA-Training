import { Page, expect } from '@playwright/test';

export class InventoryPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Locators
  private inventoryTitle = '.title';
  private inventoryItems = '.inventory_item';
  private shoppingCartBadge = '.shopping_cart_badge';
  private cartLink = '.shopping_cart_link';
  private hamburgerMenu = '.bm-burger-button';
  private sidebarMenu = '.bm-menu-wrap';
  private aboutLink = '[href*="about"]';

  private inventoryItemLocator(productName: string) {
    return this.page.locator('.inventory_item', {
      has: this.page.locator('.inventory_item_name', { hasText: productName }),
    });
  }

  async addProductToCart(productName: string) {
    console.log('InventoryPage.addProductToCart:', productName);
    await this.inventoryItemLocator(productName)
      .locator('button', { hasText: 'Add to cart' })
      .click();
  }

  async removeProductFromCart(productName: string) {
    await this.inventoryItemLocator(productName)
      .locator('button', { hasText: 'Remove' })
      .click();
  }

  async waitForLoad() {
    await expect(this.page.locator(this.inventoryTitle)).toHaveText('Products');
  }

  async getProductCount(): Promise<number> {
    return await this.page.locator(this.inventoryItems).count();
  }

  async getCartItemCount(): Promise<number> {
    if (!(await this.page.isVisible(this.shoppingCartBadge))) {
      return 0;
    }
    const countText = await this.page.textContent(this.shoppingCartBadge);
    return countText ? Number(countText) : 0;
  }

  async goToCart() {
    await this.page.click(this.cartLink);
  }

  async isOnInventoryPage(): Promise<boolean> {
    return this.page.url().includes('/inventory.html');
  }

  async clickHamburgerMenu() {
    console.log('InventoryPage.clickHamburgerMenu');
    await this.page.click(this.hamburgerMenu);
  }

  async isHamburgerMenuDisplayed(): Promise<boolean> {
    return await this.page.isVisible(this.sidebarMenu);
  }

  async clickAbout() {
    console.log('InventoryPage.clickAbout');
    // Click the About link in the sidebar menu
    const aboutElement = this.page.locator('.bm-menu-wrap').locator('text=About').first();
    await aboutElement.click();
  }

  async isAboutMenuItemVisible(): Promise<boolean> {
    const aboutElement = this.page.locator('.bm-menu-wrap').locator('text=About');
    return await aboutElement.isVisible();
  }

  async isAboutMenuItemHighlighted(): Promise<boolean> {
    const aboutElement = this.page.locator('.bm-menu-wrap').locator('text=About');
    const classes = await aboutElement.evaluate((el) => el.className);
    return classes.includes('active') || classes.includes('selected');
  }

  async closeHamburgerMenu() {
    console.log('InventoryPage.closeHamburgerMenu');
    await this.page.click('.bm-cross-button');
  }
}
