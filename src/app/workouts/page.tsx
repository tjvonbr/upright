import { notFound, redirect } from "next/navigation";

import { getProgramsForUser } from "@/lib/api/programs";
import { getWorkoutsForUser } from "@/lib/api/workouts";
import { getCurrentUser } from "@/lib/session";

import WorkoutsOperations from "../components/WorkoutsOperations";

export default async function Workouts() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const programs = await getProgramsForUser(user?.id);
  const workouts = await getWorkoutsForUser(user?.id);

  if (!workouts || !programs) {
    return notFound();
  }

  return (
    <WorkoutsOperations user={user} programs={programs} workouts={workouts} />
  );
}
