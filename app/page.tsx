"use client"

import { Navbar } from "@/components/commom/navbar"
import { Hero } from "@/components/landing/hero"
import { SocialProof } from "@/components/landing/social-proof"
import { HowItWorks } from "@/components/landing/how-it-works"
import { ValueProps } from "@/components/landing/value-props"
import { Features } from "@/components/landing/features"
import { Testimonials } from "@/components/landing/testimonials"
import { Pricing } from "@/components/landing/pricing"
import { Footer } from "@/components/commom/footer"
import TopHost from "@/components/landing/top-host"
import TopInfluencer from "@/components/landing/top-influencer"
import { WhyChoose } from "@/components/landing/why-choose"

export default function Home() {
  return (
    <main className="min-h-screen bg-background font-sans">
      <Navbar />
      <Hero />
      <SocialProof />
      <HowItWorks />
      <TopHost />
      <TopInfluencer />
      <ValueProps />
      <Features />
      <Pricing />
      <Testimonials />
      <WhyChoose />
      <Footer />
    </main>
  )
}
