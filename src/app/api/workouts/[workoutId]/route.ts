import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";

import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma";

const deleteWorkoutSchema = z.object({
  params: z.object({
    workoutId: z.string(),
  }),
});

export async function DELETE(
  _: NextRequest,
  ctx: z.infer<typeof deleteWorkoutSchema>
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const { params } = deleteWorkoutSchema.parse(ctx);

    const workout = await db.workout.delete({
      where: {
        id: Number(params.workoutId),
      },
    });

    return NextResponse.json(workout);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}
