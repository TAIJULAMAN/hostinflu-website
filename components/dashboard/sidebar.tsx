"use client";

import Link from "next/link";
import {
  Users,
  Settings,
  HelpCircle,
  X,
  LayoutDashboard,
  MessageCircle,
  House,
  BadgeDollarSign,
  Handshake,
  Star,
  DollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useAuth } from "@/contexts/auth-context";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  const { user } = useAuth();
  console.log(user);

  return (
    <aside
      className={cn(
        "fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out lg:transform-none",
        isOpen ? "translate-x-0" : "-translate-x-full lg:hidden"
      )}
    >
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/mini.png"
              alt="Logo"
              width={32}
              height={32}
              className="h-8 w-8 text-teal-500"
            />
            <span className="text-xl font-bold text-black">Hostinflu</span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={toggleSidebar}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {user?.role === "host" ? (
            // Host Navigation
            <>
              <Link
                href="/dashboard"
                className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-teal-600 bg-teal-50 rounded-md"
              >
                <LayoutDashboard className="h-5 w-5" />
                Dashboard
              </Link>
              <Link
                href="/dashboard/active-deals"
                className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
              >
                <Handshake className="h-5 w-5" />
                Deals
              </Link>
              <Link
                href="/dashboard/lists"
                className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
              >
                <House className="h-5 w-5" />
                Listings
              </Link>
              <Link
                href="/dashboard/collaborations"
                className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
              >
                <Users className="h-5 w-5" />
                Collaborations
              </Link>
              <Link
                href="/dashboard/transactions"
                className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
              >
                <DollarSign className="h-5 w-5" />
                Transactions
              </Link>
              <Link
                href="/dashboard/redeem"
                className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
              >
                <BadgeDollarSign className="h-5 w-5" />
                Redeem Request
              </Link>
              <Link
                href="/dashboard/chat"
                className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
              >
                <MessageCircle className="h-5 w-5" />
                Message
              </Link>
              <Link
                href="/dashboard/onboarding"
                className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
              >
                <Settings className="h-5 w-5" />
                Onboarding
              </Link>
            </>
          ) : (
            // Influencer Navigation
            <>
              <Link
                href="/dashboard"
                className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-teal-600 bg-teal-50 rounded-md"
              >
                <LayoutDashboard className="h-5 w-5" />
                Dashboard
              </Link>
              <Link
                href="/dashboard/collaborations"
                className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
              >
                <Handshake className="h-5 w-5" />
                Collaborations
              </Link>
              <Link
                href="/dashboard/transactions"
                className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
              >
                <DollarSign className="h-5 w-5" />
                Transactions
              </Link>
              <Link
                href="/dashboard/night-stars"
                className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
              >
                <Star className="h-5 w-5" />
                Night Stars
              </Link>
              <Link
                href="/dashboard/chat"
                className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
              >
                <MessageCircle className="h-5 w-5" />
                Message
              </Link>
              <Link
                href="/dashboard/onboarding"
                className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
              >
                <Settings className="h-5 w-5" />
                Onboarding
              </Link>
            </>
          )}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center">
              <span className="font-semibold text-white">
                {user?.fullName?.charAt(0).toUpperCase() || "U"}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{user?.fullName || "User"}</p>
              <p className="text-xs text-gray-500">{user?.email || "user@example.com"}</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

