"use client";

import { Exercise } from "@prisma/client";
import React, { useState } from "react";
import { twJoin } from "tailwind-merge";

import { CompleteWorkout } from "../workouts/[workoutId]/edit-exercise/page";

interface WorkoutSet {
  reps: number | null;
  weightLbs: number | null;
  programId: number | null;
  workoutId: number;
  exerciseId: number | null;
}

export default function WorkoutEditor({
  workout,
}: {
  workout: CompleteWorkout;
}) {
  const [selected, setSelected] = useState<Exercise | null>(null);
  const [setsToSave, setSetsToSave] = useState<Array<WorkoutSet>>([]);

  const exerciseMap = new Map();

  workout.exercises.forEach((exercise) => {
    const exerciseSets = workout.workoutSets.filter((set) => {
      set.exerciseId === exercise.id;
    });

    exerciseMap.set(exercise.name, exerciseSets);
  });

  function addAnotherSetField(
    e: React.FormEvent<HTMLButtonElement>,
    exercise: Exercise
  ) {
    e.preventDefault();

    const newSet = {
      reps: null,
      weightLbs: null,
      programId: workout.programId ?? null,
      workoutId: workout.id,
      exerciseId: exercise.id,
    };

    setSetsToSave([...setsToSave, newSet]);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      await fetch(`http://localhost:3000/api/workouts/${workout.id}/sets`, {
        method: "POST",
        body: JSON.stringify(setsToSave),
      });
    } catch (error) {}
  }

  return (
    <div className="h-full w-full">
      <div>
        <h1>{workout.name}</h1>
      </div>
      <div>
        <h2>Current exercises</h2>
        {workout.exercises.map((exercise: Exercise, idx: number) => (
          <div
            className={twJoin(
              "h--min-[100px] w-[400px] flex flex-col justify-between border border-gray-200 rounded-md hover:cursor-pointer",
              selected && "hover:bg-gray-200"
            )}
            key={idx}
            onClick={() => setSelected(exercise)}
          >
            <div className="text-lg font-semibold">{exercise.name}</div>

            <form
              action="submit"
              onSubmit={handleSubmit}
              className="flex flex-col"
            >
              {setsToSave.map((_: WorkoutSet, idx: number) => (
                <div key={idx} className="flex items-center">
                  <span className="translate-y-[-2] text-sm">
                    Set {idx + 1}
                  </span>
                  <div className="flex flex-col mx-5 my-2">
                    <label className="text-sm font-semibold" htmlFor="reps">
                      Reps
                    </label>
                    <input
                      id="reps"
                      name="reps"
                      type="text"
                      className="w-[50px] h-[30px] border border-gray-200 rounded-md text-center"
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        const data = [...setsToSave];

                        data[idx][
                          event.target.name as keyof Pick<
                            WorkoutSet,
                            "reps" | "weightLbs"
                          >
                        ] = Number(event.target.value);
                        setSetsToSave(data);
                      }}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm font-semibold" htmlFor="weight">
                      Weight
                    </label>
                    <input
                      id="weight"
                      name="weightLbs"
                      type="text"
                      className="w-[50px] h-[30px] border border-gray-200 rounded-md text-center"
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        const data = [...setsToSave];

                        data[idx][
                          event.target.name as keyof Pick<
                            WorkoutSet,
                            "reps" | "weightLbs"
                          >
                        ] = Number(event.target.value);
                        setSetsToSave(data);
                      }}
                    />
                  </div>
                  {idx === setsToSave.length - 1 && (
                    <button
                      onClick={(e: React.FormEvent<HTMLButtonElement>) => {
                        e.preventDefault();
                        addAnotherSetField(e, exercise);
                      }}
                    >
                      Add another set
                    </button>
                  )}
                </div>
              ))}
              <button type="submit">Save</button>
            </form>
            {setsToSave.length === 0 && (
              <button
                onClick={(e: React.FormEvent<HTMLButtonElement>) => {
                  e.preventDefault();
                  addAnotherSetField(e, exercise);
                }}
              >
                Add another set
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
