import { NextResponse } from "next/server";

import { db } from "@/lib/prisma";

export async function POST(req: Request) {
  const data = await req.json();
  const { name, date, programId, userId } = data;

  try {
    await db.workout.create({
      data: {
        name,
        date,
        programId: Number(programId),
        userId,
      },
    });

    return NextResponse.json(data);
  } catch (err) {
    throw new Error(`Error: ${err}`);
  }
}
