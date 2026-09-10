"use client";

import { useState } from "react";
import { useTransactionViewStore } from "@/app/store/useTransactionViewStore";
import { useTransactions } from "@/lib/hooks/use-transactions";
import Button from "@/app/components/ui/Button";
import Dropdown from "@/app/components/ui/Dropdown";
import SearchBar from "@/app/components/ui/SearchBar";
import Status from "@/app/components/ui/Status";
import Table from "@/app/components/ui/Table";
<<<<<<< HEAD
import Loading from "@/app/loading";
import { ArrowLeft, ChevronLeft, ChevronRight, RotateCw } from "lucide-react";
=======
import {
  FaArrowLeft,
  FaChevronLeft,
  FaChevronRight,
  FaRotateRight,
} from "react-icons/fa6";
>>>>>>> 0797e4d39bf13511ee1677f4efd72d6d5796ab76

type TransactionRow = {
  ticketId: string;
  sender: string;
  receiver: string;
  amount: string;
  date: string;
  status: React.ReactNode;
};

export default function AllTransactions() {
  const { setShowAllTransactions } = useTransactionViewStore();

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | undefined>();

  const limit = 10;

  const { data, isLoading, isError, refetch, isFetching } = useTransactions({
    page,
    limit,
    search: search || undefined,
    status: statusFilter,
  });

  const transactions = data?.data || [];
  const meta = data?.metadata;

  const columns: Array<{ key: keyof TransactionRow; label: string }> = [
    { key: "ticketId", label: "Ticket ID" },
    { key: "sender", label: "Sender" },
    { key: "receiver", label: "Receiver" },
    { key: "amount", label: "Amount" },
    { key: "date", label: "Date" },
    { key: "status", label: "Status" },
  ];

  const rows = transactions.map((txn: any) => {
    // Correct name mapping from the real API response
    const senderName = txn.accountRef?.customerRef
      ? `${txn.accountRef.customerRef.firstName} ${txn.accountRef.customerRef.lastName}`
      : txn.meta?.rawProviderTransaction?.metadata?.customerName || "—";

    const amount =
      typeof txn.amount === "number"
        ? txn.amount.toLocaleString()
        : txn.amount?.$numberDecimal
          ? Number(txn.amount.$numberDecimal).toLocaleString()
          : "0";

    return {
      id: txn._id || txn.id,
      data: {
        ticketId: txn.reference || "—",
        sender: senderName,
        receiver: txn.toAccount || "—",
        amount: `₦${amount}`,
        date: txn.createdAt
          ? new Date(txn.createdAt).toLocaleString()
          : "—",
        status: (
          <Status
            label={txn.status || "pending"}
            appearance="subtle"
            showDot={true}
          />
        ),
      },
    };
  });

  const totalPages = meta?.totalPages || 1;
  const totalItems = meta?.total || transactions.length;

  return (
    <div className="space-y-4">
      {/* Back button */}
      <Button variant="text" onClick={() => setShowAllTransactions(false)}>
<<<<<<< HEAD
        <ArrowLeft size={16} className="mr-1" />
        Go Back
=======
        <FaArrowLeft /> Go Back
>>>>>>> 0797e4d39bf13511ee1677f4efd72d6d5796ab76
      </Button>

      {/* Search + Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <SearchBar
          value={search}
          onChange={setSearch}
          onSearch={(value) => {
            setSearch(value);
            setPage(1);
          }}
          placeholder="Search transaction"
          className="w-full max-w-md"
        />

        <div className="flex items-center gap-2">
          <Dropdown
            placeholder="Filter By"
            options={[
              { label: "All", value: "" },
              { label: "Successful", value: "successful" },
              { label: "Success", value: "success" },
              { label: "Pending", value: "pending" },
              { label: "Failed", value: "failed" },
            ]}
            onChange={(value) => {
              setStatusFilter(value || undefined);
              setPage(1);
            }}
          />
<<<<<<< HEAD

          <Button
            variant="text"
            onClick={() => refetch()}
            disabled={isFetching}
          >
            <RotateCw
              size={16}
              className={isFetching ? "animate-spin mr-1" : "mr-1"}
            />
            Refresh
          </Button>
        </div>
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <Loading />
=======
          <Button variant="text">
            <FaRotateRight /> Refresh
          </Button>
        </div>
      </div>
      <div>
        <Table columns={columns} rows={rows} />
        <div className="flex justify-between items-center mt-8">
          <p className="text-sm leading-[18px] text-[#797979]">
            Showing 1 to 10 of 10 transactions
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" additionalStyles="cursor-not-allowed">
              <FaChevronLeft />
              Previous
            </Button>
            <h3 className="flex justify-center items-center text-white bg-neutral-black py-2.5 px-5 h-full rounded-[5px]">
              1
            </h3>
            <Button variant="outline">
              Next
              <FaChevronRight />
            </Button>
          </div>
>>>>>>> 0797e4d39bf13511ee1677f4efd72d6d5796ab76
        </div>
      ) : isError ? (
        <div className="flex flex-col items-center justify-center min-h-[300px] gap-3">
          <p className="text-sm text-neutral-600">
            Failed to load transactions.
          </p>
          <Button onClick={() => refetch()}>Retry</Button>
        </div>
      ) : (
        <>
          <Table columns={columns} rows={rows} />

          {/* Pagination */}
          <div className="flex justify-between items-center mt-6">
            <p className="text-sm text-[#797979]">
              Showing page {page} of {totalPages} ({totalItems} transactions)
            </p>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                <ChevronLeft size={16} />
                Previous
              </Button>

              <span className="px-4 py-2 bg-neutral-black text-white rounded text-sm">
                {page}
              </span>

              <Button
                variant="outline"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                Next
                <ChevronRight size={16} />
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}