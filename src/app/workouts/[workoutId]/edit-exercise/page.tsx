import { Exercise, Workout, WorkoutSet } from "@prisma/client";
import { notFound, redirect } from "next/navigation";

import WorkoutEditor from "@/components/workout-editor";
import { getWorkout } from "@/lib/api/workouts";
import { getCurrentUser } from "@/lib/session";

interface EditExerciseProps {
  params: { workoutId: Workout["id"] };
}

export default async function EditExercise({ params }: EditExerciseProps) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const workout = await getWorkout(params.workoutId);

  if (!workout) {
    notFound();
  }

  return <WorkoutEditor workout={workout} />;
}
