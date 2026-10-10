import { z } from "zod";

/**
 * Form schemas, mirroring the rules the API enforces.
 *
 * The API is the authority — it validates every request again, and a schema
 * here that disagreed would only produce a form that submits and then fails.
 * These exist so a customer is told what is wrong before a round trip, and so
 * the rules sit in one place rather than inline in each form.
 *
 * The bounds come from `internal/modules/users/domain/user.go`,
 * `orders/domain/order.go` and `consultations/application/service.go`.
 */

/** Trims before validating, the way every text field should behave. */
const trimmed = z.string().trim();

/** A personal name: required, 60 characters, as the API bounds it. */
export const personName = trimmed
  .min(1, "is required")
  .max(60, "must be 60 characters or fewer");

/** A name on an order or booking, where first and last arrive as one field. */
export const fullName = trimmed
  .min(1, "Please enter your name")
  .max(120, "Name must be 120 characters or fewer");

export const email = trimmed
  .min(1, "Please enter your email address")
  .email("Please enter a valid email address");

/**
 * A phone number. The API keeps the digits and a leading plus and asks for 10
 * to 15 digits, which accepts `08012345678` and `+2348012345678` alike without
 * forcing a Nigerian format on a customer abroad.
 */
export const phone = trimmed
  .min(1, "Please enter your phone number")
  .refine(
    (value) => {
      const digits = value.replace(/[^\d]/g, "");
      return digits.length >= 10 && digits.length <= 15;
    },
    { message: "Please enter a valid phone number" },
  );

/** A password: bcrypt ignores anything past 72 bytes, so the API refuses it. */
export const password = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(72, "Password must be 72 characters or fewer");

/** Registration, including the confirmation the API never sees. */
export const registerSchema = z
  .object({
    first_name: personName,
    last_name: personName,
    email,
    phone,
    password,
    confirm_password: z.string(),
  })
  .refine((values) => values.password === values.confirm_password, {
    path: ["confirm_password"],
    message: "Passwords do not match",
  });

export type RegisterValues = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email,
  password: z.string().min(1, "Please enter your password"),
});

export type LoginValues = z.infer<typeof loginSchema>;

/** Setting a new password from a reset link. */
export const resetPasswordSchema = z
  .object({
    password,
    confirm_password: z.string(),
  })
  .refine((values) => values.password === values.confirm_password, {
    path: ["confirm_password"],
    message: "Passwords do not match",
  });

export type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;

/**
 * Checkout. An address is required for delivery and ignored for pickup, which
 * is the rule the order module applies when it prices the order.
 */
export const checkoutSchema = z
  .object({
    name: fullName,
    email,
    phone,
    delivery_method: z.enum(["delivery", "pickup"]),
    address: trimmed.max(500, "Address must be 500 characters or fewer"),
  })
  .superRefine((values, ctx) => {
    if (values.delivery_method === "delivery" && values.address.length === 0) {
      ctx.addIssue({
        code: "custom",
        path: ["address"],
        message: "Please enter a delivery address",
      });
    }
  });

export type CheckoutValues = z.infer<typeof checkoutSchema>;

/** A consultation booking, as the public booking form submits it. */
export const bookingSchema = z.object({
  type_id: trimmed.min(1, "Please choose a consultation type"),
  date: trimmed.min(1, "Please choose a date"),
  time: trimmed.min(1, "Please choose a time"),
  name: fullName,
  email,
  phone,
  notes: trimmed.max(1000, "Notes must be 1000 characters or fewer"),
});

export type BookingValues = z.infer<typeof bookingSchema>;

/** The contact form, which has no API behind it yet. */
export const contactSchema = z.object({
  name: fullName,
  email,
  subject: trimmed
    .min(1, "Please enter a subject")
    .max(150, "Subject must be 150 characters or fewer"),
  message: trimmed
    .min(1, "Please enter a message")
    .max(2000, "Message must be 2000 characters or fewer"),
});

export type ContactValues = z.infer<typeof contactSchema>;

/**
 * Returns the first problem with a form, as a sentence to show above it.
 *
 * The forms show one message at a time rather than per-field errors, matching
 * the prototype, so this picks the first issue in field order.
 */
export function firstIssue(error: z.ZodError): string {
  const issue = error.issues[0];
  if (!issue) return "Please check the form and try again.";

  // Field-level messages read as fragments ("is required"), so they are
  // prefixed with the field they belong to; whole-form ones read as sentences.
  const field = issue.path[0];
  if (typeof field === "string" && /^(is|must)\b/.test(issue.message)) {
    return `${fieldLabel(field)} ${issue.message}`;
  }

  return issue.message;
}

/** Turns a field name into the label a customer sees. */
function fieldLabel(field: string): string {
  const labels: Record<string, string> = {
    first_name: "First name",
    last_name: "Last name",
    confirm_password: "Password confirmation",
    delivery_method: "Delivery method",
    type_id: "Consultation type",
  };

  return labels[field] ?? field.charAt(0).toUpperCase() + field.slice(1);
}
