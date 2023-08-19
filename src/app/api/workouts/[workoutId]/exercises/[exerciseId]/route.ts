import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const updateBodySchema = z.object({
  instructions: z.string(),
});

const updateCtxSchema = z.object({
  params: z.object({
    exerciseId: z.string(),
    workoutId: z.string(),
  }),
});

export async function PUT(
  req: NextRequest,
  ctx: z.infer<typeof updateCtxSchema>
) {
  try {
    const session = await getServerSession();

    if (!session?.user) {
      return new NextResponse(null, { status: 403 });
    }

    const json = await req.json();
    const body = updateBodySchema.parse(json);
    const { params } = updateCtxSchema.parse(ctx);

    const exercise = await db.workoutsExercises.update({
      where: {
        workoutId_exerciseId: {
          workoutId: params.workoutId,
          exerciseId: params.exerciseId,
        },
      },
      data: {
        instructions: body.instructions,
      },
    });

    return NextResponse.json(exercise);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}
