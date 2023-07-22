import { Workout } from "@prisma/client";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { getWorkoutsForUser } from "@/lib/api/workouts";
import { getCurrentUser } from "@/lib/session";

export default async function ProgramWorkouts() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  // See if this works
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
