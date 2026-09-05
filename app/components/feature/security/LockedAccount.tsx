"use client";

import { useState } from "react";
import Table from "@/app/components/ui/Table";
import Button from "@/app/components/ui/Button";
import LoaderMini from "@/app/components/ui/LoaderMini";
import { FaRotateRight } from "react-icons/fa6";
import { lockedAccountData } from "@/app/mocks/security-dummy-data";

type LockedAccountRow = {
  userId: string;
  email: string;
  device: string;
  ipAddress: string;
  reason: string;
  lockTime: string;
};

export default function LockedAccount() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1500);
  };

  const columns: Array<{ key: keyof LockedAccountRow; label: string }> = [
    { key: "userId", label: "User ID" },
    { key: "email", label: "Email" },
    { key: "device", label: "Device" },
    { key: "ipAddress", label: "IP Address" },
    { key: "reason", label: "Reason" },
    { key: "lockTime", label: "Lock Time" },
  ];

  return (
    <div className="bg-white p-4 rounded-lg min-h-80">
      <div className="flex justify-end mb-3">
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
        <>
          <Table
            columns={columns}
            rows={lockedAccountData}
            showRowActions={true}
            cellClassName="p-3 text-[13px] text-neutral-600 text-left"
          />
          
          {/* Pagination */}
          {/* <div className="flex justify-between items-center mt-8">
            <p className="text-sm leading-[18px] text-[#797979]">
              Showing 1 to 1 of 1 entries
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
