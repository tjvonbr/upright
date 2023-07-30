import { Workout, WorkoutSet } from "@prisma/client";

export interface WorkoutWithWorkoutSets extends Workout {
  workoutSets: WorkoutSet[];
}
