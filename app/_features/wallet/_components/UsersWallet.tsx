"use client";

import { useState } from "react";
import Button from "@/app/_ui/Button";
import Table from "@/app/_ui/Table";
import LoaderMini from "@/app/_ui/LoaderMini";
import { RotateCw } from "lucide-react";
import { usersWalletData } from "../_data/wallet-dummy-data";

export default function UsersWallet() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1500);
  };

  const columns = [
    { key: "userId", label: "User ID" },
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "balance", label: "Wallet Balance" },
    { key: "lastActive", label: "Last Active" },
    { key: "status", label: "Status" },
  ];

  return (
    <div className="bg-white p-6 rounded-lg min-h-[400px]">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-neutral-black">Individual Users Wallet</h3>
        <Button variant="text" onClick={handleRefresh} className="text-blue-primary gap-2">
          {isRefreshing ? <LoaderMini size={16} /> : <RotateCw size={16} />} 
        </Button>
      </div>

      {isRefreshing ? (
        <div className="flex justify-center items-center h-40">
          <LoaderMini size={40} />
        </div>
      ) : (
        <Table columns={columns} rows={usersWalletData} showRowActions={true} />
      )}
    </div>
  );
}