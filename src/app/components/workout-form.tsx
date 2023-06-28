"use client";

import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";

import { toast } from "./common/use-toast";

interface WorkoutFormProps {
  programId: number;
}

export default async function WorkoutForm({ programId }: WorkoutFormProps) {
  const { data: session } = useSession();

  if (!session) {
    redirect("login");
  }

  const [name, setName] = useState("Today's date workout");
  const [date, setDate] = useState("");

  async function handleSubmit() {
    const response = await fetch(`api/programs/${programId}/workouts`, {
      method: "POST",
      body: JSON.stringify({
        name,
        date,
        programId,
        userId: session?.user?.id,
      }),
    });

    if (!response?.ok) {
      return toast({
        title: "Something went wrong.",
        description: "Your post was not saved. Please try again.",
        variant: "destructive",
      });
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
        <input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setDate(e.target.value)
          }
          id="date"
          type="date"
          value={date}
        />
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
