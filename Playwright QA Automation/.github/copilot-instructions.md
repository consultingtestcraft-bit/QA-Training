# Playwright QA Automation - AI Agent Instructions

## Project Overview
This is a Playwright-based end-to-end testing framework for web application quality assurance. The project focuses on automated browser testing using Playwright's cross-browser capabilities.

Refer to the [Playwright Documentation](https://playwright.dev/docs/intro) for best practices and detailed guides.

## Architecture & Key Components
- **Test Structure**: Tests are organized in the `tests/` directory, following Playwright's test runner conventions
- **Page Objects**: Reusable page abstractions in `pages/` or `page-objects/` directories
- **Configuration**: `playwright.config.ts` defines browsers, test environments, and global settings
- **Test Data**: Test fixtures and data in `fixtures/` or `test-data/` directories

## Critical Workflows
- **Run All Tests**: `npx playwright test`
- **Run Specific Test**: `npx playwright test tests/example.spec.ts`
- **Debug Tests**: `npx playwright test --debug` (opens browser in headed mode)
- **Generate Tests**: `npx playwright codegen <url>` (records interactions)
- **Show Report**: `npx playwright show-report`
- **Update Screenshots**: `npx playwright test --update-snapshots`

## Development Patterns
- **Element Selection**: Prefer `page.locator()` with semantic selectors over CSS/XPath
- **Assertions**: Use `expect()` with Playwright's built-in matchers
- **Fixtures**: Leverage test fixtures for setup/teardown and shared state
- **Page Objects**: Encapsulate page interactions in class-based page objects
- **Test Isolation**: Each test should be independent with proper cleanup

## Dependencies & Integrations
- **Core**: @playwright/test for test runner and assertions
- **Browsers**: Chromium, Firefox, WebKit (Safari) support
- **CI/CD**: Configured for parallel execution in CI environments
- **Reporting**: HTML reports with screenshots and videos on failure

## Conventions
- Test files end with `.spec.ts` or `.test.ts`
- Use descriptive test names and `test.describe()` for grouping
- Store test data in JSON files or fixtures
- Handle async operations with `await` consistently
- Use `page.waitForLoadState()` for navigation waits

## Common Pitfalls
- Avoid `page.waitForTimeout()` - use proper waits instead
- Don't rely on exact timing - use event-based waits
- Ensure tests work in headless mode for CI
- Clean up test data/state between runs

## File Structure Reference
```
tests/
  ├── auth/
  ├── e2e/
  └── api/
pages/
  ├── base-page.ts
  └── login-page.ts
playwright.config.ts
package.json
```