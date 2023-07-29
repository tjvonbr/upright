import "./globals.css";

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { Toaster } from "@/components/common/toaster";
interface RootLayoutProps {
  children: React.ReactNode;
  session: Session;
}

export default function RootLayout({ children, session }: RootLayoutProps) {
  return (
    <SessionProvider session={session}>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body className="min-h-screen bg-background font-sans antialiased">
          {children}
          <Toaster />
        </body>
      </html>
    </SessionProvider>
  );
}
