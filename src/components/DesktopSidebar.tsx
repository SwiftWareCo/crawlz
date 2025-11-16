"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Bookmark, Settings } from "lucide-react";
import { Button } from "~/components/ui/button";
import { ModeToggle } from "~/components/ModeToggle";
import { cn } from "~/lib/utils";

const navItems = [
  { label: "Inbox", path: "/", icon: Home },
  { label: "Saved", path: "/saved", icon: Bookmark },
  { label: "Preferences", path: "/preferences", icon: Settings },
];

export function DesktopSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:block fixed left-0 top-0 h-screen w-56 border-r bg-background">
      <div className="flex h-full flex-col gap-2 p-4">
        <div className="mb-4">
          <h1 className="text-xl font-bold">Job Tracker</h1>
        </div>
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;
            return (
              <Button
                key={item.path}
                variant="ghost"
                className={cn(
                  "justify-start",
                  isActive && "bg-accent text-accent-foreground"
                )}
                asChild
              >
                <Link href={item.path}>
                  <Icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Link>
              </Button>
            );
          })}
        </nav>
        <div className="mt-auto">
          <ModeToggle />
        </div>
      </div>
    </aside>
  );
}
