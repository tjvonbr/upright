import { redirect } from "next/navigation";
import { User } from "next-auth";
import React from "react";

import { navbarItems } from "../../config/navigation";
import MainNavbar from "../components/MainNavbar";
import { getCurrentUser } from "../../lib/session";
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
