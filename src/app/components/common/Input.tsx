import { twJoin } from "tailwind-merge";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  name: string;
  placeholder?: string;
  type: string;
  value: string;
}

export default function Input({
  className,
  name,
  placeholder,
  type = "text",
  value,
  ...props
}: InputProps) {
  return (
    <input
      className={twJoin(
        "px-2 border border-slate-200 rounded-[2px]",
        className
      )}
      name={name}
      placeholder={placeholder}
      type={type}
      value={value}
      {...props}
    />
  );
}
