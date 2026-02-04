"use client";

import React from "react";
import { Menu, Bell, Search, MessageSquareMore } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { useSelector } from "react-redux";
import { imgUrl } from "@/config/envConfig";

export function MainHeader({ toggleSidebar }: { toggleSidebar: () => void }) {
  const user = useSelector((state: any) => state.auth.user);
  console.log(user, "user");
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-white px-4 sm:px-6">
      <div>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={toggleSidebar}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
        <div className="hidden lg:block relative ml-auto flex-1 md:grow-0">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
          />
        </div>
      </div>
      <div className="flex items-center justify-end w-full">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/notifications">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full border border-teal-600 w-10 h-10"
            >
              <Bell className="h-10 w-10 text-teal-600" />
            </Button>
          </Link>
          <Link href="/profile">
            <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
              <Avatar className="rounded-full border border-teal-600 w-10 h-10">
                <AvatarImage
                  src={
                    user?.image
                      ? user.image.startsWith("http")
                        ? user.image
                        : `${imgUrl}${user.image}`
                      : "/avatar.png"
                  }
                  alt="avatar of user"
                />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <div className=" hidden lg:block">
                <p className="text-sm font-medium">{user?.name}</p>
                <p className="text-xs text-primary py-1 px-2 bg-primary/20 rounded-lg">{user?.role}</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
