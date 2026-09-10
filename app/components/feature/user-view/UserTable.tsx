"use client";

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

type UserTableRow = {
  userId: string;
  name: string;
  email: string;
  joinedDate: string;
  lastActive: string;
  accountStatus: React.ReactNode;
};

export default function UserTable({
  data,
  isLoading,
  isError,
  onRetry,
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
        <Loading />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] gap-4">
        <p className="text-sm text-neutral-600">
          Customer data is temporarily unavailable.
        </p>
        <Button onClick={onRetry}>Retry</Button>
      </div>
    );
  }

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
  );
}