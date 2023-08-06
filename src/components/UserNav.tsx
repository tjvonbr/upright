"use client";

import { MoveUpRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { twJoin, twMerge } from "tailwind-merge";

import { Button, buttonVariants } from "@/app/components/common/button";
import { NavbarItem } from "@/config/navigation";

import Spinner from "@/components/Spinner";

interface UserNavProps {
  navbarItems?: NavbarItem[];
}

export default function UserNav({ navbarItems }: UserNavProps) {
  const pathname = usePathname();

  const isMarketing = pathname === "/";
  const isAuth = pathname === "/login" || pathname === "/register";

  return (
    <header
      className={twMerge(
        "h-10 w-full py-2 px-4 flex justify-between items-center",
        !isMarketing && "border-b border-slate-200",
        isMarketing && "h-15"
      )}
    >
      <div className="flex items-center space-x-6">
        <Link className="flex items-center space-x-1" href="/">
          <MoveUpRight color="black" size={18} strokeWidth={2.5} />
          <span className="font-bold text-xl text-black hover:text-black">
            Upright
          </span>
        </Link>
        {navbarItems &&
          navbarItems.map((item, idx: number) => (
            <Link
              className="text-sm text-slate-500 hover:text-black transition-colors"
              key={idx}
              href={item.href}
            >
              {item.name}
            </Link>
          ))}
      </div>
      {isMarketing ? <LoginButton /> : !isAuth ? <SignOutButton /> : null}
    </header>
  );
}

function SignOutButton() {
  const [isSigningOut, setIsSigningOut] = useState(false);

  async function handleSignOut() {
    setIsSigningOut(true);
    await signOut({ callbackUrl: "/login" });
    setIsSigningOut(false);
  }

  return (
    <Button variant="ghost" onClick={handleSignOut}>
      {isSigningOut ? <Spinner color="black" size="15" /> : "Sign out"}
    </Button>
  );
}

function LoginButton() {
  return (
    <Link
      href="/login"
      className={twJoin(
        buttonVariants({ variant: "outline" }),
        "flex justify-center align-items"
      )}
    >
      Login
    </Link>
  );
}
