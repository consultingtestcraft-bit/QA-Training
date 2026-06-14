import { Page } from '@playwright/test';

export class LoginPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Locators
  private logo = '.login_logo';
  private usernameInput = '#user-name';
  private passwordInput = '#password';
  private loginButton = '#login-button';
  private errorMessage = '[data-test="error"]';
  private credentialsBlock = '.login_credentials';

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
  async isLogoVisible(): Promise<boolean> {
    return await this.page.isVisible(this.logo);
  }

  async isUsernameInputVisible(): Promise<boolean> {
    return await this.page.isVisible(this.usernameInput);
  }

  async isPasswordInputVisible(): Promise<boolean> {
    return await this.page.isVisible(this.passwordInput);
  }

  async isLoginButtonVisible(): Promise<boolean> {
    return await this.page.isVisible(this.loginButton);
  }

  async getGuidanceText(): Promise<string> {
    return await this.page.locator('body').textContent() || '';
  }

  async isErrorMessageVisible(): Promise<boolean> {
    return await this.page.isVisible(this.errorMessage);
  }

  async getErrorMessage(): Promise<string> {
    return await this.page.textContent(this.errorMessage) || '';
  }

  async isOnInventoryPage(): Promise<boolean> {
    return this.page.url().includes('/inventory.html');
  }

  async isOnLoginPage(): Promise<boolean> {
    return this.page.url().includes('/index.html') || !this.page.url().includes('/inventory.html');
  }
}