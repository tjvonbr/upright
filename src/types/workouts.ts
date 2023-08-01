import { Workout, WorkoutSet } from "@prisma/client";

export interface WorkoutWithSets extends Workout {
  workoutSets: WorkoutSet[];
}

export type ExerciseWorkoutMap = {
  [key: number]: WorkoutWithSets | null;
};
