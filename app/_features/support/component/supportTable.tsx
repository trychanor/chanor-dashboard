import Table from "@/app/_ui/Table";
import { CalendarDays } from "lucide-react";
import { RotateCw } from "lucide-react";
import Status from "../../../_ui/Status";

type SupportTableRow = {
  date: string;
  totalInflow: string;
  totalOutflow: string;
  net: string;
  status: React.ReactNode;
};

export default function SupportTable() {
  const columns: Array<{ key: keyof SupportTableRow; label: string }> = [
    { key: "date", label: "Date" },
    { key: "totalInflow", label: "Total Inflow" },
    { key: "totalOutflow", label: "Total Outflow" },
    { key: "net", label: "Net" },
    { key: "status", label: "Status" },
  ];

  const rows = [
    {
      id: 1,
      data: {
        date: "Oct 13",
        totalInflow: "₦8,200,00",
        totalOutflow: "₦500,000",
        net: "₦9,00,00",
        status: <Status label="Settled" appearance="subtle" showDot={true} />,
      },
    },
    {
      id: 2,
      data: {
        date: "Oct 12",
        totalInflow: "₦2,000,00",
        totalOutflow: "₦830,000",
        net: "200,000",
        status: <Status label="Pending" appearance="subtle" showDot={true} />,
      },
    },
    {
      id: 3,
      data: {
        date: "Oct 11",
        totalInflow: "₦900,00",
        totalOutflow: "₦400,000",
        net: "300,00",
        status: <Status label="Settled" appearance="subtle" showDot={true} />,
      },
    },
  ];

  return (
    <div className="bg-white rounded-lg mt-14">
      {/* calendar and date */}
      <div className="flex justify-end items-center gap-9 p-6">
        <div className="flex justify-center h-11 px-2 rounded-lg items-center gap-[21px] border border-[#C7C7CC] text-[#667085]">
          <CalendarDays size={20} />
          <h2 className="text-[12px] md:text-[14px] font-medium leading-[100%]">
            May 6, 2025 - 11:32 AM
          </h2>
        </div>
        {/* refresh */}
        <div className="flex gap-2.5 text-[#0070FF] items-center">
          <RotateCw size={20} />
          <h3 className="text-[14px] font-medium leading-[100%]">Refresh </h3>
        </div>
      </div>

      {/* table */}
      <div className="w-full">
        <Table columns={columns} rows={rows} showRowActions={false} />
      </div>
    </div>
  );
}
