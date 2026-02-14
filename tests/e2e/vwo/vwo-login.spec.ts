import { test, expect } from '../../fixtures/vwo.fixture';
import { TestUsers, VwoTestUsers } from '../../utils/test-data';

test.describe('VWO Login functionality', () => {
  test.describe('Form Display', () => {
    test('should display login form elements @smoke', async ({ vwoLoginPage }) => {
      await expect(vwoLoginPage.emailInput).toBeVisible();
      await expect(vwoLoginPage.passwordInput).toBeVisible();
      await expect(vwoLoginPage.submitButton).toBeVisible();
    });

    test('should display VWO logo and branding', async ({ vwoLoginPage }) => {
      await expect(vwoLoginPage.logo).toBeVisible();
    });

    test('should have password input masked by default', async ({ vwoLoginPage }) => {
      const inputType = await vwoLoginPage.getPasswordInputType();
      expect(inputType).toBe('password');
    });

    test('should have correct page title', async ({ vwoLoginPage }) => {
      const title = await vwoLoginPage.getTitle();
      expect(title).toContain('VWO');
    });

    test('should display forgot password button', async ({ vwoLoginPage }) => {
      await expect(vwoLoginPage.forgotPasswordButton).toBeVisible();
    });
  });

  test.describe('Invalid Credentials', () => {
    test('should show error for invalid credentials @smoke', async ({ vwoLoginPage }) => {
      await vwoLoginPage.login(TestUsers.invalidUser.email, TestUsers.invalidUser.password);
      await vwoLoginPage.expectErrorMessage('Your email, password, IP address or location did not match');
    });

    test('should show error for dummy email and password', async ({ vwoLoginPage }) => {
      await vwoLoginPage.login(VwoTestUsers.dummyUser.email, VwoTestUsers.dummyUser.password);
      await vwoLoginPage.expectErrorMessage('did not match');
    });
  });

  test.describe('Field Validation', () => {
    test('should not submit with empty email and password', async ({ vwoLoginPage }) => {
      await vwoLoginPage.clickSubmit();
      // Form stays on the login page — email input still visible
      await expect(vwoLoginPage.emailInput).toBeVisible();
      // URL should still be the login page
      expect(vwoLoginPage.page.url()).toContain('login');
    });

    test('should not submit with email only (empty password)', async ({ vwoLoginPage }) => {
      await vwoLoginPage.fillEmail(VwoTestUsers.dummyUser.email);
      await vwoLoginPage.clickSubmit();
      await expect(vwoLoginPage.passwordInput).toBeVisible();
      expect(vwoLoginPage.page.url()).toContain('login');
    });

    test('should not submit with password only (empty email)', async ({ vwoLoginPage }) => {
      await vwoLoginPage.fillPassword(VwoTestUsers.dummyUser.password);
      await vwoLoginPage.clickSubmit();
      await expect(vwoLoginPage.emailInput).toBeVisible();
      expect(vwoLoginPage.page.url()).toContain('login');
    });
  });

  test.describe('Password Toggle', () => {
    test('should toggle password visibility to show text @smoke', async ({ vwoLoginPage }) => {
      await vwoLoginPage.fillPassword('TestPass123');
      const typeBefore = await vwoLoginPage.getPasswordInputType();
      expect(typeBefore).toBe('password');

      await vwoLoginPage.togglePasswordVisibility();
      const typeAfter = await vwoLoginPage.getPasswordInputType();
      expect(typeAfter).toBe('text');
    });

    test('should toggle password visibility back to hidden', async ({ vwoLoginPage }) => {
      await vwoLoginPage.fillPassword('TestPass123');

      // Show password
      await vwoLoginPage.togglePasswordVisibility();
      expect(await vwoLoginPage.getPasswordInputType()).toBe('text');

      // Hide password again
      await vwoLoginPage.togglePasswordVisibility();
      expect(await vwoLoginPage.getPasswordInputType()).toBe('password');
    });
  });

  test.describe('Input Behavior', () => {
    test('should accept valid email format', async ({ vwoLoginPage }) => {
      await vwoLoginPage.fillEmail('valid@example.com');
      const value = await vwoLoginPage.emailInput.inputValue();
      expect(value).toBe('valid@example.com');
    });

    test('should handle whitespace in email field', async ({ vwoLoginPage }) => {
      await vwoLoginPage.fillEmail(VwoTestUsers.whitespaceEmail.email);
      const value = await vwoLoginPage.emailInput.inputValue();
      // VWO trims whitespace from email input
      expect(value).toBe(VwoTestUsers.whitespaceEmail.email.trim());
    });
  });

  test.describe('Screenshot Capture', () => {
    test('should capture screenshots at each login step @smoke', async ({ vwoLoginPage }) => {
      // Step 1: Blank form
      await vwoLoginPage.takeStepScreenshot('01-blank-form');

      // Step 2: Email filled
      await vwoLoginPage.fillEmail(VwoTestUsers.dummyUser.email);
      await vwoLoginPage.takeStepScreenshot('02-email-filled');

      // Step 3: Password filled
      await vwoLoginPage.fillPassword(VwoTestUsers.dummyUser.password);
      await vwoLoginPage.takeStepScreenshot('03-password-filled');

      // Step 4: Submit and capture error
      await vwoLoginPage.clickSubmit();
      await vwoLoginPage.expectErrorMessage('did not match');
      await vwoLoginPage.takeStepScreenshot('04-error-displayed');
    });
  });

  test.describe('UI / Accessibility', () => {
    test('should have accessible labels on form inputs', async ({ vwoLoginPage }) => {
      // Email input should be labeled
      await expect(vwoLoginPage.emailInput).toHaveAccessibleName('Email address');
      // Password input should be labeled
      await expect(vwoLoginPage.passwordInput).toHaveAccessibleName('Password');
      // Submit button should be labeled
      await expect(vwoLoginPage.submitButton).toHaveAccessibleName('Sign in');
    });
  });
});
