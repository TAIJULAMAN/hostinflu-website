"use client";

import { Menu, Bell, Search, MessageSquareMore } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

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
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full border border-teal-600 w-10 h-10"
        >
          <MessageSquareMore className="h-10 w-10 text-teal-600" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full border border-teal-600 w-10 h-10"
        >
          <Bell className="h-10 w-10 text-teal-600" />
        </Button>
        <Avatar className="rounded-full border border-teal-600 w-10 h-10">
          <AvatarImage
            src="https://avatar.iran.liara.run/public/14"
            alt="avatar of user"
          />
          <AvatarFallback>AD</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
