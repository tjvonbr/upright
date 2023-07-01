import { Program } from "@prisma/client";

import WorkoutList, { Controls } from "@/app/components/workout-list";
import { db } from "@/lib/prisma";

interface ProgramWorkoutsProps {
  params: { programId: Program["id"] };
  searchParams: { [key: string]: string | string[] };
}

export default async function ProgramWorkouts({
  params,
  searchParams,
}: ProgramWorkoutsProps) {
  // Not sure this is the best approach, but it seems to
  // be working at the moment.  Will continue to monitor...
  const searchQuery = searchParams.search ?? "";

  let workouts;

  if (!searchQuery) {
    workouts = await db.workout.findMany({
      where: {
        programId: Number(params.programId),
      },
    });
  } else {
    workouts = await db.workout.findMany({
      where: {
        name: {
          search: searchQuery as string,
        },
      },
    });
  }

  return (
    <div className="h-full w-full">
      <div className="h-[100px] w-[95%] m-auto">
        <h1 className="py-2">Program Workouts</h1>
      </div>
      <Controls programId={params.programId} />
      <WorkoutList programId={params.programId} workouts={workouts} />
    </div>
  );
}
