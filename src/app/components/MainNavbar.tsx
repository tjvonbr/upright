"use client";

import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { usePathname } from "next/navigation";

export interface NavItem {
  name: string;
  href: string;
}

export interface MainNavbarProps {
  items: NavItem[];
  children?: React.ReactNode;
}

const MainNavbar = ({ items }: MainNavbarProps) => {
  const pathname = usePathname();
  console.log(pathname);

  return (
    <nav className="h-[45px] w-full flex items-center border">
      {items.map((item, idx) => (
        <Link
          className={twMerge(
            "px-2.5 py-1 mx-1 rounded-full font-medium text-sm",
            item.href.endsWith(pathname)
              ? "bg-indigo-500 text-white"
              : "bg-white text-black",
            "hover:bg-gray-200 hover:text-black"
          )}
          href={item.href}
          key={idx}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
};

export default MainNavbar;
