import { Workout } from "@prisma/client";
import { notFound } from "next/navigation";

import { db } from "@/lib/prisma";

async function getWorkoutForProgram(workoutId: number) {
  const workout = await db.workout.findFirst({
    where: {
      id: workoutId,
    },
  });

  return workout;
}

interface ProgramWorkoutProps {
  params: { workoutId: Workout["id"] };
}

export default async function ProgramWorkout({ params }: ProgramWorkoutProps) {
  const workout = await getWorkoutForProgram(params.workoutId);

  if (!workout) {
    notFound();
  }

  return (
    <div className="h-full w-full">
      <h1>{workout.name}</h1>
      <button>Hello</button>
    </div>
  );
}
