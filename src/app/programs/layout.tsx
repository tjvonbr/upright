import SubNavbar from "../components/SubNavbar";
import { subNavbarItems } from "../config/navigation";

const ProgramsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full w-9/10 flex-col items-center">
      <div className="my-5">
        <h1 className="font-semibold text-3xl">Programs</h1>
        <SubNavbar items={subNavbarItems.programs} />
      </div>
      <main>{children}</main>
    </div>
  );
};

export default ProgramsLayout;
