"use client";
import RecentActivity from "@/app/_features/dispute/component/recentActivity";
import DisputeCard from "@/app/_features/dispute/component/disputeCard";
import ProfitOverviewChart from "@/app/_features/transaction/_components/ProfitOverviewChart";

export default function Dispute() {
  return (
    <div>
      {/* dispute card */}
      <DisputeCard />
      <div className="mt-10">
        <ProfitOverviewChart />
      </div>
      <RecentActivity />
    </div>
  );
}
