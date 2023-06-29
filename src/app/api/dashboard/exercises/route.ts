import { NextResponse } from "next/server";

import { db } from "@/lib/prisma";

export async function POST(req: Request) {
  const data = await req.json();
  const { name, userId } = data;

  try {
    await db.exercise.create({
      data: {
        name,
        userId,
      },
    });

    return NextResponse.json(data);
  } catch (err) {
    throw new Error(`Error: ${err}`);
  }
}

export async function GET(req: Request) {
  const data = await req.json();
  const { userId } = data;

  try {
    const exercises = await db.exercise.findMany({
      where: {
        userId,
      },
    });

    return exercises;
  } catch (err) {
    throw new Error(`Error: ${err}`);
  }
}
