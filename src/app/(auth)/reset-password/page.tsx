"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { SITE } from "@/lib/constants";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }
    if (!token) {
      setError("Invalid or missing reset token");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token, password }),
        },
      );
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error?.message || "Reset failed");
      }
      setDone(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
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
          <h1 className="text-[28px] font-semibold">Reset Password</h1>
          <p className="text-sm text-muted">Enter your new password below</p>
        </div>

        {error && (
          <div className="mb-4 rounded-[10px] bg-badge-red-bg px-4 py-3 text-sm font-bold text-badge-red-text">
            {error}
          </div>
        )}

        {done ? (
          <div className="text-center">
            <div className="mb-4 rounded-[10px] bg-badge-green-bg px-4 py-5 text-sm font-bold text-badge-green-text">
              Password reset successfully!
            </div>
            <Link
              href="/login"
              className="inline-block rounded-full bg-forest px-7 py-[13px] text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-olive"
            >
              Sign In
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label className="mb-2 block text-[13px] font-bold text-forest">
                New Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-[10px] border-[1.5px] border-line bg-white px-4 py-[13px] text-sm outline-none focus:border-olive"
                required
                minLength={6}
              />
            </div>
            <div className="mb-5">
              <label className="mb-2 block text-[13px] font-bold text-forest">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full rounded-[10px] border-[1.5px] border-line bg-white px-4 py-[13px] text-sm outline-none focus:border-olive"
                required
                minLength={6}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-forest px-7 py-[15px] text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-olive disabled:cursor-not-allowed disabled:opacity-45"
            >
              {loading ? "Resetting…" : "Reset Password"}
            </button>
          </form>
        )}

        <p className="mt-6 text-center text-sm text-muted">
          Remember your password?{" "}
          <Link
            href="/login"
            className="font-bold text-olive hover:text-forest"
          >
            Sign In
          </Link>
        </p>
      </div>
    </section>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense>
      <ResetPasswordForm />
    </Suspense>
  );
}
