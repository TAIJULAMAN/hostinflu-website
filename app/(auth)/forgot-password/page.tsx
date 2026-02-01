"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Mail, ArrowLeft } from "lucide-react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Forgot password request for:", email)
    setSubmitted(true)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-8">
            <span className="font-bold text-2xl text-foreground">≠ Hostinflu</span>
          </Link>
          <h1 className="text-4xl font-bold text-foreground mb-2">Reset Password</h1>
          <p className="text-muted-foreground">Enter your email to receive a reset link</p>
        </div>

        {/* Forgot Password Card */}
        <Card className="p-8 border-2 border-border bg-white shadow-lg">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-semibold text-foreground">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                    required
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-2">We'll send you an OTP code to verify your email</p>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                size="lg"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-3 font-semibold"
              >
                Send OTP
              </Button>
            </form>
          ) : (
            <div className="space-y-6 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100">
                <Mail className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Check Your Email</h2>
                <p className="text-muted-foreground">
                  We've sent an OTP code to <span className="font-semibold text-foreground">{email}</span>
                </p>
              </div>
              <p className="text-sm text-muted-foreground">
                Enter the 6-digit code in the next step. The code will expire in 10 minutes.
              </p>
              <Link href="/otp-verification">
                <Button
                  type="button"
                  size="lg"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-3 font-semibold"
                >
                  Enter OTP Code
                </Button>
              </Link>
            </div>
          )}
        </Card>

        {/* Back to Sign In */}
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
