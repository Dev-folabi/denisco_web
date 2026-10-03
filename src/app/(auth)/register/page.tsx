"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { SITE } from "@/lib/constants";
import { useAuth } from "@/lib/auth/auth-provider";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    confirm_password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const router = useRouter();

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirm_password) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      await register({
        first_name: form.first_name,
        last_name: form.last_name,
        email: form.email,
        phone: form.phone,
        password: form.password,
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
    <section className="flex min-h-dvh items-center justify-center bg-cream px-6 py-16">
      <div className="w-full max-w-[480px] rounded-[18px] border border-line bg-white p-8 shadow-[var(--shadow-default)]">
        <div className="mb-6 text-center">
          <Image
            src={SITE.media.logo}
            alt="DENISCO"
            width={60}
            height={60}
            className="mx-auto mb-4 size-[60px] rounded-full border border-line object-cover"
          />
          <h1 className="text-[28px] font-semibold">Create an Account</h1>
          <p className="text-sm text-muted">
            Demo registration for prototype purposes only.
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-[10px] bg-badge-red-bg px-4 py-3 text-sm font-bold text-badge-red-text">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-5 grid grid-cols-2 gap-5 max-sm:grid-cols-1">
            <div>
              <label className="mb-2 block text-[13px] font-bold text-forest">
                First Name
              </label>
              <input
                type="text"
                value={form.first_name}
                onChange={(e) => update("first_name", e.target.value)}
                className="w-full rounded-[10px] border-[1.5px] border-line bg-white px-4 py-[13px] text-sm outline-none focus:border-olive"
                required
              />
            </div>
            <div>
              <label className="mb-2 block text-[13px] font-bold text-forest">
                Last Name
              </label>
              <input
                type="text"
                value={form.last_name}
                onChange={(e) => update("last_name", e.target.value)}
                className="w-full rounded-[10px] border-[1.5px] border-line bg-white px-4 py-[13px] text-sm outline-none focus:border-olive"
                required
              />
            </div>
          </div>
          <div className="mb-5">
            <label className="mb-2 block text-[13px] font-bold text-forest">
              Email Address
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              className="w-full rounded-[10px] border-[1.5px] border-line bg-white px-4 py-[13px] text-sm outline-none focus:border-olive"
              required
            />
          </div>
          <div className="mb-5">
            <label className="mb-2 block text-[13px] font-bold text-forest">
              Phone Number
            </label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              className="w-full rounded-[10px] border-[1.5px] border-line bg-white px-4 py-[13px] text-sm outline-none focus:border-olive"
              placeholder="+234 800 000 0000"
              required
            />
          </div>
          <div className="mb-5 grid grid-cols-2 gap-5 max-sm:grid-cols-1">
            <div>
              <label className="mb-2 block text-[13px] font-bold text-forest">
                Password
              </label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => update("password", e.target.value)}
                className="w-full rounded-[10px] border-[1.5px] border-line bg-white px-4 py-[13px] text-sm outline-none focus:border-olive"
                required
                minLength={6}
              />
            </div>
            <div>
              <label className="mb-2 block text-[13px] font-bold text-forest">
                Confirm Password
              </label>
              <input
                type="password"
                value={form.confirm_password}
                onChange={(e) => update("confirm_password", e.target.value)}
                className="w-full rounded-[10px] border-[1.5px] border-line bg-white px-4 py-[13px] text-sm outline-none focus:border-olive"
                required
                minLength={6}
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-forest px-7 py-[15px] text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-olive disabled:cursor-not-allowed disabled:opacity-45"
          >
            {loading ? "Creating Account…" : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted">
          Already have an account?{" "}
          <Link href="/login" className="font-bold text-olive hover:text-forest">
            Login here
          </Link>
        </p>
      </div>
    </section>
  );
}
