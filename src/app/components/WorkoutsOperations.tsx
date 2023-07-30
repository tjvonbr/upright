"use client";

import "react-datepicker/dist/react-datepicker.css";

import { Program, Workout } from "@prisma/client";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User } from "next-auth";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import useSWRMutation from "swr/mutation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/app/components/common/dropdown";

import Spinner from "./Spinner";

interface WorkoutsOperationsProps {
  user: User;
  programs: Program[];
  workouts: Workout[];
}

export default function WorkoutsOperations({
  user,
  programs,
  workouts,
}: WorkoutsOperationsProps) {
  const [name, setName] = useState("");
  const [date, setDate] = useState<Date | null>(new Date());
  const [program, setProgram] = useState<Program | null>(null);

  const router = useRouter();
  const { trigger, isMutating } = useSWRMutation(
    "http://localhost:3000/api/workouts",
    handleSubmit
  );

  function resetForm() {
    setName("");
    setDate(new Date());
    setProgram(null);
  }

  async function setTrigger() {
    await trigger();
  }

  async function handleSubmit(url: string) {
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          name,
          date,
          userId: Number(user.id),
          programId: program?.id,
        }),
      });

      if (response.ok) {
        router.refresh();
        resetForm();
      }
    } catch (error) {}
  }

  return (
    <div className="grid grid-cols-2">
      <div className="pl-5 pt-3 border-r border-gray-200">
        <h1 className="text-2xl font-semibold">Workouts</h1>
        <div className="flex flex-col">
          {workouts.map((workout: Workout, idx: number) => (
            <Link key={idx} href={`/workouts/${workout.id}`}>
              {workout.name}s
            </Link>
          ))}
        </div>
      </div>
      <div className="min-h-screen flex flex-col justify-center items-center">
        <form
          className="w-[50%]"
          action="submit"
          onSubmit={(e: React.FormEvent) => {
            e.preventDefault();
            setTrigger();
          }}
        >
          <h2 className="text-xl font-semibold">Add a workout</h2>
          <p className="text-slate-500">
            If you don&apos;t see a workout that you want to track in the column
            on the left, you can add it below.
          </p>
          <fieldset className="w-full flex flex-col my-5 p-0">
            <label className="font-semibold" htmlFor="name">
              Name
            </label>
            <input
              className="w-full px-2 py-2 border border-gray-200 rounded-md"
              id="name"
              name="name"
              type="text"
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value)
              }
            />
          </fieldset>
          <fieldset className="w-full flex flex-col my-5 p-0">
            <label className="font-semibold" htmlFor="date">
              Workout date
            </label>
            <DatePicker
              selected={date}
              onChange={(date) => setDate(date)}
              className="h-[30px] p-2 border border-gray-200 rounded-md"
            />
          </fieldset>
          <label className="font-semibold">Program</label>
          <div className="mb-5">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex h-8 w-[200px] px-2 items-center justify-center bg-white text-black rounded-md border border-gray-200 hover:bg-muted">
                <ChevronDown size={15} strokeWidth={2.5} />
                <div className="px-2 text-md font-medium">
                  {program?.name ?? "Select a program"}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {programs.map((program: Program, idx: number) => (
                  <DropdownMenuRadioItem
                    className="rounded-[3px] data-[highlighted]:bg-gray-300"
                    key={idx}
                    value={program.name}
                    // eslint-disable-next-line no-unused-vars
                    onSelect={(_: Event) => {
                      setProgram(program);
                    }}
                  >
                    {program.name}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <button className="h-[40px] w-full flex justify-center items-center bg-black text-white font-semibold rounded-md">
            {isMutating ? <Spinner /> : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}
