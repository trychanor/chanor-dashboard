"use client";

import {
  FaCreditCard,
  FaGear,
  FaHeadphones,
  FaHouse,
  FaMicrophone,
  FaRightFromBracket,
  FaTriangleExclamation,
  FaUsers,
} from "react-icons/fa6";
import SidebarLink from "../ui/SidebarLink";
import Image from "next/image";
import { SignOutButton } from "@clerk/nextjs";

export default function Sidebar() {
  const PrimaryNavLinks = [
    { label: "Overview", to: "/dashboard", icon: <FaHouse /> },
    {
      label: "Dispute",
      to: "/dashboard/dispute",
      icon: <FaTriangleExclamation />,
    },
    { label: "Support", to: "/dashboard/support", icon: <FaHeadphones /> },
    {
      label: "Voice Analytics",
      to: "/dashboard/voice-analytics",
      icon: <FaMicrophone />,
    },
    { label: "Field Agents", to: "/dashboard/field-agents", icon: <FaUsers /> },
    { label: "Card", to: "/dashboard/card", icon: <FaCreditCard /> },
  ];

  const SecondaryNavLinks = [
    { label: "Settings", to: "/dashboard/settings", icon: <FaGear /> },
    // { label: "Sign Out", to: "/dashboard/setting", icon: <FaRightFromBracket /> },
  ];

  return (
    <aside className="fixed top-0 left-0 h-screen w-[248px] bg-[#E86A33] flex flex-col overflow-y-auto">
      <div className="px-5 py-4">
        <Image
          src="/chanor-logo.png"
          width={150}
          height={72}
          className="h-auto w-[150px] object-contain scale-150"
          alt="Chanor Logo"
          loading="eager"
        />
      </div>

      <nav className="flex-1 flex flex-col justify-between">
        <ul className="space-y-1">
          {PrimaryNavLinks.map(({ label, to, icon }) => (
            <SidebarLink key={to} to={to} label={label} icon={icon} />
          ))}
        </ul>

        <hr className="border-t border-white/70 my-4" />

        <div className="flex flex-col justify-between mb-5">
          <ul className="space-y-1">
            {SecondaryNavLinks.map(({ label, to, icon }) => (
              <SidebarLink key={to} to={to} label={label} icon={icon} />
            ))}

            {/* CLERK SIGN OUT BUTTON */}
            <li className="px-5 mt-16">
              <SignOutButton>
                <button className="flex items-center gap-2.5 w-full text-[15px] text-white hover:text-white/80 transition-colors py-2.5 cursor-pointer">
                  <FaRightFromBracket size={18} />
                  <span className="font-medium">Sign Out</span>
                </button>
              </SignOutButton>
            </li>
          </ul>
        </div>
      </nav>
    </aside>
  );
}
