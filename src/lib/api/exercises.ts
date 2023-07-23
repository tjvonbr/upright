import { db } from "../prisma";

export async function getExercisesForUser(userId: string) {
  const exercises = await db.exercise.findMany({
    where: {
      userId: Number(userId),
    },
    orderBy: {
      name: "asc",
    },
  });

  return exercises;
}
