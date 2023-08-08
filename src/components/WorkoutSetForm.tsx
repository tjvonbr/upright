"use client";

import React, { useState } from "react";
import { Set } from "./WorkoutOperations";
import Spinner from "./Spinner";
import { ArrowDownFromLine, Check, Trash2, XCircle } from "lucide-react";
import Input from "./common/Input";
import { useRouter } from "next/navigation";
import { Exercise, Workout } from "@prisma/client";
import NewSet from "./NewSet";
import OldSet from "./OldSet";

interface WorkoutSetProps {
  addSet: (e: React.FormEvent) => void;
  exercise: Exercise;
  handleOldSetChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => void;
  handleNewSetChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => void;
  newSets: any[];
  removeSet: (e: React.FormEvent, idx: number) => void;
  oldSets: any[];
  workoutId: Workout["id"];
}

export default function WorkoutSetForm({
  addSet,
  exercise,
  handleOldSetChange,
  handleNewSetChange,
  newSets,
  removeSet,
  oldSets,
  workoutId,
}: WorkoutSetProps) {
  return (
    <form action="submit">
      {oldSets.map((set: Set, idx: number) => (
        <OldSet
          addSet={addSet}
          handleOldSetChange={handleOldSetChange}
          idx={idx}
          oldSets={oldSets}
          set={set}
        />
      ))}
      {newSets.map((set: any, idx: number) => {
        return (
          <NewSet
            addSet={addSet}
            exercise={exercise}
            handleNewSetChange={handleNewSetChange}
            idx={idx}
            newSets={newSets}
            removeSet={removeSet}
            set={set}
            workoutId={workoutId}
          />
        );
      })}
    </form>
  );
}
