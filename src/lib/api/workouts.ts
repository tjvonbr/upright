import { Exercise, Workout } from "@prisma/client";

import { db } from "../prisma";

export async function getUserWorkouts(userId: string) {
  const workouts = await db.workout.findMany({
    where: {
      userId: Number(userId),
    },
  });

  return workouts;
}

export async function getWorkout(workoutId: number) {
  const workout = await db.workout.findFirst({
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

export async function addWorkoutExercise(
  workoutId: Workout["id"],
  exerciseId: Exercise["id"]
) {
  const workout = await db.workout.update({
    where: {
      id: Number(workoutId),
    },
    data: {
      exercises: {
        connect: {
          id: exerciseId,
        },
      },
    },
  });

  return workout;
}
