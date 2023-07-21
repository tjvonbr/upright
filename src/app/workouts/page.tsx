import { Program, Workout } from "@prisma/client";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { db } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

import { getWorkoutsForProgram } from "../programs/[programId]/page";

interface ProgramWorkoutsProps {
  params: { programId: Program["id"] };
}

export async function getWorkoutsForUser(userId: string) {
  const workouts = db.workout.findMany({
    where: {
      userId: Number(userId),
    },
  });

  return workouts;
}

export default async function ProgramWorkouts() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const workouts = await getWorkoutsForUser(user?.id);

  if (!workouts) {
    return notFound();
  }

  return (
    <div className="flex flex-col">
      <h1>Workouts</h1>
      {workouts.map((workout: Workout, idx: number) => (
        <Link key={idx} href={`/workouts/${workout.id}`}>
          {workout.name}
        </Link>
      ))}
    </div>
  );
}
