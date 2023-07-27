import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/session";

export default async function Exercise() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div>
      <h1>Exercise</h1>
    </div>
  );
}
