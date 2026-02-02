"use client";

import { useState } from "react";
import Button from "@/app/_ui/Button";
import Table from "@/app/_ui/Table";
import LoaderMini from "@/app/_ui/LoaderMini";
import { RotateCw } from "lucide-react";
import { dailyNetData } from "../_data/wallet-dummy-data";

type DailyNetRow = {
  date: string;
  transactions: string;
  volume: string;
  payouts: string;
  net: string;
  status: React.ReactNode;
};

export default function DailyNet() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1500);
  };

  const columns: Array<{ key: keyof DailyNetRow; label: string }> = [
    { key: "date", label: "Date" },
    { key: "transactions", label: "Total Transactions" },
    { key: "volume", label: "Volume" },
    { key: "payouts", label: "Payouts" },
    { key: "net", label: "Daily Net" },
    { key: "status", label: "Status" },
  ];

  return (
    <div className="bg-white p-6 rounded-lg min-h-[400px]">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-neutral-black">Daily Net Overview</h3>
        <Button variant="text" onClick={handleRefresh} className="text-blue-primary gap-2">
          {isRefreshing ? <LoaderMini size={16} /> : <RotateCw size={16} />} 
        </Button>
      </div>

      {isRefreshing ? (
        <div className="flex justify-center items-center h-40">
          <LoaderMini size={40} />
        </div>
      ) : (
        <Table columns={columns} rows={dailyNetData} showRowActions={true} />
      )}
    </div>
  );
}