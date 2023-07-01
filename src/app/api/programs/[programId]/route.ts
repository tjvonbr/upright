import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { z } from "zod";

import { db } from "@/lib/prisma";

const routeContextSchema = z.object({
  params: z.object({
    programId: z.string(),
  }),
});

export async function GET(ctx: z.infer<typeof routeContextSchema>) {
  try {
    const { params } = routeContextSchema.parse(ctx);

    const session = await getServerSession();

    if (!session?.user) {
      return new NextResponse(null, { status: 403 });
    }

    const program = await db.program.findFirst({
      where: {
        id: Number(params.programId),
      },
    });

    return NextResponse.json(program);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}
