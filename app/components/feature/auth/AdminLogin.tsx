"use client";

import { useState, useEffect, useRef } from "react";
import { useClerk, useSignIn, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { HiArrowLeft } from "react-icons/hi2";
import { adminLoginEmailSchema, adminLoginOtpSchema } from "@/utils/form-validation.util";
import Loader from "../../ui/Loader";

export default function AdminLogin() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const { signOut } = useClerk();
  const { isSignedIn, user } = useUser();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [otpExpired, setOtpExpired] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const resendTimerRef = useRef<NodeJS.Timeout | null>(null);

  const OTP_DURATION = 10 * 60;
  const RESEND_COOLDOWN = 30;

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (resendTimerRef.current) clearInterval(resendTimerRef.current);
    };
  }, []);

  function startOtpTimer() {
    if (timerRef.current) clearInterval(timerRef.current);

    setCountdown(OTP_DURATION);
    setOtpExpired(false);

    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          setOtpExpired(true);
          setError("Code has expired. Please request a new one.");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }

  function startResendCooldown() {
    if (resendTimerRef.current) clearInterval(resendTimerRef.current);

    setResendCooldown(RESEND_COOLDOWN);

    resendTimerRef.current = setInterval(() => {
      setResendCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(resendTimerRef.current!);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }

  function formatTime(seconds: number) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }

  async function handleSignOut() {
    setLoading(true);
    setError("");

    try {
      await signOut();
      setShowOtp(false);
      setCode("");
      setEmail("");
      setOtpExpired(false);
      setCountdown(0);
    } catch (err) {
      console.error("Sign out error:", err);
      setError("Failed to sign out. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function sendVerificationCode() {
    if (!isLoaded || !signIn) {
      setError("Authentication is still loading. Please try again.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const signInAttempt = await signIn.create({
        identifier: email.trim(),
      });

      const emailFactor = signInAttempt.supportedFirstFactors?.find(
        (factor) => factor.strategy === "email_code"
      );

      if (
        !emailFactor ||
        !("emailAddressId" in emailFactor) ||
        !emailFactor.emailAddressId
      ) {
        setError("No account found with this email address.");
        return;
      }

      await signIn.prepareFirstFactor({
        strategy: "email_code",
        emailAddressId: emailFactor.emailAddressId,
      });

      setShowOtp(true);
      setCode("");
      setOtpExpired(false);
      startOtpTimer();
      startResendCooldown();
    } catch (err: unknown) {
      const clerkError = err as {
        errors?: { longMessage?: string; message?: string }[];
      };

      const firstError = clerkError?.errors?.[0];

      setError(
        firstError?.longMessage ||
          firstError?.message ||
          (err instanceof Error
            ? err.message
            : "Failed to send verification code. Please try again.")
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleSendCode(e: React.FormEvent) {
    e.preventDefault();

    if (!isLoaded || !signIn) {
      setError("Authentication is still loading. Please try again.");
      return;
    }

    if (isSignedIn) {
      setError("You are already signed in. Please sign out before starting a new login.");
      return;
    }

    try {
      await adminLoginEmailSchema.validate({ email: email.trim() });
    } catch (validationError) {
      if (validationError instanceof Error) {
        setError(validationError.message);
      } else {
        setError("Invalid input");
      }
      return;
    }

    await sendVerificationCode();
  }

  async function handleResendCode() {
    if (resendCooldown > 0 || loading) return;
    await sendVerificationCode();
  }

  async function handleVerifyOtp(e: React.FormEvent) {
    e.preventDefault();

    if (!isLoaded || !signIn) {
      setError("Authentication is still loading. Please try again.");
      return;
    }

    if (otpExpired) {
      setError("Code has expired. Please request a new one.");
      return;
    }

    try {
      await adminLoginOtpSchema.validate({ code: code.trim() });
    } catch (validationError) {
      if (validationError instanceof Error) {
        setError(validationError.message);
      } else {
        setError("Invalid input");
      }
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await signIn.attemptFirstFactor({
        strategy: "email_code",
        code: code.trim(),
      });

      if (result.status === "complete") {
        if (!result.createdSessionId) {
          throw new Error("Sign-in completed but no session was created.");
        }

        await setActive({ session: result.createdSessionId });
        router.push("/dashboard");
      } else {
        setError("Verification was not completed. Please try again.");
      }
    } catch (err: unknown) {
      const clerkError = err as {
        errors?: { longMessage?: string; message?: string }[];
      };

      const firstError = clerkError?.errors?.[0];

      setError(
        firstError?.longMessage ||
          firstError?.message ||
          (err instanceof Error
            ? err.message
            : "Invalid verification code. Please try again.")
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleSignIn() {
    if (!isLoaded || !signIn) {
      setError("Authentication is still loading. Please try again.");
      return;
    }

    if (isSignedIn) {
      setError("You are already signed in. Please sign out first.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/dashboard",
      });
    } catch (err: unknown) {
      const clerkError = err as {
        errors?: { longMessage?: string; message?: string }[];
      };

      const firstError = clerkError?.errors?.[0];

      setError(
        firstError?.longMessage ||
          firstError?.message ||
          (err instanceof Error ? err.message : "Google sign in failed.")
      );

      setLoading(false);
    }
  }

  function handleBackToEmail() {
    if (timerRef.current) clearInterval(timerRef.current);
    if (resendTimerRef.current) clearInterval(resendTimerRef.current);

    setShowOtp(false);
    setCode("");
    setError("");
    setCountdown(0);
    setResendCooldown(0);
    setOtpExpired(false);
  }

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <Loader text="Loading authentication..." />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <div className="relative hidden w-1/2 lg:flex">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop')",
            backgroundColor: "#ea580c",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600/85 to-orange-900/90" />

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

      <div className="flex w-full items-center justify-center bg-white px-6 py-12 lg:w-1/2">
        <div className="w-full max-w-md">
          {isSignedIn ? (
            <div className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
              <div className="mb-6 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-2xl">
                  ✓
                </div>
                <h2 className="mt-5 text-2xl font-bold text-neutral-900">
                  Already signed in
                </h2>
                <p className="mt-2 text-sm text-neutral-500">
                  You are currently signed in as
                </p>
                <p className="mt-1 font-medium text-neutral-900">
                  {user?.primaryEmailAddress?.emailAddress ||
                    user?.username ||
                    "Authenticated user"}
                </p>
              </div>

              {error && (
                <div className="mb-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => router.push("/dashboard")}
                  className="w-full rounded-xl bg-orange-500 py-3.5 text-sm font-semibold text-white transition hover:bg-orange-600 active:scale-[0.98]"
                >
                  Go to Dashboard
                </button>

                <button
                  type="button"
                  onClick={handleSignOut}
                  disabled={loading}
                  className="w-full rounded-xl border border-neutral-300 bg-white py-3.5 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? "Signing out..." : "Sign Out"}
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-neutral-900">
                  Sign in to your account
                </h2>
                <p className="mt-2 text-sm text-neutral-500">
                  {showOtp
                    ? `Enter the verification code sent to ${email}`
                    : "Choose your preferred sign in method"}
                </p>
              </div>

              {!showOtp ? (
                <>
                  <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    disabled={loading}
                    className="flex w-full items-center justify-center gap-3 rounded-xl border border-neutral-300 bg-white py-3.5 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                    Continue with Google
                  </button>

                  <div className="my-6 flex items-center">
                    <div className="h-px flex-1 bg-neutral-200" />
                    <span className="px-3 text-xs uppercase text-neutral-400">
                      Or continue with
                    </span>
                    <div className="h-px flex-1 bg-neutral-200" />
                  </div>

                  <form onSubmit={handleSendCode} className="space-y-5">
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
                        className="w-full rounded-xl border border-neutral-300 bg-neutral-50 px-4 py-3.5 text-sm outline-none transition focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-500/20"
                        required
                        autoComplete="email"
                      />
                    </div>

                    {error && (
                      <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                        {error}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full rounded-xl bg-orange-500 py-3.5 text-sm font-semibold text-white transition hover:bg-orange-600 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {loading ? "Sending Code..." : "Send Verification Code"}
                    </button>
                  </form>
                </>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-5">
                  <div>
                    <label
                      htmlFor="otp"
                      className="mb-1.5 block text-sm font-medium text-neutral-700"
                    >
                      Verification Code
                    </label>
                    <input
                      id="otp"
                      type="text"
                      inputMode="numeric"
                      value={code}
                      onChange={(e) =>
                        setCode(e.target.value.replace(/\D/g, "").slice(0, 6))
                      }
                      placeholder="Enter 6-digit code"
                      maxLength={6}
                      className="w-full rounded-xl border border-neutral-300 bg-neutral-50 px-4 py-3.5 text-center text-lg tracking-[0.3em] outline-none transition focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-500/20"
                      required
                      autoFocus
                      autoComplete="one-time-code"
                      disabled={otpExpired}
                    />
                  </div>

                  {!otpExpired && countdown > 0 && (
                    <p className="text-center text-sm text-neutral-500">
                      Code expires in{" "}
                      <span className="font-medium text-neutral-700">
                        {formatTime(countdown)}
                      </span>
                    </p>
                  )}

                  {error && (
                    <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading || otpExpired}
                    className="w-full rounded-xl bg-orange-500 py-3.5 text-sm font-semibold text-white transition hover:bg-orange-600 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {loading ? "Verifying..." : "Verify Code"}
                  </button>

                  <button
                    type="button"
                    onClick={handleResendCode}
                    disabled={loading || resendCooldown > 0}
                    className="w-full text-center text-sm font-medium text-orange-600 hover:text-orange-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {resendCooldown > 0
                      ? `Resend code in ${resendCooldown}s`
                      : "Resend code"}
                  </button>

                  <button
                    type="button"
                    onClick={handleBackToEmail}
                    disabled={loading}
                    className="flex w-full items-center justify-center gap-2 text-center text-xs text-neutral-500 hover:text-neutral-800 disabled:opacity-50"
                  >
                    <HiArrowLeft className="h-4 w-4" />
                    Back to email sign in
                  </button>
                </form>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}