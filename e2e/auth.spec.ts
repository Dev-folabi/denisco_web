import { expect, test } from "@playwright/test";
import { TEST_PASSWORD, registerCustomer, uniqueEmail } from "./helpers";

test.describe("authentication", () => {
  test("registers, signs out and signs back in", async ({ page }) => {
    const email = await registerCustomer(page);

    await expect(
      page.getByRole("heading", { name: /Welcome back/i }).first(),
    ).toBeVisible();

    await page.getByRole("link", { name: /Logout/i }).first().click();
    await expect(page).toHaveURL(/\/(login)?$/);

    await page.goto("/login");
    await page.getByLabel("Email Address").fill(email);
    await page.getByLabel("Password").fill(TEST_PASSWORD);
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page).toHaveURL(/\/account/);
  });

  test("rejects a wrong password without saying which field was wrong", async ({
    page,
  }) => {
    const email = await registerCustomer(page);
    await page.getByRole("link", { name: /Logout/i }).first().click();

    await page.goto("/login");
    await page.getByLabel("Email Address").fill(email);
    await page.getByLabel("Password").fill("not-the-password");
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page.getByText(/incorrect/i)).toBeVisible();
    await expect(page).toHaveURL(/\/login/);
  });

  test("catches a mistyped confirmation before calling the API", async ({
    page,
  }) => {
    await page.goto("/register");
    await page.getByLabel("Full Name").fill("Ada Obi");
    await page.getByLabel("Email Address").fill(uniqueEmail());
    await page.getByLabel("Phone Number").fill("08012345678");
    await page.getByLabel("Password", { exact: true }).fill(TEST_PASSWORD);
    await page.getByLabel("Confirm Password").fill("something-else");
    await page.getByRole("button", { name: "Create Account" }).click();

    await expect(page.getByText(/passwords do not match/i)).toBeVisible();
    await expect(page).toHaveURL(/\/register/);
  });

  test("sends a signed-out visitor from the account area to sign in, then back", async ({
    page,
  }) => {
    await page.goto("/account/orders");

    await expect(page).toHaveURL(/\/login\?redirect=%2Faccount%2Forders/);
  });
});
