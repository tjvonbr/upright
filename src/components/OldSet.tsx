import { ArrowDownFromLine, Check, Trash2 } from "lucide-react";
import Input from "./common/Input";
import Spinner from "./Spinner";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Set } from "./WorkoutOperations";

interface OldSetProps {
  addSet: (e: React.FormEvent) => void;
  handleOldSetChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => void;
  idx: number;
  oldSets: any[];
  set: Set;
}

export default function OldSet({
  addSet,
  handleOldSetChange,
  idx,
  oldSets,
  set,
}: OldSetProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const router = useRouter();

  async function deleteSet(setId: string) {
    setIsDeleting(true);

    const response = await fetch(`http://localhost:3000/api/sets/${setId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      router.refresh();
      setIsDeleting(false);
    }

    setIsDeleting(false);
  }

  async function updateSet(setId: string, idx: number) {
    setIsUpdating(true);

    const response = await fetch(`http://localhost:3000/api/sets/${setId}`, {
      method: "PUT",
      body: JSON.stringify({
        reps: oldSets[idx]["reps" as keyof Set],
        weight: oldSets[idx]["weightLbs" as keyof Set],
      }),
    });

    if (response.ok) {
      router.refresh();
      setIsUpdating(false);
    }

    setIsUpdating(false);
  }

  return (
    <div className="mt-2 flex items-center">
      <Input
        autoComplete="off"
        className="w-[40px] mr-2 py-1 text-center text-sm"
        name="reps"
        type="text"
        value={set.reps.toString()}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleOldSetChange(e, idx)
        }
      />
      <span className="mr-2">x</span>
      <Input
        autoComplete="off"
        className="w-[50px] mr-3 py-1 text-center text-sm"
        name="weightLbs"
        type="text"
        value={set.weightLbs.toString()}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleOldSetChange(e, idx)
        }
      />
      <button className="mr-3" onClick={(e: React.FormEvent) => addSet(e)}>
        <ArrowDownFromLine color="black" size={18} />
      </button>
      <button
        className="mr-3"
        onClick={async (e: React.FormEvent) => {
          e.preventDefault();
          await deleteSet(set.id);
        }}
      >
        {isDeleting ? (
          <Spinner color="black" size={"15"} />
        ) : (
          <Trash2 color="red" size={18} />
        )}
      </button>
      <button
        onClick={async (e: React.FormEvent) => {
          e.preventDefault();
          await updateSet(set.id, idx);
        }}
      >
        {isUpdating ? (
          <Spinner color="black" size={"18"} />
        ) : (
          <Check color="green" size={18} />
        )}
      </button>
    </div>
  );
}
