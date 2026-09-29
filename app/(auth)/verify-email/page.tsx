"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { Mail, ArrowLeft, Loader2, CheckCircle2, RotateCw } from "lucide-react";
import { toast } from "sonner";

import {
  useVerifyRegistrationOtpMutation,
  useResendRegistrationOtpMutation,
} from "@/Redux/api/auth/authApi";
import { setUser } from "@/Redux/Slice/authSlice";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();

  const initialEmail = searchParams.get("email") || "";
  const [email, setEmail] = useState(initialEmail);
  const [isEditingEmail, setIsEditingEmail] = useState(!initialEmail);

  // 6-digit OTP state
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Resend cooldown timer in seconds
  const [resendTimer, setResendTimer] = useState<number>(60);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const [verifyOtp, { isLoading: isVerifying }] =
    useVerifyRegistrationOtpMutation();
  const [resendOtp, { isLoading: isResending }] =
    useResendRegistrationOtpMutation();

  useEffect(() => {
    if (initialEmail) {
      setEmail(initialEmail);
    }
  }, [initialEmail]);

  // Handle countdown timer
  useEffect(() => {
    if (resendTimer <= 0) return;
    const interval = setInterval(() => {
      setResendTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [resendTimer]);

  // Focus the first input on initial load
  useEffect(() => {
    if (!isEditingEmail && inputRefs.current[0]) {
      inputRefs.current[0]?.focus();
    }
  }, [isEditingEmail]);

  const handleOtpChange = (index: number, value: string) => {
    const cleanValue = value.replace(/\D/g, ""); // Digits only

    if (!cleanValue) {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
      return;
    }

    // Single digit input
    const newOtp = [...otp];
    newOtp[index] = cleanValue.slice(-1);
    setOtp(newOtp);

    // Auto-focus next field
    if (index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pastedData) return;

    const newOtp = [...otp];
    for (let i = 0; i < pastedData.length; i++) {
      newOtp[i] = pastedData[i];
    }
    setOtp(newOtp);

    // Focus either the next empty slot or the last one
    const targetIndex = Math.min(pastedData.length, 5);
    inputRefs.current[targetIndex]?.focus();
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    const fullOtp = otp.join("");

    if (!email.trim()) {
      toast.error("Please enter a valid email address");
      setIsEditingEmail(true);
      return;
    }

    if (fullOtp.length !== 6) {
      toast.error("Please enter all 6 digits of the verification code");
      return;
    }

    try {
      const res = await verifyOtp({
        email: email.trim().toLowerCase(),
        otp: fullOtp,
      }).unwrap();

      setIsSuccess(true);
      toast.success(res?.message || "Email verified successfully!");

      const userData = res?.data?.user || res?.data;
      const accessToken = res?.accessToken || res?.data?.accessToken;
      const refreshToken = res?.refreshToken || res?.data?.refreshToken;

      if (userData && accessToken) {
        dispatch(
          setUser({
            user: userData,
            token: accessToken,
            refreshToken: refreshToken || null,
          }),
        );
      }

      // Smooth redirection to homepage / dashboard
      setTimeout(() => {
        window.location.href = "/";
      }, 1200);
    } catch (error: any) {
      const errorMessage =
        error?.data?.message ||
        error?.message ||
        "Invalid verification code. Please try again.";
      toast.error(errorMessage);
    }
  };

  const handleResend = async () => {
    if (!email.trim()) {
      toast.error("Please enter your registered email address first");
      setIsEditingEmail(true);
      return;
    }

    try {
      const res = await resendOtp({
        email: email.trim().toLowerCase(),
      }).unwrap();

      toast.success(res?.message || "A new 6-digit code has been sent to your email");
      setResendTimer(60);
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } catch (error: any) {
      const errorMessage =
        error?.data?.message ||
        error?.message ||
        "Failed to resend code. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-slate-50 font-sans">
      {/* Decorative ambient background */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#5CC7BD]/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-400/10 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-lg z-10">
        <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-xl rounded-2xl overflow-hidden ring-1 ring-slate-900/5">
          <div className="p-6 sm:p-10">
            {/* Header */}
            <div className="text-center mb-6">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 mb-6 hover:opacity-80 transition-opacity"
              >
                <Image
                  src="/mini.png"
                  alt="Hostinflu Logo"
                  width={32}
                  height={32}
                  className="object-contain"
                />
                <span className="font-extrabold text-2xl text-slate-900 tracking-tight">
                  Hostinflu
                </span>
              </Link>

              <div className="mx-auto w-16 h-16 bg-[#5CC7BD]/10 rounded-2xl flex items-center justify-center mb-3">
                <Mail className="w-8 h-8 text-[#5CC7BD]" />
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
                Verify Your Email
              </h1>
              <p className="text-slate-500 text-sm max-w-sm mx-auto">
                We've sent a 6-digit verification code to your email. Enter it below to activate your account.
              </p>
            </div>

            {/* Email display and edit option */}
            <div className="mb-6 p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl text-center">
              {isEditingEmail ? (
                <div className="flex items-center gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter registered email"
                    className="flex-1 px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5CC7BD]/30"
                  />
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => {
                      if (email.trim()) setIsEditingEmail(false);
                    }}
                    className="bg-[#5CC7BD] hover:bg-[#4eb3a9] text-white text-xs h-8 px-3"
                  >
                    Done
                  </Button>
                </div>
              ) : (
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <div className="text-left truncate mr-2">
                    <span className="text-slate-400 block text-xs">Verification sent to:</span>
                    <span className="font-semibold text-slate-800 truncate block">
                      {email || "No email specified"}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsEditingEmail(true)}
                    className="text-[#5CC7BD] hover:underline font-semibold text-xs whitespace-nowrap"
                  >
                    Change
                  </button>
                </div>
              )}
            </div>

            {/* OTP Form */}
            <form onSubmit={handleVerify} className="space-y-6">
              <div>
                <label className="block text-center text-xs font-semibold text-slate-600 uppercase tracking-wider mb-4">
                  Enter 6-Digit Code
                </label>

                {/* 6 Digit Input boxes */}
                <div className="flex items-center justify-center gap-2 sm:gap-3">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => {
                        inputRefs.current[index] = el;
                      }}
                      id={`reg-otp-${index}`}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      onPaste={handlePaste}
                      disabled={isVerifying || isSuccess}
                      className="w-11 h-13 sm:w-13 sm:h-14 text-center text-xl sm:text-2xl font-bold bg-white border-2 border-slate-200 rounded-xl focus:outline-none focus:border-[#5CC7BD] focus:ring-4 focus:ring-[#5CC7BD]/15 transition-all text-slate-900 shadow-sm disabled:opacity-50"
                      autoComplete="one-time-code"
                    />
                  ))}
                </div>
              </div>

              {/* Resend OTP Section */}
              <div className="text-center text-xs sm:text-sm text-slate-500">
                Didn't get the code?{" "}
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={resendTimer > 0 || isResending || isVerifying}
                  className="inline-flex items-center gap-1 font-semibold text-[#5CC7BD] hover:underline disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  {isResending ? (
                    <>
                      <RotateCw className="w-3.5 h-3.5 animate-spin" />
                      Sending...
                    </>
                  ) : resendTimer > 0 ? (
                    `Resend in ${resendTimer}s`
                  ) : (
                    "Resend OTP"
                  )}
                </button>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isVerifying || isSuccess || otp.join("").length !== 6}
                className="w-full bg-[#5CC7BD] hover:bg-[#4eb3a9] text-white h-12 rounded-xl font-semibold shadow-lg shadow-teal-500/25 transition-all active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100 text-sm sm:text-base"
              >
                {isVerifying ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Verifying Account...
                  </div>
                ) : isSuccess ? (
                  <div className="flex items-center gap-2 text-white">
                    <CheckCircle2 className="w-5 h-5" />
                    Verified! Redirecting...
                  </div>
                ) : (
                  "Verify & Continue"
                )}
              </Button>
            </form>
          </div>

          {/* Footer links */}
          <div className="px-6 sm:px-10 py-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between text-xs sm:text-sm">
            <Link
              href="/signup"
              className="inline-flex items-center gap-1.5 text-slate-500 hover:text-[#5CC7BD] font-medium transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Sign Up
            </Link>

            <Link
              href="/signin"
              className="text-slate-500 hover:text-[#5CC7BD] font-medium transition-colors"
            >
              Sign In Instead
            </Link>
          </div>
        </Card>
      </div>
    </main>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <Loader2 className="w-8 h-8 animate-spin text-[#5CC7BD]" />
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}
