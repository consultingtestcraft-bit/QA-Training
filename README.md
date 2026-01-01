# QA-Training

Short description
A lightweight QA / test-training project containing HTML-based exercises, demos and small TypeScript helpers for practicing manual and automated web QA tasks.

Badges
[![Languages](https://img.shields.io/badge/languages-HTML%20%2B%20TypeScript-blue)](https://github.com/consultingtestcraft-bit/QA-Training)  ![Repo size](https://img.shields.io/badge/size-small-lightgrey)

Overview
This repository provides a collection of HTML pages and small TypeScript utilities intended for QA training: exploratory testing, accessibility checks, functional scenarios, and basic automation practice. The project is predominantly HTML (99.1%) with a small TypeScript component (0.9%).

Key features
- Simple, self-contained HTML scenarios to practice manual testing.
- Small TypeScript helpers/scripts for demonstrating DOM manipulation and event-driven bugs.
- Examples for accessibility checks, form validation, and edge-case behaviors.
- Easy to run locally — no heavy dependencies required.

Tech stack
- HTML (primary)
- TypeScript (minor)
- Optional: Node.js/npm for local servers or building TypeScript

Getting started

Prerequisites
- Modern web browser (Chrome, Firefox, Edge, Safari)
- Optional (for TypeScript or local server): Node.js (>=14) and npm

Run locally — quick options
Option A — Open directly
1. Clone the repo or download the files.
2. Open the main HTML file (for example, index.html or demo/index.html) in your browser.

Option B — Simple local HTTP server (recommended)
- Using Python:
  - python3 -m http.server 8000
  - Open http://localhost:8000 in your browser
- Using npm serve:
  - npm install -g serve
  - serve -s . -l 8000
  - Open http://localhost:8000

Option C — If TypeScript needs building
1. npm install
2. npm run build   # build scripts may compile .ts -> .js
3. npm run start   # if a dev server script exists

If the repository does not contain package.json or build scripts, you can skip Option C and treat TypeScript files as reference code or precompiled examples.

Suggested package.json scripts (optional)
{
  "scripts": {
    "build": "tsc",
    "start": "serve -s . -l 8000"
  },
  "devDependencies": {
    "typescript": "^4.0.0",
    "serve": "^14.0.0"
  }
}

Project structure (example)
- /index.html — main demo or landing page
- /pages/ — additional scenario pages
- /assets/ — images, styles, fonts
- /src/ — TypeScript source files (if any)
- /dist/ — compiled output (optional)
- README.md — this file

Testing and QA suggestions
- Manual test checklist:
  - Cross-browser rendering (Chrome, Firefox, Edge, Safari)
  - Form validation and edge-case inputs
  - Keyboard navigation and focus order
  - Accessibility basics (aria attributes, labels, contrast)
  - Responsive layout checks (mobile/tablet/desktop)
- Automation practice:
  - Use Playwright or Cypress to write simple end-to-end tests that navigate pages and assert expected behavior.
  - Example test scenarios: form submission, validation messages, modal open/close, error handling.

Contributing
- Open an issue to propose a new scenario or bug fix.
- Fork the repo, create a feature branch, and open a pull request.
- Keep changes small and focused; include a short description of the QA scenario and steps to reproduce.

License
- This repository is licensed under the MIT License. See LICENSE for details.

Notes for maintainers
- If you want TypeScript compiled automatically, add a tsconfig.json and the build/start scripts shown above.
- Consider adding a simple CI (GitHub Actions) to run basic link checks or linting.

Contact
Repository owner: consultingtestcraft-bit
For questions or help: open an issue in this repository.
