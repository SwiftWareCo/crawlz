import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import { AppShell } from "~/components/AppShell";
import { ThemeProvider } from "~/components/ThemeProvider";

export const metadata: Metadata = {
  title: "Job Tracker",
  description: "Track your job applications with ease",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`} suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <AppShell>{children}</AppShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
