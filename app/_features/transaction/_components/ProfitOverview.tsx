"use client";

import Tabs from "@/app/_ui/Tabs";
import { useState } from "react";
import SourceChartOverview from "./SourceChartOverview";
import ProfitOverviewChart from "./ProfitOverviewChart";
import ProfitBreakdown from "./ProfitBreakdown";

export default function ProfitOverview() {
  const [activeTab, setActiveTab] = useState("Overview");
  const tabs = [
    { key: "Overview", label: "Overview", content: <ProfitOverviewChart /> },
    { key: "Source", label: "Source", content: <SourceChartOverview /> },
    { key: "Breakdown", label: "Breakdown", content: <ProfitBreakdown /> },
  ];
  return (
    <div className="bg-white rounded-lg px-6 my-4">
      <h3 className="text-2xl font-semibold -leading-[0.33px] text-black py-4">
        Profit Overview
      </h3>
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
    </div>
  );
}
