import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";

import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma";

export async function GET(req: Request) {
  const data = await req.json();
  const { userId } = data;

  try {
    await db.program.findMany({
      where: {
        userId,
      },
    });

    return NextResponse.json(data);
  } catch (err) {
    throw new Error(`Error: ${err}`);
  }
}

const createProgramSchema = z.object({
  name: z.string(),
  description: z.string(),
  userId: z.number(),
});

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const json = await req.json();
    const body = createProgramSchema.parse(json);

    const program = await db.program.create({
      data: {
        name: body.name,
        description: body.description,
        userId: body.userId,
      },
    });

    return NextResponse.json(program);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.issues), { status: 422 });
    }

    return new NextResponse(null, { status: 500 });
  }
}
