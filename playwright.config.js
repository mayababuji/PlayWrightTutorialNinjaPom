import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  timeout: 60 * 1000,

  expect: {
    timeout: 15 * 1000
  },

  // Retry failed tests once in Jenkins.
  retries: process.env.CI ? 1 : 0,

  reporter: [
    ['list'],
    [
      'html',
      {
        outputFolder: 'playwright-report',
        open: 'never'
      }
    ],
    [
      'junit',
      {
        outputFile: 'test-results/results.xml'
      }
    ],
     // Allure report results
    [
      'allure-playwright',
      {
        resultsDir: 'allure-results',
        detail: true,
        suiteTitle: true,
      },
    ],
  ],
  

  use: {
    baseURL: 'https://tutorialsninja.com/demo/',
    headless: true,
 // Create a trace for every test.
  trace: 'on',

    // Save screenshots only when a test fails.
    screenshot: 'only-on-failure',

   
    // Optional: save video only when a test fails.
    video: 'retain-on-failure'
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome']
      }
    }
  ]
});