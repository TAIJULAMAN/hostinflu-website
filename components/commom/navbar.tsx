"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Users } from "lucide-react"
import Image from "next/image"

export function Navbar() {
    return (
        <nav className="w-full fixed top-0 z-50 bg-transparent px-4 sm:px-6 lg:px-8 py-4">
            <div className="container mx-auto flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <Image src="/mini.png" alt="Logo" width={30} height={30} />
                    <span className="text-2xl font-bold text-black">Hostinflu</span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    <Link href="#" className="text-sm font-medium text-black/80 hover:text-black transition-colors">
                        Home
                    </Link>
                    <Link href="#" className="text-sm font-medium text-black/80 hover:text-black transition-colors">
                        How it work
                    </Link>
                    <Link href="#" className="text-sm font-medium text-black/80 hover:text-black transition-colors">
                        For Hosts
                    </Link>
                    <Link href="#" className="text-sm font-medium text-black/80 hover:text-black transition-colors">
                        For influencers
                    </Link>
                    <Link href="#" className="text-sm font-medium text-black/80 hover:text-black transition-colors">
                        Pricing
                    </Link>
                    <Link href="#" className="text-sm font-medium text-black/80 hover:text-black transition-colors">
                        Help
                    </Link>
                </div>

                {/* Auth Button */}
                <div className="flex items-center">
                    <Link href="/signin">
                        <Button
                            variant="outline"
                            className="bg-white text-black hover:bg-black hover:text-white border-black font-semibold px-5"
                        >
                            Log In/ Sign Up
                        </Button>
                    </Link>
                </div>
            </div>
        </nav>
    )
}
