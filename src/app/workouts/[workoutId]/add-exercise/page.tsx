import { Program } from "@prisma/client";
import { notFound, redirect } from "next/navigation";
import React from "react";

import AddExerciseForm from "@/app/components/add-exercise-form";
import { getExercises } from "@/lib/api/exercises";
import { getWorkout } from "@/lib/api/workouts";
import { getCurrentUser } from "@/lib/session";

interface AddWorkoutExerciseProps {
  params: { workoutId: Program["id"] };
}

export default async function AddWorkoutExercise({
  params,
}: AddWorkoutExerciseProps) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const workout = await getWorkout(Number(params.workoutId));
  const exercises = await getExercises(Number(user.id));

  if (!workout || !exercises) {
    notFound();
  }

  // Filter exercises so we only render the ones that aren't
  // already part of the workout
  const filteredExercises = exercises.filter((exercise) => {
    return workout.exercises.some(
      (workoutExercise) => workoutExercise.id !== exercise.id
    );
  });

  return <AddExerciseForm workout={workout} exercises={filteredExercises} />;
}