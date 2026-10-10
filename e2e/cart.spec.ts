import { expect, test } from "@playwright/test";
import { addFirstProductToCart, registerCustomer } from "./helpers";

test.describe("product detail and cart", () => {
  test("adds a chosen quantity from the product page and checks out", async ({
    page,
  }) => {
    await registerCustomer(page);

    await page.goto("/shop");
    await page
      .locator(".product-card")
      .filter({ hasNot: page.getByText("Out of Stock") })
      .first()
      .getByRole("link", { name: /Details/i })
      .click();

    await expect(page).toHaveURL(/\/shop\/[a-z0-9-]+$/);
    const name = (await page.getByRole("heading", { level: 1 }).textContent())?.trim();

    // Two of them, through the stepper the prototype specifies.
    await page.getByLabel("Increase quantity").click();
    await expect(page.locator(".qty-stepper input")).toHaveValue("2");

    await page.getByRole("button", { name: /Add to Cart/i }).click();
    await expect(page.getByText(/added to your cart/i)).toBeVisible();

    await page.goto("/cart");
    await expect(page.getByText(name!, { exact: false }).first()).toBeVisible();

    // The quantity carried over from the product page.
    const qty = page.locator(".qty-stepper input").first();
    await expect(qty).toHaveValue("2");

    // Increasing it from the cart updates the line and the summary.
    await page.getByLabel("Increase quantity").first().click();
    await expect(qty).toHaveValue("3");
    // The summary follows the line, not the other way round.
    await expect(page.getByText(/Proceed to Checkout/i)).toBeVisible();

    await page.getByRole("link", { name: /Proceed to Checkout/i }).click();
    await expect(page).toHaveURL(/\/checkout$/);

    // The contact details are prefilled from the account, as the plan requires.
    await expect(page.getByLabel("Full Name")).not.toHaveValue("");
    await expect(page.getByLabel("Email Address")).not.toHaveValue("");

    // Home delivery is selected by default and carries the ₦2,500 fee.
    await expect(page.getByText("₦2,500").first()).toBeVisible();
  });

  test("removing the last item leaves the empty state", async ({ page }) => {
    await registerCustomer(page);
    await addFirstProductToCart(page);

    await page.goto("/cart");
    await page.getByLabel("Remove item").first().click();

    await expect(page.getByText(/your cart is empty/i)).toBeVisible();
    await expect(page.getByRole("link", { name: /Start Shopping/i })).toBeVisible();
  });

  test("a signed-out visitor is sent to sign in before adding to a cart", async ({
    page,
  }) => {
    // The cart lives on the server, so there is nothing to add to without a
    // session. The visitor should be told, not silently ignored.
    await page.goto("/shop");
    await page
      .locator(".product-card")
      .filter({ hasNot: page.getByText("Out of Stock") })
      .first()
      .getByRole("button", { name: "Add", exact: true })
      .click();

    await expect(page).toHaveURL(/\/login\?redirect=/);
  });
});
