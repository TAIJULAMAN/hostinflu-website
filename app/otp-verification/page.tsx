"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"

export default function OTPVerificationPage() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [resendTimer, setResendTimer] = useState(0)
  const [verifying, setVerifying] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get("email") || ""

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`)
      nextInput?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`)
      prevInput?.focus()
    }
  }

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault()
    const otpCode = otp.join("")

    if (otpCode.length !== 6) {
      alert("Please enter a valid 6-digit OTP")
      return
    }

    console.log("[v0] OTP verification attempted with:", otpCode)

    setVerifying(true)
    setTimeout(() => {
      router.push(`/reset-password?email=${email}&otp=${otpCode}`)
    }, 500)
  }

  const handleResend = () => {
    console.log("[v0] OTP resend requested")
    setResendTimer(60)
    const interval = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-8">
            <span className="font-bold text-2xl text-foreground">≠ Hostinflu</span>
          </Link>
          <h1 className="text-4xl font-bold text-foreground mb-2">Verify OTP</h1>
          <p className="text-muted-foreground">Enter the 6-digit code sent to your email</p>
        </div>

        {/* OTP Verification Card */}
        <Card className="p-8 border-2 border-border bg-white shadow-lg">
          <form onSubmit={handleVerify} className="space-y-8">
            {/* Email Display */}
            {email && (
              <div className="bg-teal-50 border border-teal-200 rounded-lg p-3 text-center">
                <p className="text-xs text-muted-foreground">Code sent to</p>
                <p className="text-sm font-semibold text-foreground">{email}</p>
              </div>
            )}

            {/* OTP Input Fields */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-4">Verification Code</label>
              <div className="flex gap-2 justify-center">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-12 border-2 border-border rounded-lg text-center text-xl font-bold focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
                  />
                ))}
              </div>
              <p className="text-xs text-muted-foreground text-center mt-3">
                Didn't receive the code?{" "}
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={resendTimer > 0}
                  className="text-primary font-semibold hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend OTP"}
                </button>
              </p>
            </div>

            {/* Verify Button */}
            <Button
              type="submit"
              size="lg"
              disabled={verifying}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-3 font-semibold disabled:opacity-70"
            >
              {verifying ? "Verifying..." : "Verify OTP"}
            </Button>
          </form>
        </Card>

        {/* Back Link */}
        <div className="mt-6">
          <Link href="/signin" className="inline-flex items-center gap-2 text-primary hover:underline font-semibold">
            <ArrowLeft className="w-4 h-4" />
            Back to Sign In
          </Link>
        </div>
      </div>
    </main>
  )
}
