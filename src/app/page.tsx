"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Loading = () => {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-white">
      <p className="text-2xl">&#128200;</p>
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

  if (status === "loading" || session === undefined) {
    return <Loading />;
  }

  if (status === "authenticated") {
    return (
      <>
        Signed in as {session?.user?.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
}
