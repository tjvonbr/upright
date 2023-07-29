import { redirect } from "next/navigation";
import React from "react";
import { twJoin } from "tailwind-merge";

import { buttonVariants } from "@/app/components/common/button";
import UserNav from "@/components/UserNav";

import { getCurrentUser } from "../../../lib/session";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="h-10 py-2 px-4 flex justify-between items-center">
        <UserNav />
        <button className={twJoin(buttonVariants({ variant: "ghost" }))}>
          Sign out
        </button>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default DashboardLayout;
