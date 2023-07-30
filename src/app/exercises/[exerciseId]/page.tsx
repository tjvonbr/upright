import { WorkoutSet } from "@prisma/client";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { getExerciseById } from "@/lib/api/exercises";
import { getWorkoutsWithExercise } from "@/lib/api/workouts";
import { getCurrentUser } from "@/lib/session";
import { WorkoutWithWorkoutSets } from "@/types/workouts";

interface ExerciseProps {
  params: {
    exerciseId: string;
  };
}

export default async function Exercise({ params }: ExerciseProps) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const exercise = await getExerciseById(params.exerciseId);

  if (!exercise) {
    notFound();
  }

  const workoutsWithExercise = await getWorkoutsWithExercise(exercise.id);

  return (
    <div className="min-h-screen py-2 px-4">
      <h1 className="text-2xl font-bold">{exercise.name}</h1>
      <div className="mt-16 grid grid-cols-3 gap-4">
        <div className="py-2 px-4 w-min-content border border-slate-200 rounded-md">
          <p className="text-sm font-semibold">
            Recent workouts with {exercise.name}
          </p>
          {workoutsWithExercise.map(
            (workout: WorkoutWithWorkoutSets, idx: number) => (
              <div className="flex flex-col text-sm" key={idx}>
                <Link href={`/workouts/${workout.id}`}>{workout.name}</Link>
                <div className="flex space-x-1">
                  {workout.workoutSets.map((set: WorkoutSet, idx: number) => (
                    <span key={idx}>
                      {set.reps}x{set.weightLbs}
                    </span>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
        <div className="py-2 px-4 w-min-content border border-slate-200 rounded-md">
          <p className="text-sm font-semibold">Personal Best</p>
        </div>
        <div className="py-2 px-4 w-min-content border border-slate-200 rounded-md">
          <p className="text-sm font-semibold">All-time</p>
        </div>
        <div className="py-2 px-4 w-min-content border border-slate-200 rounded-md">
          <p className="text-sm font-semibold">Personal Best</p>
        </div>
        <div className="py-2 px-4 w-min-content border border-slate-200 rounded-md">
          <p className="text-sm font-semibold">All-time</p>
        </div>
        <div className="py-2 px-4 w-min-content border border-slate-200 rounded-md">
          <p className="text-sm font-semibold">All-time</p>
        </div>
      </div>
    </div>
  );
}
