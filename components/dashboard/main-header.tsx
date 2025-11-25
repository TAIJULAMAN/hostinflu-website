// components/dashboard/main-header.tsx
"use client";

import { Menu, Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function MainHeader({ toggleSidebar }: { toggleSidebar: () => void }) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-white px-4 sm:px-6">
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        onClick={toggleSidebar}
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle menu</span>
      </Button>

      <div className="relative ml-auto flex-1 md:grow-0">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
          className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
        />
      </div>

      <Button
        variant="outline"
        size="icon"
        className="overflow-hidden rounded-full"
      >
        <Bell className="h-4 w-4" />
      </Button>
    </header>
  );
}
