"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Header from "./dashboard/components/Header";
import "semantic-ui-css/semantic.min.css";
import { User } from "next-auth";

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
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-indigo-50">
        <Header user={session.user as User} />
      </div>
    );
  }
}
