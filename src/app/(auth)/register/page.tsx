"use client";

import Link from "next/link";
import { useState } from "react";

import Spinner from "../../components/Spinner";

interface FormElements extends HTMLFormControlsCollection {
  usernameInput: HTMLInputElement;
}
interface UserFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<UserFormElement>) {
    setIsLoading(true);
    event.preventDefault();

    try {
      await fetch("../api/register", {
        method: "POST",
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          birthday: new Date(birthday),
        }),
      });
      setIsLoading(false);
    } catch (err) {
      throw new Error(`Error: ${err}`);
    }
  }

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-white">
      <form action="" onSubmit={handleSubmit}>
        <div className="h-[550px] w-[500px] flex flex-col justify-around items-center rounded-md shadow-gray-200 shadow-lg">
          <div className="w-4/5">
            <h3 className="text-2xl font-semibold self-start">
              Create your Up+Right account
            </h3>
          </div>

          <div className="flex flex-col justify-around w-4/5">
            <label className="text-sm font-medium" htmlFor="">
              First name
            </label>
            <input
              className="my-2 border border-slate-300 rounded-md py-2 px-2"
              type="text"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFirstName(e.target.value)
              }
            />
            <label className="text-sm font-medium" htmlFor="">
              Last name
            </label>
            <input
              className="my-2 border border-slate-300 rounded-md py-2 px-2"
              type="text"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setLastName(e.target.value)
              }
            />
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
            <label className="text-sm font-medium" htmlFor="">
              Birthday
            </label>
            <input
              className="my-2 border border-slate-300 rounded-md py-2 px-2"
              placeholder="mm/dd/yyyy"
              type="text"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setBirthday(e.target.value)
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
        Already have an account?{" "}
        <Link className="text-indigo-500" href="/login">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Register;
