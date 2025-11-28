"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { LogOut, User as UserIcon } from "lucide-react";
import Image from "next/image";

export function Navbar() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

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
          <Link
            href="/"
            className="text-sm font-medium text-black/80 hover:text-black transition-colors"
          >
            Home
          </Link>
          <Link
            href="/hosts"
            className="text-sm font-medium text-black/80 hover:text-black transition-colors"
          >
            Hosts
          </Link>
          <Link
            href="/influencers"
            className="text-sm font-medium text-black/80 hover:text-black transition-colors"
          >
            Influencers
          </Link>
          <Link
            href="#"
            className="text-sm font-medium text-black/80 hover:text-black transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="#"
            className="text-sm font-medium text-black/80 hover:text-black transition-colors"
          >
            Help
          </Link>
        </div>

        {/* Auth Section */}
        <div className="flex items-center gap-4">
          {isAuthenticated && user ? (
            <>
              <Link href="/dashboard">
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 text-black hover:bg-black/5"
                >
                  <UserIcon className="w-4 h-4" />
                  <span className="font-medium">{user.fullName}</span>
                  <span className="text-xs bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full">
                    {user.role}
                  </span>
                </Button>
              </Link>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="bg-white text-black border-black font-semibold px-5 flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </>
          ) : (
            <Link href="/signin">
              <Button
                variant="outline"
                className="bg-white text-black border-black font-semibold px-5"
              >
                Log In/ Sign Up
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
