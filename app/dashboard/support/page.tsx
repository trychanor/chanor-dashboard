"use client";
import SupportCard from "@/app/_features/support/component/supportCard";
import SupportTable from "@/app/_features/support/component/supportTable";
import ProfitOverviewChart from "@/app/_features/transaction/_components/ProfitOverviewChart";

export default function Support() {
  return (
    <div className="">
      {/* support card */}
      <SupportCard />
      {/* chart */}
      <div className="bg-white rounded-[8px] mt-10  pb-4">
        <h2 className="text-[20px] p-6 font-[500] leading-[100%] text-[#1A1A1A]">
          Daily Inflow and Outflow
        </h2>
        <div className="mt-10">
          <ProfitOverviewChart />
        </div>
      </div>
      {/* support table */}
      <div>
        <SupportTable />
      </div>
    </div>
  );
}
