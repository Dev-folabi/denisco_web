import { expect, test } from "@playwright/test";

test.describe("home page", () => {
  test("renders the hero, the featured products and the farm videos", async ({
    page,
  }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", { level: 1, name: /Growing with Nature/i }),
    ).toBeVisible();

    // Both hero calls to action from the prototype.
    await expect(
      page.getByRole("link", { name: /Explore Our Products/i }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /Book a Consultation/i }).first(),
    ).toBeVisible();

    // The featured grid comes from the API; four products, as the plan says.
    const cards = page.locator(".product-card");
    await expect(cards.first()).toBeVisible();
    expect(await cards.count()).toBeGreaterThan(0);
    expect(await cards.count()).toBeLessThanOrEqual(4);

    await expect(page.locator("video").first()).toBeVisible();
  });

  test("serves the featured products in the HTML, not only after hydration", async ({
    request,
  }) => {
    // This is what the server rendering is for: a crawler that runs no
    // JavaScript still sees the catalogue. The expected product comes from the
    // API rather than being hard-coded, so the test does not depend on which
    // products are currently featured.
    const api = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
    const featured = await request.get(
      `${api}/api/v1/products?featured=true&limit=4`,
    );
    const { data } = (await featured.json()) as {
      data: Array<{ name: string }>;
    };

    test.skip(data.length === 0, "the catalogue has no featured products");

    const response = await request.get("/");
    const html = await response.text();

    expect(response.status()).toBe(200);
    expect(html).toContain(data[0].name);
  });

  test("the header links reach every public page", async ({ page }) => {
    await page.goto("/");

    for (const [name, path] of [
      ["About", "/about"],
      ["Services", "/services"],
      ["Shop", "/shop"],
      ["Consultation", "/consultation"],
      ["Contact", "/contact"],
    ] as const) {
      await page.getByRole("navigation").getByRole("link", { name }).click();
      await expect(page).toHaveURL(new RegExp(`${path}$`));
      await page.goto("/");
    }
  });
});
