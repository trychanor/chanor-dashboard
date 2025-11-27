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
        className={`flex items-center gap-3 px-4 py-3 text-white rounded-lg hover:bg-orange-tertiary/41 mx-2.75 transition-color duration-300 ease-in-out ${
          isActive ? "bg-orange-tertiary/41" : ""
        }`}
      >
        {icon}
        <span className="text-2xl font-medium tracking-[-0.33px]">{label}</span>
      </Link>
    </li>
  );
}
