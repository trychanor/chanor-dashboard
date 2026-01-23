"use client";

import { useState } from "react";
import Button from "@/app/_ui/Button";
import Table from "@/app/_ui/Table";
import LoaderMini from "@/app/_ui/LoaderMini";
import { RotateCw } from "lucide-react";
import { businessWalletData } from "../_data/wallet-dummy-data";

type BusinessWalletRow = {
  businessId: string;
  businessName: string;
  email: string;
  balance: string;
  category: string;
  status: React.ReactNode;
};

export default function BusinessWallet() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1500);
  };

  const columns: Array<{ key: keyof BusinessWalletRow; label: string }> = [
    { key: "businessId", label: "Business ID" },
    { key: "businessName", label: "Business Name" },
    { key: "email", label: "Email" },
    { key: "balance", label: "Wallet Balance" },
    { key: "category", label: "Category" },
    { key: "status", label: "Status" },
  ];

  return (
    <div className="bg-white p-6 rounded-lg min-h-[400px]">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-neutral-black">Business Wallets</h3>
        <Button variant="text" onClick={handleRefresh} className="text-blue-primary gap-2">
          {isRefreshing ? <LoaderMini size={16} /> : <RotateCw size={16} />} 
        </Button>
      </div>

      {isRefreshing ? (
        <div className="flex justify-center items-center h-40">
          <LoaderMini size={40} />
        </div>
      ) : (
        <Table columns={columns} rows={businessWalletData} showRowActions={true} />
      )}
    </div>
  );
}