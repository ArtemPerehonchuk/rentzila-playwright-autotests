import { defineConfig } from '@playwright/test';
import chromeProject from './projects.config';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html']
  ],
  timeout: 90000,
  expect: {
    timeout: 10000 
  },
  use: {
    baseURL: 'https://dev.rentzila.com.ua/',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: chromeProject,
});
