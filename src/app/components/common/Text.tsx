import React from "react";

interface TextProps {
  children: React.ReactNode;
  className?: string;
}

export default function Text({ children }: TextProps) {
  return <p className="text-slate-500">{children}</p>;
}
