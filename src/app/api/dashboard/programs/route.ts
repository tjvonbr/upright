import { NextResponse } from "next/server";
import { db } from "@/app/lib/prisma";

export async function GET(req: Request) {
  const data = await req.json();
  const { userId } = data;

  try {
    const programs = await db.program.findMany({
      where: {
        userId,
      },
    });

    return NextResponse.json(programs);
  } catch (err) {
    throw new Error(`Error: ${err}`);
  }
}
