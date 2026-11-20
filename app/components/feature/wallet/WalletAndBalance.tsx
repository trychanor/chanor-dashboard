"use client";

import { useState } from "react";
import Tabs from "@/app/components/ui/Tabs";
import WalletOverviewCards from "./WalletOverviewCards";
import FloatGauge from "./FloatGauge";
import DailyNet from "./DailyNet";
import UsersWallet from "./UsersWallet";
// BusinessWallet remains unsupported until the supervisor API provides business-wallet data.
import PeriodFilter from "@/app/components/ui/PeriodFilter";
import { AnalyticsPeriod } from "@/types";

export default function WalletAndBalance() {
  const [activeTab, setActiveTab] = useState("Float Gauge");
  const [period, setPeriod] = useState<AnalyticsPeriod>("week");

  const tabs = [
    { 
      key: "Daily Net", 
      label: "Daily Net", 
      content: <DailyNet /> 
    },
    { 
      key: "Float Gauge", 
      label: "Float Gauge", 
      content: <FloatGauge /> 
    },
    { 
      key: "Users Wallet", 
      label: "Users Wallet", 
      content: <UsersWallet /> 
    },
    // {
    //   key: "Business Wallet",
    //   label: "Business Wallet",
    //   content: <BusinessWallet />,
    // },
  ];

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-end">
        <PeriodFilter value={period} onChange={setPeriod} />
      </div>
      <WalletOverviewCards period={period} />

      {/* Tabs Section */}
      <div>
        <Tabs
          tabs={tabs}
          activeTab={activeTab}
          onChange={setActiveTab}
          density="compact"
        />
      </div>
    </div>
  );
}
