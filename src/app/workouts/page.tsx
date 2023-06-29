import { Program, Workout } from "@prisma/client";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getWorkoutsForProgram } from "../programs/[programId]/page";

interface ProgramWorkoutsProps {
  params: { programId: Program["id"] };
}

export default async function ProgramWorkouts({
  params,
}: ProgramWorkoutsProps) {
  const workouts = await getWorkoutsForProgram(params.programId);

  if (!workouts) {
    return notFound();
  }

  return (
    <div>
      <h1>Workouts</h1>
      {workouts.map((workout: Workout, idx: number) => (
        <Link key={idx} href={`/workouts/${workout.id}`}>
          {workout.name}
        </Link>
      ))}
    </div>
  );
}
