import { notFound } from "next/navigation";
import React from "react";

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
      <main>{children}</main>
    </div>
  );
}
