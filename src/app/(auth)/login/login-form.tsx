"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth/auth-provider";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

/**
 * Resolves the post-login destination.
 *
 * Only same-site paths are honoured, so a crafted `?redirect=` cannot bounce
 * a freshly signed-in customer to another domain.
 */
function safeRedirect(redirect?: string) {
  if (!redirect) return "/account";

  const path = redirect.startsWith("/") ? redirect : `/${redirect}`;
  if (path.startsWith("//")) return "/account";

  return path;
}

export function LoginForm({ redirect }: { redirect?: string }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();
  const redirectTo = safeRedirect(redirect);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      router.push(redirectTo);
    } catch (err: unknown) {
      setError(
        err instanceof Error && err.message === "Failed to fetch"
          ? "Unable to connect to the server. Please try again later."
          : err instanceof Error
            ? err.message
            : "Login failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 440 }}>
        <div className="card" style={{ padding: 38 }}>
          <h2 className="text-center">Customer Login</h2>
          <p className="muted text-center text-[13px]">
            Sign in to track your orders and consultation bookings.
          </p>

          {error && (
            <div className="mb-4 rounded-[10px] bg-badge-red-bg px-4 py-3 text-sm font-bold text-badge-red-text">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="li-email">Email Address</label>
              <input
                type="email"
                id="li-email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="li-pass">Password</label>
              <input
                type="password"
                id="li-pass"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Link
                href="/forgot-password"
                className="mt-2 block text-right text-[13px] font-bold text-olive hover:text-forest"
              >
                Forgot password?
              </Link>
            </div>
            <Button type="submit" variant="primary" block disabled={loading}>
              {loading ? "Signing in…" : "Login"}
            </Button>
          </form>

          <p className="mt-[18px] text-center text-[13.5px]">
            Don&apos;t have an account?{" "}
            <Link href="/register">Register here</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
