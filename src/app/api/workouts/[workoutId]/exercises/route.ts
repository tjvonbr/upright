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
  instructions: z.string(),
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

  try {
    const workout = await getWorkout(body.workoutId);

    if (!workout) {
      return new NextResponse(null, { status: 404 });
    }

    const workoutExercises = body.exercises.map((exercise) => {
      return { exerciseId: exercise.id, workoutId: workout.id };
    });

    const newWorkoutExercises = await db.workoutsExercises.createMany({
      data: workoutExercises,
    });

    return NextResponse.json(newWorkoutExercises);
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

    const exercise = await db.workoutsExercises.delete({
      where: {
        workoutId_exerciseId: {
          workoutId: body.workoutId,
          exerciseId: body.exerciseId,
        },
      },
    });

    return NextResponse.json(exercise);
  } catch (error) {
    return Error;
  }
}
