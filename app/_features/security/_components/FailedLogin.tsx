"use client";

import { useState } from "react";
import Table from "@/app/_ui/Table";
import Button from "@/app/_ui/Button";
import LoaderMini from "@/app/_ui/LoaderMini";
import { RotateCw } from "lucide-react";
import { failedLoginData } from "../_data/security-dummy-data";

type FailedLoginRow = {
  userId: string;
  email: string;
  device: string;
  ipAddress: string;
  reason: string;
  attemptTime: string;
};

export default function FailedLogin() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1500);
  };

  const columns: Array<{ key: keyof FailedLoginRow; label: string }> = [
    { key: "userId", label: "User ID" },
    { key: "email", label: "Email" },
    { key: "device", label: "Device" },
    { key: "ipAddress", label: "IP Address" },
    { key: "reason", label: "Reason" },
    { key: "attemptTime", label: "Attempt Time" },
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
          <Table columns={columns} rows={failedLoginData} showRowActions={true} />
          
          {/* Pagination */}
          {/* <div className="flex justify-between items-center mt-8">
            <p className="text-sm leading-[18px] text-[#797979]">
              Showing 1 to 5 of 5 entries
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