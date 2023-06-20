"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import Spinner from "../components/Spinner";
import { signIn } from "next-auth/react";

interface FormElements extends HTMLFormControlsCollection {
  usernameInput: HTMLInputElement;
}
interface UserFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

const Login = () => {
  const { data: session } = useSession();

  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<UserFormElement>) {
    setIsLoading(true);
    e.preventDefault();

    try {
      signIn("email", { callbackUrl: "/protected", email });
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  }

  if (!session) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-white">
        <form onSubmit={handleSubmit}>
          <div className="h-[300px] w-[500px] flex flex-col justify-around items-center rounded-md shadow-gray-200 shadow-lg">
            <div className="w-4/5">
              <h3 className="text-2xl font-semibold self-start">
                Sign in to your account
              </h3>
            </div>
            <div className="flex flex-col justify-around w-4/5">
              <label className="text-sm font-medium" htmlFor="">
                Email
              </label>
              <input
                className="my-2 border border-slate-300 rounded-md py-2 px-2"
                type="text"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
              />
            </div>
            <button
              className="h-[50px] w-4/5 bg-indigo-500 text-white font-medium rounded-md flex justify-center items-center"
              type="submit"
            >
              {isLoading ? <Spinner /> : "Continue"}
            </button>
          </div>
        </form>
        <div className="m-5">
          Don&#39;t have an account?{" "}
          <Link className="text-indigo-500" href="/register">
            Sign up
          </Link>
        </div>
      </div>
    );
  }

  return <h1>You are not signed in!</h1>;
};

export default Login;
