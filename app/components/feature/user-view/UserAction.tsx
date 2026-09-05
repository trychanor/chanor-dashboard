"use client";

import RefreshButton from "@/app/components/ui/RefreshButton";
import SearchBar from "@/app/components/ui/SearchBar";

type UserActionProps = {
  query: string;
  onQueryChange: (value: string) => void;
  onDebouncedSearch: (value: string) => void;
  onRefresh: () => void;
};

export default function UserAction({
  query,
  onQueryChange,
  onDebouncedSearch,
  onRefresh,
}: UserActionProps) {
  return (
    <div className="flex items-center justify-between gap-4 px-4 py-3">
      <SearchBar
        value={query}
        onChange={onQueryChange}
        onDebouncedChange={onDebouncedSearch}
        placeholder="Search users"
        className="max-w-[560px] flex-1 py-1.5"
        type="search"
        aria-label="Search users"
      />
      <RefreshButton
        onClick={onRefresh}
        title="Refresh user directory"
      />
    </div>
  );
}
