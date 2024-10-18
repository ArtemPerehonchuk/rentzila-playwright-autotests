# Rentzila Playwright Tests

## Description

This project contains end-to-end tests for the Rentzila application using Playwright. It ensures the functionality and quality of the Rentzila web application through automated browser testing.

## Prerequisites

- [Node.js]
- [npm]

## Installation

1. Clone repository:

   ```bash
   git clone https://github.com/ArtemPerehonchuk/rentzila-playwright-tests.git

   ```
2. Navigate to the project directory:

    ```bash
    cd rentzila-playwright-tests
    ````
3. Install dependencies:

    ```bash
    npm install
    ```

## Running Tests
1. Run All Tests:
To run all tests using the default browser configuration:

    ```bash
    npm run test
    ```
2. Run Tests in Chrome:

    ```bash
    npm run test:chrome
    ```

3. To run specific test file in Chrome:

- Run tests for services:

    ```bash
    npm run test:services:chrome
    ```

- Run tests for footer elements:

    ```bash
    npm run test:footer-elements:chrome
    ```

- Run tests for login:

    ```bash
    npm run test:login:chrome
    ```

- Run tests for main info tab on create unit page:

    ```bash
    npm run test:unit-page-main-info-tab:chrome
    ```