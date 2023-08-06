import { Program } from "@prisma/client";
import { redirect } from "next/navigation";

import WorkoutForm from "@/components/workout-form";
import { getCurrentUser } from "@/lib/session";

interface AddProgramWorkoutProps {
  params: { programId: Program["id"] };
}

export default async function AddProgramWorkout({
  params,
}: AddProgramWorkoutProps) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div>
      <WorkoutForm programId={params.programId} />
    </div>
  );
}
