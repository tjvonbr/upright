import { User } from "@prisma/client";

import { db } from "../prisma";

export async function getExercises(userId: User["id"]) {
  const exercises = await db.exercise.findMany({
    where: {
      userId,
    },
  });

  return exercises;
}
