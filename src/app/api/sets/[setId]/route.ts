import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";

import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma";

const deleteWorkoutSetSchema = z.object({
  params: z.object({
    setId: z.string(),
  }),
});

export async function DELETE(
  _: NextRequest,
  ctx: z.infer<typeof deleteWorkoutSetSchema>
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const { params } = deleteWorkoutSetSchema.parse(ctx);

    const workoutSet = await db.workoutSet.delete({
      where: {
        id: params.setId,
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

const updateWorkoutParamSchema = z.object({
  params: z.object({
    setId: z.string(),
  }),
});

const updateWorkoutBodySchema = z.object({
  reps: z.string(),
  weight: z.string(),
});

export async function PUT(
  req: NextRequest,
  ctx: z.infer<typeof updateWorkoutParamSchema>
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const { params } = updateWorkoutParamSchema.parse(ctx);

    const json = await req.json();
    const body = updateWorkoutBodySchema.parse(json);

    const workoutSet = await db.workoutSet.update({
      where: {
        id: params.setId,
      },
      data: {
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
