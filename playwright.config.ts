import { defineConfig, devices } from "@playwright/test";

/**
 * End-to-end tests run against the built app and a live API, because what
 * they are checking is the whole path: the server render, the client
 * hydration, the API call and what the customer ends up looking at.
 *
 * Start the backend first (`make run-api` in denisco_backend, with a seeded
 * catalogue), then `npm run test:e2e`. The config builds and starts the web
 * app itself, and reuses one that is already running.
 */

const BASE_URL = process.env.E2E_BASE_URL ?? "http://localhost:3000";
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export default defineConfig({
  testDir: "./e2e",
  // The tests register accounts and add to carts, which is shared state on one
  // API; running them one at a time keeps a failure readable.
  workers: 1,
  fullyParallel: false,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["github"], ["list"]] : [["list"]],
  timeout: 45_000,
  expect: { timeout: 10_000 },

  use: {
    baseURL: BASE_URL,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },

  projects: [
    {
      name: "desktop",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } },
      testIgnore: /responsive\.spec\.ts/,
    },
    {
      name: "mobile",
      // A phone-sized Chromium rather than a WebKit device profile: the
      // viewport is what the prototype's breakpoints respond to, and this
      // keeps the suite to one browser download in CI. 390 × 844 is an
      // iPhone 13, inside the 1240px breakpoint where the sliding navigation
      // takes over and below the 390px rule for the compact header.
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 390, height: 844 },
        isMobile: true,
        hasTouch: true,
      },
      testMatch: /responsive\.spec\.ts/,
    },
  ],

  webServer: {
    command: "npm run start",
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    env: {
      NEXT_PUBLIC_API_URL: API_URL,
      NEXT_PUBLIC_WEB_URL: BASE_URL,
    },
  },
});
