import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";

import { db } from "@/lib/prisma";

const createWorkoutExerciseSchema = z.object({
  exerciseId: z.number(),
  workoutId: z.number(),
});

export async function POST(req: NextRequest) {
  const session = await getServerSession();

  if (!session?.user) {
    return new NextResponse(null, { status: 403 });
  }

  const json = await req.json();
  const body = createWorkoutExerciseSchema.parse(json);

  try {
    const workout = await db.workout.update({
      where: {
        id: Number(body.workoutId),
      },
      data: {
        exercises: {
          connect: {
            id: Number(body.exerciseId),
          },
        },
      },
    });

    return NextResponse.json(workout);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.issues), { status: 422 });
    }

    return new NextResponse(null, { status: 500 });
  }
}
