import { db } from "../prisma";

export async function getExerciseById(exerciseId: string) {
  const exercise = await db.exercise.findFirst({
    where: {
      id: exerciseId,
    },
  });

  return exercise;
}

export async function getExercisesByUserId(userId: string) {
  const exercises = await db.exercise.findMany({
    where: {
      userId,
    },
    orderBy: {
      name: "asc",
    },
  });

  return exercises;
}
