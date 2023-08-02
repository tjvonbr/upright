"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { twJoin } from "tailwind-merge";

import { Button, buttonVariants } from "./common/button";
import Input from "./common/Input";
import Spinner from "./Spinner";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setIsLoading(true);
      await signIn("email", { callbackUrl: "/dashboard", email });
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      throw new Error(`Error: ${err}`);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form className="w-3/4 flex flex-col space-y-6" onSubmit={handleSubmit}>
      <fieldset>
        <label className="m-0 p-0 text-sm font-medium" htmlFor="email">
          Email
        </label>
        <Input
          className="h-10 w-full px-3 py-2 border border-slate-200 rounded-md"
          name="email"
          value={email}
          type="email"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
        />
      </fieldset>
      <Button
        className={twJoin(buttonVariants({ variant: "primary" }))}
        type="submit"
      >
        {isLoading ? <Spinner /> : "Continue"}
      </Button>
    </form>
  );
}
