import { Program } from "@prisma/client";
import Link from "next/link";
import { redirect } from "next/navigation";

import { db } from "@/app/lib/prisma";
import { getCurrentUser } from "@/app/lib/session";

async function getProgramsForUser(userId: number) {
  return await db.program.findMany({
    where: {
      userId,
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

  const programs = await getProgramsForUser(Number(user.id));

  return (
    <div>
      {programs.map((program: Program, idx: number) => (
        <Link href={`/programs/${program.id}`} key={idx}>
          {program.name}
        </Link>
      ))}
    </div>
  );
}
