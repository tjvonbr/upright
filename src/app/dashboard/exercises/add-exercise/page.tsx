"use client";

import { Icon } from "semantic-ui-react";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Spinner from "@/app/components/Spinner";

const AddExercise = () => {
  const { data: session } = useSession();

  if (!session) {
    redirect("/login");
  }

  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    try {
      await fetch("http://localhost:3000/api/exercises", {
        method: "POST",
        body: JSON.stringify({
          name,
          userId: session?.user!.id,
        }),
      });

      setIsLoading(false);
      setName("");
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
          You need to create an exercise here before including it in a workout.
        </p>
      </div>
      <form
        action="submit"
        className="flex flex-col my-10"
        onSubmit={handleSubmit}
      >
        <label className="text-sm font-medium" htmlFor="">
          Name of exercise
        </label>
        <input
          className="w-[400px] mt-2 mb-5 border border-slate-300 rounded-md py-2 px-2"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
          type="text"
          value={name}
        />
        <button
          className="h-[50px] w-[400px] flex justify-center items-center bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-md"
          type="submit"
        >
          {isLoading ? <Spinner /> : "Create exercise"}
        </button>
      </form>
    </div>
  );
};

export default AddExercise;
