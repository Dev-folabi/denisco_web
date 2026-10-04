"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth/auth-provider";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    const [firstName, ...rest] = name.trim().split(/\s+/);
    setLoading(true);
    try {
      await register({
        first_name: firstName || "",
        last_name: rest.join(" "),
        email,
        phone,
        password,
      });
      router.push("/account");
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Registration failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 480 }}>
        <div className="card" style={{ padding: 38 }}>
          <h2 className="text-center">Create an Account</h2>
          <p className="muted text-center text-[13px]">
            Demo registration for prototype purposes only.
          </p>

          {error && (
            <div className="mb-4 rounded-[10px] bg-badge-red-bg px-4 py-3 text-sm font-bold text-badge-red-text">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="rg-name">Full Name</label>
              <input
                type="text"
                id="rg-name"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="rg-email">Email Address</label>
              <input
                type="email"
                id="rg-email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="rg-phone">Phone Number</label>
              <input
                type="tel"
                id="rg-phone"
                className="form-control"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="rg-pass">Password</label>
              <input
                type="password"
                id="rg-pass"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
            <div className="form-group">
              <label htmlFor="rg-pass2">Confirm Password</label>
              <input
                type="password"
                id="rg-pass2"
                className="form-control"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
            <Button type="submit" variant="primary" block disabled={loading}>
              {loading ? "Creating Account…" : "Create Account"}
            </Button>
          </form>

          <p className="mt-[18px] text-center text-[13.5px]">
            Already have an account?{" "}
            <Link href="/login">Login here</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
