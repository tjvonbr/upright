import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";

import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma";

const createWorkoutSetSchema = z.object({
  exerciseId: z.string(),
  workoutId: z.string(),
  reps: z.string(),
  weight: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const json = await req.json();
    const body = createWorkoutSetSchema.parse(json);

    const workoutSet = await db.workoutSet.create({
      data: {
        exerciseId: body.exerciseId,
        workoutId: body.workoutId,
        reps: Number(body.reps),
        weightLbs: Number(body.weight),
      },
    });

    return NextResponse.json(workoutSet);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.issues), { status: 422 });
    }

    return new NextResponse(null, { status: 500 });
  }
}
