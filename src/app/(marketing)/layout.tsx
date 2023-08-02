import "../globals.css";
import "semantic-ui-css/semantic.min.css";

import Link from "next/link";
import { twJoin } from "tailwind-merge";

import { navbarItems } from "@/config/navigation";

import { buttonVariants } from "../components/common/button";
import Navbar from "../components/Navbar";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="h-10 py-2 px-4 flex justify-between">
        <Navbar items={navbarItems.mainNavbar} />
        <nav>
          <Link
            className={twJoin(buttonVariants({ variant: "outline" }))}
            href="/login"
          >
            Login
          </Link>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
}
