"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ApiRequestError } from "@/lib/api/client";
import { contactSchema, firstIssue } from "@/lib/validation/schemas";
import { useSubmitContact } from "@/features/contact/hooks";

/**
 * The contact form.
 *
 * The message is posted to the API, which validates it again and hands it to
 * the farm by email — so a visitor gets a reply wherever they are, rather than
 * being handed a pre-filled mail window they may never open.
 */
export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const submit = useSubmitContact();

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");

    const parsed = contactSchema.safeParse({ name, email, subject, message });
    if (!parsed.success) {
      setError(firstIssue(parsed.error));
      return;
    }

    try {
      await submit.mutateAsync(parsed.data);
      setSent(true);
    } catch (cause) {
      setError(
        cause instanceof ApiRequestError
          ? cause.message
          : "We could not send your message just now. Please try again.",
      );
    }
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
          Thank you for your message. We have received it and will get back to
          you shortly.
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
      <Button
        type="submit"
        variant="primary"
        block
        disabled={submit.isPending}
      >
        {submit.isPending ? "Sending…" : "Send Message"}
      </Button>
    </form>
  );
}
