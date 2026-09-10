"use client";

import { useState } from "react";
import { useCustomers } from "@/lib/hooks/use-customers";
import UserAction from "./UserAction";
import UserTable from "./UserTable";

export default function UserView() {
  const [search, setSearch] = useState("");

  const {
    data: customersData,
    isLoading,
    isError,
    refetch,
  } = useCustomers({
    page: 1,
    limit: 20,
    search,
  });

  return (
    <div className="mt-3 bg-white rounded-lg">
      <UserAction
        search={search}
        onSearchChange={setSearch}
        onRefresh={() => refetch()}
      />

      <UserTable
        data={customersData}
        isLoading={isLoading}
        isError={isError}
        onRetry={() => refetch()}
      />
    </div>
  );
}