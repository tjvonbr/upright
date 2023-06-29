import { Workout } from "@prisma/client";
import { notFound } from "next/navigation";

import { db } from "@/lib/prisma";

async function getWorkout(workoutId: number) {
  const workout = db.workout.findFirst({
    where: {
      id: Number(workoutId),
    },
  });

  return workout;
}

interface WorkoutProps {
  params: { workoutId: Workout["id"] };
}

export default async function Workout({ params }: WorkoutProps) {
  const workout = await getWorkout(params.workoutId);

  if (!workout) {
    notFound();
  }

  return <div>{workout.name}</div>;
}
