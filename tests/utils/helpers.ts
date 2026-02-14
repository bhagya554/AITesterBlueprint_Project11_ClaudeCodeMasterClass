import { Page } from '@playwright/test';

export async function waitForApiResponse(page: Page, urlPattern: string): Promise<void> {
  await page.waitForResponse((response) =>
    response.url().includes(urlPattern) && response.status() === 200
  );
}

export function generateRandomEmail(): string {
  const timestamp = Date.now();
  return `testuser+${timestamp}@example.com`;
}

export function generateRandomString(length: number): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}
