"use client";

import { Exercise } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User } from "next-auth";
import { useState } from "react";
import useSWRMutation from "swr/mutation";

import { searchFilter } from "@/lib/helpers/search";

import { Button } from "./common/button";
import Spinner from "./Spinner";

interface ExerciseProps {
  exercises: Exercise[];
  user: User;
}

export default function ExerciseOperations({ exercises, user }: ExerciseProps) {
  const [name, setName] = useState("");
  const [query, setQuery] = useState("");

  const router = useRouter();

  const { trigger, isMutating } = useSWRMutation(
    "http://localhost:3000/api/exercises",
    handleSubmit
  );

  async function handleSubmit(url: string) {
    try {
      const response = await fetch(url, {
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

  const filteredExercises = searchFilter(exercises, query);

  return (
    <div className="h-full w-full grid grid-cols-2">
      <div className="px-5 pt-3 border-r border-slate-200">
        <h1 className="text-2xl font-semibold">Exercises</h1>
        <div className="w-full pt-3 mb-3">
          <input
            className="h-7 w-full px-2 rounded-md bg-slate-100 border border-slate-200 text-sm"
            placeholder="Search..."
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setQuery(e.target.value)
            }
          />
        </div>
        {filteredExercises.length > 0 ? (
          filteredExercises.map((exercise, idx) => (
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
      </div>
      <div className="min-h-screen flex flex-col justify-center items-center">
        <form
          className="w-[50%]"
          action="submit"
          onSubmit={async (e: React.FormEvent) => {
            e.preventDefault();
            await trigger();
          }}
        >
          <h2 className="text-xl font-semibold">Add an exercise</h2>
          <p className="text-slate-500">
            If you don&apos;t see an exercise that you want to track in the
            column on the left, you can add it below.
          </p>
          <fieldset className="w-full flex flex-col my-5 p-0">
            <label className="font-semibold" htmlFor="name">
              Name
            </label>
            <input
              className="h-10 w-full px-3 py-2 border border-slate-200 rounded-md"
              id="name"
              name="name"
              type="text"
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value)
              }
            />
          </fieldset>
          <Button
            className="w-full"
            variant="primary"
            disabled={isMutating || name.length === 0}
          >
            {isMutating ? <Spinner /> : "Submit"}
          </Button>
        </form>
      </div>
    </div>
  );
}
