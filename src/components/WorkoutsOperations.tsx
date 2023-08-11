"use client";

import "react-datepicker/dist/react-datepicker.css";

import { Program, Workout } from "@prisma/client";
import { Calendar, ChevronDown, List } from "lucide-react";
import { useRouter } from "next/navigation";
import { User } from "next-auth";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import useSWRMutation from "swr/mutation";
import { twJoin } from "tailwind-merge";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/common/dropdown";
import { searchFilter } from "@/lib/helpers/search";

import { Button } from "./common/button";
import Input from "./common/Input";
import Spinner from "./Spinner";
import WorkoutsCalendar from "./WorkoutsCalendar";
import { convertUTCToLocal } from "@/lib/helpers/dates";

interface WorkoutsOperationsProps {
  user: User;
  programs: Program[];
  workouts: Workout[];
}

enum WorkoutViews {
  Calendar = "Calendar",
  List = "List",
}

export default function WorkoutsOperations({
  user,
  programs,
  workouts,
}: WorkoutsOperationsProps) {
  const [name, setName] = useState("");
  const [date, setDate] = useState<Date | null>(new Date());
  const [program, setProgram] = useState<Program | null>(null);
  const [query, setQuery] = useState("");
  const [view, setView] = useState<WorkoutViews>(WorkoutViews.List);

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

  const filteredWorkouts = searchFilter(workouts, query);

  return (
    <div className="min-h-screen grid grid-cols-2">
      <div className="px-4 py-2 border-r border-slate-200">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Workouts</h1>
          <div className="flex space-x-2">
            <button
              className={twJoin(
                "p-1 border rounded-md",
                view === WorkoutViews.List
                  ? "border-indigo-500"
                  : "border-slate-200"
              )}
              onClick={() => setView(WorkoutViews.List)}
            >
              <List
                color={view === WorkoutViews.List ? "indigo" : "black"}
                size={18}
              />
            </button>
            <button
              className={twJoin(
                "p-1 border rounded-md",
                view === WorkoutViews.Calendar
                  ? "border-indigo-500"
                  : "border-slate-200"
              )}
              onClick={() => setView(WorkoutViews.Calendar)}
            >
              <Calendar
                color={view === WorkoutViews.Calendar ? "indigo" : "black"}
                size={18}
              />
            </button>
          </div>
        </div>
        {view === WorkoutViews.List ? (
          <>
            <div className="w-full pt-3 mb-3">
              <input
                className="h-7 w-full px-2 rounded-md bg-slate-100 border border-slate-200 text-sm"
                placeholder="Search..."
                type="text"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setQuery(e.target.value)
                }
              />
            </div>
            <div className="mt-3 space-y-2 flex flex-col">
              {filteredWorkouts.map((workout: Workout, idx: number) => (
                <WorkoutItem
                  key={idx}
                  href={`/workouts/${workout.id}`}
                  workout={workout}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="min-h-screen flex flex-col justify-center items-center">
            <WorkoutsCalendar workouts={workouts} />
          </div>
        )}
      </div>
      <div className="flex flex-col justify-center items-center">
        <form
          className="w-[50%] space-y-2"
          action="submit"
          onSubmit={(e: React.FormEvent) => {
            e.preventDefault();
            setTrigger();
          }}
        >
          <div>
            <h2 className="text-2xl font-bold">Add a workout</h2>
            <p className="text-slate-500">
              If you don&apos;t see a workout that you want to track in the
              column on the left, you can add it below.
            </p>
          </div>
          <fieldset className="w-full flex flex-col">
            <label className="text-sm font-semibold" htmlFor="name">
              Name
            </label>
            <Input
              className="h-8 w-full px-3 py-2 border border-slate-200 rounded-md text-sm"
              id="name"
              name="name"
              type="text"
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value)
              }
            />
          </fieldset>
          <fieldset className="w-full flex flex-col">
            <label className="text-sm font-semibold" htmlFor="date">
              Workout date
            </label>
            <DatePicker
              selected={date}
              onChange={(date) => setDate(date)}
              className="h-8 p-2 text-sm border border-gray-200 rounded-md"
            />
          </fieldset>
          <div>
            <label className="text-sm font-semibold">Program</label>
            <DropdownMenu>
              <DropdownMenuTrigger className="h-8 w-full px-2 flex items-center justify-center bg-white text-black rounded-md border border-gray-200 hover:bg-muted">
                <ChevronDown size={15} strokeWidth={2.5} />
                <div className="px-2 text-sm">
                  {program?.name ?? "No program selected"}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {programs.map((program: Program, idx: number) => (
                  <DropdownMenuRadioItem
                    className="rounded-md data-[highlighted]:bg-gray-300"
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
          <Button variant="primary" className="w-full">
            {isMutating ? <Spinner /> : "Submit"}
          </Button>
        </form>
      </div>
    </div>
  );
}

interface WorkoutItemProps {
  href: string;
  workout: Workout;
}

function WorkoutItem({ href, workout }: WorkoutItemProps) {
  const router = useRouter();

  return (
    <div
      className="px-3 py-2 flex flex-col bg-white rounded-md border border-slate-200 hover:cursor-pointer"
      onClick={() => router.push(href)}
    >
      <p className="font-semibold text-sm">{workout.name}</p>
      <p className="text-sm text-slate-500">
        {convertUTCToLocal(workout.date).toLocaleDateString("en-us", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
    </div>
  );
}
