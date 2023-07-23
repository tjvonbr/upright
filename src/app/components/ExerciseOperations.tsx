"use client";

import { Exercise } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User } from "next-auth";
import { useState } from "react";
import useSWRMutation from "swr/mutation";

import Spinner from "./Spinner";

interface ExerciseProps {
  user: User;
  exercises: Exercise[];
}

export default function ExerciseOperations({ user, exercises }: ExerciseProps) {
  const [name, setName] = useState("");

  const router = useRouter();
  const { trigger, isMutating } = useSWRMutation(
    "http://localhost:3000/api/exercises",
    handleSubmit
  );

  async function handleSubmit() {
    try {
      const response = await fetch(`http://localhost:3000/api/exercises`, {
        method: "POST",
        body: JSON.stringify({
          name,
          userId: user.id,
        }),
      });

      if (response.ok) {
        router.refresh();
        setName("");
      }
    } catch (error) {}
  }

  return (
    <div className="h-full w-full grid grid-cols-2">
      <div className="pl-5 pt-3 border-r border-gray-200">
        <h1>Exercises</h1>
        <main>
          <div className="w-full mb-3">
            <input
              className="h-[25px] w-[400px] px-2 rounded-md bg-slate-100 border border-slate-200 text-sm"
              placeholder="Search..."
              type="text"
            />
          </div>
          {exercises.length > 0 ? (
            exercises.map((exercise, idx) => (
              <div key={idx}>
                <Link
                  className="py-3 font-medium text-black hover:text-black"
                  href={`/exercises/${exercise.id}`}
                >
                  {exercise.name}
                </Link>
              </div>
            ))
          ) : (
            <p>No exercises to show</p>
          )}
        </main>
      </div>
      <div className="flex flex-col justify-center items-center">
        <form className="w-[50%]" action="submit" onSubmit={() => trigger()}>
          <p className="font-semibold text-2xl">Add an exercise</p>
          <p>
            If you don&apos;t see an exercise that you want to track in the
            column on the left, you can add it below.
          </p>
          <fieldset className="w-full flex flex-col my-5">
            <label className="font-semibold" htmlFor="name">
              Name
            </label>
            <input
              className="w-full px-2 py-2 border border-gray-200 rounded-md"
              id="name"
              name="name"
              type="text"
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value)
              }
            />
          </fieldset>
          <button className="h-[40px] w-full flex justify-center items-center bg-black text-white font-semibold rounded-md">
            {isMutating ? <Spinner /> : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}
