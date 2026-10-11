import { expect, test } from "@playwright/test";

/**
 * The contact page is the only way a visitor with no account reaches the
 * farm, so the form has to get its message as far as the API and say so.
 * It used to hand the message to the visitor's mail client, which meant it
 * left the page only if a mail app was configured and nothing was validated
 * before it went.
 */
test.describe("contact", () => {
  test("submits an enquiry and thanks the visitor", async ({ page }) => {
    await page.goto("/contact");

    await page.getByLabel("Full Name").fill("Ayo Bankole");
    await page.getByLabel("Email Address").fill("ayo@example.com");
    await page.getByLabel("Subject").fill("Snail farming startup");
    await page
      .getByLabel("Message")
      .fill("I want to start a snail farm on two acres in Ogun State.");

    await page.getByRole("button", { name: "Send Message" }).click();

    // The farm's own reply, not a hint about the visitor's mail client.
    await expect(page.getByText(/thank you for your message/i)).toBeVisible({
      timeout: 15_000,
    });
    await expect(page.getByText(/email client/i)).toHaveCount(0);
  });

  test("will not send a message too short to be an enquiry", async ({ page }) => {
    await page.goto("/contact");

    await page.getByLabel("Full Name").fill("Ayo Bankole");
    await page.getByLabel("Email Address").fill("ayo@example.com");
    await page.getByLabel("Subject").fill("Snails");
    await page.getByLabel("Message").fill("Hi");

    await page.getByRole("button", { name: "Send Message" }).click();

    // The server's bound, restated in the browser so it is caught before the
    // round trip.
    await expect(page.getByText(/write a little more/i)).toBeVisible();
    await expect(page.getByText(/thank you for your message/i)).toHaveCount(0);
  });
});
