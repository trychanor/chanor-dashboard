"use client";
import RecentActivity from "@/app/components/feature/dispute/recentActivity";
import DisputeCard from "@/app/components/feature/dispute/disputeCard";
import ProfitOverviewChart from "@/app/components/feature/transaction/ProfitOverviewChart";

export default function Dispute() {
  return (
    <div className="space-y-6">
      {/* dispute card */}
      <DisputeCard />
      <div className="bg-white rounded-lg p-4">
        <ProfitOverviewChart additionalStyles="max-h-[340px]" />
      </div>
      <RecentActivity />
    </div>
  );
}
