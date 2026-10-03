"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { SITE } from "@/lib/constants";
import { useAuth } from "@/lib/auth/auth-provider";
import { useRouter, useSearchParams } from "next/navigation";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/account";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      router.push(redirect);
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Login failed. Please try again.",
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
          <h1 className="text-[28px] font-semibold">Welcome Back</h1>
          <p className="text-sm text-muted">Sign in to your account</p>
        </div>

        {error && (
          <div className="mb-4 rounded-[10px] bg-badge-red-bg px-4 py-3 text-sm font-bold text-badge-red-text">
            {error}
          </div>
        )}

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
          <div className="mb-5">
            <label className="mb-2 block text-[13px] font-bold text-forest">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-[10px] border-[1.5px] border-line bg-white px-4 py-[13px] text-sm outline-none focus:border-olive"
              placeholder="••••••••"
              required
            />
          </div>
          <div className="mb-5 text-right">
            <Link
              href="/forgot-password"
              className="text-xs font-bold text-olive hover:text-forest"
            >
              Forgot Password?
            </Link>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-forest px-7 py-[15px] text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-olive disabled:cursor-not-allowed disabled:opacity-45"
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>

        <div className="mt-4 rounded-[10px] bg-cream-deep p-3 text-center text-xs text-muted">
          <strong>Demo:</strong> demo@denisco.com / demo123
        </div>

        <p className="mt-6 text-center text-sm text-muted">
          Don&rsquo;t have an account?{" "}
          <Link href="/register" className="font-bold text-olive hover:text-forest">
            Register
          </Link>
        </p>
      </div>
    </section>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
