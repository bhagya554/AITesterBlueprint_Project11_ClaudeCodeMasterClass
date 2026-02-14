import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class VwoLoginPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly errorMessage: Locator;
  readonly forgotPasswordButton: Locator;
  readonly passwordToggle: Locator;
  readonly logo: Locator;
  readonly rememberMeCheckbox: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.getByRole('textbox', { name: 'Email address' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.submitButton = page.getByRole('button', { name: 'Sign in', exact: true });
    this.errorMessage = page.getByText('Your email, password, IP address or location did not match');
    this.forgotPasswordButton = page.getByRole('button', { name: 'Forgot Password?' });
    this.passwordToggle = page.getByRole('button', { name: 'Toggle password visibility' });
    this.logo = page.getByRole('img', { name: 'VWO', exact: true });
    this.rememberMeCheckbox = page.getByText('Remember me');
  }

  async goto(): Promise<void> {
    await this.page.goto('https://app.vwo.com', { waitUntil: 'domcontentloaded' });
    await this.emailInput.waitFor({ state: 'visible' });
  }

  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async fillEmail(email: string): Promise<void> {
    await this.emailInput.fill(email);
  }

  async fillPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  async clickSubmit(): Promise<void> {
    await this.submitButton.click();
  }

  async togglePasswordVisibility(): Promise<void> {
    await this.passwordToggle.click();
  }

  async getPasswordInputType(): Promise<string> {
    return await this.passwordInput.getAttribute('type') ?? 'text';
  }

  async takeStepScreenshot(stepName: string): Promise<Buffer> {
    return this.takeScreenshot(`vwo-login-${stepName}`);
  }

  async expectErrorMessage(message: string): Promise<void> {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toContainText(message);
  }
}
