"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { apiClient } from "@/lib/api/client";
import { API } from "@/lib/api/endpoints";

export function ResetPasswordForm({ token }: { token?: string }) {
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
      await apiClient.post(API.auth.resetPassword, { token, password });
      setDone(true);
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
          <h2 className="text-center">Reset Password</h2>
          <p className="muted text-center text-[13px]">
            Enter your new password below
          </p>

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
              <Link href="/login" className="btn btn-primary">
                Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="rp-pass">New Password</label>
                <input
                  type="password"
                  id="rp-pass"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                />
              </div>
              <div className="form-group">
                <label htmlFor="rp-pass2">Confirm Password</label>
                <input
                  type="password"
                  id="rp-pass2"
                  className="form-control"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  required
                  minLength={8}
                />
              </div>
              <Button type="submit" variant="primary" block disabled={loading}>
                {loading ? "Resetting…" : "Reset Password"}
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
