"use client";

import "react-datepicker/dist/react-datepicker.css";

import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";
import DatePicker from "react-datepicker";

interface WorkoutFormProps {
  programId: string;
}

export default function WorkoutForm({ programId }: WorkoutFormProps) {
  const { data: session } = useSession();

  if (!session) {
    redirect("login");
  }

  const [name, setName] = useState("Today's date workout");
  const [date, setDate] = useState<Date | null>(new Date());

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const response = await fetch(
      `http://localhost:3000/api/programs/${programId}/workouts`,
      {
        method: "POST",
        body: JSON.stringify({
          name,
          date,
          programId,
          userId: session?.user?.id,
        }),
      }
    );

    if (!response?.ok) {
    }
  }

  return (
    <div className="w-[400px] flex flex-col">
      <form onSubmit={handleSubmit} className="flex flex-col" action="submit">
        <label htmlFor="name">Workout name</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
        />
        <label htmlFor="date">Workout date</label>
        <DatePicker selected={date} onChange={(date) => setDate(date)} />
        <button
          type="submit"
          className="h-[20px] bg-black text-white rounded-md"
        >
          Create workout
        </button>
      </form>
    </div>
  );
}
