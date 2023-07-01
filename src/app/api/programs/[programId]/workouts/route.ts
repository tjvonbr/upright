import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";

import { db } from "@/lib/prisma";

const routeContextSchema = z.object({
  params: z.object({
    programId: z.string(),
  }),
});

export async function GET(
  req: NextRequest,
  ctx: z.infer<typeof routeContextSchema>
) {
  try {
    const session = await getServerSession();

    if (!session?.user) {
      return new NextResponse(null, { status: 403 });
    }

    const { params } = routeContextSchema.parse(ctx);

    const programWorkouts = await db.workout.findMany({
      where: {
        programId: Number(params.programId),
      },
    });

    return NextResponse.json(programWorkouts);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.issues), { status: 422 });
    }

    return new NextResponse(null, { status: 500 });
  }
}

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
