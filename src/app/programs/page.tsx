import { Program } from "@prisma/client";
import Link from "next/link";
import { redirect } from "next/navigation";

import { db } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

async function getProgramsForUser(userId: string) {
  return await db.program.findMany({
    where: {
      userId: Number(userId),
    },
    orderBy: {
      name: "asc",
    },
  });
}

export default async function Programs() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const programs = await getProgramsForUser(user.id);

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
