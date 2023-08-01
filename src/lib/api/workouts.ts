import { Exercise, Program, Workout } from "@prisma/client";

import { db } from "../prisma";
import { ExerciseWorkoutMap, WorkoutWithSets } from "@/types/workouts";

export async function getWorkoutsForUser(userId: string) {
  const workouts = db.workout.findMany({
    where: {
      userId: Number(userId),
    },
  });

  return workouts;
}

export async function getWorkoutsForProgram(programId: Program["id"]) {
  return await db.workout.findMany({
    where: {
      programId: Number(programId),
    },
  });
}

export async function getMostRecentWorkoutForProgram(programId: string) {
  return await db.workout.findFirst({
    where: {
      programId: Number(programId),
    },
    orderBy: {
      date: "desc",
    },
  });
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

export async function getWorkoutsWithExercise(exerciseId: number) {
  const workouts = await db.workout.findMany({
    where: {
      exercises: {
        some: {
          id: Number(exerciseId),
        },
      },
    },
    include: {
      workoutSets: {
        where: {
          exerciseId,
        },
      },
    },
  });

  return workouts;
}

export async function getMostRecentWorkoutByExerciseIds(exerciseIds: number[]) {
  const workouts: ExerciseWorkoutMap = {};

  for (const exerciseId of exerciseIds) {
    const workout = await db.workout.findFirst({
      where: {
        exercises: {
          some: {
            id: exerciseId,
          },
        },
      },
      include: {
        workoutSets: true,
      },
    });

    workouts[exerciseId as keyof ExerciseWorkoutMap] = workout;
  }

  return workouts;
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
