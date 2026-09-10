"use client";

<<<<<<< HEAD
import { useRouter } from "next/navigation";
import Status from "@/app/components/ui/Status";
import Table from "@/app/components/ui/Table";
import Loading from "@/app/loading";
import Button from "@/app/components/ui/Button";
import { Customer as ApiCustomer } from "@/types";

type UserTableProps = {
  data: any;
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
};
=======
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
>>>>>>> 0797e4d39bf13511ee1677f4efd72d6d5796ab76

type UserTableRow = {
  userId: string;
  name: string;
  email: string;
  joinedDate: string;
  lastActive: string;
  accountStatus: React.ReactNode;
};

<<<<<<< HEAD
export default function UserTable({
  data,
  isLoading,
  isError,
  onRetry,
=======
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
>>>>>>> 0797e4d39bf13511ee1677f4efd72d6d5796ab76
}: UserTableProps) {
  const router = useRouter();

  // Debug logs
  console.log("=== UserTable props ===");
  console.log("isLoading:", isLoading);
  console.log("isError:", isError);
  console.log("data:", data);

  const columns: Array<{ key: keyof UserTableRow; label: string }> = [
    { key: "userId", label: "User ID" },
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "joinedDate", label: "Joined Date" },
    { key: "lastActive", label: "Last Active" },
    { key: "accountStatus", label: "Account Status" },
  ];

  const rows =
<<<<<<< HEAD
    data?.data?.map((customer: ApiCustomer) => {
      return {
        id: String(customer?.userId ?? Math.random()),
        data: {
          userId: String(customer?.userId ?? "—"),
          name: String(customer?.name ?? "—"),
          email: String(customer?.email ?? "—"),
          joinedDate: customer?.dateRegistered
            ? new Date(customer.dateRegistered).toLocaleDateString()
            : "—",
          lastActive: customer?.lastActive
            ? new Date(customer.lastActive).toLocaleString()
            : "—",
          accountStatus: (
            <Status
              label={
                typeof customer?.accountStatus === "string"
                  ? customer.accountStatus
                  : "unknown"
              }
              appearance="subtle"
              showDot={true}
            />
          ),
        },
      };
    }) || [];

  const viewUser = (userId: string) => {
    router.push(`/dashboard/${userId}`);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
=======
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
>>>>>>> 0797e4d39bf13511ee1677f4efd72d6d5796ab76
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
<<<<<<< HEAD
      <div className="flex flex-col items-center justify-center min-h-[300px] gap-4">
=======
      <div className="flex min-h-[300px] flex-col items-center justify-center gap-4">
>>>>>>> 0797e4d39bf13511ee1677f4efd72d6d5796ab76
        <p className="text-sm text-neutral-600">
          Customer data is temporarily unavailable.
        </p>
        <Button onClick={onRetry}>Retry</Button>
      </div>
    );
  }

<<<<<<< HEAD
  // Extra safety – if data is still missing
  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] gap-4">
        <p className="text-sm text-neutral-600">No data received from API.</p>
        <Button onClick={onRetry}>Retry</Button>
      </div>
    );
  }

  return (
    <Table
      columns={columns}
      rows={rows}
      cellClassName="p-3 text-[13px] text-neutral-600 text-left"
      menus={[
        {
          label: "See Details",
          onClick: (row) => viewUser(row.userId),
        },
      ]}
    />
=======
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
>>>>>>> 0797e4d39bf13511ee1677f4efd72d6d5796ab76
  );
}