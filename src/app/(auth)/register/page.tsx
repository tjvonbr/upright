import { MoveUpRight } from "lucide-react";
import Link from "next/link";

import RegisterForm from "@/components/RegisterForm";

export default function Register() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <div className="w-1/3 flex flex-col justify-center items-center space-y-2">
        <Link href="/">
          <MoveUpRight color="black" size={25} strokeWidth={2.5} />
        </Link>
        <h1 className="text-2xl font-bold">Sign up for Upright</h1>
        <p className="w-3/4 text-center text-slate-500">
          Please enter your personal information below so we can get your
          started
        </p>
        <RegisterForm />
        <Link className="text-sm text-slate-500 hover:underline" href="/login">
          Already have an account? Login here
        </Link>
      </div>
    </div>
  );
}
