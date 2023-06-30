import { Program, Workout } from "@prisma/client";
import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getWorkoutsForProgram } from "../page";

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
    <div className="h-full w-full">
      {workouts.map((workout: Workout, idx: number) => (
        <WorkoutListItem key={idx} workout={workout} />
      ))}
    </div>
  );
}

function WorkoutListItem({ key, workout }: { key: number; workout: Workout }) {
  return (
    <Link key={key} href={`/workouts/${workout.id}`}>
      <div className="h-[50px] w-[600px] px-2 flex justify-between items-center border-b text-sm border-gray-300 hover:bg-gray-300">
        <div>
          <div className="text-black font-medium">{workout.name}</div>
          <div className="text-gray-500">{workout.date.toDateString()}</div>
        </div>
        <IncompleteWorkoutBanner />
      </div>
    </Link>
  );
}

function IncompleteWorkoutBanner() {
  return (
    <div className="h-[25px] w-[100px] px-2 flex justify-between items-center bg-red-500 text-white font-medium rounded-md">
      <div>Incomplete</div>
      <AlertCircle size={15} />
    </div>
  );
}
