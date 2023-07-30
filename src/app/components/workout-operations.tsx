/* eslint-disable */
"use client";

import { Exercise, Workout, WorkoutSet } from "@prisma/client";
import {
  ArrowDownFromLine,
  Check,
  ExternalLink,
  Pencil,
  Trash2,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import useSWRMutation from "swr/mutation";
import { twJoin } from "tailwind-merge";

import Input from "./common/Input";
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
  const [exerciseToEdit, setExerciseToEdit] = useState<Exercise | null>(null);
  const [isEditing, setIsEditing] = useState(false);
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
    <div className="min-h-screen grid grid-cols-2">
      <div className="pl-5 pt-3 border-r border-gray-200">
        <h1>{workout.name}</h1>
        <div className="m-5">
          {workoutExercises.map((exercise: Exercise, idx: number) => {
            const exerciseSets = workoutSets
              .filter((set) => set.exerciseId === exercise.id)
              .sort((a, b) => b.id - a.id);

            return (
              <ExerciseInWorkoutItem
                key={idx}
                beginEditing={beginEditing}
                ceaseEditing={ceaseEditing}
                exercise={exercise}
                exerciseToEdit={exerciseToEdit}
                isEditing={isEditing}
                exerciseSets={exerciseSets}
                workoutId={workout.id}
              />
            );
          })}
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

interface Set {
  id: number;
  reps: string;
  weightLbs: string;
}

function ExerciseInWorkoutItem({
  beginEditing,
  ceaseEditing,
  exercise,
  exerciseToEdit,
  isEditing,
  workoutId,
  exerciseSets,
}: {
  // eslint-disable-next-line no-unused-vars
  beginEditing: (e: Exercise) => void;
  ceaseEditing: () => void;
  exercise: Exercise;
  exerciseToEdit: Exercise | null;
  isEditing: boolean;
  workoutId: number;
  exerciseSets: WorkoutSet[];
}) {
  const [setValues, setSetValues] = useState(
    exerciseSets.map((set) => ({
      id: set.id,
      reps: set.reps.toString(),
      weightLbs: set.weightLbs.toString(),
    }))
  );
  const [newSets, setNewSets] = useState([{ reps: "", weightLbs: "" }]);

  const router = useRouter();

  const { trigger, isMutating } = useSWRMutation(
    `http://localhost:3000/api/workouts/${workoutId}/exercises`,
    deleteExercise
  );

  const { trigger: createTrigger, isMutating: isCreateMutating } =
    useSWRMutation("http://localhost:3000/api/sets", createSet);

  const isEditingExercise = exercise.id === exerciseToEdit?.id;

  async function createSet(url: string, { arg }: { arg: number }) {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        exerciseId: exercise.id,
        workoutId,
        reps: setValues[arg]["reps"],
        weight: setValues[arg]["weightLbs"],
      }),
    });

    if (response.ok) {
      router.refresh();
    }
  }

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

    const newSets = [...setValues];
    newSets.splice(idx, 1);
    setSetValues(newSets);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>, idx: number) {
    const newFormValues = [...setValues];
    newFormValues[idx][e.target.name as keyof Pick<Set, "reps" | "weightLbs">] =
      e.target.value;
    setSetValues(newFormValues);
  }

  function handleNewSetChange(
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) {
    const newFormValues = [...newSets];
    newFormValues[idx][e.target.name as keyof Omit<Set, "id">] = e.target.value;
    setNewSets(newFormValues);
  }

  return (
    <div className="my-2 flex justify-between items-center bg-white rounded-md px-3 py-2">
      <div className="flex flex-col">
        <span className="font-semibold text-md">{exercise.name}</span>
        <div className="flex flex-col">
          {exerciseSets.length > 0 ? (
            <div className="flex">
              {exerciseSets.map((set: WorkoutSet, idx: number) => (
                <p className="mr-2 mb-0 text-sm" key={idx}>
                  {`${set.reps}x${set.weightLbs}`}
                </p>
              ))}
            </div>
          ) : (
            <p className="text-sm">No data for this exercise</p>
          )}
          {isEditing && isEditingExercise ? (
            <form action="submit">
              {setValues.map((set: Set, idx: number) => (
                <PrevSet
                  key={idx}
                  addSet={addSet}
                  handleChange={handleChange}
                  idx={idx}
                  set={set}
                  setValues={setValues}
                />
              ))}
              {newSets.map((set: any, idx: number) => (
                <NewSet
                  key={idx}
                  addSet={addSet}
                  createTrigger={createTrigger}
                  handleChange={handleNewSetChange}
                  idx={idx}
                  isCreateMutating={isCreateMutating}
                  removeSet={removeSet}
                  set={set}
                />
              ))}
            </form>
          ) : null}
        </div>
      </div>
      <div className="flex">
        <Link
          className="mr-5 hover:cursor-pointer"
          href={`/exercises/${exercise.id}`}
        >
          <ExternalLink color="black" size={18} />
        </Link>
        <button
          className="mr-5"
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

interface PrevSetProps {
  addSet: (e: React.FormEvent) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>, idx: number) => void;
  idx: number;
  set: Set;
  setValues: Set[];
}

