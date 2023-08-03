"use client";

import { MoveUpRight } from "lucide-react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { twJoin } from "tailwind-merge";

import { buttonVariants } from "@/app/components/common/button";

export default function UserNav() {
  return (
    <div className="w-full flex items-center justify-between">
      <Link className="flex items-center space-x-1" href="/">
        <MoveUpRight color="black" size={18} strokeWidth={2.5} />
        <span className="font-bold text-xl text-black hover:text-black">
          Upright
        </span>
      </Link>
      <button
        className={twJoin(buttonVariants({ variant: "ghost" }))}
        onClick={() => signOut({ callbackUrl: "/login" })}
      >
        Sign out
      </button>
    </div>
  );
}
