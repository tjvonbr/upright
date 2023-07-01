import { cva, VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const pillboxVariants = cva(
  "h-[25px] w-[100px] px-2 flex justify-between items-center text-white font-medium rounded-md",
  {
    variants: {
      variant: {
        complete: "bg-green-500",
        incomplete: "bg-red-500",
      },
    },
  }
);

export interface Pillbox
  extends React.HTMLProps<HTMLDivElement>,
    VariantProps<typeof pillboxVariants> {}

export default function Pillbox({ className, variant, ...props }: Pillbox) {
  return (
    <div
      className={twMerge(pillboxVariants({ variant, className }))}
      {...props}
    ></div>
  );
}
