"use client";

import Tabs from "@/app/components/ui/Tabs";
import { useState } from "react";
import SourceChartOverview from "./SourceChartOverview";
import ProfitOverviewChart from "./ProfitOverviewChart";
import ProfitBreakdown from "./ProfitBreakdown";
import { AnalyticsPeriod } from "@/types";

type ProfitOverviewProps = { period: AnalyticsPeriod };

export default function ProfitOverview({ period }: ProfitOverviewProps) {
  const [activeTab, setActiveTab] = useState("Overview");
  const tabs = [
    { key: "Overview", label: "Overview", content: <ProfitOverviewChart period={period} /> },
    { key: "Source", label: "Source", content: <SourceChartOverview period={period} /> },
    { key: "Breakdown", label: "Breakdown", content: <ProfitBreakdown /> },
  ];
  return (
    <div className="bg-white rounded-lg px-4 py-3">
      <h3 className="text-lg font-semibold text-black pb-3">
        Profit Overview
      </h3>
      <Tabs
        tabs={tabs}
        activeTab={activeTab}
        onChange={setActiveTab}
        density="compact"
      />
    </div>
  );
}
