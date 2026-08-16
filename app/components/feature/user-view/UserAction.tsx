"use client";

import { useState } from "react";
import { RotateCw } from "lucide-react";
import Button from "@/app/components/ui/Button";
import SearchBar from "@/app/components/ui/SearchBar";

export default function UserAction() {
  const [query, setQuery] = useState("");

  const handleSearch = (value: string) => {
    console.log("Searching for:", value);
    // API call, filter table, etc.
  };

  return (
    <div className="flex justify-between items-center gap-4 px-4 py-3">
      <SearchBar
        value={query}
        onChange={setQuery}
        onSearch={handleSearch}
        placeholder="Search users"
        className="max-w-[560px] flex-1 py-1.5"
      />
      <Button variant="text" additionalStyles="cursor-pointer text-sm p-2">
        <RotateCw size={16} /> Refresh
      </Button>
    </div>
  );
}
