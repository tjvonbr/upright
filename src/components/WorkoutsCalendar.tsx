import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
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

export default function WorkoutsCalendar() {
  const [currentDay, setCurrentDay] = useState(new Date());

  function incrementMonth() {
    setCurrentDay(new Date(currentDay.setMonth(currentDay.getMonth() + 1)));
  }

  function decrementMonth() {
    setCurrentDay(new Date(currentDay.setMonth(currentDay.getMonth() - 1)));
  }

  return (
    <div className="py-5 flex flex-col items-center border border-slate-200 rounded-md">
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
        {weekdays.map((day) => (
          <p className="w-[67px] text-center">{day}</p>
        ))}
      </div>
      <CalendarDays day={currentDay} />
    </div>
  );
}

interface CalendarDay {
  currentMonth: boolean;
  date: Date;
  month: number;
  number: number;
  selected: boolean;
  year: number;
}

function CalendarDays({ day }: { day: Date }) {
  let firstDayOfMonth = new Date(day.getFullYear(), day.getMonth(), 1);
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

    let calendarDay: CalendarDay = {
      currentMonth: firstDayOfMonth.getMonth() === day.getMonth(),
      date: new Date(firstDayOfMonth),
      month: firstDayOfMonth.getMonth(),
      number: firstDayOfMonth.getDate(),
      selected: firstDayOfMonth.toDateString() === day.toDateString(),
      year: firstDayOfMonth.getFullYear(),
    };

    currentDays.push(calendarDay);
  }

  return (
    <div className="w-[490px] flex justify-center flex-wrap">
      {currentDays.map((day: CalendarDay) => {
        return (
          <div className="w-[67px] h-[67px] border border-slate-200 relative">
            <p
              className={twJoin(
                "px-0.5 py-0.5 text-sm",
                !day.currentMonth && "text-gray-400",
                day.selected && "text-indigo-500 font-semibold"
              )}
            >
              {day.number}
            </p>
          </div>
        );
      })}
    </div>
  );
}
