import { test, expect } from '@playwright/test';
import { VwoLoginPage } from '../../pages/vwo-login.page';
import { TestUsers, VwoTestUsers } from '../../utils/test-data';

test.describe('VWO Login functionality', () => {
  let vwoLoginPage: VwoLoginPage;

  test.beforeEach(async ({ page }) => {
    vwoLoginPage = new VwoLoginPage(page);
    await vwoLoginPage.goto();
  });

  test('should display login form elements @smoke', async () => {
    await expect(vwoLoginPage.emailInput).toBeVisible();
    await expect(vwoLoginPage.passwordInput).toBeVisible();
    await expect(vwoLoginPage.submitButton).toBeVisible();
  });

  test('should show error for invalid credentials @smoke', async () => {
    await vwoLoginPage.login(TestUsers.invalidUser.email, TestUsers.invalidUser.password);
    await vwoLoginPage.expectErrorMessage('Your email, password, IP address or location did not match');
  });

  test('should show error for dummy email and password', async () => {
    await vwoLoginPage.login(VwoTestUsers.dummyUser.email, VwoTestUsers.dummyUser.password);
    await vwoLoginPage.expectErrorMessage('did not match');
  });

  test('should have correct page title', async () => {
    const title = await vwoLoginPage.getTitle();
    expect(title).toContain('VWO');
  });

  test('should display forgot password button', async () => {
    await expect(vwoLoginPage.forgotPasswordButton).toBeVisible();
  });
});
