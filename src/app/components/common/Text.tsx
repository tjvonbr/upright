import React from "react";

interface TextProps {
  children: React.ReactNode;
  className?: string;
}

export default function Text({ children }: TextProps) {
  return <p className="font-semibold text-gray-700">{children}</p>;
}
