import { redirect } from "next/navigation";
import React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/app/components/common/select";
import { getCurrentUser } from "@/lib/session";

export default async function AddWorkoutExercise() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div>
      <form action="submit">
        <label htmlFor="">Exercise name</label>
        <Select>
          <SelectTrigger>
            <div>Hello</div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={"Hello"} />
          </SelectContent>
        </Select>
      </form>
    </div>
  );
}
