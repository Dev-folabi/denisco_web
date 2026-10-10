"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/constants";
import { contactSchema, firstIssue } from "@/lib/validation/schemas";

/**
 * The contact form.
 *
 * There is no contact endpoint on the API — the architecture's endpoint list
 * has none — so the message is handed to the visitor's mail client addressed
 * to the farm, rather than posted into nothing. The fields are still validated
 * first, so a half-filled form does not open an empty mail window.
 */
export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");

    const parsed = contactSchema.safeParse({ name, email, subject, message });
    if (!parsed.success) {
      setError(firstIssue(parsed.error));
      return;
    }

    const body = `${parsed.data.message}\n\n—\n${parsed.data.name}\n${parsed.data.email}`;

    window.location.href = `mailto:${SITE.company.email}?subject=${encodeURIComponent(
      parsed.data.subject,
    )}&body=${encodeURIComponent(body)}`;

    setSent(true);
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {error && (
        <p
          role="alert"
          className="mb-4 rounded-[12px] bg-badge-red-bg px-4 py-3 text-[13px] text-danger"
        >
          {error}
        </p>
      )}

      {sent && (
        <p className="mb-4 rounded-[12px] bg-badge-green-bg px-4 py-3 text-[13px] text-forest">
          Your email client should now be open with the message ready to send.
          If nothing happened, write to {SITE.company.email}.
        </p>
      )}

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="ct-name">Full Name</label>
          <input
            type="text"
            id="ct-name"
            className="form-control"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="ct-email">Email Address</label>
          <input
            type="email"
            id="ct-email"
            className="form-control"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="ct-subject">Subject</label>
        <input
          type="text"
          id="ct-subject"
          className="form-control"
          value={subject}
          onChange={(event) => setSubject(event.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="ct-msg">Message</label>
        <textarea
          id="ct-msg"
          rows={5}
          className="form-control"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          required
        />
      </div>
      <Button type="submit" variant="primary" block>
        Send Message
      </Button>
    </form>
  );
}
