"use client";

import { MoveUpRight } from "lucide-react";
import Link from "next/link";

export interface NavItem {
  name: string;
  href: string;
}

export interface MainNavbarProps {
  items: NavItem[];
  children?: React.ReactNode;
}

export default function NavBar({ items }: MainNavbarProps) {
  return (
    <div className="flex space-x-3">
      <Link className="flex items-center space-x-1" href="/">
        <MoveUpRight color="black" size={18} strokeWidth={2.5} />
        <span className="font-bold text-xl text-black hover:text-black">
          Upright
        </span>
      </Link>
      <nav className="flex items-center">
        {items.map((item, idx) => (
          <Link
            className="px-2.5 py-1 mx-1 rounded-full text-black hover:text-slate-500"
            href={item.href}
            key={idx}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}
