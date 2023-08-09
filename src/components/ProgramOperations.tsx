"use client";

import "react-datepicker/dist/react-datepicker.css";

import { Program, Workout } from "@prisma/client";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { User } from "next-auth";
import { HTMLAttributes, useState } from "react";
import DatePicker from "react-datepicker";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/common/dialog";

import { Button } from "./common/button";
import Spinner from "./Spinner";

interface ProgramOperationsProps {
  user: User;
  program: Program;
  recentWorkout: Workout | null;
}

export default function ProgramOperations({
  user,
  program,
  recentWorkout,
}: ProgramOperationsProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState<Date | null>(new Date());
  const [isSaving, setIsSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSaving(true);

    try {
      const response = await fetch(
        `http://localhost:3000/api/programs/${program.id}/workouts`,
        {
          method: "POST",
          body: JSON.stringify({
            name,
            date,
            programId: Number(program.id),
            userId: Number(user.id),
          }),
        }
      );

      if (!response.ok) {
      }

      setIsSaving(false);
    } catch (error) {
      setIsSaving(false);
    }
  }

  return (
    <div className="h-[90%] w-[95%] m-auto">
      <h1>{program?.name}</h1>
      <div className="grid grid-cols-3">
        {recentWorkout ? <LastWorkoutWidget workout={recentWorkout} /> : null}
        <WorkoutsWidget programId={program.id as number} />
        <Dialog>
          <DialogTrigger>
            <div className="h-full w-full flex flex-col justify-center items-center">
              <p className="text-lg font-medium">Add Workout</p>
              <PlusCircle strokeWidth={1.5} />
            </div>
          </DialogTrigger>
          <DialogPortal>
            <DialogContent>
              <DialogTitle>Add Workout</DialogTitle>
              <DialogDescription>
                Enter a name and description for the workout here. You can add
                exercises and upload data later!
              </DialogDescription>
              <div className="mb-[50px] flex flex-col">
                <form action="submit">
                  <fieldset className="flex flex-col">
                    <label className="mb-2 text-sm font-medium" htmlFor="name">
                      Workout name
                    </label>
                    <input
                      className="h-[30px] p-2 border border-gray-200 rounded-md"
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setName(e.target.value)
                      }
                    />
                  </fieldset>
                  <fieldset className="flex flex-col">
                    <label className="mb-2 text-sm font-medium" htmlFor="date">
                      Workout date
                    </label>
                    <DatePicker
                      selected={date}
                      onChange={(date) => setDate(date)}
                      className="h-[30px] p-2 border border-gray-200 rounded-md"
                    />
                  </fieldset>
                  <fieldset className="flex flex-col">
                    <label
                      className="mb-2 text-sm font-medium"
                      htmlFor="desription"
                    >
                      Workout description (optional)
                    </label>
                    <textarea
                      className="min-h-[60px] p-2 border border-gray-200 rounded-md"
                      id="description"
                      value={description}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                        setDescription(e.target.value)
                      }
                    />
                  </fieldset>
                </form>
              </div>
              <Button
                className="absolute bottom-[10px] right-[10px]"
                disabled={isSaving}
                type="submit"
                variant="default"
                onClick={handleSubmit}
              >
                {isSaving ? <Spinner /> : "Submit"}
              </Button>
            </DialogContent>
          </DialogPortal>
        </Dialog>
      </div>
    </div>
  );
}

function LastWorkoutWidget({ workout }: { workout: Workout }) {
  return (
    <Widget onClick={() => {}}>
      <p className="mx-3 pt-2 text-lg font-medium">Most Recent Workout</p>
      <p className="mx-3 text-md font-medium text-gray-500">{workout.name}</p>
    </Widget>
  );
}

function WorkoutsWidget({ programId }: { programId: number }) {
  return (
    <Widget href={`/programs/${programId}/workouts`}>
      <div className="h-full w-full flex flex-col justify-center items-center">
        <p className="text-lg font-medium">See Workouts</p>
        <PlusCircle strokeWidth={1.5} />
      </div>
    </Widget>
  );
}

interface WidgetProps extends HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  href?: string;
}

function Widget({ children, href }: WidgetProps) {
  return href ? (
    <Link
      className="w-[400px] h-[250px] border border-slate-200 rounded-md"
      href={href}
    >
      {children}
    </Link>
  ) : (
    <button className="w-[400px] h-[250px] border border-slate-200 rounded-md">
      {children}
    </button>
  );
}
