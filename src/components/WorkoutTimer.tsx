"use client";

import { Workout } from "@prisma/client";
import { useEffect, useState } from "react";
import Pillbox from "./common/pillbox";
import { useRouter } from "next/navigation";
import Spinner from "./Spinner";
import { Play, StopCircle } from "lucide-react";

export default function WorkoutTimer({ workout }: { workout: Workout }) {
  const [isMutating, setIsMutating] = useState(false);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const router = useRouter();

  async function startWorkout() {
    setIsMutating(true);

    const response = await fetch(
      `http://localhost:3000/api/workouts/${workout.id}`,
      {
        method: "PUT",
        body: JSON.stringify({
          startedAt: new Date(),
        }),
      }
    );

    if (response.ok) {
      router.refresh();
      setIsMutating(false);
    }

    setIsMutating(false);
  }

  async function endWorkout() {
    setIsMutating(true);

    const response = await fetch(
      `http://localhost:3000/api/workouts/${workout.id}`,
      {
        method: "PUT",
        body: JSON.stringify({
          completedAt: new Date(),
        }),
      }
    );

    if (response.ok) {
      router.refresh();
      setIsMutating(false);
    }

    setIsMutating(false);
  }

  function getTime() {
    const time =
      Date.now() - Date.parse(workout.startedAt?.toISOString() as string);

    setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
    setMinutes(Math.floor((time / 1000 / 60) % 60));
    setSeconds(Math.floor((time / 1000) % 60));
  }

  useEffect(() => {
    const interval = setInterval(() => getTime(), 1000);

    return () => clearInterval(interval);
  }, []);

  if (!workout.startedAt) {
    return (
      <div className="flex items-center space-x-1">
        <Pillbox className="text-xs font-semibold" variant="incomplete">
          Not started
        </Pillbox>
        <button onClick={startWorkout}>
          {isMutating ? (
            <Spinner color="black" size="15" />
          ) : (
            <Play
              className="text-gray-500 hover:text-black transition-colors"
              size={18}
            />
          )}
        </button>
      </div>
    );
  } else if (workout.startedAt && !workout.completedAt) {
    return (
      <div className="flex items-center space-x-2 text-sm font-semibold">
        <Pillbox className="bg-indigo-500 text-xs font-semibold">
          In progress
        </Pillbox>
        <div>
          <span>{`${hours}`.padStart(2, "0")}:</span>
          <span>{`${minutes}`.padStart(2, "0")}:</span>
          <span>{`${seconds}`.padStart(2, "0")}</span>
        </div>
        <button onClick={endWorkout}>
          {isMutating ? (
            <Spinner color="black" size="15" />
          ) : (
            <StopCircle
              className="text-gray-500 hover:text-black transition-colors"
              size={18}
            />
          )}
        </button>
      </div>
    );
  } else {
    const timeElapsed =
      Date.parse(workout.completedAt?.toISOString() as string) -
      Date.parse(workout.startedAt.toISOString() as string);

    return (
      <div className="flex items-center space-x-2 text-xs">
        <Pillbox className="text-xs font-semibold" variant="complete">
          Completed
        </Pillbox>
        <div className="flex items-center text-sm font-semibold">
          <span>
            {`${Math.floor((timeElapsed / (1000 * 60 * 60)) % 24)}h`.padStart(
              2,
              "0"
            )}
            :
          </span>
          <span>
            {`${Math.floor((timeElapsed / 1000 / 60) % 60)}m`.padStart(2, "0")}:
          </span>
          <span>
            {`${Math.floor((timeElapsed / 1000) % 60)}s`.padStart(2, "0")}
          </span>
        </div>
      </div>
    );
  }
}
