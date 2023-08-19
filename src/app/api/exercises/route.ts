import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";

import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma";

const createExerciseSchema = z.object({
  name: z.string(),
  userId: z.string(),
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const json = await req.json();
    const body = createExerciseSchema.parse(json);

    const exercise = await db.exercise.create({
      data: {
        name: body.name,
        userId: body.userId,
      },
    });

    return NextResponse.json(exercise);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.issues), { status: 422 });
    }

    return new NextResponse(null, { status: 500 });
  }
}
