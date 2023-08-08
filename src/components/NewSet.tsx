import { Exercise, Workout } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Input from "./common/Input";
import { ArrowDownFromLine, Check, XCircle } from "lucide-react";
import Spinner from "./Spinner";

interface NewSetProps {
  addSet: (e: React.FormEvent) => void;
  exercise: Exercise;
  handleNewSetChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => void;
  idx: number;
  newSets: any[];
  removeSet: (e: React.FormEvent, idx: number) => void;
  set: any;
  workoutId: Workout["id"];
}

export default function NewSet({
  addSet,
  exercise,
  handleNewSetChange,
  idx,
  newSets,
  removeSet,
  set,
  workoutId,
}: NewSetProps) {
  const [isCreating, setIsCreating] = useState(false);

  const router = useRouter();

  async function createSet(idx: number) {
    setIsCreating(true);

    const response = await fetch("http://localhost:3000/api/sets", {
      method: "POST",
      body: JSON.stringify({
        exerciseId: exercise.id,
        workoutId,
        reps: newSets[idx]["reps"],
        weight: newSets[idx]["weightLbs"],
      }),
    });

    if (response.ok) {
      router.refresh();
      setIsCreating(false);
    }

    setIsCreating(false);
  }

  return (
    <div className="mt-2 flex items-center">
      <Input
        autoComplete="off"
        className="w-[40px] mr-2 py-1 text-center text-sm"
        name="reps"
        type="text"
        value={set.reps}
        onChange={(e) => handleNewSetChange(e, idx)}
      />
      <span className="mr-2">x</span>
      <Input
        autoComplete="off"
        className="w-[50px] mr-3 py-1 text-center text-sm"
        name="weightLbs"
        type="text"
        value={set.weightLbs.toString()}
        onChange={(e) => handleNewSetChange(e, idx)}
      />
      <button className="mr-3" onClick={(e: React.FormEvent) => addSet(e)}>
        <ArrowDownFromLine color="black" size={18} />
      </button>
      <button
        className="mr-3"
        onClick={(e: React.FormEvent) => removeSet(e, idx)}
      >
        <XCircle color="black" size={18} />
      </button>
      <button
        onClick={async (e: React.FormEvent) => {
          e.preventDefault();
          await createSet(idx);
        }}
      >
        {isCreating ? (
          <Spinner color="black" size="18" />
        ) : (
          <Check color="green" size={18} />
        )}
      </button>
    </div>
  );
}
