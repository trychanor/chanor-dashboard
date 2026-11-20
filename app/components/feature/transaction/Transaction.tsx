"use client";

import { useState } from "react";
import PeriodFilter from "@/app/components/ui/PeriodFilter";
import { useTransactionViewStore } from "@/app/store/useTransactionViewStore";
import { AnalyticsPeriod } from "@/types";
import AllTransactions from "./AllTransactions";
import LatestTransaction from "./LatestTransaction";
import OverviewCards from "./OverviewCards";
import ProfitOverview from "./ProfitOverview";

export default function Transaction() {
  const { showAllTransactions } = useTransactionViewStore();
  const [period, setPeriod] = useState<AnalyticsPeriod>("month");

  return (
    <div className="space-y-3">
      {!showAllTransactions && (
        <>
          <div className="flex justify-end">
            <PeriodFilter value={period} onChange={setPeriod} />
          </div>
          <OverviewCards period={period} />
          <ProfitOverview period={period} />
          <LatestTransaction />
        </>
      )}
      {showAllTransactions && <AllTransactions />}
    </div>
  );
}
