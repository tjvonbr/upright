import { Program } from "@prisma/client";
import { notFound, redirect } from "next/navigation";

import ProgramOperations from "@/app/components/program-operations";
import { db } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

async function getProgramForUser(programId: Program["id"]) {
  return await db.program.findFirst({
    where: {
      id: Number(programId),
    },
  });
}

export async function getWorkoutsForProgram(programId: string) {
  return await db.workout.findMany({
    where: {
      programId: Number(programId),
    },
  });
}

async function getMostRecentWorkoutForProgra(programId: Program["id"]) {
  return await db.workout.findFirst({
    where: {
      programId: Number(programId),
    },
    orderBy: {
      date: "desc",
    },
  });
}

interface ProgramPageProps {
  params: { programId: number };
}

export default async function Program({ params }: ProgramPageProps) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const program = await getProgramForUser(params.programId);
  const mostRecentWorkout = await getMostRecentWorkoutForProgra(
    params.programId
  );

  if (!program) {
    notFound();
  }

  return (
    <ProgramOperations
      program={program}
      recentWorkout={mostRecentWorkout}
      user={user}
    />
  );
}
