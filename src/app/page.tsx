"use client";

import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import "semantic-ui-css/semantic.min.css";

const Loading = () => {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-white">
      <span className="text-2xl">&#128200;</span>
      <h1 className="font-medium">Loading your data...</h1>
    </div>
  );
};

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated: () => router.push("api/auth/signin"),
  });

  if (status === "loading" || !session) {
    return <Loading />;
  } else {
    return redirect("/dashboard");
  }
}
