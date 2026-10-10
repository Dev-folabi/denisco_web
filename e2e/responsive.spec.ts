import { expect, test } from "@playwright/test";
import { registerCustomer } from "./helpers";

// This spec runs in the mobile project only (see playwright.config.ts), where
// the viewport is an iPhone 13 — inside the 1240px breakpoint at which the
// prototype switches to the sliding navigation panel.

test.describe("on a phone", () => {
  test("the navigation opens, links through and closes", async ({ page }) => {
    await page.goto("/");

    // The horizontal nav is replaced by a toggle.
    const toggle = page.getByLabel("Open navigation");
    await expect(toggle).toBeVisible();

    await toggle.click();

    // The panel slides in from the right rather than being mounted on open,
    // so "open" means on screen — not merely present in the DOM.
    const panel = page.getByLabel("Primary navigation");
    const viewport = page.viewportSize()!;

    await expect
      .poll(async () => (await panel.boundingBox())!.x)
      .toBeLessThan(viewport.width - 100);

    await panel.getByRole("link", { name: "Shop" }).click();
    await expect(page).toHaveURL(/\/shop$/);

    // And it slides back out behind the page it navigated to.
    await expect
      .poll(async () => (await panel.boundingBox())!.x)
      .toBeGreaterThanOrEqual(viewport.width);
  });

  test("the product grid stacks and stays usable", async ({ page }) => {
    await page.goto("/shop");

    const first = page.locator(".product-card").first();
    await expect(first).toBeVisible();

    const box = await first.boundingBox();
    const viewport = page.viewportSize();

    // A single column: the card is nearly the full width of the screen.
    expect(box!.width).toBeGreaterThan(viewport!.width * 0.7);

    // Nothing overflows sideways, which is what makes a page feel broken on a
    // phone.
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth,
    );
    expect(overflow).toBeLessThanOrEqual(1);
  });

  // The bookings table grew a payment column and a second row action, which
  // pushed the row card past the edge of the screen. It books a slot, checks
  // the layout, then cancels — so the calendar is left as it was found.
  test("the bookings table fits the screen and its actions stay reachable", async ({
    page,
  }) => {
    await registerCustomer(page);

    await page.goto("/consultation");
    await page.locator(".consult-type-card").first().click();

    const dates = page.locator(".booking-date-btn");
    await expect(dates.first()).toBeVisible({ timeout: 20_000 });

    let booked = false;
    const dayCount = await dates.count();
    for (let day = 0; day < dayCount; day++) {
      await dates.nth(day).click();
      const free = page.locator(".slot-btn:not([disabled])").first();
      if (await free.isVisible().catch(() => false)) {
        await free.click();
        booked = true;
        break;
      }
    }
    expect(booked, "every offered date is fully booked").toBe(true);

    await page.getByRole("button", { name: "Submit Booking" }).click();
    await expect(page).toHaveURL(
      /(\/booking-confirmation\/|paystack\.com)/,
      { timeout: 30_000 },
    );

    await page.goto("/account/consultations");
    const row = page.locator("tbody tr").first();
    await expect(row).toBeVisible({ timeout: 20_000 });

    // Nothing overflows sideways, which is what makes a page feel broken on a
    // phone.
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth,
    );
    expect(overflow, "the bookings page scrolls sideways").toBeLessThanOrEqual(1);

    // Both row actions are inside the viewport, not clipped by the card: a
    // button that cannot be reached is the same as one that is not there.
    const viewport = page.viewportSize()!;
    for (const name of [/Pay Fee/i, /Cancel/i]) {
      const button = row.getByRole("button", { name });
      await expect(button).toBeVisible();
      const box = (await button.boundingBox())!;
      expect(box.x).toBeGreaterThanOrEqual(0);
      expect(box.x + box.width).toBeLessThanOrEqual(viewport.width + 1);
    }

    // Give the slot back, so re-runs do not fill the farm's calendar.
    await row.getByRole("button", { name: /Cancel/i }).click();
    await expect(page.getByText(/time released/i)).toBeVisible({
      timeout: 20_000,
    });
  });

  test("the account area shows its bottom tab bar", async ({ page }) => {
    await registerCustomer(page);

    // The desktop sidebar becomes a fixed bottom bar on a phone.
    const tabs = page.locator(".dash-mobile-nav, nav[aria-label='Account navigation']");
    await expect(tabs.first()).toBeVisible();

    await page.getByRole("link", { name: /Orders/i }).first().click();
    await expect(page).toHaveURL(/\/account\/orders/);
  });
});
