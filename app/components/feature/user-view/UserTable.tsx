"use client";

import Button from "@/app/components/ui/Button";
import EmptyState from "@/app/components/ui/EmptyState";
import Pagination from "@/app/components/ui/Pagination";
import Status from "@/app/components/ui/Status";
import Table from "@/app/components/ui/Table";
import TableSkeleton from "@/app/components/ui/TableSkeleton";
import { CustomerSummary } from "@/lib/models/customer.model";
import { ApiResponseWithPagination } from "@/types";
import { formatDate } from "@/utils/formatting.util";
import { useRouter } from "next/navigation";
import Loading from "@/app/loading";

type UserTableRow = {
  userId: string;
  name: string;
  email: string;
  joinedDate: string;
  lastActive: string;
  accountStatus: React.ReactNode;
};

type UserTableProps = {
  pageSize: number;
  search: string;
  customersData?: ApiResponseWithPagination<CustomerSummary[]>;
  isLoading: boolean;
  isFetching: boolean;
  isManualRefresh: boolean;
  isError: boolean;
  onRetry: () => void;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
};

export default function UserTable({
  pageSize,
  search,
  customersData,
  isLoading,
  isFetching,
  isManualRefresh,
  isError,
  onRetry,
  onPageChange,
  onPageSizeChange,
}: UserTableProps) {
  const router = useRouter();
  const columns: Array<{ key: keyof UserTableRow; label: string }> = [
    { key: "userId", label: "User ID" },
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "joinedDate", label: "Joined Date" },
    { key: "lastActive", label: "Last Active" },
    { key: "accountStatus", label: "Account Status" },
  ];

  const rows =
    customersData?.data.map((customer) => ({
      id: customer.userId,
      data: {
        userId: customer.userId,
        name: customer.name,
        email: customer.email,
        joinedDate: formatDate(customer.dateRegistered),
        lastActive: formatDate(customer.lastActive, { includeTime: true }),
        accountStatus: (
          <Status
            label={customer.accountStatus ?? "Not available"}
            appearance="subtle"
            showDot={true}
          />
        ),
      },
    })) ?? [];

  if (isLoading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (isManualRefresh || (isFetching && Boolean(search))) {
    const loadingRowCount = customersData?.data.length || pageSize;

    return (
      <div>
        <TableSkeleton columnCount={7} rowCount={loadingRowCount} />
        {customersData && (
          <Pagination
            page={customersData.metadata.page}
            totalPages={customersData.metadata.totalPages}
            totalRecords={customersData.metadata.totalRecords}
            pageSize={customersData.metadata.limit ?? pageSize}
            pageSizeOptions={[10, 25, 50, 100]}
            onPageChange={onPageChange}
            onPageSizeChange={onPageSizeChange}
            isLoading={true}
          />
        )}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-[300px] flex-col items-center justify-center gap-4">
        <p className="text-sm text-neutral-600">
          Customer data is temporarily unavailable.
        </p>
        <Button onClick={onRetry}>Retry</Button>
      </div>
    );
  }

  if (!customersData || customersData.data.length === 0) {
    return (
      <EmptyState
        title={search ? "No matching users found" : "No users found"}
        description={
          search
            ? "Try a different name or email address."
            : "Users will appear here when they are available."
        }
        className="min-h-[300px]"
      />
    );
  }

  const responsePageSize = customersData.metadata.limit ?? pageSize;

  return (
    <div>
      <Table
        columns={columns}
        rows={rows}
        cellClassName="p-3 text-[13px] text-neutral-600 text-left"
        menus={[
          {
            label: "See Details",
            onClick: (row) => router.push(`/dashboard/${row.userId}`),
          },
        ]}
      />
      <Pagination
        page={customersData.metadata.page}
        totalPages={customersData.metadata.totalPages}
        totalRecords={customersData.metadata.totalRecords}
        pageSize={responsePageSize}
        pageSizeOptions={[10, 25, 50, 100]}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        isLoading={isFetching}
      />
    </div>
  );
}
