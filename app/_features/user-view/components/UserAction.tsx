"use client";

import { useState } from "react";
import { RotateCw } from "lucide-react";
import Button from "@/app/_ui/Button";
import SearchBar from "@/app/_ui/SearchBar";

export default function UserAction() {
  const [query, setQuery] = useState("");

  const handleSearch = (value: string) => {
    console.log("Searching for:", value);
    // API call, filter table, etc.
  };

  return (
    <div className="flex justify-between items-center px-6 py-2">
      <SearchBar
        value={query}
        onChange={setQuery}
        onSearch={handleSearch}
        placeholder="Search transaction"
        className="w-[722px]"
      />
      <Button variant="text">
        <RotateCw /> Refresh
      </Button>
    </div>
  );
}
