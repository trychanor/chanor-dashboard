"use client";

import { useState } from "react";
import Tabs from "@/app/_ui/Tabs";
import SecurityOverviewCards from "./SecurityOverviewCards";
import FailedLogin from "./FailedLogin";
import LockedAccount from "./LockedAccount";
import FraudAlert from "./FraudAlert";

export default function SecurityOverview() {
  const [activeTab, setActiveTab] = useState("Fraud Alert");

  const tabs = [
    { 
      key: "Failed Login", 
      label: "Failed Login", 
      content: <FailedLogin /> 
    },
    { 
      key: "Locked Account", 
      label: "Locked Account", 
      content: <LockedAccount /> 
    },
    { 
      key: "Fraud Alert", 
      label: "Fraud Alert", 
      content: <FraudAlert /> 
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Cards Section */}
      <SecurityOverviewCards />

      {/* Tabs Section */}
      <div className="mt-4">
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
      </div>
    </div>
  );
}