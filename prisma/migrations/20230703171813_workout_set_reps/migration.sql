/*
  Warnings:

  - Added the required column `reps` to the `workout_sets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "workout_sets" ADD COLUMN     "reps" INTEGER NOT NULL;
