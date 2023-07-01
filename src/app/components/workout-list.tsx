"use client";

import { Workout } from "@prisma/client";
import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useState, useTransition } from "react";
import React from "react";

interface WorkoutListProps {
  workouts: Workout[];
}

export default function WorkoutList({ workouts }: WorkoutListProps) {
  return (
    <div className="w-[95%] m-auto">
      {workouts.map((workout: Workout, idx: number) => (
        <WorkoutListItem workout={workout} key={idx} />
      ))}
    </div>
  );
}

export function Controls() {
  const router = useRouter();
  const pathname = usePathname();
  // eslint-disable-next-line no-unused-vars
  const [_, startTransition] = useTransition();

  const [mounted, setMounted] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");

  const handleSearchParams = useCallback(
    (debouncedValue: string) => {
      const params = new URLSearchParams(window.location.search);

      if (debouncedValue.length > 0) {
        params.set("search", debouncedValue);
      } else {
        params.delete("search");
      }

      startTransition(() => {
        router.replace(`${pathname}?${params.toString()}`);
      });
    },
    [pathname, router]
  );

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const searchQuery = params.get("search") ?? "";
    setInputValue(searchQuery);
  }, []);

  React.useEffect(() => {
    if (debouncedValue.length > 0 && !mounted) {
      setMounted(true);
    }
  }, [debouncedValue, mounted]);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [inputValue]);

  React.useEffect(() => {
    if (mounted) handleSearchParams(debouncedValue);
  }, [debouncedValue, handleSearchParams, mounted]);

  return (
    <div className="h-[50px] m-auto border border-black">
      <input
        className="w-[300px] px-2 py-1 bg-gray-200 rounded-lg"
        type="text"
        placeholder="Search..."
        value={inputValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setInputValue(e.target.value)
        }
      />
    </div>
  );
}

export function WorkoutListItem({ workout }: { workout: Workout }) {
  return (
    <Link href={`/workouts/${workout.id}`}>
      <div className="h-[50px] w-[600px] px-2 flex justify-between items-center border-b text-sm border-gray-300 hover:bg-gray-300">
        <div>
          <div className="text-black font-medium">{workout.name}</div>
          <div className="text-gray-500">{workout.date.toDateString()}</div>
        </div>
        <IncompleteWorkoutBanner />
      </div>
    </Link>
  );
}

function IncompleteWorkoutBanner() {
  return (
    <div className="h-[25px] w-[100px] px-2 flex justify-between items-center bg-red-500 text-white font-medium rounded-md">
      <div>Incomplete</div>
      <AlertCircle size={15} />
    </div>
  );
}
