import { db } from "../prisma";

export async function getProgramsForUser(userId: string) {
  const programs = await db.program.findMany({
    where: {
      userId: Number(userId),
    },
  });

  return programs;
}

export async function getProgramForUser(programId: string) {
  const program = await db.program.findFirst({
    where: {
      id: Number(programId),
    },
  });

  return program;
}
