"use client";

import { Workout } from "@prisma/client";
import * as Dialog from "@radix-ui/react-dialog";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./common/dropdown";

export default function WorkoutOperations({ workout }: { workout: Workout }) {
  return (
    <div>
      <h1>{workout.name}</h1>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex h-8 w-[90px] px-2 items-center justify-center bg-indigo-500 text-white rounded-md border hover:bg-muted">
          <ChevronDown size={15} strokeWidth={2.5} />
          <div className="px-2 text-md font-medium">Actions</div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <Link href={"/login"} className="flex w-full">
              Edit
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={"/add-exercise"} className="flex w-full">
              Add Exercise
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex cursor-pointer items-center text-destructive focus:text-destructive">
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <button className="text-violet11 shadow-blackA7 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none">
            Edit profile
          </button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="bg-black- data-[state=open]:animate-overlayShow fixed inset-0" />
          <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
            <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
              Add an exercise to this workout!
            </Dialog.Title>
            <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
              Open the dropdown and select a workout. We know it&apos;s a pain
              in the ass to add exercises one-by-one and are working on a
              solution to make this easier!
            </Dialog.Description>
            <fieldset className="mb-[15px] flex items-center gap-5">
              <label
                className="text-violet11 w-[90px] text-right text-[15px]"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="text-violet11 shadow-violet7 focus:shadow-red inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                id="name"
                defaultValue="Pedro Duarte"
              />
            </fieldset>
            <fieldset className="mb-[15px] flex items-center gap-5">
              <label
                className="text-violet11 w-[90px] text-right text-[15px]"
                htmlFor="username"
              >
                Username
              </label>
              <input
                className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                id="username"
                defaultValue="@peduarte"
              />
            </fieldset>
            <div className="mt-[25px] flex justify-end">
              <Dialog.Close asChild>
                <button className="bg-black text-white hover:bg-black/80 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
                  Save changes
                </button>
              </Dialog.Close>
            </div>
            <Dialog.Close asChild>
              <button
                className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                aria-label="Close"
              >
                X
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
