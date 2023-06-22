"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";

interface FormElements extends HTMLFormControlsCollection {
  exerciseInput: HTMLInputElement;
}
interface ExerciseFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

const Exercises = () => {
  const { data: session } = useSession();

  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  async function handleSubmit(e: React.FormEvent<ExerciseFormElement>) {
    setIsLoading(true);
    e.preventDefault();

    try {
      await fetch("../api/exercises", {
        method: "POST",
        body: JSON.stringify({
          name,
          userId: session?.user?.id,
        }),
      });
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(true);
    }
  }

  return (
    <div className="h-full w-full">
      <form action="submit" onSubmit={handleSubmit}>
        <label htmlFor="">Name</label>
        <input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
          type="text"
        />
        <button type="submit">Add workout</button>
      </form>
    </div>
  );
};

export default Exercises;
