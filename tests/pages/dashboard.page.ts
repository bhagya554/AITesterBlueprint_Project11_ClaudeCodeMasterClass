import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class DashboardPage extends BasePage {
  readonly welcomeHeading: Locator;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.welcomeHeading = page.getByRole('heading', { name: /welcome/i });
    this.logoutButton = page.getByRole('button', { name: /logout|sign out/i });
  }

  async goto(): Promise<void> {
    await this.navigate('/dashboard');
  }

  async expectWelcomeVisible(): Promise<void> {
    await expect(this.welcomeHeading).toBeVisible();
  }

  async logout(): Promise<void> {
    await this.logoutButton.click();
  }
}
