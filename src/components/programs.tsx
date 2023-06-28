"use client";

import { use } from "react";

export async function getUserPrograms(programId: number) {
  const response = await fetch(
    `http://localhost:3000/api/programs/${programId}`,
    {
      method: "GET",
    }
  );

  if (!response.ok) {
    throw new Error("Help.");
  }

  return response.json();
}

export function ProgramsList({ userId }: { userId: number }) {
  const programs = use(getUserPrograms(userId));

  return <div>{programs}</div>;
}
