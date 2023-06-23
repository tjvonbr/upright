import { NextResponse } from "next/server";
import { db } from "@/app/lib/prisma";

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
    console.log(err);
  }
}
