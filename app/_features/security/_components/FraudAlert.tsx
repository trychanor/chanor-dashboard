"use client";

import { useState } from "react";
import Table from "@/app/_ui/Table";
import Button from "@/app/_ui/Button";
import LoaderMini from "@/app/_ui/LoaderMini";
import { RotateCw } from "lucide-react";
import { fraudAlertData } from "../_data/security-dummy-data";

type FraudAlertRow = {
  alertId: string;
  type: string;
  user: string;
  description: string;
  risk: React.ReactNode;
  status: React.ReactNode;
};

export default function FraudAlert() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1500);
  };

  const columns: Array<{ key: keyof FraudAlertRow; label: string; className?: string }> = [
    { key: "alertId", label: "Alert ID" },
    { key: "type", label: "Type" },
    { key: "user", label: "User" },
    { key: "description", label: "Description", className: "max-w-[200px]" },
    { key: "risk", label: "Risk" },
    { key: "status", label: "Status" },
  ];

  return (
    <div className="bg-white p-6 rounded-lg min-h-[400px]">
      <div className="flex justify-end mb-4">
        <Button variant="text" onClick={handleRefresh} className="text-blue-primary gap-2">
          {isRefreshing ? <LoaderMini size={16} /> : <RotateCw size={16} />} 
        </Button>
      </div>

      {isRefreshing ? (
        <div className="flex justify-center items-center h-40">
          <LoaderMini size={40} />
        </div>
      ) : (
        <>
          <Table columns={columns} rows={fraudAlertData} showRowActions={true} />
          
          {/* Pagination */}
          {/* <div className="flex justify-between items-center mt-8">
            <p className="text-sm leading-[18px] text-[#797979]">
              Showing 1 to 4 of 4 entries
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" additionalStyles="cursor-not-allowed">
                <ChevronLeft size={16} /> Previous
              </Button>
              <h3 className="flex justify-center items-center text-white bg-neutral-black py-2.5 px-5 h-full rounded-[5px] text-sm">
                1
              </h3>
              <Button variant="outline" additionalStyles="cursor-not-allowed">
                Next <ChevronRight size={16} />
              </Button>
            </div>
          </div> */}
        </>
      )}
    </div>
  );
}