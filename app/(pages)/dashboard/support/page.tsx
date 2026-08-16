"use client";
import SupportCard from "@/app/components/feature/support/supportCard";
import SupportTable from "@/app/components/feature/support/supportTable";
import ProfitOverviewChart from "@/app/components/feature/transaction/ProfitOverviewChart";

export default function Support() {
  return (
    <div className="space-y-6">
      {/* support card */}
      <SupportCard />
      {/* chart */}
      <div className="bg-white rounded-lg p-4">
        <h2 className="text-lg font-medium text-[#1A1A1A]">
          Daily Inflow and Outflow
        </h2>
        <div className="mt-4">
          <ProfitOverviewChart additionalStyles="max-h-[340px]" />
        </div>
      </div>
      {/* support table */}
      <div>
        <SupportTable />
      </div>
    </div>
  );
}
