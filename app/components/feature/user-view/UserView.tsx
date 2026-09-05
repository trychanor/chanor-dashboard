"use client";

import { useCallback, useRef, useState } from "react";
import { useCustomers } from "@/lib/hooks/use-customers";
import UserAction from "./UserAction";
import UserTable from "./UserTable";

const DEFAULT_PAGE_SIZE = 10;

export default function UserView() {
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const searchRef = useRef("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [isManualRefresh, setIsManualRefresh] = useState(false);
  const {
    data: customersData,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useCustomers({ page, limit: pageSize, search });

  const handleDebouncedSearch = useCallback((value: string) => {
    const nextSearch = value.trim();

    if (searchRef.current === nextSearch) return;

    searchRef.current = nextSearch;
    setSearch(nextSearch);
    setPage(1);
  }, []);

  function handlePageSizeChange(value: number) {
    setPageSize(value);
    setPage(1);
  }

  async function refreshUsers() {
    setIsManualRefresh(true);

    try {
      await refetch();
    } finally {
      setIsManualRefresh(false);
    }
  }

  return (
    <div className="mt-3 bg-white rounded-lg">
      <UserAction
        query={searchInput}
        onQueryChange={setSearchInput}
        onDebouncedSearch={handleDebouncedSearch}
        onRefresh={refreshUsers}
      />
      <UserTable
        search={search}
        pageSize={pageSize}
        customersData={customersData}
        isLoading={isLoading}
        isFetching={isFetching}
        isManualRefresh={isManualRefresh}
        isError={isError}
        onRetry={() => refetch()}
        onPageChange={setPage}
        onPageSizeChange={handlePageSizeChange}
      />
    </div>
  );
}
