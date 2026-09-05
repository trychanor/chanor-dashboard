"use client";

import { useState } from "react";
import Button from "@/app/components/ui/Button";
import Table from "@/app/components/ui/Table";
import LoaderMini from "@/app/components/ui/LoaderMini";
import { FaRotateRight } from "react-icons/fa6";
import { businessWalletData } from "../../../mocks/wallet-dummy-data";

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
    <div className="bg-white p-4 rounded-lg min-h-80">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-base font-semibold text-neutral-black">Business Wallets</h3>
        <Button
          variant="text"
          onClick={handleRefresh}
          additionalStyles="cursor-pointer text-sm p-2 gap-2"
        >
          {isRefreshing ? <LoaderMini size={16} /> : <FaRotateRight size={16} />}
        </Button>
      </div>

      {isRefreshing ? (
        <div className="flex justify-center items-center h-40">
          <LoaderMini size={40} />
        </div>
      ) : (
        <Table
          columns={columns}
          rows={businessWalletData}
          showRowActions={true}
          cellClassName="p-3 text-[13px] text-neutral-600 text-left"
        />
      )}
    </div>
  );
}
