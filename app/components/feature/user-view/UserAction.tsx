"use client";

<<<<<<< HEAD
import { RotateCw } from "lucide-react";
import Button from "@/app/components/ui/Button";
import SearchBar from "@/app/components/ui/SearchBar";

type UserActionProps = {
  search: string;
  onSearchChange: (value: string) => void;
=======
import RefreshButton from "@/app/components/ui/RefreshButton";
import SearchBar from "@/app/components/ui/SearchBar";

type UserActionProps = {
  query: string;
  onQueryChange: (value: string) => void;
  onDebouncedSearch: (value: string) => void;
>>>>>>> 0797e4d39bf13511ee1677f4efd72d6d5796ab76
  onRefresh: () => void;
};

export default function UserAction({
<<<<<<< HEAD
  search,
  onSearchChange,
=======
  query,
  onQueryChange,
  onDebouncedSearch,
>>>>>>> 0797e4d39bf13511ee1677f4efd72d6d5796ab76
  onRefresh,
}: UserActionProps) {
  return (
    <div className="flex items-center justify-between gap-4 px-4 py-3">
      <SearchBar
<<<<<<< HEAD
        value={search}
        onChange={onSearchChange}
        onSearch={onSearchChange}
=======
        value={query}
        onChange={onQueryChange}
        onDebouncedChange={onDebouncedSearch}
>>>>>>> 0797e4d39bf13511ee1677f4efd72d6d5796ab76
        placeholder="Search users"
        className="max-w-[560px] flex-1 py-1.5"
        type="search"
        aria-label="Search users"
      />
      <RefreshButton
        onClick={onRefresh}
        title="Refresh user directory"
      />
<<<<<<< HEAD

      <Button
        variant="text"
        additionalStyles="cursor-pointer text-sm p-2"
        onClick={onRefresh}
      >
        <RotateCw size={16} className="mr-1.5" />
        Refresh
      </Button>
=======
>>>>>>> 0797e4d39bf13511ee1677f4efd72d6d5796ab76
    </div>
  );
}