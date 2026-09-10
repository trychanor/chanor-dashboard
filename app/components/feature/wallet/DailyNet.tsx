"use client";

import { useState } from "react";
import Button from "@/app/components/ui/Button";
import Table from "@/app/components/ui/Table";
import LoaderMini from "@/app/components/ui/LoaderMini";
import { FaRotateRight } from "react-icons/fa6";
import { dailyNetData } from "../../../mocks/wallet-dummy-data";

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
    <div className="bg-white p-4 rounded-lg min-h-80">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-base font-semibold text-neutral-black">Daily Net Overview</h3>
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
          rows={dailyNetData}
          showRowActions={true}
          cellClassName="p-3 text-[13px] text-neutral-600 text-left"
        />
      )}
    </div>
  );
}
