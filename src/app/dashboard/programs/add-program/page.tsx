"use client";

import { Icon } from "semantic-ui-react";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Spinner from "@/app/components/Spinner";

const AddProgram = () => {
  const { data: session } = useSession();

  if (!session) {
    redirect("/login");
  }

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    try {
      await fetch("http://localhost:3000/api/dashboard/programs/add-program", {
        method: "POST",
        body: JSON.stringify({
          name,
          description,
          userId: session?.user?.id,
        }),
      });

      setIsLoading(false);
      setName("");
      setDescription("");
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  }

  return (
    <div>
      <div className="h-[50px] w-[400px] px-2 flex justify-between items-center border border-slate-300 rounded-sm">
        <Icon className="text-gray-500" name="info" />
        <p className="text-sm font-medium">
          In our parlance, a program is a group of workouts over a period of
          time with a particular goal in mind.
        </p>
      </div>
      <form
        action="submit"
        className="flex flex-col my-10"
        onSubmit={handleSubmit}
      >
        <label className="text-sm font-medium" htmlFor="">
          Program name
        </label>
        <input
          className="w-[400px] mt-2 mb-5 border border-slate-300 rounded-md py-2 px-2"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
          type="text"
          value={name}
        />
        <label className="text-sm font-medium" htmlFor="">
          Program description
        </label>
        <textarea
          className="w-[400px] mt-2 mb-5 border border-slate-300 rounded-md py-2 px-2"
          name=""
          id=""
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setDescription(e.target.value)
          }
          value={description}
        />
        <button
          className="h-10 w-[400px] px-4 py-2 flex justify-center items-center bg-black text-white font-medium text-sm rounded-md hover:bg-black/90"
          type="submit"
        >
          {isLoading ? <Spinner /> : "Create program"}
        </button>
      </form>
    </div>
  );
};

export default AddProgram;
