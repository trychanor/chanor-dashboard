"use client";

import { useState } from "react";
import Button from "@/app/components/ui/Button";
import Table from "@/app/components/ui/Table";
import LoaderMini from "@/app/components/ui/LoaderMini";
import { FaRotateRight } from "react-icons/fa6";
import {
  floatGaugeUsersData,
  floatGaugeAlertsData,
} from "../../../mocks/wallet-dummy-data";

type FloatGaugeUserRow = {
  id: string;
  businessName: string;
  email: string;
  balance: string;
  category: string;
};

type FloatGaugeAlertRow = {
  alertId: string;
  type: string;
  description: string;
  amount: string;
  status: React.ReactNode;
};

export default function FloatGauge() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate API call to reload data
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1500);
  };

  // --- Table 1 Columns ---
  const userColumns: Array<{ key: keyof FloatGaugeUserRow; label: string }> = [
    { key: "id", label: "ID" },
    { key: "businessName", label: "Business Name" },
    { key: "email", label: "Email" },
    { key: "balance", label: "Balance" },
    { key: "category", label: "Category" },
  ];

  // --- Table 2 Columns ---
  const alertColumns: Array<{
    key: keyof FloatGaugeAlertRow;
    label: string;
    className?: string;
  }> = [
    { key: "alertId", label: "Alert ID" },
    { key: "type", label: "Type" },
    { key: "description", label: "Description", className: "max-w-[250px]" },
    { key: "amount", label: "Amount" },
    { key: "status", label: "Status" },
  ];

  return (
    <div className="flex flex-col gap-8 bg-white p-4 rounded-lg min-h-[360px]">
      {isRefreshing ? (
        <div className="flex flex-col items-center justify-center h-full flex-1 py-20">
          <LoaderMini size={40} />
          <p className="text-sm text-neutral-500 mt-4">Refreshing data...</p>
        </div>
      ) : (
        <>
          {/* Business List */}
          <div>
            <Table
              columns={userColumns}
              rows={floatGaugeUsersData}
              showRowActions={true}
              cellClassName="p-3 text-[13px] text-neutral-600 text-left"
            />
          </div>

          {/* Alerts */}
          <div>
            <div className="flex justify-end mb-3">
              <Button
                variant="text"
                onClick={handleRefresh}
                additionalStyles="cursor-pointer text-sm p-2 gap-2"
              >
                <FaRotateRight size={16} />
              </Button>
            </div>
            <Table
              columns={alertColumns}
              rows={floatGaugeAlertsData}
              showRowActions={true}
              cellClassName="p-3 text-[13px] text-neutral-600 text-left"
            />
          </div>
        </>
      )}
    </div>
  );
}
