import SubNavbar from "../components/SubNavbar";
import { subNavbarItems } from "../config/navigation";

const ExerciseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full w-9/10 flex-col items-center">
      <div className="my-5">
        <h1 className="font-semibold text-3xl">Exercises</h1>
        <SubNavbar items={subNavbarItems.exercises} />
      </div>
      <main>{children}</main>
    </div>
  );
};

export default ExerciseLayout;
