import { Page } from '@playwright/test';

export class LoginPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Locators
  private usernameInput = '#user-name';
  private passwordInput = '#password';
  private loginButton = '#login-button';
  private errorMessage = '[data-test="error"]';

  // Actions
  async goto() {
    await this.page.goto('/');
  }

  async enterUsername(username: string) {
    await this.page.fill(this.usernameInput, username);
  }

  async enterPassword(password: string) {
    await this.page.fill(this.passwordInput, password);
  }

  async clickLogin() {
    await this.page.click(this.loginButton);
  }

  async login(username: string, password: string) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLogin();
  }

  // Assertions
  async isErrorMessageVisible(): Promise<boolean> {
    return await this.page.isVisible(this.errorMessage);
  }

  async getErrorMessage(): Promise<string> {
    return await this.page.textContent(this.errorMessage) || '';
  }

  async isOnInventoryPage(): Promise<boolean> {
    return this.page.url().includes('/inventory.html');
  }
}