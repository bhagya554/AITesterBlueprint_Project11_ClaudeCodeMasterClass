# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm test                    # Run all tests (all browsers)
npm run test:headed         # Run tests in headed mode (visible browser)
npm run test:ui             # Open Playwright UI mode for interactive debugging
npm run test:debug          # Debug tests with Playwright inspector
npm run test:chromium       # Run tests in Chromium only
npm run test:smoke          # Run tests tagged @smoke
npm run report              # Open last HTML test report
npm run codegen             # Launch Playwright codegen tool

# Run a single test file
npx playwright test tests/e2e/auth/login.spec.ts

# Run a single test by title
npx playwright test -g "should login with valid credentials"

# Run with specific browser
npx playwright test --project=chromium tests/e2e/auth/login.spec.ts
```

## Architecture

This is a Playwright E2E testing project using the **Page Object Model (POM)** pattern with TypeScript.

### Key design decisions

- **Test specs live in `tests/e2e/`**, organized by feature (auth, dashboard, navigation). The config's `testDir` points here.
- **Page objects live in `tests/pages/`**. Every page class extends `BasePage` (`base.page.ts`), which provides `navigate()`, `waitForPageLoad()`, `getTitle()`, and `takeScreenshot()`. Concrete pages define locators as `readonly` properties in the constructor and expose action methods.
- **Custom fixtures in `tests/fixtures/`** extend Playwright's `test` object. Import `test` and `expect` from `auth.fixture.ts` (not `@playwright/test`) when you need pre-built `loginPage`, `dashboardPage`, or `authenticatedPage` fixtures.
- **Auth setup** (`tests/e2e/auth/auth.setup.ts`) runs before browser projects via the `dependencies: ['setup']` config. It stores auth state to `playwright/.auth/user.json`.
- **Test data and helpers** are in `tests/utils/`. Use `TestUsers` from `test-data.ts` for credentials.

### Selector priority

Use selectors in this order: `getByRole` > `getByLabel` > `getByPlaceholder` > `getByText` > `getByTestId` > CSS/XPath (last resort).

### baseURL

Default target is `https://practice.expandtesting.com`. Override with `BASE_URL` env var.

### Test tagging

Tag tests with `@smoke`, `@critical`, etc. in the test title. Run tagged tests with `--grep @smoke`.

## Conventions

- Each test must be independent — no shared mutable state between tests.
- Never use `page.waitForTimeout()` — rely on auto-waiting or explicit event waits.
- When adding a new page, create a class in `tests/pages/` extending `BasePage`.
- When adding a new feature area, create a new folder under `tests/e2e/`.
