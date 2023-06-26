import { redirect } from "next/navigation";
import { User } from "next-auth";
import React from "react";

import MainNavbar from "../components/MainNavbar";
import { navbarItems } from "../config/navigation";
import { getCurrentUser } from "../lib/session";
import Header from "./components/Header";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <section>
      <Header user={user as User} />
      <MainNavbar items={navbarItems.mainNavbar} />
      {children}
    </section>
  );
};

export default DashboardLayout;
