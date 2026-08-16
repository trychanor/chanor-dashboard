"use client";

import { Sun, Moon, Bell, Search, BookOpenText } from "lucide-react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useEnvironment } from "../../providers/environment-provider";

export default function Header() {
  const { user } = useUser();
  const { isLocal } = useEnvironment();

  return (
    <header className="h-[68px] px-6 flex items-center justify-end gap-5 bg-white border-b border-gray-200">
      {isLocal && (
        <Link
          href={"/docs"}
          className="p-2 bg-[#EF5A22] text-white rounded-full"
        >
          <BookOpenText size={17} />
        </Link>
      )}
      <div className="relative max-w-[400px] flex-1 mr-3">
        <Search
          size={18}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500"
        />
        <input
          type="text"
          placeholder="Search"
          className="w-full h-10 pl-10 pr-4 bg-gray-200 rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-[#E86A33]"
        />
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-4 bg-white rounded-full p-1">
          <button className="p-1.5 bg-[#EF5A22] text-white rounded-full">
            <Sun size={17} />
          </button>
          <button className="p-1.5 rounded-full hover:bg-gray-100">
            <Moon size={17} />
          </button>
        </div>

        <button className="relative p-1.5 hover:bg-gray-100 rounded-full">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#EF5A22] rounded-full"></span>
        </button>

        <div className="flex items-center gap-2.5">
          {user && (
            <>
              <Image
                src={user.imageUrl}
                alt="profile image"
                className="rounded-full"
                width={32}
                height={32}
              />
              <div className="text-left">
                <h3 className="text-sm font-semibold text-black">
                  {user.fullName}
                </h3>
                <p className="text-xs text-dark-gray">
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
