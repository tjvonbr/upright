import { notFound, redirect } from "next/navigation";

import { getExercisesForUser } from "@/lib/api/exercises";
import { getCurrentUser } from "@/lib/session";

import ExerciseOperations from "../components/ExerciseOperations";

export default async function Exercises() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const exercises = await getExercisesForUser(user.id);

  if (!exercises) {
    return notFound();
  }

  return <ExerciseOperations user={user} exercises={exercises} />;
}
