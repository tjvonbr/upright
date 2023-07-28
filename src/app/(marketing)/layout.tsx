import "../globals.css";
import "semantic-ui-css/semantic.min.css";

import Link from "next/link";
import { twMerge } from "tailwind-merge";

import { navbarItems } from "@/config/navigation";

import { buttonVariants } from "../components/common/Button";
import Navbar from "../components/Navbar";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="h-20 py-2 px-4">
        <div className="flex justify-between">
          <Navbar items={navbarItems.mainNavbar} />
          <nav>
            <Link
              className={twMerge(buttonVariants({ variant: "outline" }))}
              href="/login"
            >
              Login
            </Link>
          </nav>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
