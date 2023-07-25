import { Workout } from "@prisma/client";
import { notFound, redirect } from "next/navigation";

import WorkoutOperations from "@/app/components/workout-operations";
import { db } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

async function getWorkout(workoutId: number) {
  const workout = db.workout.findFirst({
    where: {
      id: Number(workoutId),
    },
    include: {
      exercises: true,
      workoutSets: true,
    },
  });

  return workout;
}

async function getUserExercises(userId: string) {
  const exercises = db.exercise.findMany({
    where: {
      userId: Number(userId),
    },
  });

  return exercises;
}

interface WorkoutProps {
  params: { workoutId: Workout["id"] };
}

export default async function Workout({ params }: WorkoutProps) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const workout = await getWorkout(params.workoutId);
  const exercises = await getUserExercises(user.id);

  if (!workout) {
    return notFound();
  }

  return <WorkoutOperations exercises={exercises} workout={workout} />;
}
