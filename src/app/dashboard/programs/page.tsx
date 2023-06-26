"use client";

import { Program } from "@prisma/client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import useSWR from "swr";

const Programs = () => {
  const { data: session } = useSession();

  if (!session) {
    redirect("/login");
  }

  const url = "http://localhost:3000/api/dashboard/programs";

  async function getPrograms() {
    const response = await fetch(url, {
      method: "GET",
      body: JSON.stringify({
        userId: Number(session?.user?.id),
      }),
    });

    const programs = await response.json();

    return programs;
  }

  const { data: programs, error, isLoading } = useSWR(url, getPrograms);

  if (isLoading) return <div>Loading...</div>;

  if (programs) {
    return (
      <div>
        {programs.map((program: Program, idx) => (
          <div key={idx}>{program.name}</div>
        ))}
      </div>
    );
  }
};

export default Programs;
