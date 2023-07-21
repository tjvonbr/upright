"use client";

import { Exercise, Workout, WorkoutSet } from "@prisma/client";
import { Check, ChevronDown, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "./common/dropdown";

interface WorkoutsWithExercises extends Workout {
  exercises: Exercise[];
  workoutSets: WorkoutSet[];
}

export default function WorkoutOperations({
  userExercises,
  workout,
}: {
  userExercises: Exercise[];
  workout: WorkoutsWithExercises;
}) {
  const [isAddingExercise, setIsAddingExercise] = useState(false);
  const [selected, setSelected] = useState<Exercise | null>(null);

  const router = useRouter();

  const { exercises, workoutSets } = workout;

  async function handleSubmit(e: React.FormEvent<HTMLButtonElement>) {
    e.preventDefault();

    const response = await fetch(
      `http://localhost:3000/api/workouts/${workout.id}/exercises`,
      {
        method: "POST",
        body: JSON.stringify({
          exerciseId: selected?.id,
          workoutId: workout.id,
        }),
      }
    );

    if (response.ok) {
      setIsAddingExercise(false);
      router.refresh();
    }
  }

  return (
    <div>
      <h1>{workout.name}</h1>
      <div className="my-5">
        <button
          className="h-[35px] w-[90px] border border-gray-200 rounded-md text-sm"
          onClick={() => {
            setIsAddingExercise(true);
          }}
        >
          Add Exercise
        </button>
      </div>
      <div>
        {exercises.map((exercise: Exercise, idx: number) => {
          return (
            <ExerciseItem key={idx} exercise={exercise} sets={workoutSets} />
          );
        })}
      </div>
      {isAddingExercise && (
        <form action="submit">
          <div className="flex">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex h-8 w-[200px] px-2 items-center justify-center bg-white text-black rounded-md border border-gray-200 hover:bg-muted">
                <ChevronDown size={15} strokeWidth={2.5} />
                <div className="px-2 text-md font-medium">
                  {selected?.name ?? "Select an exercise"}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {userExercises.map((exercise: Exercise, idx: number) => (
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
            {selected && (
              <button className="m-2" onClick={handleSubmit}>
                <Check color="green" size={15} strokeWidth={2.5} />
              </button>
            )}
            <button className="m-2" onClick={() => setIsAddingExercise(false)}>
              <X color="red" size={15} strokeWidth={2.5} />
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

function ExerciseItem({
  exercise,
  sets,
}: {
  exercise: Exercise;
  sets: WorkoutSet[];
}) {
  const filteredSets = sets.filter((set) => set.exerciseId === exercise.id);

  return (
    <div className="my-2 flex flex-col">
      <span className="font-semibold text-md">{exercise.name}</span>
      <div className="flex">
        {filteredSets.length > 0 ? (
          filteredSets.map((set: WorkoutSet, idx: number) => (
            <p
              className="mr-2 text-sm"
              key={idx}
            >{`${set.reps}x${set.weightLbs}`}</p>
          ))
        ) : (
          <p className="text-sm">No data for this exercise</p>
        )}
      </div>
    </div>
  );
}
