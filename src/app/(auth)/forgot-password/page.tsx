"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { apiClient } from "@/lib/api/client";
import { API } from "@/lib/api/endpoints";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await apiClient.post(API.auth.forgotPassword, { email });
      setSent(true);
    } catch (err: unknown) {
      setError(
        err instanceof Error && err.message === "Failed to fetch"
          ? "Unable to connect to the server. Please try again later."
          : err instanceof Error
            ? err.message
            : "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 440 }}>
        <div className="card" style={{ padding: 38 }}>
          <h2 className="text-center">Forgot Password</h2>
          <p className="muted text-center text-[13px]">
            Enter your email and we&apos;ll send you a reset link
          </p>

          {error && (
            <div className="mb-4 rounded-[10px] bg-badge-red-bg px-4 py-3 text-sm font-bold text-badge-red-text">
              {error}
            </div>
          )}

          {sent ? (
            <div className="rounded-[10px] bg-badge-green-bg px-4 py-5 text-center text-sm font-bold text-badge-green-text">
              If an account with that email exists, a password reset link has
              been sent. Check your inbox.
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="fp-email">Email Address</label>
                <input
                  type="email"
                  id="fp-email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" variant="primary" block disabled={loading}>
                {loading ? "Sending…" : "Send Reset Link"}
              </Button>
            </form>
          )}

          <p className="mt-[18px] text-center text-[13.5px]">
            Remember your password? <Link href="/login">Login here</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
