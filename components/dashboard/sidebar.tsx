"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import {
  Users,
  Settings,
  X,
  LayoutDashboard,
  MessageCircle,
  House,
  BadgeDollarSign,
  Handshake,
  Star,
  DollarSign,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { logout } from "@/Redux/Slice/authSlice";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  const isActive = (path: string) => pathname === path;

  const getLinkClassName = (path: string) =>
    cn(
      "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors",
      isActive(path)
        ? "text-teal-600 bg-teal-50"
        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
    );

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
            <>
              <Link href="/dashboard" className={getLinkClassName("/dashboard")}>
                <LayoutDashboard className="h-5 w-5" />
                Dashboard
              </Link>
              <Link
                href="/dashboard/active-deals"
                className={getLinkClassName("/dashboard/active-deals")}
              >
                <Handshake className="h-5 w-5" />
                Deals
              </Link>
              <Link
                href="/dashboard/lists"
                className={getLinkClassName("/dashboard/lists")}
              >
                <House className="h-5 w-5" />
                Listings
              </Link>
              <Link
                href="/dashboard/collaborations"
                className={getLinkClassName("/dashboard/collaborations")}
              >
                <Users className="h-5 w-5" />
                Collaborations
              </Link>
              <Link
                href="/dashboard/transactions"
                className={getLinkClassName("/dashboard/transactions")}
              >
                <DollarSign className="h-5 w-5" />
                Transactions
              </Link>
              <Link
                href="/dashboard/redeem-requests"
                className={getLinkClassName("/dashboard/redeem-requests")}
              >
                <BadgeDollarSign className="h-5 w-5" />
                Redeem Request
              </Link>
              <Link
                href="/dashboard/chat"
                className={getLinkClassName("/dashboard/chat")}
              >
                <MessageCircle className="h-5 w-5" />
                Message
              </Link>
              <Link
                href="/dashboard/onboarding"
                className={getLinkClassName("/dashboard/onboarding")}
              >
                <Settings className="h-5 w-5" />
                Onboarding
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/dashboard/influencer"
                className={getLinkClassName("/dashboard/influencer")}
              >
                <LayoutDashboard className="h-5 w-5" />
                Dashboard
              </Link>
              <Link
                href="/dashboard/influencer-collaborations"
                className={getLinkClassName("/dashboard/influencer-collaborations")}
              >
                <Handshake className="h-5 w-5" />
                Collaborations
              </Link>
              <Link
                href="/dashboard/influencer-transactions"
                className={getLinkClassName("/dashboard/influencer-transactions")}
              >
                <DollarSign className="h-5 w-5" />
                Transactions
              </Link>
              <Link
                href="/dashboard/influencer-redeem-requests"
                className={getLinkClassName("/dashboard/influencer-redeem-requests")}
              >
                <Star className="h-5 w-5" />
                Redeem Stars
              </Link>
              <Link
                href="/dashboard/chat"
                className={getLinkClassName("/dashboard/chat")}
              >
                <MessageCircle className="h-5 w-5" />
                Message
              </Link>
              <Link
                href="/dashboard/onboarding"
                className={getLinkClassName("/dashboard/onboarding")}
              >
                <Settings className="h-5 w-5" />
                Onboarding
              </Link>
            </>
          )}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
}
