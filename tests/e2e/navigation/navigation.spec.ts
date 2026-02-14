import { test, expect } from '@playwright/test';

test.describe('Navigation tests', () => {
  test('should load the homepage @smoke', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/.+/);
  });

  test('should navigate to login page', async ({ page }) => {
    await page.goto('/');
    const loginLink = page.getByRole('link', { name: /login|sign in/i });
    if (await loginLink.isVisible()) {
      await loginLink.click();
      await expect(page).toHaveURL(/login/);
    }
  });

  test('should handle 404 page', async ({ page }) => {
    const response = await page.goto('/non-existent-page');
    expect(response?.status()).toBe(404);
  });
});
