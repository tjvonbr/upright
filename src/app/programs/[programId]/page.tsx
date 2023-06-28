import { Program } from "@prisma/client";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { db } from "@/app/lib/prisma";
import { getCurrentUser } from "@/app/lib/session";

async function getProgramForUser(programId: Program["id"]) {
  return await db.program.findFirst({
    where: {
      id: Number(programId),
    },
  });
}

async function getWorkoutsForProgram(programId: Program["id"]) {
  return await db.workout.findMany({
    where: {
      programId: Number(programId),
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
  const programWorkouts = await getWorkoutsForProgram(params.programId);

  if (!programWorkouts) {
    notFound();
  }

  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
      <h1 className="text-2xl font-medium">{program?.name}</h1>
      {programWorkouts.length > 0 ? (
        <div>{programWorkouts.length}</div>
      ) : (
        <Link href={`/programs/${params.programId}/add-workout`}>
          You need to add a workout!
        </Link>
      )}
    </div>
  );
}
