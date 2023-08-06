"use client";

import { Program } from "@prisma/client";
import { useRouter } from "next/navigation";
import { User } from "next-auth";
import { useState } from "react";

import { Button } from "@/components/common/button";
import Input from "@/components/common/Input";
import { searchFilter } from "@/lib/helpers/search";

import Spinner from "./Spinner";

interface ProgramsOperationsProps {
  programs: Program[];
  user: User;
}

export default function ProgramsOperations({
  programs,
  user,
}: ProgramsOperationsProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [query, setQuery] = useState("");
  const [isMutating, setIsMutating] = useState(false);

  const router = useRouter();

  function resetForm() {
    setName("");
    setDescription("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsMutating(true);

    const response = await fetch("http://localhost:3000/api/programs", {
      method: "POST",
      body: JSON.stringify({
        name,
        description,
        userId: user.id,
      }),
    });

    if (response.ok) {
      resetForm();
      router.refresh();
      setIsMutating(false);
    }

    setIsMutating(false);
  }

  const filteredPrograms = searchFilter(programs, query);

  return (
    <div className="min-h-screen grid grid-cols-2">
      <div className="px-4 py-2 border-r border-slate-200 overflow-y-scroll">
        <h1 className="text-2xl font-bold">Programs</h1>
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
          {filteredPrograms.map((program: Program, idx: number) => (
            <ProgramItem
              key={idx}
              href={`/programs/${program.id}`}
              program={program}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <form
          className="w-[50%] space-y-2"
          action="submit"
          onSubmit={handleSubmit}
        >
          <div>
            <h2 className="text-2xl font-bold">Start a new program</h2>
            <p className="text-slate-500">
              Starting a new program? Add it here first and then assign workouts
              to it later.
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
            <label className="text-sm font-semibold" htmlFor="name">
              Description
            </label>
            <textarea
              className="px-2 py-2 border border-slate-200 rounded-md text-sm"
              id="description"
              name="description"
              rows={3}
              value={description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setDescription(e.target.value)
              }
            />
          </fieldset>
          <Button variant="primary" className="w-full">
            {isMutating ? <Spinner /> : "Submit"}
          </Button>
        </form>
      </div>
    </div>
  );
}

interface ProgramItemProps {
  href: string;
  program: Program;
}

function ProgramItem({ href, program }: ProgramItemProps) {
  const router = useRouter();

  return (
    <div
      className="px-3 py-2 flex justify-between items-center bg-white rounded-md border border-slate-200 hover:cursor-pointer"
      onClick={() => router.push(href)}
    >
      <span className="font-semibold text-sm">{program.name}</span>
    </div>
  );
}
