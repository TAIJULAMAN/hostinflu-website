"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSelector } from "react-redux";

// Define which routes do not require authentication
const publicRoutes = [
  "/",
  "/signin",
  "/signup",
  "/about-us",
  "/contact-us",
  "/faq",
  "/privacy-and-policy",
  "/terms-and-conditions",
  "/hosts",
  "/influencers",
  "/deals"
];

export function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { token } = useSelector((state: any) => state.auth);
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isPublicRoute = publicRoutes.includes(pathname) || 
                        pathname.startsWith("/hosts/") ||
                        pathname.startsWith("/influencers/") ||
                        pathname.startsWith("/deals/");

  useEffect(() => {
    if (!mounted) return;

    if (!token && !isPublicRoute) {
      router.push("/signin"); // Redirect unauthenticated users
    }
  }, [token, pathname, mounted, router, isPublicRoute]);

  // During SSR or before mount, to prevent hydration mismatch on public pages,
  // we can just render children. If it's a private page, there might be a split-second
  // flash of content before the useEffect redirects.
  if (!mounted) {
    return <>{children}</>;
  }

  // Prevent rendering private content if not authenticated
  if (!token && !isPublicRoute) {
    return null; 
  }

  return <>{children}</>;
}
