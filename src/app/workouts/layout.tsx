import { notFound } from "next/navigation";
import React from "react";

import UserNav from "@/components/UserNav";
import { getCurrentUser } from "@/lib/session";

interface WorkoutsLayoutProps {
  children: React.ReactNode;
}

export default async function WorkoutsLayout({
  children,
}: WorkoutsLayoutProps) {
  const user = await getCurrentUser();

  if (!user) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="h-10 py-2 px-4 flex justify-between items-center border-b border-slate-200">
        <UserNav />
      </header>
      <main>{children}</main>
    </div>
  );
}