function PrevSet({ addSet, handleChange, idx, set, setValues }: PrevSetProps) {
  const router = useRouter();

  const { trigger: updateTrigger, isMutating: isUpdateMutating } =
    useSWRMutation(`http://localhost:3000/api/sets/${set.id}`, updateSet);

  async function updateSet(url: string) {
    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify({
        reps: setValues[idx]["reps" as keyof Set],
        weight: setValues[idx]["weightLbs" as keyof Set],
      }),
    });

    if (response.ok) {
      router.refresh();
    }
  }

  const { trigger: deleteTrigger, isMutating: isDeleteMutating } =
    useSWRMutation(`http://localhost:3000/api/sets/${set.id}`, deleteSet);

  async function deleteSet(url: string) {
    const response = await fetch(url, {
      method: "DELETE",
    });

    if (response.ok) {
      router.refresh();
    }
  }

  return (
    <div className="flex items-center">
      <Input
        autoComplete="off"
        className="w-[40px] mr-2 py-1 text-center text-sm"
        name="reps"
        type="text"
        value={set.reps.toString()}
        onChange={(e) => handleChange(e, idx)}
      />
      <span className="mr-2">x</span>
      <Input
        autoComplete="off"
        className="w-[40px] mr-3 py-1 text-center text-sm"
        name="weightLbs"
        type="text"
        value={set.weightLbs.toString()}
        onChange={(e) => handleChange(e, idx)}
      />
      <button className="mr-3" onClick={(e: React.FormEvent) => addSet(e)}>
        <ArrowDownFromLine color="black" size={18} />
      </button>
      <button
        className="mr-3"
        onClick={async (e: React.FormEvent) => {
          e.preventDefault();
          await deleteTrigger();
        }}
      >
        {isDeleteMutating ? (
          <Spinner color="black" size={"15"} />
        ) : (
          <Trash2 color="red" size={18} />
        )}
      </button>
      <button
        onClick={async (e: React.FormEvent) => {
          e.preventDefault();
          await updateTrigger();
        }}
      >
        {isUpdateMutating ? (
          <Spinner color="black" size={"18"} />
        ) : (
          <Check color="green" size={18} />
        )}
      </button>
    </div>
  );
}

interface NewSetProps {
  addSet: (e: React.FormEvent) => void;
  createTrigger: (arg: number) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>, idx: number) => void;
  idx: number;
  isCreateMutating: boolean;
  removeSet: (e: React.FormEvent, idx: number) => void;
  set: Set;
}

function NewSet({
  addSet,
  createTrigger,
  handleChange,
  idx,
  isCreateMutating,
  removeSet,
  set,
}: NewSetProps) {
  return (
    <div className="flex items-center">
      <Input
        autoComplete="off"
        className="w-[40px] mr-2 py-1 text-center text-sm"
        name="reps"
        type="text"
        value={set.reps}
        onChange={(e) => handleChange(e, idx)}
      />
      <span className="mr-2">x</span>
      <Input
        autoComplete="off"
        className="w-[40px] mr-3 py-1 text-center text-sm"
        name="weightLbs"
        type="text"
        value={set.weightLbs.toString()}
        onChange={(e) => handleChange(e, idx)}
      />
      <button className="mr-3" onClick={(e: React.FormEvent) => addSet(e)}>
        <ArrowDownFromLine color="black" size={18} />
      </button>
      <button
        className="mr-3"
        onClick={(e: React.FormEvent) => removeSet(e, idx)}
      >
        <XCircle color="black" size={18} />
      </button>
      <button
        onClick={async (e: React.FormEvent) => {
          e.preventDefault();
          await createTrigger(idx);
        }}
      >
        {isCreateMutating ? (
          <Spinner color="black" size={"18"} />
        ) : (
          <Check color="green" size={18} />
        )}
      </button>
    </div>
  );
}
