"use client";

import { useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!isLoaded) return;

    setLoading(true);
    setError("");

    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/dashboard");
      }
    } catch (err: any) {
      setError(
        err?.errors?.[0]?.longMessage ||
          err?.errors?.[0]?.message ||
          "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left side - Image panel (desktop only) */}
     {/* Left side - Image panel (desktop only) */}
<div className="relative hidden w-1/2 lg:flex">
  {/* Background image */}
  <div
    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
    style={{
      backgroundImage:
        "url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop')",
      backgroundColor: "#ea580c", // fallback orange if image fails
    }}
  />

  {/* Dark orange overlay */}
  <div className="absolute inset-0 bg-gradient-to-br from-orange-600/85 to-orange-900/90" />

  {/* Brand content */}
  <div className="relative z-10 flex h-full flex-col justify-between p-12 text-white">
    <div>
      <p className="text-sm font-medium tracking-widest text-orange-100">
        CHANOR
      </p>
      <h1 className="mt-3 text-4xl font-bold leading-tight">
        Admin Portal
      </h1>
    </div>

    <div>
      <p className="text-lg font-medium">Secure access for your team</p>
      <p className="mt-3 max-w-sm text-sm leading-relaxed text-orange-50">
        Manage operations, users, and insights from one clean dashboard.
      </p>
    </div>

    <p className="text-xs text-orange-200">
      © {new Date().getFullYear()} Chanor. All rights reserved.
    </p>
  </div>
</div>
      {/* Right side - Form */}
      <div className="flex w-full items-center justify-center bg-white px-6 py-12 lg:w-1/2">
        <div className="w-full max-w-md">
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-neutral-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-sm text-neutral-500">
              Enter your credentials to continue
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-neutral-700"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@chanor.com"
                className="w-full rounded-xl border border-neutral-300 bg-neutral-50 px-4 py-3.5 text-sm outline-none transition
                           focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-500/20"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-medium text-neutral-700"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full rounded-xl border border-neutral-300 bg-neutral-50 px-4 py-3.5 text-sm outline-none transition
                           focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-500/20"
                required
              />
            </div>

            {/* Error */}
            {error && (
              <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full rounded-xl bg-orange-500 py-3.5 text-sm font-semibold text-white
                         transition hover:bg-orange-600 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}