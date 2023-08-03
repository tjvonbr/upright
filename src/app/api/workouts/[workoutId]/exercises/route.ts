import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";

import { getWorkout } from "@/lib/api/workouts";
import { db } from "@/lib/prisma";

const exerciseSchema = z.object({
  id: z.number(),
  name: z.string(),
  userId: z.number(),
});

const createWorkoutExerciseSchema = z.object({
  exercises: z.array(exerciseSchema),
  workoutId: z.number(),
});

const deleteWorkoutExerciseSchema = z.object({
  exerciseId: z.number(),
  workoutId: z.number(),
});

export async function POST(req: NextRequest) {
  const session = await getServerSession();

  if (!session?.user) {
    return new NextResponse(null, { status: 403 });
  }

  const json = await req.json();
  const body = createWorkoutExerciseSchema.parse(json);

  const workout = await getWorkout(Number(body.workoutId));

  if (!workout) {
    return new NextResponse(null, { status: 404 });
  }

  try {
    const exerciseIds = body.exercises.map((exercise) => {
      return { id: exercise.id };
    });

    const workout = await db.workout.update({
      where: {
        id: Number(body.workoutId),
      },
      data: {
        exercises: {
          connect: exerciseIds,
        },
      },
    });

    revalidateTag("workouts");

    return NextResponse.json(workout);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.issues), { status: 422 });
    }

    return new NextResponse(null, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession();

    if (!session?.user) {
      return new NextResponse(null, { status: 403 });
    }

    const json = await req.json();
    const body = deleteWorkoutExerciseSchema.parse(json);

    const exercise = await db.workout.update({
      where: {
        id: Number(body.workoutId),
      },
      data: {
        exercises: {
          disconnect: [{ id: body.exerciseId }],
        },
      },
    });

    return NextResponse.json(exercise);
  } catch (error) {
    return Error;
  }
}
