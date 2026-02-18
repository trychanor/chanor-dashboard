"use client";

import { Sun, Moon, Bell, Search, BookOpenText } from "lucide-react";
import Link from "next/link"
import { useUser } from "@clerk/nextjs";
import Image from "next/image"
import { useEnvironment } from "../providers/environment-provider";

export default function Header() {
  const { user } = useUser();
  const { isLocal } = useEnvironment();

  return (
    <header className=" h-20 px-8 flex items-center justify-end gap-[26px]">
      {isLocal && (
        <Link href={"/docs"} className="p-2 bg-[#EF5A22] text-white rounded-full">
          <BookOpenText size={18} />
        </Link>
      )}
      <div className="relative max-w-[450px] flex-1 mr-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          placeholder="Search"
          className="w-full h-12 pl-12 pr-4 bg-gray-200 rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-[#E86A33]"
        />
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-6 bg-white rounded-full p-1">
          <button className="p-2 bg-[#EF5A22] text-white rounded-full">
            <Sun size={18} />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Moon size={18} />
          </button>
        </div>

        <button className="relative p-2 hover:bg-gray-100 rounded-full">
          <Bell />
          <span className="absolute top-2 right-2 w-2 h-2 bg-[#EF5A22] rounded-full"></span>
        </button>

        <div className="flex items-center gap-3">
          {user && (
            <>
              <Image src={user.imageUrl} alt="profile image" className="rounded-full" width={35} height={35} />
              <div className="text-left">
                <h3 className="text-base font-semibold tracking-[-0.33px] text-black">
                  {user.fullName}
                </h3>
                <p className="text-sm tracking-[-0.33px] text-dark-gray">
                  {user.primaryEmailAddress?.emailAddress}
                </p>
              </div>
            </>
          )}

        </div>
      </div>
    </header>
  );
}
