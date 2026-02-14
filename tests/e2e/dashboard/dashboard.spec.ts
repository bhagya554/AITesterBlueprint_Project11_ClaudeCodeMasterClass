import { test, expect } from '../../fixtures/auth.fixture';
import { DashboardPage } from '../../pages/dashboard.page';

test.describe('Dashboard functionality', () => {
  test('should display welcome heading after login @smoke', async ({ loginPage, page }) => {
    const { validUser } = await import('../../utils/test-data').then((m) => m.TestUsers);
    await loginPage.login(validUser.email, validUser.password);

    const dashboardPage = new DashboardPage(page);
    await dashboardPage.expectWelcomeVisible();
  });

  test('should have correct page title', async ({ loginPage, page }) => {
    const { validUser } = await import('../../utils/test-data').then((m) => m.TestUsers);
    await loginPage.login(validUser.email, validUser.password);

    await expect(page).toHaveTitle(/dashboard/i);
  });
});
