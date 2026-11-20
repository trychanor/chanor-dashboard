"use client";

import { useCallback, useRef, useState } from "react";
import { useTransactionViewStore } from "@/app/store/useTransactionViewStore";
import Button from "@/app/components/ui/Button";
import Dropdown from "@/app/components/ui/Dropdown";
import EmptyState from "@/app/components/ui/EmptyState";
import Pagination from "@/app/components/ui/Pagination";
import RefreshButton from "@/app/components/ui/RefreshButton";
import SearchBar from "@/app/components/ui/SearchBar";
import Status from "@/app/components/ui/Status";
import Table from "@/app/components/ui/Table";
import TableSkeleton from "@/app/components/ui/TableSkeleton";
import { useTransactions } from "@/hooks/use-transactions";
import {
  formatCurrency,
  formatDate,
  formatStatus,
} from "@/utils/formatting.util";
import { FaArrowLeft } from "react-icons/fa6";

type TransactionRow = {
  ticketId: string;
  customer: string;
  account: string;
  amount: string;
  date: string;
  status: React.ReactNode;
};

const DEFAULT_PAGE_SIZE = 10;

export default function AllTransactions() {
  const { setShowAllTransactions } = useTransactionViewStore();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [serviceInput, setServiceInput] = useState("");
  const [service, setService] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | undefined>();
  const [isManualRefresh, setIsManualRefresh] = useState(false);
  const searchRef = useRef("");
  const serviceRef = useRef("");

  const { data, isLoading, isError, refetch, isFetching } = useTransactions({
    page,
    limit: pageSize,
    search: search || undefined,
    status: statusFilter,
    service: service || undefined,
  });

  const handleDebouncedSearch = useCallback((value: string) => {
    const nextSearch = value.trim();

    if (searchRef.current === nextSearch) return;

    searchRef.current = nextSearch;
    setSearch(nextSearch);
    setPage(1);
  }, []);

  const handleDebouncedServiceFilter = useCallback((value: string) => {
    const nextService = value.trim();

    if (serviceRef.current === nextService) return;

    serviceRef.current = nextService;
    setService(nextService);
    setPage(1);
  }, []);

  async function refreshTransactions() {
    setIsManualRefresh(true);

    try {
      await refetch();
    } finally {
      setIsManualRefresh(false);
    }
  }

  const columns: Array<{ key: keyof TransactionRow; label: string }> = [
    { key: "ticketId", label: "Ticket ID" },
    { key: "customer", label: "Customer" },
    { key: "account", label: "Account" },
    { key: "amount", label: "Amount" },
    { key: "date", label: "Date" },
    { key: "status", label: "Status" },
  ];

  const rows =
    data?.data.map((transaction) => ({
      id: transaction.id,
      data: {
        ticketId: transaction.reference ?? "Not available",
        customer: transaction.customerName ?? "Not available",
        account: transaction.accountNumber ?? "Not available",
        amount: formatCurrency(transaction.amount),
        date: formatDate(transaction.createdAt, { includeTime: true }),
        status: (
          <Status
            label={formatStatus(transaction.status)}
            appearance="subtle"
            showDot={true}
          />
        ),
      },
    })) ?? [];

  if (isLoading) {
    return <TableSkeleton columnCount={6} rowCount={pageSize} />;
  }

  const loadingRows = data?.data.length || pageSize;

  return (
    <div className="space-y-4">
      <Button variant="text" onClick={() => setShowAllTransactions(false)}>
        <FaArrowLeft /> Go Back
      </Button>

      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex w-full flex-col gap-3 sm:flex-row xl:max-w-2xl">
          <SearchBar
            value={searchInput}
            onChange={setSearchInput}
            onDebouncedChange={handleDebouncedSearch}
            placeholder="Search by reference or description"
            className="w-full py-1.5"
            type="search"
            aria-label="Search transactions"
          />
          <SearchBar
            value={serviceInput}
            onChange={setServiceInput}
            onDebouncedChange={handleDebouncedServiceFilter}
            placeholder="Filter by service"
            className="w-full py-1.5 sm:max-w-52"
            type="search"
            aria-label="Filter transactions by service"
          />
        </div>

        <div className="flex items-center gap-2">
          <Dropdown
            value={statusFilter ?? ""}
            placeholder="Filter by status"
            options={[
              { label: "All statuses", value: "" },
              { label: "Successful", value: "successful" },
              { label: "Pending", value: "pending" },
              { label: "Failed", value: "failed" },
            ]}
            onChange={(value) => {
              setStatusFilter(value || undefined);
              setPage(1);
            }}
            width="168px"
            size="sm"
          />
          <RefreshButton
            onClick={refreshTransactions}
            disabled={isFetching}
            title="Refresh transactions"
          />
        </div>
      </div>

      {isManualRefresh || (isFetching && Boolean(search)) ? (
        <div>
          <TableSkeleton columnCount={6} rowCount={loadingRows} />
          {data && (
            <Pagination
              page={data.metadata.page}
              totalPages={data.metadata.totalPages}
              totalRecords={data.metadata.totalRecords}
              pageSize={data.metadata.limit ?? pageSize}
              pageSizeOptions={[10, 25, 50, 100]}
              onPageChange={setPage}
              onPageSizeChange={(value) => {
                setPageSize(value);
                setPage(1);
              }}
              isLoading={true}
            />
          )}
        </div>
      ) : isError ? (
        <div className="flex min-h-[300px] flex-col items-center justify-center gap-4">
          <p className="text-sm text-neutral-600">
            Transaction data is temporarily unavailable.
          </p>
          <Button onClick={() => refetch()}>Retry</Button>
        </div>
      ) : !data || data.data.length === 0 ? (
        <EmptyState
          title={
            search ? "No matching transactions found" : "No transactions found"
          }
          description={
            search
              ? "Try a different reference or description."
              : "Transactions will appear here when they are available."
          }
          className="min-h-[300px]"
        />
      ) : (
        <div>
          <Table columns={columns} rows={rows} showRowActions={false} />
          <Pagination
            page={data.metadata.page}
            totalPages={data.metadata.totalPages}
            totalRecords={data.metadata.totalRecords}
            pageSize={data.metadata.limit ?? pageSize}
            pageSizeOptions={[10, 25, 50, 100]}
            onPageChange={setPage}
            onPageSizeChange={(value) => {
              setPageSize(value);
              setPage(1);
            }}
            isLoading={isFetching}
          />
        </div>
      )}
    </div>
  );
}
