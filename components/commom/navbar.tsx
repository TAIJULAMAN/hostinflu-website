"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User as UserIcon, LayoutDashboard } from "lucide-react";
import Image from "next/image";

export function Navbar() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <nav
      className={`w-full fixed top-0 z-50 px-4 sm:px-6 lg:px-8 py-4 transition-all duration-300 ${isScrolled
        ? "bg-white/80 backdrop-blur-md shadow-sm"
        : "bg-transparent"
        }`}
    >
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

          {/* Show different links based on user role */}
          {isAuthenticated && user ? (
            <>
              {user.role === "host" ? (
                <Link
                  href="/influencers"
                  className="text-sm font-medium text-black/80 hover:text-black transition-colors"
                >
                  Influencers
                </Link>
              ) : (
                <>
                  <Link
                    href="/hosts"
                    className="text-sm font-medium text-black/80 hover:text-black transition-colors"
                  >
                    Hosts
                  </Link>
                  <Link
                    href="/deals"
                    className="text-sm font-medium text-black/80 hover:text-black transition-colors"
                  >
                    Deals
                  </Link>
                </>
              )}
            </>
          ) : (
            <>
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
                href="/deals"
                className="text-sm font-medium text-black/80 hover:text-black transition-colors"
              >
                Deals
              </Link>
            </>
          )}

          <Link
            href="/#pricing"
            className="text-sm font-medium text-black/80 hover:text-black transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="/contact-us"
            className="text-sm font-medium text-black/80 hover:text-black transition-colors"
          >
            Help
          </Link>
        </div>

        {/* Auth Section */}
        <div className="flex items-center gap-4">
          {isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 hover:opacity-80 transition-opacity focus:outline-none">
                  <Avatar className="w-8 h-8 border-2 border-gray-200">
                    <AvatarFallback className="bg-teal-500 text-white text-sm font-semibold">
                      {user.fullName.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-black">{user.fullName}</span>
                    <span className="text-xs bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full font-medium">
                      {user.role}
                    </span>
                  </div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{user.fullName}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="cursor-pointer">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="cursor-pointer">
                    <UserIcon className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
