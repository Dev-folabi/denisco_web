import { describe, expect, it } from "vitest";
import {
  bookingSchema,
  checkoutSchema,
  contactSchema,
  firstIssue,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
} from "./schemas";

// These schemas restate the rules the API enforces. The tests are here to
// catch the two ways that goes wrong: a schema that rejects input the API
// would accept, so a customer cannot submit a valid form, and one that accepts
// input the API refuses, so the form fails after a round trip.

const validRegistration = {
  first_name: "Ada",
  last_name: "Obi",
  email: "ada@denisco.com",
  phone: "+2348012345678",
  password: "farm-secret-1",
  confirm_password: "farm-secret-1",
};

describe("registerSchema", () => {
  it("accepts a complete registration", () => {
    const parsed = registerSchema.safeParse(validRegistration);
    expect(parsed.success).toBe(true);
  });

  it("trims the values it returns, so a stray space is not stored", () => {
    const parsed = registerSchema.parse({
      ...validRegistration,
      first_name: "  Ada  ",
      email: " ada@denisco.com ",
    });

    expect(parsed.first_name).toBe("Ada");
    expect(parsed.email).toBe("ada@denisco.com");
  });

  it("requires both names, because the API stores them separately", () => {
    const parsed = registerSchema.safeParse({
      ...validRegistration,
      last_name: "",
    });

    expect(parsed.success).toBe(false);
  });

  it("refuses a password the API would refuse too", () => {
    expect(
      registerSchema.safeParse({
        ...validRegistration,
        password: "short",
        confirm_password: "short",
      }).success,
    ).toBe(false);

    // bcrypt ignores input past 72 bytes, so the API rejects it rather than
        // silently truncating.
    const tooLong = "x".repeat(73);
    expect(
      registerSchema.safeParse({
        ...validRegistration,
        password: tooLong,
        confirm_password: tooLong,
      }).success,
    ).toBe(false);
  });

  it("catches a mistyped confirmation, which the API never sees", () => {
    const parsed = registerSchema.safeParse({
      ...validRegistration,
      confirm_password: "farm-secret-2",
    });

    expect(parsed.success).toBe(false);
    if (!parsed.success) {
      expect(firstIssue(parsed.error)).toBe("Passwords do not match");
    }
  });

  it("accepts the phone formats a Nigerian customer types", () => {
    for (const phone of [
      "08012345678",
      "+2348012345678",
      "+234 801 234 5678",
      "0801-234-5678",
    ]) {
      expect(
        registerSchema.safeParse({ ...validRegistration, phone }).success,
      ).toBe(true);
    }
  });

  it("refuses a number that cannot be a phone number", () => {
    for (const phone of ["", "0801", "12345", "not-a-number"]) {
      expect(
        registerSchema.safeParse({ ...validRegistration, phone }).success,
      ).toBe(false);
    }
  });
});

describe("loginSchema", () => {
  it("asks for a password without judging its length", () => {
    // An existing account may predate a policy change; the login form is not
    // the place to tell someone their stored password is too short.
    expect(
      loginSchema.safeParse({ email: "ada@denisco.com", password: "short" })
        .success,
    ).toBe(true);

    expect(
      loginSchema.safeParse({ email: "ada@denisco.com", password: "" }).success,
    ).toBe(false);
  });

  it("rejects an address that is not one", () => {
    expect(
      loginSchema.safeParse({ email: "ada@", password: "farm-secret-1" })
        .success,
    ).toBe(false);
  });
});

describe("resetPasswordSchema", () => {
  it("requires the two new passwords to match", () => {
    expect(
      resetPasswordSchema.safeParse({
        password: "farm-secret-1",
        confirm_password: "farm-secret-2",
      }).success,
    ).toBe(false);
  });
});

describe("checkoutSchema", () => {
  const contact = {
    name: "Ada Obi",
    email: "ada@denisco.com",
    phone: "+2348012345678",
  };

  it("requires an address for delivery", () => {
    const parsed = checkoutSchema.safeParse({
      ...contact,
      delivery_method: "delivery",
      address: "",
    });

    expect(parsed.success).toBe(false);
    if (!parsed.success) {
      expect(firstIssue(parsed.error)).toBe("Please enter a delivery address");
    }
  });

  it("does not require an address for farm pickup", () => {
    const parsed = checkoutSchema.safeParse({
      ...contact,
      delivery_method: "pickup",
      address: "",
    });

    expect(parsed.success).toBe(true);
  });

  it("bounds the address at the length the API accepts", () => {
    expect(
      checkoutSchema.safeParse({
        ...contact,
        delivery_method: "delivery",
        address: "x".repeat(501),
      }).success,
    ).toBe(false);
  });

  it("only accepts the two delivery methods the shop offers", () => {
    expect(
      checkoutSchema.safeParse({
        ...contact,
        delivery_method: "courier",
        address: "3 Martin Luther King Street, Gwarimpa, Abuja",
      }).success,
    ).toBe(false);
  });
});

describe("bookingSchema", () => {
  const booking = {
    type_id: "6ac4f447f8e6fb7ab1cef6d3",
    date: "2026-10-17",
    time: "01:00 PM",
    name: "Ada Obi",
    email: "ada@denisco.com",
    phone: "+2348012345678",
    notes: "",
  };

  it("accepts a booking with no notes", () => {
    expect(bookingSchema.safeParse(booking).success).toBe(true);
  });

  it("requires a service, a date and a time", () => {
    for (const field of ["type_id", "date", "time"] as const) {
      expect(bookingSchema.safeParse({ ...booking, [field]: "" }).success).toBe(
        false,
      );
    }
  });

  it("bounds the notes at the 1000 characters the API accepts", () => {
    expect(
      bookingSchema.safeParse({ ...booking, notes: "x".repeat(1000) }).success,
    ).toBe(true);
    expect(
      bookingSchema.safeParse({ ...booking, notes: "x".repeat(1001) }).success,
    ).toBe(false);
  });
});

describe("contactSchema", () => {
  it("requires every field, since the message goes nowhere without them", () => {
    expect(
      contactSchema.safeParse({
        name: "Ada Obi",
        email: "ada@denisco.com",
        subject: "",
        message: "Hello",
      }).success,
    ).toBe(false);
  });
});

describe("firstIssue", () => {
  it("names the field for a message that reads as a fragment", () => {
    const parsed = registerSchema.safeParse({
      ...validRegistration,
      first_name: "",
    });

    expect(parsed.success).toBe(false);
    if (!parsed.success) {
      expect(firstIssue(parsed.error)).toBe("First name is required");
    }
  });

  it("leaves a message that is already a sentence alone", () => {
    const parsed = loginSchema.safeParse({ email: "ada@", password: "secret" });

    expect(parsed.success).toBe(false);
    if (!parsed.success) {
      expect(firstIssue(parsed.error)).toBe(
        "Please enter a valid email address",
      );
    }
  });
});
