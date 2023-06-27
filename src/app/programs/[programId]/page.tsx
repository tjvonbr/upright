import { Program } from "@prisma/client";
import { notFound } from "next/navigation";

import { db } from "@/app/lib/prisma";

async function getProgramForUser(programId: Program["id"]) {
  return await db.program.findFirst({
    where: {
      id: Number(programId),
    },
  });
}

interface ProgramPageProps {
  params: { programId: number };
}

export default async function Program({ params }: ProgramPageProps) {
  const post = await getProgramForUser(params.programId);

  if (!post) {
    notFound();
  }

  return <div>{post?.name}</div>;
}
