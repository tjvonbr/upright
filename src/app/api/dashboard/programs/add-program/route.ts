import { NextResponse } from "next/server";
import { db } from "@/app/lib/prisma";

export async function POST(req: Request) {
  const data = await req.json();
  const { name, description, userId } = data;

  try {
    await db.program.create({
      data: {
        name,
        description,
        userId,
      },
    });

    return NextResponse.json(data);
  } catch (err) {
    throw new Error(`Error: ${err}`);
  }
}
