import { test as base } from '@playwright/test';
import { VwoLoginPage } from '../pages/vwo-login.page';

type VwoFixtures = {
  vwoLoginPage: VwoLoginPage;
};

export const test = base.extend<VwoFixtures>({
  vwoLoginPage: async ({ page }, use) => {
    const vwoLoginPage = new VwoLoginPage(page);
    await vwoLoginPage.goto();
    await use(vwoLoginPage);
  },
});

export { expect } from '@playwright/test';
