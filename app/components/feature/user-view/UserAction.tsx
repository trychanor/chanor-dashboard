"use client";

import { RotateCw } from "lucide-react";
import Button from "@/app/components/ui/Button";
import SearchBar from "@/app/components/ui/SearchBar";

type UserActionProps = {
  search: string;
  onSearchChange: (value: string) => void;
  onRefresh: () => void;
};

export default function UserAction({
  search,
  onSearchChange,
  onRefresh,
}: UserActionProps) {
  return (
    <div className="flex justify-between items-center gap-4 px-4 py-3">
      <SearchBar
        value={search}
        onChange={onSearchChange}
        onSearch={onSearchChange}
        placeholder="Search users"
        className="max-w-[560px] flex-1 py-1.5"
      />

      <Button
        variant="text"
        additionalStyles="cursor-pointer text-sm p-2"
        onClick={onRefresh}
      >
        <RotateCw size={16} className="mr-1.5" />
        Refresh
      </Button>
    </div>
  );
}