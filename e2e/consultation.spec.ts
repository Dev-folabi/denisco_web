import { expect, test } from "@playwright/test";
import { registerCustomer, uniqueEmail } from "./helpers";

test.describe("consultation booking", () => {
  test("books a slot as a guest and shows the reference", async ({ page }) => {
    await page.goto("/consultation");

    await expect(
      page.getByRole("heading", { level: 1, name: /Consultation/i }),
    ).toBeVisible();

    // Choose a service. Availability is the same for every one of them: a
    // booked hour is closed to all services, because the farm runs a single
    // consultation at a time.
    await page.locator(".consult-type-card").first().click();

    // Walk the date scroller until a date still has a free time. Earlier runs
    // of this suite book real slots, and a day whose four times are all taken
    // offers nothing — which is the booking rule working, not a failure.
    const dates = page.locator(".booking-date-btn");
    await expect(dates.first()).toBeVisible({ timeout: 20_000 });
    const dayCount = await dates.count();

    let booked = false;
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

    await page.getByLabel("Full Name").fill("Ada Obi");
    await page.getByLabel("Email Address").fill(uniqueEmail("booking"));
    await page.getByLabel("Phone Number").fill("08012345678");
    await page
      .getByLabel("Describe Your Consultation Needs")
      .fill("Setting up a 500-bird broiler pen.");

    await page.getByRole("button", { name: "Submit Booking" }).click();

    // A consultation carries a fee, so a booking hands over to Paystack when
    // the provider is configured. This suite runs without live provider
    // credentials, in which case the handover is skipped and the visitor
    // lands on the confirmation page — the slot is held either way, which is
    // the behaviour worth asserting here. Both destinations are accepted so
    // the test does not depend on whether the API has Paystack keys.
    await expect(page).toHaveURL(
      /(\/booking-confirmation\/|paystack\.com)/,
      { timeout: 30_000 },
    );

    if (page.url().includes("/booking-confirmation/")) {
      // The confirmation page carries the CB- reference the prototype
      // specifies, and says the fee is still outstanding.
      await expect(page.getByText(/CB-\d{5}/)).toBeVisible();
      await expect(page.getByText(/fee is paid/i)).toBeVisible();
    }
  });

  // The dashboard's "Consultations Booked" card was hard-coded to 0, which no
  // test noticed because nothing asserted the card's value. This books as a
  // signed-in customer and reads the card back.
  test("a booking is counted on the account dashboard", async ({ page }) => {
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

    // The contact fields come prefilled from the session.
    await page
      .getByLabel("Describe Your Consultation Needs")
      .fill("Counted on the dashboard.");
    await page.getByRole("button", { name: "Submit Booking" }).click();

    // Where this lands depends on whether the API has Paystack keys, so the
    // dashboard is reached directly rather than by following the booking.
    await expect(page).toHaveURL(
      /(\/booking-confirmation\/|paystack\.com)/,
      { timeout: 30_000 },
    );

    await page.goto("/account");

    const card = page
      .locator(".stat-card")
      .filter({ hasText: "Consultations Booked" });

    await expect(card).toBeVisible({ timeout: 20_000 });
    // One booking, and a real count rather than the placeholder it used to be.
    await expect(card.locator(".stat-value")).toHaveText("1", {
      timeout: 20_000,
    });
  });

  test("will not submit without a service, a date and a time", async ({
    page,
  }) => {
    await page.goto("/consultation");

    await page.getByLabel("Full Name").fill("Ada Obi");
    await page.getByLabel("Email Address").fill(uniqueEmail("booking"));
    await page.getByLabel("Phone Number").fill("08012345678");

    await page.getByRole("button", { name: "Submit Booking" }).click();

    // Still on the form: nothing was booked.
    await expect(page).toHaveURL(/\/consultation$/);
  });
});
