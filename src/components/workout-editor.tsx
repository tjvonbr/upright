"use client";

import { Exercise, WorkoutSet } from "@prisma/client";
import React, { useState } from "react";
import { twJoin } from "tailwind-merge";

interface WorkoutSetState {
  reps: number | null;
  weightLbs: number | null;
  programId: number | null;
  workoutId: number;
  exerciseId: number | null;
}

export default function WorkoutEditor({ workout }: { workout: any }) {
  const [newSets, setNewSets] = useState<Array<WorkoutSetState>>([]);

  const exerciseMap = new Map();

  workout.exercises.forEach((exercise: Exercise) => {
    const exerciseSets = workout.workoutSets.filter((set: WorkoutSet) => {
      return set.exerciseId === exercise.id;
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

    setNewSets([...newSets, newSet]);
  }

  function removeSetField(e: React.FormEvent<HTMLButtonElement>, idx: number) {
    e.preventDefault();

    const data = [...newSets];
    data.splice(idx, 1);
    setNewSets(data);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      await fetch(`http://localhost:3000/api/workouts/${workout.id}/sets`, {
        method: "POST",
        body: JSON.stringify(newSets),
      });
    } catch (error) {}
  }

  return (
    <div className="h-full w-full">
      <div>
        <h1>{workout.name}</h1>
      </div>
      <div className="my-2">
        <h2>Current exercises</h2>
        {workout.exercises.map((exercise: Exercise, idx: number) => (
          <div
            key={idx}
            className={twJoin(
              "h--min-[100px] w-[300px] m-2 flex flex-col justify-between border border-gray-200 rounded-md"
            )}
          >
            <span className="m-2 text-lg font-semibold">{exercise.name}</span>
            <div>
              {exerciseMap
                .get(exercise.name)
                .map((set: WorkoutSet, idx: number) => (
                  <WorkoutSetRow key={idx} idx={idx} set={set} />
                ))}
            </div>

            <form
              action="submit"
              onSubmit={handleSubmit}
              className="flex flex-col"
            >
              {newSets.map((_: WorkoutSetState, idx: number) => (
                <div key={idx} className="mb-5 flex items-center">
                  <span className="mx-2 font-semibold text-sm translate-y-[-2]">
                    Set {exerciseMap.get(exercise.name).length + 1}
                  </span>
                  <div className="flex flex-col items-center mx-2">
                    <label className="text-sm font-semibold" htmlFor="reps">
                      Reps
                    </label>
                    <input
                      id="reps"
                      name="reps"
                      type="text"
                      className="w-[40px] h-[25px] border border-gray-200 rounded-md text-center"
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        const data = [...newSets];

                        data[idx][
                          event.target.name as keyof Pick<
                            WorkoutSet,
                            "reps" | "weightLbs"
                          >
                        ] = Number(event.target.value);
                        setNewSets(data);
                      }}
                    />
                  </div>
                  <div className="flex flex-col items-center mx-2">
                    <label className="text-sm font-semibold" htmlFor="weight">
                      Weight
                    </label>
                    <input
                      id="weight"
                      name="weightLbs"
                      type="text"
                      className="w-[40px] h-[25px] border border-gray-200 rounded-md text-center"
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        const data = [...newSets];

                        data[idx][
                          event.target.name as keyof Pick<
                            WorkoutSet,
                            "reps" | "weightLbs"
                          >
                        ] = Number(event.target.value);
                        setNewSets(data);
                      }}
                    />
                  </div>
                  <button
                    onClick={(e: React.FormEvent<HTMLButtonElement>) => {
                      e.preventDefault();
                      removeSetField(e, idx);
                    }}
                  >
                    Remove
                  </button>
                </div>
              ))}

              <button
                className="my-2"
                onClick={(e: React.FormEvent<HTMLButtonElement>) => {
                  e.preventDefault();
                  addAnotherSetField(e, exercise);
                }}
              >
                Add another set
              </button>

              {newSets.length > 0 && (
                <button
                  className="h-[40px] w-[90%] mb-2 self-center bg-black rounded-md text-white font-medium"
                  type="submit"
                >
                  Save
                </button>
              )}
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}

function WorkoutSetRow({ set, idx }: { set: WorkoutSet; idx: number }) {
  return (
    <div className="flex align-items">
      <span className="mx-2 font-semibold text-sm">Set {idx + 1}</span>
      <div className="flex flex-col items-center mx-2">
        <span className="font-semibold text-sm">Reps</span>
        <span className="text-sm">{set.reps}</span>
      </div>
      <div className="flex flex-col items-center mx-2">
        <span className="font-semibold text-sm">Weight</span>
        <span className="text-sm">{set.weightLbs}</span>
      </div>
    </div>
  );
}
