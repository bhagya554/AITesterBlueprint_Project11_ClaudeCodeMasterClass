import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { TestUsers } from '../../utils/test-data';

test.describe('Login functionality', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('should display login form elements @smoke', async () => {
    await expect(loginPage.emailInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.submitButton).toBeVisible();
  });

  test('should login with valid credentials @smoke', async ({ page }) => {
    await loginPage.login(TestUsers.validUser.email, TestUsers.validUser.password);
    await expect(page).toHaveURL(/dashboard/);
  });

  test('should show error for invalid credentials', async () => {
    await loginPage.login(TestUsers.invalidUser.email, TestUsers.invalidUser.password);
    await loginPage.expectErrorMessage('Invalid');
  });

  test('should show error for empty email', async () => {
    await loginPage.login('', TestUsers.validUser.password);
    await loginPage.expectErrorMessage('required');
  });

  test('should show error for empty password', async () => {
    await loginPage.login(TestUsers.validUser.email, '');
    await loginPage.expectErrorMessage('required');
  });
});
