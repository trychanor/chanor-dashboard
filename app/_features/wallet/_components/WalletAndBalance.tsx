"use client";

import { useState } from "react";
import Tabs from "@/app/_ui/Tabs";
import WalletOverviewCards from "./WalletOverviewCards";
import FloatGauge from "./FloatGauge";
import DailyNet from "./DailyNet";
import UsersWallet from "./UsersWallet";
import BusinessWallet from "./BusinessWallet";

export default function WalletAndBalance() {
  const [activeTab, setActiveTab] = useState("Float Gauge");

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
    { 
      key: "Business Wallet", 
      label: "Business Wallet", 
      content: <BusinessWallet /> 
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Top Cards Section */}
      <WalletOverviewCards />

      {/* Tabs Section */}
      <div className="mt-4">
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
      </div>
    </div>
  );
}