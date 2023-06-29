import { Program, Workout } from "@prisma/client";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { db } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

async function getProgramForUser(programId: Program["id"]) {
  return await db.program.findFirst({
    where: {
      id: Number(programId),
    },
  });
}

export async function getWorkoutsForProgram(programId: Program["id"]) {
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
  const programWorkouts = await getWorkoutsForProgram(params.programId);
  const mostRecentWorkout = await getMostRecentWorkoutForProgra(
    params.programId
  );

  if (!programWorkouts || !program) {
    notFound();
  }

  return (
    <div className="h-full mx-10 flex flex-col">
      <h1 className="relative left-0 top-0 text-2xl font-medium">
        {program?.name}
      </h1>
      {mostRecentWorkout ? (
        <LastWorkoutWidget workout={mostRecentWorkout} />
      ) : null}
      <AddWorkoutWidget programId={program.id as number} />
    </div>
  );
}

function LastWorkoutWidget({ workout }: { workout: Workout }) {
  return (
    <Widget>
      <p className="mx-3 pt-2 text-lg font-medium">Most Recent Workout</p>
      <p className="mx-3 text-md font-medium text-gray-500">{workout.name}</p>
    </Widget>
  );
}

function AddWorkoutWidget({ programId }: { programId: number }) {
  return (
    <Widget href={`/programs/${programId}/add-workout`}>
      <div className="h-full w-full flex flex-col justify-center items-center">
        <p className="text-lg font-medium">Add Workout</p>
        <PlusCircle strokeWidth={1.5} />
      </div>
    </Widget>
  );
}

interface WidgetProps {
  children: React.ReactNode;
  href?: string;
}

function Widget({ children, href }: WidgetProps) {
  return href ? (
    <Link
      className="w-[400px] h-[250px] border border-slate-200 rounded-md"
      href={href}
    >
      {children}
    </Link>
  ) : (
    <div className="w-[400px] h-[250px] border border-slate-200 rounded-md">
      {children}
    </div>
  );
}
