import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const data = await req.json();
  const { firstName, lastName, birthday, email } = data;

  try {
    await prisma.user.create({
      data: {
        firstName: firstName,
        lastName: lastName,
        birthday: birthday,
        email: email,
      },
    });

    return NextResponse.json(data);
  } catch (err) {
    throw new Error(`Error: ${err}`);
  }
}
