# QA Training - Playwright Automation

This repository contains a Playwright-based QA automation project for practicing end-to-end web testing.

## Overview
The main content lives in the `Playwright QA Automation/` folder and includes:
- Playwright test definitions under `tests/`
- Playwright configuration in `playwright.config.ts`
- Supporting page objects or helper pages in `pages/`
- Generated test output under `playwright-report/`

The root repository also includes `LICENSE` and a `test-results/` folder.

## Tech stack
- Node.js / npm
- Playwright (`@playwright/test`)
- TypeScript support via Playwright

## Getting started

### Prerequisites
- Node.js installed
- npm available on your PATH

### Run the tests
1. Open a terminal.
2. Change into the project folder:
   ```powershell
   cd "Playwright QA Automation"
   ```
3. Install dependencies:
   ```powershell
   npm install
   ```
4. Run the default test suite:
   ```powershell
   npm test
   ```

### Additional commands
- Run tests in headed mode:
  ```powershell
  npm run test:headed
  ```
- Run tests in debug mode:
  ```powershell
  npm run test:debug
  ```

> Always refer to the official Playwright test authoring guide when writing tests:
> https://playwright.dev/docs/writing-tests

## Project structure
- `Playwright QA Automation/package.json` — test scripts and dependencies
- `Playwright QA Automation/playwright.config.ts` — Playwright configuration
- `Playwright QA Automation/tests/` — end-to-end test files
- `Playwright QA Automation/pages/` — page object or helper modules
- `Playwright QA Automation/playwright-report/` — generated HTML reports
- `Playwright QA Automation/test-results/` — saved test artifacts and results
- `LICENSE` — project license

## Contributing
- Open an issue to propose improvements or new test scenarios.
- Fork the repo and create a branch for your changes.
- Submit a pull request with a clear description of the automation change.

## License
This repository is licensed under the MIT License. See `LICENSE` for details.
