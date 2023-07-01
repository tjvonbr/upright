import { Workout } from "@prisma/client";
import { notFound, redirect } from "next/navigation";

import WorkoutOperations from "@/app/components/workout-operations";
import { getExercises } from "@/lib/api/exercises";
import { db } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

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
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const workout = await getWorkout(params.workoutId);
  const exercises = await getExercises(Number(user?.id));

  if (!workout) {
    notFound();
  }

  return (
    <div className="h-full w-[95%] m-auto">
      <WorkoutOperations workout={workout} />
    </div>
  );
}
