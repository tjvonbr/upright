import { Program } from "@prisma/client";
import Link from "next/link";
import { redirect } from "next/navigation";

import { getProgramsForUser } from "@/lib/api/programs";
import { getCurrentUser } from "@/lib/session";

export default async function Programs() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const programs = await getProgramsForUser("1");

  return (
    <div className="h-[95%] w-[95%] m-auto">
      <h1>Programs</h1>
      {programs.map((program: Program, idx: number) => (
        <Link className="text-black" href={`/programs/${program.id}`} key={idx}>
          {program.name}
        </Link>
      ))}
    </div>
  );
}
