"use client";
import Status from "@/app/_ui/Status";
import Table from "@/app/_ui/Table";
import { useRouter } from "next/navigation";

export default function UserTable() {
  const router = useRouter();
  const columns = [
    { key: "userId", label: "User ID" },
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "joinedDate", label: "Joined Date" },
    { key: "lastActive", label: "Last Active" },
    { key: "accountStatus", label: "Account Status" },
  ];

  const rows = [
    {
      id: 1,
      data: {
        userId: "U-2301",
        name: "David Ola",
        email: "David@example.com",
        joinedDate: "2025(2 month ago)",
        lastActive: "2 hour ago",
        accountStatus: (
          <Status label="active" appearance="subtle" showDot={true} />
        ),
      },
    },
    {
      id: 2,
      data: {
        userId: "U-2301",
        name: "David Ola",
        email: "David@example.com",
        joinedDate: "2025(2 month ago)",
        lastActive: "2 hour ago",
        accountStatus: (
          <Status label="active" appearance="subtle" showDot={true} />
        ),
      },
    },
    {
      id: 3,
      data: {
        userId: "U-2301",
        name: "David Ola",
        email: "David@example.com",
        joinedDate: "2025(2 month ago)",
        lastActive: "2 hour ago",
        accountStatus: (
          <Status label="active" appearance="subtle" showDot={true} />
        ),
      },
    },
    {
      id: 4,
      data: {
        userId: "U-2301",
        name: "David Ola",
        email: "David@example.com",
        joinedDate: "2025(2 month ago)",
        lastActive: "2 hour ago",
        accountStatus: (
          <Status label="active" appearance="subtle" showDot={true} />
        ),
      },
    },
    {
      id: 5,
      data: {
        userId: "U-2301",
        name: "David Ola",
        email: "David@example.com",
        joinedDate: "2025(2 month ago)",
        lastActive: "2 hour ago",
        accountStatus: (
          <Status label="active" appearance="subtle" showDot={true} />
        ),
      },
    },
    {
      id: 6,
      data: {
        userId: "U-2301",
        name: "David Ola",
        email: "David@example.com",
        joinedDate: "2025(2 month ago)",
        lastActive: "2 hour ago",
        accountStatus: (
          <Status label="active" appearance="subtle" showDot={true} />
        ),
      },
    },
    {
      id: 7,
      data: {
        userId: "U-2301",
        name: "David Ola",
        email: "David@example.com",
        joinedDate: "2025(2 month ago)",
        lastActive: "2 hour ago",
        accountStatus: (
          <Status label="active" appearance="subtle" showDot={true} />
        ),
      },
    },
    {
      id: 8,
      data: {
        userId: "U-2301",
        name: "David Ola",
        email: "David@example.com",
        joinedDate: "2025(2 month ago)",
        lastActive: "2 hour ago",
        accountStatus: (
          <Status label="active" appearance="subtle" showDot={true} />
        ),
      },
    },
    {
      id: 9,
      data: {
        userId: "U-2301",
        name: "David Ola",
        email: "David@example.com",
        joinedDate: "2025(2 month ago)",
        lastActive: "2 hour ago",
        accountStatus: (
          <Status label="active" appearance="subtle" showDot={true} />
        ),
      },
    },
    {
      id: 10,
      data: {
        userId: "U-2301",
        name: "David Ola",
        email: "David@example.com",
        joinedDate: "2025(2 month ago)",
        lastActive: "2 hour ago",
        accountStatus: (
          <Status label="active" appearance="subtle" showDot={true} />
        ),
      },
    },
  ];

  const viewUser = (id: string) => {
    console.log(id);
    router.push(`/dashboard/${id}`);
  };

  return (
    <div>
      <Table
        columns={columns}
        rows={rows}
        menus={[
          {
            label: "See Details",
            onClick: (row) => viewUser(row.userId),
          },
          {
            // icon: <Copy className="w-4 h-4" />,
            onClick: (row) => console.log("Edit", row),
            label: "Edit",
          },
          { label: "Delete", },
        ]}
      />
    </div>
  );
}
