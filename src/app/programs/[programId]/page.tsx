import { notFound, redirect } from "next/navigation";

import ProgramOperations from "@/components/ProgramOperations";
import { getProgramForUser } from "@/lib/api/programs";
import { getMostRecentWorkoutForProgram } from "@/lib/api/workouts";
import { getCurrentUser } from "@/lib/session";

interface ProgramPageProps {
  params: { programId: string };
}

export default async function Program({ params }: ProgramPageProps) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const program = await getProgramForUser(params.programId);
  const mostRecentWorkout = await getMostRecentWorkoutForProgram(
    params.programId
  );

  if (!program) {
    notFound();
  }

  return (
    <ProgramOperations
      program={program}
      recentWorkout={mostRecentWorkout}
      user={user}
    />
  );
}
