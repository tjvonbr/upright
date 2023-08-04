import { redirect } from "next/navigation";
import React from "react";

import { getCurrentUser } from "@/lib/session";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main>{children}</main>
    </div>
  );
}
