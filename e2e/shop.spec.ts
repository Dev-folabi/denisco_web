import { expect, test } from "@playwright/test";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

test.describe("shop", () => {
  test("filters by category, sorts by price and opens a product", async ({
    page,
    request,
  }) => {
    await page.goto("/shop");

    await expect(
      page.getByRole("heading", { level: 1, name: /Farm Products Shop/i }),
    ).toBeVisible();

    const allCount = await page.locator(".product-card").count();
    expect(allCount).toBeGreaterThan(0);

    // Filtering runs on the API, so the grid should change rather than being
    // hidden client-side.
    await page.getByRole("button", { name: "Poultry", exact: true }).click();
    await expect(page.locator(".product-card").first()).toBeVisible();
    const poultryCount = await page.locator(".product-card").count();
    expect(poultryCount).toBeGreaterThan(0);
    expect(poultryCount).toBeLessThanOrEqual(allCount);

    // Every card left should be one of the catalogue's poultry products. The
    // expected set comes from the API, so the test does not restate the
    // catalogue — and a filter that quietly returned everything would fail
    // here rather than pass on a count alone.
    const response = await request.get(
      `${API}/api/v1/products?category=poultry&limit=100`,
    );
    const { data } = (await response.json()) as { data: Array<{ name: string }> };
    const poultryNames = new Set(data.map((product) => product.name));

    const rendered = await page.locator(".product-card h4").allTextContents();
    expect(rendered.length).toBe(poultryNames.size);
    for (const name of rendered) {
      expect(poultryNames.has(name.trim())).toBe(true);
    }

    await page.getByRole("button", { name: "All Products" }).click();
    await page.selectOption("select", "price-asc");

    // The first card is now the cheapest: prices are rendered as naira, so the
    // comparison is on the parsed amounts.
    const prices = await page.locator(".unit-row").allTextContents();
    const amounts = prices.map((text) =>
      Number(text.replace(/[^\d.]/g, "").split(".")[0]),
    );
    const sorted = [...amounts].sort((a, b) => a - b);
    expect(amounts).toEqual(sorted);

    await page.locator(".product-card").first().getByRole("link", { name: /Details/i }).click();
    await expect(page).toHaveURL(/\/shop\/[a-z0-9-]+$/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("a product that does not exist is a 404, not an empty page", async ({
    request,
  }) => {
    const response = await request.get("/shop/not-a-real-product");
    expect(response.status()).toBe(404);
  });

  test("a search from the header narrows the grid", async ({ page }) => {
    await page.goto("/");

    await page.getByLabel("Search products").fill("broiler");
    await page.getByLabel("Search", { exact: true }).click();

    await expect(page).toHaveURL(/\/shop\?search=broiler/);
    await expect(page.locator(".product-card h4").first()).toContainText(
      /broiler/i,
    );
  });
});
