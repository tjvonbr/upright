import { isSameDay } from "@/lib/helpers/dates";
import { Workout } from "@prisma/client";
import { ChevronLeft, ChevronRight, Dumbbell } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { twJoin } from "tailwind-merge";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface WorkoutsCalendarProps {
  workouts: Workout[];
}

export default function WorkoutsCalendar({ workouts }: WorkoutsCalendarProps) {
  const [currentDay, setCurrentDay] = useState(new Date());

  function incrementMonth() {
    setCurrentDay(new Date(currentDay.setMonth(currentDay.getMonth() + 1)));
  }

  function decrementMonth() {
    setCurrentDay(new Date(currentDay.setMonth(currentDay.getMonth() - 1)));
  }

  return (
    <div className="flex flex-col items-center rounded-md">
      <div className="w-full px-5 py-3 flex justify-between items-center">
        <button onClick={decrementMonth}>
          <ChevronLeft color="black" size={22} />
        </button>
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-semibold">
            {months[currentDay.getMonth()]}
          </h2>
          <p className="text-sm font-semibold">{currentDay.getFullYear()}</p>
        </div>
        <button onClick={incrementMonth}>
          <ChevronRight color="black" size={22} />
        </button>
      </div>
      <div className="h-10 box-border flex items-center text-sm font-semibold">
        {weekdays.map((day, idx) => (
          <p key={idx} className="w-[67px] text-center">
            {day}
          </p>
        ))}
      </div>
      <CalendarDays currentDay={currentDay} workouts={workouts} />
    </div>
  );
}

interface CalendarDay {
  currentMonth: boolean;
  date: Date;
  month: number;
  number: number;
  today: boolean;
  year: number;
  workouts: Workout[];
}

interface CalendarDaysProps {
  currentDay: Date;
  workouts: Workout[];
}

function CalendarDays({ currentDay, workouts }: CalendarDaysProps) {
  console.log(workouts);

  let firstDayOfMonth = new Date(
    currentDay.getFullYear(),
    currentDay.getMonth(),
    1
  );
  let weekdayOfFirstDay = firstDayOfMonth.getDay();
  let currentDays: CalendarDay[] = [];

  for (let dayNumber = 0; dayNumber < 42; dayNumber++) {
    if (dayNumber === 0 && weekdayOfFirstDay === 0) {
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() - 7);
    } else if (dayNumber === 0) {
      firstDayOfMonth.setDate(
        firstDayOfMonth.getDate() + (dayNumber - weekdayOfFirstDay)
      );
    } else {
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1);
    }

    const calendarDay: CalendarDay = {
      currentMonth: firstDayOfMonth.getMonth() === currentDay.getMonth(),
      date: new Date(firstDayOfMonth),
      month: firstDayOfMonth.getMonth(),
      number: firstDayOfMonth.getDate(),
      today: isSameDay(new Date(), new Date(firstDayOfMonth)),
      year: firstDayOfMonth.getFullYear(),
      workouts: workouts.filter((workout) =>
        isSameDay(firstDayOfMonth, workout.date)
      ),
    };

    currentDays.push(calendarDay);
  }

  const firstSevenDays = currentDays.slice(0, 7);
  const finalSevenDays = currentDays.slice(-7);

  if (finalSevenDays.every((day) => !day.currentMonth)) {
    currentDays.splice(-7);
  }

  if (firstSevenDays.every((day) => !day.currentMonth)) {
    currentDays.splice(0, 7);
  }

  return (
    <div className="w-[490px] flex justify-center flex-wrap">
      {currentDays.map((day: CalendarDay, idx: number) => {
        return (
          <div
            key={idx}
            className="w-[67px] h-[67px] border border-slate-200 relative"
          >
            <p
              className={twJoin(
                "px-0.5 py-0.5 text-sm",
                !day.currentMonth && "text-gray-400",
                day.today && "text-indigo-500 font-semibold"
              )}
            >
              {day.number}
            </p>
            {day.workouts.length > 0 && (
              <Link
                className="absolute bottom-1 right-1"
                href={`/workouts/${day.workouts[0].id}`}
              >
                <Dumbbell color="black" size={15} />
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
}
