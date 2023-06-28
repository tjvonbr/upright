"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

interface SubNavbarItem {
  name: string;
  href: string;
}

interface SubNavbarProps {
  items?: SubNavbarItem[];
  children?: React.ReactNode;
}

const SubNavbar = ({ items }: SubNavbarProps) => {
  const pathname = usePathname();

  return (
    <div>
      <nav className="pb-2 border-b border-gray-300">
        {items && items.length > 0
          ? items.map((item, idx) => (
              <Link
                className={twMerge(
                  "px-2.5 py-1 pb-2 font-medium",
                  item.href === pathname
                    ? "border-b-2 border-indigo-500 text-indigo-500 hover:text-indigo-500"
                    : "text-gray-500 hover:text-black"
                )}
                href={item.href}
                key={idx}
              >
                {item.name}
              </Link>
            ))
          : null}
      </nav>
    </div>
  );
};

export default SubNavbar;
