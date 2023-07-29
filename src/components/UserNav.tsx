import { MoveUpRight } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/session";

export default async function UserNav() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div>
      <Link className="flex items-center space-x-1" href="/">
        <MoveUpRight color="black" size={18} strokeWidth={2.5} />
        <span className="font-bold text-xl text-black hover:text-black">
          Upright
        </span>
      </Link>
    </div>
  );
}
