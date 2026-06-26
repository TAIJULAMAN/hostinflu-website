"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Mail, ArrowLeft, Loader2 } from "lucide-react"
import { useForgotPasswordMutation } from "@/Redux/api/auth/authApi"
import { toast } from "sonner"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await forgotPassword({ email }).unwrap()
      if (res.success || res.message) {
        toast.success(res.message || "OTP sent to email")
        setSubmitted(true)
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to send OTP")
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-slate-50 font-sans">
      {/* Decorative ambient background */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#5CC7BD]/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-400/10 blur-[120px] pointer-events-none" />
      
      <div className="w-full max-w-md z-10">
        <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-xl rounded-2xl overflow-hidden ring-1 ring-slate-900/5">
          <div className="p-8 sm:p-10">
            {/* Header */}
            <div className="text-center mb-8">
              <Link href="/" className="inline-flex items-center justify-center gap-2 mb-8 hover:opacity-80 transition-opacity">
                <Image src="/mini.png" alt="Hostinflu Logo" width={32} height={32} className="object-contain" />
                <span className="font-extrabold text-2xl text-slate-900 tracking-tight">Hostinflu</span>
              </Link>
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">Reset Password</h1>
              <p className="text-slate-500 text-sm">Enter your email to receive a recovery code</p>
            </div>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-semibold text-slate-700">
                    Email Address
                  </label>
                  <div className="relative group">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-[#5CC7BD] transition-colors" />
                    <input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5CC7BD]/20 focus:border-[#5CC7BD] transition-all text-slate-900 placeholder:text-slate-400 shadow-sm"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#5CC7BD] hover:bg-[#4eb3a9] text-white h-12 rounded-xl font-semibold shadow-lg shadow-teal-500/25 transition-all active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </div>
                  ) : (
                    "Send Recovery Code"
                  )}
                </Button>
              </form>
            ) : (
              <div className="space-y-6 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="mx-auto w-20 h-20 bg-teal-50 rounded-full flex items-center justify-center mb-2">
                  <div className="w-14 h-14 bg-[#5CC7BD]/20 rounded-full flex items-center justify-center">
                    <Mail className="w-7 h-7 text-[#5CC7BD]" />
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">Check your inbox</h2>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    We've sent a 4-digit recovery code to <br/>
                    <span className="font-semibold text-slate-900">{email}</span>
                  </p>
                </div>
                
                <Link href={`/otp-verification?email=${encodeURIComponent(email)}`} className="block pt-2">
                  <Button
                    type="button"
                    className="w-full bg-[#5CC7BD] hover:bg-[#4eb3a9] text-white h-12 rounded-xl font-semibold shadow-lg shadow-teal-500/25 transition-all active:scale-[0.98]"
                  >
                    Enter Code
                  </Button>
                </Link>
              </div>
            )}
          </div>
          
          {/* Footer */}
          <div className="px-8 py-5 bg-slate-50/50 border-t border-slate-100 text-center">
            <Link 
              href="/signin" 
              className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-[#5CC7BD] font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to sign in
            </Link>
          </div>
        </Card>
      </div>
    </main>
  )
}

