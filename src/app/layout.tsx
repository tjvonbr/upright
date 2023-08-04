"use client";

import "./globals.css";

import { usePathname } from "next/navigation";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { Toaster } from "@/components/common/toaster";
import UserNav from "@/components/UserNav";
import { navbarItems } from "@/config/navigation";
interface RootLayoutProps {
  children: React.ReactNode;
  session: Session;
}

export default function RootLayout({ children, session }: RootLayoutProps) {
  const pathname = usePathname();

  const isMarketing = pathname === "/";
  const isAuth = pathname === "/register" || pathname === "/login";

  return (
    <SessionProvider session={session}>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body className="min-h-screen bg-slate-50 font-sans antialiased">
          <UserNav
            navbarItems={
              isMarketing
                ? navbarItems.mainNavbar
                : !isAuth
                ? navbarItems.dashboard
                : []
            }
          />
          {children}
          <Toaster />
        </body>
      </html>
    </SessionProvider>
  );
}
