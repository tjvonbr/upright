import { Workout } from "@prisma/client";
import { notFound, redirect } from "next/navigation";

import WorkoutOperations from "@/components/WorkoutOperations";
import { getMostRecentWorkoutByExerciseIds } from "@/lib/api/workouts";
import { db } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

async function getWorkout(workoutId: number) {
  const workout = db.workout.findFirst({
    where: {
      id: Number(workoutId),
    },
    include: {
      exercises: {
        include: {
          exercise: true,
        },
      },
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

  if (!workout) {
    notFound();
  }

  const exercises = await getUserExercises(user.id);

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
