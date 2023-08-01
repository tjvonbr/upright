import { Exercise, Program, Workout } from "@prisma/client";

import { ExerciseWorkoutMap } from "@/types/workouts";

import { db } from "../prisma";

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

export async function getMostRecentWorkoutByExerciseIds(
  exerciseIds: number[],
  workoutDate: Date
) {
  const workouts: ExerciseWorkoutMap = {};

  for (const exerciseId of exerciseIds) {
    const workout = await db.workout.findFirst({
      where: {
        AND: [
          { exercises: { some: { id: exerciseId } } },
          { date: { lt: new Date(workoutDate) } },
        ],
      },
      include: {
        exercises: true,
        workoutSets: {
          where: {
            exerciseId,
          },
        },
      },
      orderBy: {
        date: "desc",
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
