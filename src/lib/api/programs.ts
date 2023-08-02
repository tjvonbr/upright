import { db } from "../prisma";

export async function getProgramsForUser(userId: string) {
  return await db.program.findMany({
    where: {
      userId: Number(userId),
    },
    orderBy: {
      name: "asc",
    },
  });
}

export async function getProgramForUser(programId: string) {
  const program = await db.program.findFirst({
    where: {
      id: Number(programId),
    },
  });

  return program;
}
