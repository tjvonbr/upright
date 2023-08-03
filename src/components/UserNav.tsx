"use client";

import { MoveUpRight } from "lucide-react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { twJoin } from "tailwind-merge";

import { buttonVariants } from "@/app/components/common/button";
import { NavbarItem } from "@/config/navigation";

interface UserNavProps {
  navbarItems?: NavbarItem[];
}

export default function UserNav({ navbarItems }: UserNavProps) {
  return (
    <div className="w-full flex items-center justify-between">
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
      <button
        className={twJoin(buttonVariants({ variant: "ghost" }))}
        onClick={() => signOut({ callbackUrl: "/login" })}
      >
        Sign out
      </button>
    </div>
  );
}
