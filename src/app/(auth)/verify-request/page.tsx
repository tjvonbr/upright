import { MoveUpRight } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { twJoin } from "tailwind-merge";

import { buttonVariants } from "../../../components/common/button";

export const metadata: Metadata = {
  title: "Verify Login Request",
  description: "Verify your login request",
};

export default function VerifyRequest() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <div className="w-1/3 flex flex-col justify-center items-center space-y-4">
        <Link href="/">
          <MoveUpRight color="black" size={25} strokeWidth={2.5} />
        </Link>
        <h1 className="text-2xl font-bold">Please check your inbox</h1>
        <p className="w-3/4 text-center text-slate-500">
          We just sent you a login link to the email you provided. If you
          don&apos; receive one, make you sure you entered the correct email.
        </p>
        <Link
          className={twJoin(buttonVariants({ variant: "primary" }))}
          href="/login"
        >
          Head back to the login page
        </Link>
      </div>
    </div>
  );
}
