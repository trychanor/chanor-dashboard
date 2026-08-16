"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export type SidebarLinkProps = {
  icon: React.ReactNode;
  label: string;
  to: string;
};

export default function SidebarLink({ icon, label, to }: SidebarLinkProps) {
  const pathname = usePathname();
  const isActive =
    to === "/dashboard" ? pathname === "/dashboard" : pathname === to;

  return (
    <li>
      <Link
        href={to}
        className={`flex items-center gap-2.5 px-3.5 py-2.5 text-white rounded-md hover:bg-orange-tertiary/41 mx-2 text-[15px] transition-color duration-300 ease-in-out [&_svg]:size-5 ${
          isActive ? "bg-orange-tertiary/41" : ""
        }`}
      >
        {icon}
        <span className="font-medium">{label}</span>
      </Link>
    </li>
  );
}
