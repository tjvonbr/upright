"use client";

import { Exercise, Workout, WorkoutSet } from "@prisma/client";
import { ExternalLink, MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import useSWRMutation from "swr/mutation";
import { twJoin } from "tailwind-merge";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/common/dropdown";

import Text from "./common/Text";
import Spinner from "./Spinner";

interface WorkoutsWithExercises extends Workout {
  exercises: Exercise[];
  workoutSets: WorkoutSet[];
}

export default function WorkoutOperations({
  exercises,
  workout,
}: {
  exercises: Exercise[];
  workout: WorkoutsWithExercises;
}) {
  const [selectedExercises, setSelectedExercises] = useState<Array<Exercise>>(
    []
  );

  const router = useRouter();
  const { trigger, isMutating } = useSWRMutation(
    `http://localhost:3000/api/workouts/${workout.id}/exercises`,
    handleSubmit
  );

  const { exercises: workoutExercises, workoutSets } = workout;

  async function handleSubmit(url: string) {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        exercises: selectedExercises,
        workoutId: workout.id,
      }),
    });

    if (response.ok) {
      router.refresh();
      setSelectedExercises([]);
    }
  }

  function toggleSelectedExercise(exercise: Exercise) {
    if (selectedExercises.includes(exercise)) {
      const filtered = selectedExercises.filter((ex) => ex.id !== exercise.id);
      setSelectedExercises(filtered);
    } else {
      setSelectedExercises([...selectedExercises, exercise]);
    }
  }

  function ExerciseItem({ exercise }: { exercise: Exercise }) {
    const selected = selectedExercises.includes(exercise);

    return (
      <div
        className={twJoin(
          "h-[20px] border-b border-200-gray",
          selected ? "bg-gray-200" : null
        )}
        onClick={() => toggleSelectedExercise(exercise)}
      >
        {exercise.name}
      </div>
    );
  }

  const exercisesNotInWorkout = exercises.filter(
    (exercise) => !workoutExercises.some((item) => item.id === exercise.id)
  );

  return (
    <div className="grid grid-cols-2 bg-slate-100">
      <div className="pl-5 pt-3 border-r border-gray-200">
        <h1>{workout.name}</h1>
        <div className="m-5">
          {workoutExercises.map((exercise: Exercise, idx: number) => (
            <ExerciseInWorkoutItem
              key={idx}
              exercise={exercise}
              sets={workoutSets}
              workoutId={workout.id}
            />
          ))}
        </div>
      </div>
      <div className="w-full mt-3 flex flex-col items-center">
        <h2>Add exercises to your workout</h2>
        <Text>Select one or more exercises to add to your workout!</Text>
        <form>
          {exercisesNotInWorkout.map((exercise: Exercise, idx: number) => (
            <ExerciseItem key={idx} exercise={exercise} />
          ))}
          <button
            className="h-[40px] px-3 bg-black text-white font-semibold rounded-md"
            onClick={async (e: React.FormEvent) => {
              e.preventDefault;
              await trigger();
            }}
          >
            {isMutating ? <Spinner /> : "Add exercise(s)"}
          </button>
        </form>
      </div>
    </div>
  );
}

function ExerciseInWorkoutItem({
  exercise,
  workoutId,
  sets,
}: {
  exercise: Exercise;
  workoutId: number;
  sets: WorkoutSet[];
}) {
  const router = useRouter();

  const { trigger, isMutating } = useSWRMutation(
    `http://localhost:3000/api/workouts/${workoutId}/exercises`,
    deleteExercise
  );

  async function deleteExercise(url: string) {
    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify({
        exerciseId: exercise.id,
        workoutId,
      }),
    });

    if (response.ok) {
      router.refresh();
    }
  }

  const filteredSets = sets.filter((set) => set.exerciseId === exercise.id);

  return (
    <div className="my-2 flex justify-between items-center bg-white rounded-md px-3 py-2">
      <div className="flex flex-col">
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
      <div>
        <button className="mr-5">
          <ExternalLink color="black" size={18} />
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <button className="border border-slate-200 rounded-md">
              <MoreHorizontal color="black" size={18} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              className="rounded-[3px] text-red-500 data-[highlighted]:bg-gray-300"
              onClick={async (e: React.FormEvent) => {
                e.preventDefault();
                await trigger();
              }}
            >
              {isMutating ? <Spinner /> : "Delete"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
