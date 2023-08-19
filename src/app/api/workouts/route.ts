import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";

import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma";

const createWorkoutSchema = z.object({
  name: z.string(),
  date: z.string(),
  programId: z.string().optional(),
  userId: z.string(),
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const json = await req.json();
    const body = createWorkoutSchema.parse(json);

    const workout = await db.workout.create({
      data: {
        name: body.name,
        date: body.date,
        programId: body.programId ? body.programId : null,
        userId: body.userId,
      },
    });

    return NextResponse.json(workout);
  } catch (err) {
    throw new Error(`Error: ${err}`);
  }
}
