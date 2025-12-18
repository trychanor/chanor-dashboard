"use client";

import { useState } from "react";
import Button from "@/app/_ui/Button";
import Table from "@/app/_ui/Table";
import LoaderMini from "@/app/_ui/LoaderMini";
import { RotateCw } from "lucide-react";
import { floatGaugeUsersData, floatGaugeAlertsData } from "../_data/wallet-dummy-data";

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
  const userColumns = [
    { key: "id", label: "ID" },
    { key: "businessName", label: "Business Name" },
    { key: "email", label: "Email" },
    { key: "balance", label: "Balance" },
    { key: "category", label: "Category" },
  ];

  // --- Table 2 Columns ---
  const alertColumns = [
    { key: "alertId", label: "Alert ID" },
    { key: "type", label: "Type" },
    { key: "description", label: "Description", className: "max-w-[250px]" },
    { key: "amount", label: "Amount" },
    { key: "status", label: "Status" },
  ];

  return (
    <div className="flex flex-col gap-12 bg-white p-6 rounded-lg min-h-[500px]">
      {isRefreshing ? (
        <div className="flex flex-col items-center justify-center h-full flex-1 py-20">
          <LoaderMini size={40} />
          <p className="text-sm text-neutral-500 mt-4">Refreshing data...</p>
        </div>
      ) : (
        <>
          {/* Business List */}
          <div>
            <Table columns={userColumns} rows={floatGaugeUsersData} showRowActions={true} />
          </div>

          {/* Alerts */}
          <div>
            <div className="flex justify-end mb-4">
              <Button variant="text" onClick={handleRefresh} className="text-blue-primary gap-2">
                <RotateCw size={16} />
              </Button>
            </div>
            <Table columns={alertColumns} rows={floatGaugeAlertsData} showRowActions={true} />
          </div>
        </>
      )}
    </div>
  );
}