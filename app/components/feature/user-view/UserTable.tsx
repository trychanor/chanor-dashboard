"use client";
import Status from "@/app/components/ui/Status";
import Table from "@/app/components/ui/Table";
import { useRouter } from "next/navigation";
import { useCustomers } from "@/lib/hooks/use-customers";
import Loading from "@/app/loading";
import { Customer as ApiCustomer } from "@/types";
import Button from "@/app/components/ui/Button";

type UserTableRow = {
  userId: string;
  name: string;
  email: string;
  joinedDate: string;
  lastActive: string;
  accountStatus: React.ReactNode;
};

export default function UserTable() {
  const { data: customersData, isLoading, isError, refetch } = useCustomers({ page: 1, limit: 5, search: "" }) // params used here are for test purposes. Don't hardcode

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
    customersData?.data?.map((customer: ApiCustomer) => ({
      id: customer.userId,
      data: {
        userId: customer.userId,
        name: customer.name,
        email: customer.email,
        joinedDate: new Date(customer.dateRegistered).toLocaleDateString(),
        lastActive: new Date(customer.lastActive).toLocaleString(),
        accountStatus: (
          <Status
            label={customer.accountStatus}
            appearance="subtle"
            showDot={true}
          />
        ),
      },
    })) || [];

  const viewUser = (id: string) => {
    router.push(`/dashboard/${id}`);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[300px]">
        <Loading />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[300px] gap-4">
        <p className="text-sm text-neutral-600">
          Customer data is temporarily unavailable.
        </p>
        <Button onClick={() => refetch()}>Retry</Button>
      </div>
    );
  }
  return (
    <div>
      <Table
        columns={columns}
        rows={rows}
        cellClassName="p-3 text-[13px] text-neutral-600 text-left"
        menus={[
          {
            label: "See Details",
            onClick: (row) => viewUser(row.userId),
          },

          // We don't currently support deleting or editing users from the admin dashboard
          // {
          //   onClick: (row) => console.log("Edit", row),
          //   label: "Edit",
          // },
          // { label: "Delete" },
        ]}
      />
    </div>
  );
}
