/* eslint-disable */
"use client";

import { Exercise, WorkoutSet, WorkoutsExercises } from "@prisma/client";
import { Check, ExternalLink, Pencil, Trash2, XCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import useSWRMutation from "swr/mutation";
import { twJoin } from "tailwind-merge";

import Text from "./common/Text";
import Spinner from "./Spinner";
import {
  ExerciseWorkoutMap,
  WorkoutExercisesWithExercise,
  WorkoutWithExercises,
} from "@/types/workouts";
import { buttonVariants } from "./common/button";
import WorkoutTimer from "./WorkoutTimer";
import WorkoutSetForm from "./WorkoutSetForm";
import { convertUTCToLocal } from "@/lib/helpers/dates";
import toast from "react-hot-toast";

export default function WorkoutOperations({
  exercises,
  recentWorkouts,
  workout,
}: {
  exercises: Exercise[];
  recentWorkouts: ExerciseWorkoutMap;
  workout: WorkoutWithExercises;
}) {
  const [exerciseToEdit, setExerciseToEdit] = useState<Exercise | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [name, setName] = useState(workout.name);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedExercises, setSelectedExercises] = useState<Array<Exercise>>(
    []
  );
  const [isMutatingName, setIsMutatingName] = useState(false);

  let inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current && inputRef.current.focus();
    }
  }, [isEditing]);

  const router = useRouter();

  const { exercises: workoutExercises, workoutSets } = workout;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsCreating(true);

    const response = await fetch(
      `http://localhost:3000/api/workouts/${workout.id}/exercises`,
      {
        method: "POST",
        body: JSON.stringify({
          exercises: selectedExercises,
          workoutId: workout.id,
        }),
      }
    );

    setIsCreating(false);

    if (!response.ok) {
      toast.error("Whoops!  We weren't able to add exercises to this workout!");
    } else {
      toast.success(`Successfully added exercises to your workout!`);
      setSelectedExercises([]);
      router.refresh();
    }
  }

  async function deleteExercise() {
    setIsDeleting(true);

    const response = await fetch(
      `http://localhost:3000/api/workouts/${workout.id}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      router.replace("/workouts");
      setIsDeleting(false);
    }

    setIsDeleting(false);
  }

  function beginEditing(exercise: Exercise) {
    setIsEditing(true);
    setExerciseToEdit(exercise);
  }

  function ceaseEditing() {
    setIsEditing(false);
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
          "h-10 w-full px-3 flex flex-col justify-center bg-white border border-200-slate rounded-md text-sm font-semibold hover:cursor-pointer",
          selected ? "border-2 border-indigo-500" : ""
        )}
        onClick={() => toggleSelectedExercise(exercise)}
      >
        {exercise.name}
      </div>
    );
  }

  const exercisesNotInWorkout = exercises.filter(
    (exercise) =>
      !workoutExercises.some(
        (workoutExercise: WorkoutsExercises) =>
          workoutExercise.exerciseId === exercise.id
      )
  );

  async function handleEdit(e: React.FormEvent) {
    e.preventDefault();

    setIsMutatingName(true);

    const response = await fetch(
      `http://localhost:3000/api/workouts/${workout.id}`,
      {
        method: "PUT",
        body: JSON.stringify({
          name,
        }),
      }
    );

    if (response.ok) {
      router.refresh();
      setIsMutatingName(false);
      setIsEditing(false);
    }

    setIsMutatingName(false);
  }

  return (
    <div className="min-h-screen grid grid-cols-2">
      <div className="px-4 py-2 border-r border-slate-200">
        <div className="flex flex-col">
          <div className="box-border w-full flex items-center justify-between">
            <form className="w-full">
              <input
                ref={inputRef}
                className="min-w-[90%] bg-slate-50 text-2xl font-bold"
                disabled={!isEditing}
                type="text"
                value={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setName(e.target.value)
                }
              />
            </form>
            <div className="flex items-center space-x-2">
              {isEditing ? (
                <button onClick={handleEdit}>
                  {isMutatingName ? (
                    <Spinner color="black" size="15" />
                  ) : (
                    <Check
                      className="text-slate-400 hover:text-green-500 transition-colors"
                      size={18}
                    />
                  )}
                </button>
              ) : (
                <button onClick={() => setIsEditing(true)}>
                  <Pencil
                    className="text-slate-400 hover:text-indigo-500 transition-colors"
                    size={18}
                  />
                </button>
              )}

              <button onClick={deleteExercise}>
                {isDeleting ? (
                  <Spinner color="black" size="15" />
                ) : (
                  <Trash2
                    className="text-slate-400 hover:text-red-500 transition-colors"
                    size={18}
                  />
                )}
              </button>
            </div>
          </div>
          <div className="pt-1 flex items-center space-x-2">
            <p className="text-slate-500">
              {convertUTCToLocal(workout.date).toLocaleDateString("en-us", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <WorkoutTimer workout={workout} />
          </div>
        </div>
        <div className="mt-3 space-y-2">
          {workoutExercises.map(
            (workoutExercise: WorkoutExercisesWithExercise, idx: number) => {
              const exerciseSets = workoutSets
                .filter(
                  (set: any) => set.exerciseId === workoutExercise.exerciseId
                )
                .sort((a: any, b: any) => b.id - a.id);

              return (
                <ExerciseInWorkoutItem
                  key={idx}
                  beginEditing={beginEditing}
                  ceaseEditing={ceaseEditing}
                  exercise={workoutExercise.exercise}
                  exerciseToEdit={exerciseToEdit}
                  instructions={workoutExercise.instructions}
                  isEditing={isEditing}
                  exerciseSets={exerciseSets}
                  recentWorkouts={recentWorkouts}
                  workoutId={workout.id}
                />
              );
            }
          )}
        </div>
      </div>
      <div className="my-3 flex flex-col items-center">
        <h2 className="text-2xl font-bold">Add exercises to your workout</h2>
        <p className="text-slate-500">
          Select one or more exercises to add to your workout!
        </p>
        <form className="w-full px-4 mt-3 flex flex-col items-center space-y-2">
          {exercisesNotInWorkout.map((exercise: Exercise, idx: number) => (
            <ExerciseItem key={idx} exercise={exercise} />
          ))}
          <button
            className={twJoin(buttonVariants({ variant: "primary" }))}
            onClick={(e: React.FormEvent) => handleSubmit(e)}
          >
            {isCreating ? (
              <Spinner />
            ) : selectedExercises.length > 1 ? (
              "Add exercises"
            ) : (
              "Add exercise"
            )}
          </button>
        </form>
        <Text>
          Don't see an exercise. Add one{" "}
          <Link className="text-indigo-500" href="/exercises">
            here
          </Link>
        </Text>
      </div>
    </div>
  );
}

export interface Set {
  id: number;
  reps: string;
  weightLbs: string;
}

function ExerciseInWorkoutItem({
  beginEditing,
  ceaseEditing,
  exercise,
  exerciseToEdit,
  instructions,
  isEditing,
  recentWorkouts,
  workoutId,
  exerciseSets,
}: {
  // eslint-disable-next-line no-unused-vars
  beginEditing: (e: Exercise) => void;
  ceaseEditing: () => void;
  exercise: Exercise;
  exerciseToEdit: Exercise | null;
  instructions: WorkoutsExercises["instructions"];
  isEditing: boolean;
  recentWorkouts: ExerciseWorkoutMap;
  workoutId: number;
  exerciseSets: WorkoutSet[];
}) {
  const [oldSets, setOldSets] = useState(
    exerciseSets.map((set) => ({
      id: set.id,
      reps: set.reps.toString(),
      weightLbs: set.weightLbs.toString(),
    }))
  );
  const [newSets, setNewSets] = useState([{ reps: "", weightLbs: "" }]);
  const [newInstructions, setNewInstructions] = useState("");
  const [isCreatingInstructions, setIsCreatingInstructions] = useState(false);

  const router = useRouter();

  const { trigger, isMutating } = useSWRMutation(
    `http://localhost:3000/api/workouts/${workoutId}/exercises`,
    deleteExercise
  );

  const isEditingExercise = exercise.id === exerciseToEdit?.id;

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

  function addSet(e: React.FormEvent) {
    e.preventDefault();

    const prevSets = [...newSets];
    setNewSets([...prevSets, { reps: "", weightLbs: "" }]);
  }

  function removeSet(e: React.FormEvent, idx: number) {
    e.preventDefault();

    if (idx === 0) {
      ceaseEditing();
      return;
    }

    const newSets = [...oldSets];
    newSets.splice(idx, 1);
    setOldSets(newSets);
  }

  function handleOldSetChange(
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) {
    const newFormValues = [...oldSets];
    newFormValues[idx][e.target.name as keyof Pick<Set, "reps" | "weightLbs">] =
      e.target.value;
    setOldSets(newFormValues);
  }

  function handleNewSetChange(
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) {
    const newFormValues = [...newSets];
    newFormValues[idx][e.target.name as keyof Omit<Set, "id">] = e.target.value;
    setNewSets(newFormValues);
  }

  async function createExerciseInstructions(
    e: React.FormEvent<HTMLButtonElement>,
    instructions: string
  ) {
    e.preventDefault();
    setIsCreatingInstructions(true);

    const response = await fetch(
      `http://localhost:3000/api/workouts/${workoutId}/exercises/${exercise.id}`,
      {
        method: "PUT",
        body: JSON.stringify({
          instructions,
        }),
      }
    );

    setIsCreatingInstructions(false);

    if (!response.ok) {
      return toast.error(
        "Whoops!  We had trouble updating your exercise goal for this workout!"
      );
    }

    router.refresh();
  }

  return (
    <div className="px-3 py-2 flex justify-between items-center bg-white rounded-md border border-slate-200">
      <div className="w-1/2 flex flex-col space-y-3">
        <div className="flex flex-col">
          <div className="flex items-center space-x-2">
            <p className="font-semibold text-sm">{exercise.name}</p>
            {instructions ? (
              <p className="text-xs">{instructions}</p>
            ) : (
              <form className="flex items-center space-x-2">
                <input
                  className="px-2 py-1 w-[80px] border border-slate-200 rounded-[2px] text-xs"
                  type="text"
                  placeholder="sets x reps"
                  value={newInstructions}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setNewInstructions(e.target.value)
                  }
                />
                {newInstructions.length > 0 && (
                  <button
                    onClick={async (e: React.FormEvent<HTMLButtonElement>) =>
                      createExerciseInstructions(e, newInstructions)
                    }
                  >
                    {isCreatingInstructions ? (
                      <Spinner color="black" size="15" />
                    ) : (
                      <Check
                        className="text-slate-400 hover:text-green-500 transition-colors"
                        size={18}
                      />
                    )}
                  </button>
                )}
              </form>
            )}
          </div>
          {exerciseSets.length > 0 ? (
            <div className="flex space-x-1">
              {exerciseSets
                .sort((a, b) => +new Date(a.createdAt) - +new Date(b.createdAt))
                .map((set: WorkoutSet, idx: number) => (
                  <p className="mb-0 text-sm" key={idx}>
                    {`${set.reps}x${set.weightLbs}`}
                  </p>
                ))}
            </div>
          ) : (
            <p className="text-sm">No data for this exercise</p>
          )}
          {isEditing && isEditingExercise ? (
            <WorkoutSetForm
              addSet={addSet}
              exercise={exercise}
              handleOldSetChange={handleOldSetChange}
              handleNewSetChange={handleNewSetChange}
              newSets={newSets}
              removeSet={removeSet}
              oldSets={oldSets}
              workoutId={workoutId}
            />
          ) : null}
        </div>
        <div>
          <p className="m-0 text-sm font-semibold">Most Recent</p>
          <div className="flex space-x-1 overflow-visible">
            {!recentWorkouts[exercise.id] ? (
              <p className="m-0 text-sm">No previous workout data</p>
            ) : recentWorkouts[exercise.id]!.workoutSets.length > 0 ? (
              recentWorkouts[exercise.id]?.workoutSets.map(
                (set: any, idx: number) => (
                  <p
                    className="mb-0 text-sm"
                    key={idx}
                  >{`${set.reps}x${set.weightLbs}`}</p>
                )
              )
            ) : (
              <p className="text-sm">No previous workout data</p>
            )}
          </div>
        </div>
      </div>
      <div className="flex space-x-2">
        <Link
          className="hover:cursor-pointer"
          href={`/exercises/${exercise.id}`}
        >
          <ExternalLink color="black" size={18} />
        </Link>
        <button
          onClick={async (e: React.FormEvent) => {
            e.preventDefault();
            await trigger();
          }}
        >
          {isMutating ? (
            <Spinner color={"black"} size={"15"} />
          ) : (
            <Trash2 color="black" size={18} />
          )}
        </button>
        {isEditing && exercise.id === exerciseToEdit?.id ? (
          <button onClick={ceaseEditing}>
            <XCircle color="red" size={18} />
          </button>
        ) : (
          <button
            onClick={() => {
              beginEditing(exercise);
            }}
          >
            <Pencil color="black" size={18} />
          </button>
        )}
      </div>
    </div>
  );
}
