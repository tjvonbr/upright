import { Workout } from "@prisma/client";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { getUserWorkouts } from "@/lib/api/workouts";
import { getCurrentUser } from "@/lib/session";

export default async function ProgramWorkouts() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const workouts = await getUserWorkouts(user.id);

  if (!workouts) {
    return notFound();
  }

  return (
    <div>
      <h1>Workouts</h1>
      <div className="flex flex-col">
        {workouts.map((workout: Workout, idx: number) => (
          <Link key={idx} href={`/workouts/${workout.id}`}>
            {workout.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
