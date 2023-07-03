"use client";

import { Workout } from "@prisma/client";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./common/dropdown";

export default function WorkoutOperations({ workout }: { workout: Workout }) {
  return (
    <div>
      <h1>{workout.name}</h1>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex h-8 w-[90px] px-2 items-center justify-center bg-indigo-500 text-white rounded-md border hover:bg-muted">
          <ChevronDown size={15} strokeWidth={2.5} />
          <div className="px-2 text-md font-medium">Actions</div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <Link href={"/login"} className="flex w-full">
              Edit
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              href={`/workouts/${workout.id}/add-exercise`}
              className="flex w-full"
            >
              Add Exercise
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex cursor-pointer items-center text-destructive focus:text-destructive">
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
