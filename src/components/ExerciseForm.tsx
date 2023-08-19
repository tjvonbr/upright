"use client";

import { Exercise, Workout } from "@prisma/client";
import { ChevronDown } from "lucide-react";
import React, { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/common/dropdown";

import Spinner from "./Spinner";

interface AddExerciseFormProps {
  exercises: Exercise[];
  workout: Workout;
}

export default function AddExerciseForm({
  exercises,
  workout,
}: AddExerciseFormProps) {
  const [selected, setSelected] = useState<Partial<Exercise> | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    setIsSaving(true);
    e.preventDefault();

    try {
      await fetch(
        `http://localhost:3000/api/workouts/${workout.id}/exercises`,
        {
          method: "POST",
          body: JSON.stringify({
            exerciseId: selected?.id,
            workoutId: workout.id,
          }),
        }
      );

      setIsSaving(false);
    } catch (error) {
      setIsSaving(false);
    }
  }

  return (
    <div>
      <div className="h-[100px]">
        <h1 className="m-3">{workout.name}</h1>
      </div>
      <div className="h-[100%] w-full flex flex-col justify-center items-center ">
        <form action="submit" onSubmit={handleSubmit}>
          <div className="h-[400px] w-[400px] flex flex-col justify-around items-center border border-gray-200 rounded-md">
            <p className="text-lg font-bold">
              Select an exercise for this workout
            </p>
            <p>
              {" "}
              Open the dropdown and select a workout. We know it&apos;s a pain
              in the ass to add exercises one-by-one and are working on a
              solution to make this easier!
            </p>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex h-8 w-[200px] px-2 items-center justify-center bg-white text-black rounded-md border border-gray-200 hover:bg-muted">
                <ChevronDown size={15} strokeWidth={2.5} />
                <div className="px-2 text-md font-medium">
                  {selected?.name ?? "Select an exercise"}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {exercises.map((exercise: Exercise, idx: number) => (
                  <DropdownMenuRadioItem
                    className="rounded-[3px] data-[highlighted]:bg-gray-300"
                    key={idx}
                    value={exercise.name}
                    // eslint-disable-next-line no-unused-vars
                    onSelect={(_: Event) => {
                      setSelected(exercise);
                    }}
                  >
                    {exercise.name}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <button className="relative r-[50px] bg-black text-white hover:bg-black/80 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none align-end">
              {isSaving ? <Spinner /> : "Save changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
