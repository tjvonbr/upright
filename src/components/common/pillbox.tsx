import { cva, VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const pillboxVariants = cva(
  "px-2 py-1 flex justify-between items-center text-white text-xs font-semibold rounded-xl",
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
