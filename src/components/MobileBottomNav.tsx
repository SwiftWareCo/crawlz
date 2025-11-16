"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Bookmark, Settings, User } from "lucide-react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

const navItems = [
  { label: "Inbox", path: "/", icon: Home },
  { label: "Saved", path: "/saved", icon: Bookmark },
  { label: "Leads", path: "/leads", icon: User },
  { label: "Preferences", path: "/preferences", icon: Settings },
];

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="bg-background fixed right-0 bottom-0 left-0 block border-t md:hidden">
      <SignedIn>
        <div className="flex items-center justify-around p-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;
            return (
              <Button
                key={item.path}
                variant="ghost"
                size="icon"
                className={cn(
                  "flex h-auto flex-col px-4 py-2",
                  isActive && "bg-accent text-accent-foreground",
                )}
                asChild
              >
                <Link href={item.path}>
                  <Icon className="h-5 w-5" />
                  <span className="mt-1 text-xs">{item.label}</span>
                </Link>
              </Button>
            );
          })}
          <div className="flex flex-col items-center px-4 py-2">
            <UserButton />
            <span className="mt-1 text-xs">Account</span>
          </div>
        </div>
      </SignedIn>

      <SignedOut>
        <div className="flex items-center justify-center p-4">
          <Button asChild>
            <Link href="/sign-in">Sign In</Link>
          </Button>
        </div>
      </SignedOut>
    </nav>
  );
}
