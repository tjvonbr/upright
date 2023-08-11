import { Workout } from "@prisma/client";
import { notFound, redirect } from "next/navigation";

import WorkoutOperations from "@/components/WorkoutOperations";
import {
  getMostRecentWorkoutByExerciseIds,
  getWorkoutById,
} from "@/lib/api/workouts";
import { getCurrentUser } from "@/lib/session";
import { getExercisesByUserId } from "@/lib/api/exercises";

interface WorkoutProps {
  params: { workoutId: Workout["id"] };
}

export default async function Workout({ params }: WorkoutProps) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const workout = await getWorkoutById(params.workoutId);

  if (!workout) {
    notFound();
  }

  const exercises = await getExercisesByUserId(user.id);

  const workoutExercises = exercises.filter((exercise) =>
    workout?.exercises.some(
      (workoutExercise) => workoutExercise.exerciseId === exercise.id
    )
  );

  const workoutExerciseIds = workoutExercises.map((exercise) => exercise.id);
  const recentWorkouts = await getMostRecentWorkoutByExerciseIds(
    workoutExerciseIds,
    workout.date
  );

  if (!workout) {
    return notFound();
  }

  return (
    <WorkoutOperations
      exercises={exercises}
      recentWorkouts={recentWorkouts}
      workout={workout}
    />
  );
}
