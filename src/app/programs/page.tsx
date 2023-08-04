import { redirect } from "next/navigation";

import ProgramsOperations from "@/components/ProgramsOperations";
import { getProgramsForUser } from "@/lib/api/programs";
import { getCurrentUser } from "@/lib/session";

export default async function Programs() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const programs = await getProgramsForUser(user.id);

  return <ProgramsOperations programs={programs} user={user} />;
}
