import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { db } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const session = await getServerSession();

  if (!session?.user) {
    return new NextResponse(null, { status: 403 });
  }

  try {
    const json = await req.json();

    const workout = await db.workoutSet.createMany({
      data: json,
    });

    return NextResponse.json(workout);
  } catch (error) {
    return new NextResponse(null, { status: 500 });
  }
}
