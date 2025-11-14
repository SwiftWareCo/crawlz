import { DesktopSidebar } from "./DesktopSidebar";
import { MobileBottomNav } from "./MobileBottomNav";

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <>
      <DesktopSidebar />
      <main className="pb-16 md:pb-0 md:ml-56">{children}</main>
      <MobileBottomNav />
    </>
  );
}
