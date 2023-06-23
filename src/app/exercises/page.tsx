import { db } from "@/app/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/app/lib/session";

const Exercises = async () => {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const exercises = await db.exercise.findMany({
    where: {
      userId: Number(user.id),
    },
    orderBy: {
      name: "asc",
    },
  });

  return (
    <main>
      <div className="w-full mb-3">
        <input
          className="h-[25px] w-[400px] px-2 rounded-md bg-slate-100 border border-slate-200 text-sm"
          placeholder="Search..."
          type="text"
        />
      </div>
      {exercises.length > 0 ? (
        exercises.map((exercise, idx) => (
          <div key={idx}>
            <Link
              className="py-3 font-medium text-black hover:text-black"
              href={`/exercises/${exercise.id}`}
            >
              {exercise.name}
            </Link>
          </div>
        ))
      ) : (
        <p>No exercises to show</p>
      )}
    </main>
  );
};

export default Exercises;
