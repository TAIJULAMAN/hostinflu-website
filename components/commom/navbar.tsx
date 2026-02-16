"use client";

import { useState, useEffect, type ReactNode } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/Redux/Slice/authSlice";
import { Button } from "@/components/ui/button";
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


function NavLink({ href, children }: { href: string; children: ReactNode }) {
  const pathname = usePathname();
  const isActive = href === "/" ? pathname === href : pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive
        ? "bg-black text-white"
        : "text-black/80 hover:text-black hover:bg-gray-100"
        }`}
    >
      {children}
    </Link>
  );
}

export function Navbar() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, token } = useSelector((state: any) => state.auth);
  console.log("user", user);
  console.log("token", token);
  const isAuthenticated = !!token;
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
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
        <div className="hidden md:flex items-center gap-4">
          <NavLink href="/">Home</NavLink>

          {/* Show different links based on user role */}
          {isAuthenticated && user ? (
            <>
              {user.role === "host" ? (
                <NavLink href="/influencers">Influencers</NavLink>
              ) : (
                <>
                  <NavLink href="/hosts">Hosts</NavLink>
                  <NavLink href="/deals">Deals</NavLink>
                </>
              )}
            </>
          ) : (
            <>
              <NavLink href="/hosts">Hosts</NavLink>
              <NavLink href="/influencers">Influencers</NavLink>
              <NavLink href="/deals">Deals</NavLink>
            </>
          )}

          <NavLink href="/contact-us">Help</NavLink>
        </div>

        {/* Auth Section */}
        <div className="flex items-center gap-4">
          {isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 hover:opacity-80 transition-opacity focus:outline-none">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-black">{user.name}</span>
                    <span className="text-xs bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full font-medium">
                      {user.role}
                    </span>
                  </div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{user.name}</p>
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
