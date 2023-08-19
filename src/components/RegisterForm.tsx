"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/common/button";
import Input from "@/components/common/Input";

import Spinner from "./Spinner";

export default function RegisterForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [isMutating, setIsMutating] = useState(false);

  const router = useRouter();

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setIsMutating(true);

    const response = await fetch("../api/register", {
      method: "POST",
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        birthday: new Date(birthday),
      }),
    });

    if (response.ok) {
      setIsMutating(false);
      router.push("/login");
    }
  }

  return (
    <form className="w-3/4 flex flex-col space-y-2" onSubmit={handleSubmit}>
      <fieldset>
        <label className="m-0 p-0 text-sm font-medium" htmlFor="">
          First name
        </label>
        <Input
          className="h-10 w-full px-3 py-2 border border-slate-200 rounded-md"
          name="firstName"
          type="text"
          value={firstName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFirstName(e.target.value)
          }
        />
      </fieldset>
      <fieldset>
        <label className="m-0 p-0 text-sm font-medium" htmlFor="">
          Last name
        </label>
        <Input
          className="h-10 w-full px-3 py-2 border border-slate-200 rounded-md"
          name="lastName"
          type="text"
          value={lastName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setLastName(e.target.value)
          }
        />
      </fieldset>
      <fieldset>
        <label className="m-0 p-0 text-sm font-medium" htmlFor="">
          Email
        </label>
        <Input
          className="h-10 w-full px-3 py-2 border border-slate-200 rounded-md"
          name="email"
          type="email"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
        />
      </fieldset>
      <fieldset>
        <label className="m-0 p-0 text-sm font-medium" htmlFor="">
          Birthday
        </label>
        <Input
          className="h-10 w-full px-3 py-2 border border-slate-200 rounded-md"
          placeholder="mm/dd/yyyy"
          name="birthday"
          type="date"
          value={birthday}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setBirthday(e.target.value)
          }
        />
      </fieldset>
      <Button variant="primary" disabled={isMutating} type="submit">
        {isMutating ? <Spinner /> : "Continue"}
      </Button>
    </form>
  );
}
