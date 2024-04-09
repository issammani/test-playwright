# Form Autofill and Capture Test POC

## Overview

This project serves as a proof of concept (POC) for automating tests that verify both the autofill functionality and data capture capabilities of web forms. It utilizes Playwright running on WebKit.

## Project Structure

- `assets/`: Contains HTML files that are used to test against.
- `main.test.js`: Single test that runs checks against all html files in `assets`
- `AutofillAllFramesAtDocumentStart.js`: Bundled JS as produced by webpack ( i.e by running `npm run build` on `firefox-ios`)

## Getting Started

To run this POC, ensure you have Node.js installed on your machine. Then, follow these steps:

1. Clone the repo.
2. Navigate to the project directory and install dependencies with:

```shell
npm i
```

3. To run the tests, execute:

```shell
npm test
```

This will run a node server on port 5678 and the test as well.

## How It Works

The test suite navigates to specified HTML forms located in the `assets/` directory. It then performs operations to autofill the forms with mock data and captures the submitted data for validation. The test is designed to catch any regressions we introduce when updating the shared code from desktop.

## To-Dos

- **Webpack Integration**:

  - Right now the `AutofillAllFramesAtDocumentStart.js` is copied from `firefox-ios`. Ideally we need this to be generated on the fly and on the specific commit we are testing against.

- **CI Integration**:
  - Get dynamic port number for the server, right now **5678** is hardcoded.
  - `npm i && npm test` in some CI env
