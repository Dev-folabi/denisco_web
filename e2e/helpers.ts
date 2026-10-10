import { expect, type Page } from "@playwright/test";

/**
 * Helpers shared by the end-to-end specs.
 *
 * Accounts are created through the real registration form rather than seeded
 * through the API, because signing up is itself one of the flows under test
 * and a session obtained any other way would not prove the cookie works.
 */

/** A fresh email, so a re-run never collides with an earlier account. */
export function uniqueEmail(prefix = "e2e"): string {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}@denisco.test`;
}

export const TEST_PASSWORD = "farm-secret-1";

/** Registers a new customer and leaves the browser signed in. */
export async function registerCustomer(page: Page): Promise<string> {
  const email = uniqueEmail();

  await page.goto("/register");
  await page.getByLabel("Full Name").fill("Ada Obi");
  await page.getByLabel("Email Address").fill(email);
  await page.getByLabel("Phone Number").fill("08012345678");
  await page.getByLabel("Password", { exact: true }).fill(TEST_PASSWORD);
  await page.getByLabel("Confirm Password").fill(TEST_PASSWORD);
  await page.getByRole("button", { name: "Create Account" }).click();

  // Registration lands on the account dashboard.
  await expect(page).toHaveURL(/\/account/, { timeout: 20_000 });

  return email;
}

/** Adds the first in-stock product in the shop to the cart. */
export async function addFirstProductToCart(page: Page): Promise<string> {
  await page.goto("/shop");

  const card = page.locator(".product-card", {
    has: page.getByRole("button", { name: "Add", exact: true }),
  });

  const first = card.filter({ hasNot: page.getByText("Out of Stock") }).first();
  const name = (await first.locator("h4").textContent()) ?? "";

  await first.getByRole("button", { name: "Add", exact: true }).click();
  await expect(page.getByText(/added to your cart/i)).toBeVisible();

  return name.trim();
}
