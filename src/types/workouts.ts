import {
  Exercise,
  Workout,
  WorkoutSet,
  WorkoutsExercises,
} from "@prisma/client";

export interface WorkoutWithSets extends Workout {
  workoutSets: WorkoutSet[];
}

export interface WorkoutExercisesWithExercise extends WorkoutsExercises {
  exercise: Exercise;
}

export interface WorkoutWithExercises extends Workout {
  exercises: WorkoutExercisesWithExercise[];
  workoutSets: WorkoutSet[];
}

export type ExerciseWorkoutMap = {
  [key: string]: WorkoutWithSets | null;
};
