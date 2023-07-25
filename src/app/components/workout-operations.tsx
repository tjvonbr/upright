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
    <div className="min-h-full grid grid-cols-2 bg-slate-100">
      <div className="pl-5 pt-3 border-r border-gray-200">
        <h1>{workout.name}</h1>
        <div className="m-5">
          {workoutExercises.map((exercise: Exercise, idx: number) => (
            <ExerciseInWorkoutItem
              key={idx}
              beginEditing={beginEditing}
              ceaseEditing={ceaseEditing}
              exercise={exercise}
              exerciseToEdit={exerciseToEdit}
              isEditing={isEditing}
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

interface Set {
  reps: string;
  weight: string;
}

function ExerciseInWorkoutItem({
  beginEditing,
  ceaseEditing,
  exercise,
  exerciseToEdit,
  isEditing,
  workoutId,
  sets,
}: {
  // eslint-disable-next-line no-unused-vars
  beginEditing: (e: Exercise) => void;
  ceaseEditing: () => void;
  exercise: Exercise;
  exerciseToEdit: Exercise | null;
  isEditing: boolean;
  workoutId: number;
  sets: WorkoutSet[];
}) {
  const [setValues, setSetValues] = useState<Set[]>([
    { reps: "0", weight: "0" },
  ]);

  const router = useRouter();

  const { trigger, isMutating } = useSWRMutation(
    `http://localhost:3000/api/workouts/${workoutId}/exercises`,
    deleteExercise
  );

  const { trigger: setTrigger, isMutating: isSetMutating } = useSWRMutation(
    `http://localhost:3000/api/workouts/${workoutId}/exercises/${exercise.id}`,
    createWorkoutSet
  );

  const isEditingExercise = exercise.id === exerciseToEdit?.id;

  async function createWorkoutSet(url: string) {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({}),
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

  function addAnotherSet(e: React.FormEvent) {
    e.preventDefault();

    const prevSets = [...setValues];
    setSetValues([...prevSets, { reps: "0", weight: "0" }]);
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
    newFormValues[idx][e.target.name as keyof Set] = e.target.value;
    setSetValues(newFormValues);
  }

  const filteredSets = sets.filter((set) => set.exerciseId === exercise.id);

  return (
    <div className="my-2 flex justify-between items-center bg-white rounded-md px-3 py-2">
      <div className="flex flex-col">
        <span className="font-semibold text-md">{exercise.name}</span>
        <div className="flex">
          {isEditing && isEditingExercise ? (
            <form action="submit">
              {setValues.map(
                (set: { reps: string; weight: string }, idx: number) => (
                  <div key={idx} className="mt-2 flex items-center">
                    <Input
                      className="w-[40px] mr-2 py-1 text-center text-sm"
                      name="reps"
                      type="text"
                      value={set.reps}
                      onChange={(e) => handleChange(e, idx)}
                    />
                    <span className="mr-2">x</span>
                    <Input
                      className="w-[40px] mr-3 py-1 text-center text-sm"
                      name="weight"
                      type="text"
                      value={set.weight}
                      onChange={(e) => handleChange(e, idx)}
                    />
                    <button className="mr-3" onClick={addAnotherSet}>
                      <ArrowDownFromLine color="black" size={18} />
                    </button>
                    <button
                      className="mr-3"
                      onClick={(e: React.FormEvent) => removeSet(e, idx)}
                    >
                      <XCircle color="black" size={18} />
                    </button>
                    <button>
                      <Check color="green" size={18} />
                    </button>
                  </div>
                )
              )}
            </form>
          ) : filteredSets.length > 0 ? (
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
      <div className="flex">
        <button className="mr-5">
          <ExternalLink color="black" size={18} />
        </button>
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
