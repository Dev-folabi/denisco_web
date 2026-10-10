import { describe, expect, it } from "vitest";
import { Money, MoneyFromKobo, fmtDate, fmtDateTime } from "./format";

// Money is the formatter every price on the site goes through, and prices are
// stored in kobo, so an error here is an error on every page.

describe("Money", () => {
  it("formats naira with thousands separators", () => {
    expect(Money(0)).toBe("₦0");
    expect(Money(6_500)).toBe("₦6,500");
    expect(Money(850_000)).toBe("₦850,000");
  });

  it("treats a missing amount as zero rather than showing NaN", () => {
    expect(Money(Number.NaN)).toBe("₦0");
    expect(Money(undefined as unknown as number)).toBe("₦0");
  });
});

describe("MoneyFromKobo", () => {
  it("converts the API's kobo integers to naira", () => {
    // The prototype's prices: ₦6,500 a broiler, ₦850,000 a cow.
    expect(MoneyFromKobo(650_000)).toBe("₦6,500");
    expect(MoneyFromKobo(85_000_000)).toBe("₦850,000");
    // The ₦2,500 delivery fee.
    expect(MoneyFromKobo(250_000)).toBe("₦2,500");
  });

  it("keeps a part-naira amount from being rounded away silently", () => {
    expect(MoneyFromKobo(650_050)).toBe("₦6,500.5");
  });
});

describe("date formatting", () => {
  it("renders a date the way the account tables show it", () => {
    expect(fmtDate("2026-10-17T09:00:00Z")).toBe("17 Oct 2026");
  });

  it("accepts the ISO strings the API returns, and Date objects", () => {
    expect(fmtDate(new Date("2026-01-05T00:00:00Z"))).toBe("05 Jan 2026");
  });

  it("includes the time where a timestamp matters", () => {
    const rendered = fmtDateTime("2026-10-17T09:30:00Z");
    expect(rendered).toContain("17 Oct 2026");
    expect(rendered).toMatch(/\d{2}:\d{2}/);
  });
});
