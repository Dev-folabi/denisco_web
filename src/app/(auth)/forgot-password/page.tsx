"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { SITE } from "@/lib/constants";

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
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        },
      );
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error?.message || "Request failed");
      }
      setSent(true);
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Something went wrong",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="flex min-h-dvh items-center justify-center bg-cream px-6 py-16">
      <div className="w-full max-w-[440px] rounded-[18px] border border-line bg-white p-8 shadow-[var(--shadow-default)]">
        <div className="mb-6 text-center">
          <Image
            src={SITE.media.logo}
            alt="DENISCO"
            width={60}
            height={60}
            className="mx-auto mb-4 size-[60px] rounded-full border border-line object-cover"
          />
          <h1 className="text-[28px] font-semibold">Forgot Password</h1>
          <p className="text-sm text-muted">
            Enter your email and we&apos;ll send you a reset link
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-[10px] bg-badge-red-bg px-4 py-3 text-sm font-bold text-badge-red-text">
            {error}
          </div>
        )}

        {sent ? (
          <div className="rounded-[10px] bg-badge-green-bg px-4 py-5 text-center text-sm font-bold text-badge-green-text">
            If an account with that email exists, a password reset link has been
            sent. Check your inbox.
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label className="mb-2 block text-[13px] font-bold text-forest">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-[10px] border-[1.5px] border-line bg-white px-4 py-[13px] text-sm outline-none focus:border-olive"
                placeholder="you@example.com"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-forest px-7 py-[15px] text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-olive disabled:cursor-not-allowed disabled:opacity-45"
            >
              {loading ? "Sending…" : "Send Reset Link"}
            </button>
          </form>
        )}

        <p className="mt-6 text-center text-sm text-muted">
          Remember your password?{" "}
          <Link
            href="/login"
            className="font-bold text-olive hover:text-forest"
          >
            Login here
          </Link>
        </p>
      </div>
    </section>
  );
}
