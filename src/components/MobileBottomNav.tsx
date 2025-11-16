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
  { label: "Preferences", path: "/preferences", icon: Settings },
];

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="block md:hidden fixed bottom-0 left-0 right-0 border-t bg-background">
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
                  "flex flex-col h-auto py-2 px-4",
                  isActive && "bg-accent text-accent-foreground"
                )}
                asChild
              >
                <Link href={item.path}>
                  <Icon className="h-5 w-5" />
                  <span className="text-xs mt-1">{item.label}</span>
                </Link>
              </Button>
            );
          })}
          <div className="flex flex-col items-center py-2 px-4">
            <UserButton />
            <span className="text-xs mt-1">Account</span>
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
