import Table from "@/app/_ui/Table";
import { CgCalendarDates } from "react-icons/cg";
import { MdOutlineRefresh } from "react-icons/md";
import Status from "../../../_ui/Status";

export default function SupportTable() {
  const columns = [
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
    <div className="bg-white rounded-[8px] mt-14">
      {/* calendar and date */}
      <div className="flex justify-end items-center gap-[36px] p-6">
        <div className="flex justify-center h-[44px] px-2 rounded-[8px] items-center gap-[21px] border-[1px] border-[#C7C7CC] text-[#667085]">
          <CgCalendarDates size={20} />
          <h2 className="text-[12px] md:text-[14px] font-[500] leading-[100%]">
            May 6, 2025 - 11:32 AM
          </h2>
        </div>
        {/* refresh */}
        <div className="flex gap-[10px] text-[#0070FF] items-center">
          <MdOutlineRefresh size={20} />
          <h3 className="text-[14px] font-[500] leading-[100%]">Refresh </h3>
        </div>
      </div>

      {/* table */}
      <div className="w-full">
        <Table columns={columns} rows={rows} showRowActions={false} />
      </div>
    </div>
  );
}
