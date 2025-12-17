"use client";

import {
  Home,
  AlertTriangle,
  Headphones,
  Mic,
  Users,
  CreditCard,
  Settings,
  LogOut,
} from "lucide-react";
import SidebarLink from "../_ui/SidebarLink";
import Image from "next/image";
import { SignOutButton } from "@clerk/nextjs";

export default function Sidebar() {
  const PrimaryNavLinks = [
    { label: "Overview", to: "/dashboard", icon: <Home /> },
    { label: "Dispute", to: "/dashboard/dispute", icon: <AlertTriangle /> },
    { label: "Support", to: "/dashboard/support", icon: <Headphones /> },
    {
      label: "Voice Analytics",
      to: "/dashboard/voice-analytics",
      icon: <Mic />,
    },
    { label: "Field Agents", to: "/dashboard/field-agents", icon: <Users /> },
    { label: "Card", to: "/dashboard/card", icon: <CreditCard /> },
  ];

  const SecondaryNavLinks = [
    { label: "Settings", to: "/dashboard/settings", icon: <Settings /> },
    // { label: "Sign Out", to: "/dashboard/setting", icon: <LogOut /> },
  ];

  return (
    <aside className="fixed top-0 left-0 h-screen w-[280px] bg-[#E86A33] flex flex-col">
      <div className="py-4 px-6">
        <Image
          src="/logo.png"
          width={186}
          height={80}
          className="w-[186px]"
          alt="Raba Logo"
        />
      </div>

      <nav className="flex-1 flex flex-col justify-between">
        <ul className="space-y-2">
          {PrimaryNavLinks.map(({ label, to, icon }) => (
            <SidebarLink key={to} to={to} label={label} icon={icon} />
          ))}
        </ul>

        <hr className="border-t border-white my-6" />

        <div className="flex-1 flex flex-col justify-between mb-3">
          <ul className="space-y-2">
            {SecondaryNavLinks.map(({ label, to, icon }) => (
              <SidebarLink key={to} to={to} label={label} icon={icon} />
            ))}

            {/* CLERK SIGN OUT BUTTON */}
            <li className="px-6">
              <SignOutButton>
                <button className="flex items-center gap-3 w-full text-white hover:text-white/80 transition-colors py-3">
                  <LogOut size={20} />
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
