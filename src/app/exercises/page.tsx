import { redirect } from "next/navigation";

import ExercisesOperations from "@/components/ExercisesOperations";
import { getExercisesByUserId } from "@/lib/api/exercises";
import { getCurrentUser } from "@/lib/session";

export default async function Exercises() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const exercises = await getExercisesByUserId(user.id);

  return <ExercisesOperations user={user} exercises={exercises} />;
}
