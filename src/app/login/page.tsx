import { MoveUpRight } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/session";

import LoginForm from "../components/LoginForm";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};

export default async function Login() {
  const user = await getCurrentUser();

  if (user) redirect("/dashboard");

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <div className="w-1/3 flex flex-col justify-center items-center space-y-2">
        <Link href="/">
          <MoveUpRight color="black" size={25} strokeWidth={2.5} />
        </Link>
        <h1 className="text-2xl font-bold">Sign in to your account</h1>
        <p className="w-3/4 text-center text-slate-500">
          Please enter your email below and be on the lookout for an email
        </p>
        <LoginForm />
        <Link
          className="text-sm text-slate-500 hover:underline"
          href="/register"
        >
          Don&#39;t have an account? Sign up
        </Link>
      </div>
    </div>
  );
}
