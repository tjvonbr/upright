import { db } from "../prisma";

export async function getProgramForUser(programId: string) {
  const program = await db.program.findFirst({
    where: {
      id: Number(programId),
    },
  });

  return program;
}
