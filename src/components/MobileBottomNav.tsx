"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Bookmark, Settings } from "lucide-react";
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
      </div>
    </nav>
  );
}
