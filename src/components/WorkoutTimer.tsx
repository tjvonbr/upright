import { Workout } from "@prisma/client";
import { useEffect, useMemo, useState } from "react";

export default function WorkoutTimer({ workout }: { workout: Workout }) {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  function getTime() {
    const time =
      Date.now() - Date.parse(workout.startedAt?.toISOString() as string);
    console.log(time);

    setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
    setMinutes(Math.floor((time / 1000 / 60) % 60));
    setSeconds(Math.floor((time / 1000) % 60));
  }

  useEffect(() => {
    const interval = setInterval(() => getTime(), 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex text-sm font-semibold">
      <span>{`${hours}`.padStart(2, "0")}:</span>
      <span>{`${minutes}`.padStart(2, "0")}:</span>
      <span>{`${seconds}`.padStart(2, "0")}</span>
    </div>
  );
}
