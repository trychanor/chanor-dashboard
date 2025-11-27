"use client";

import { useState } from "react";
import Tabs from "../_ui/Tabs";
export default function Page() {
  const [activeTab, setActiveTab] = useState("Transaction");
  const tabs = [
    { key: "Transaction", label: "Transaction", content: "Transaction" },
    {
      key: "Wallet & Balance",
      label: "Wallet & Balance",
      content: "Wallet & Balance",
    },
    { key: "User View", label: "User View", content: "User View" },
    {
      key: "Security Overview",
      label: "Security Overview",
      content: "Security Overview",
    },
  ];

  return (
    <div>
      <h2 className="text-[32px] text-neutral-black -leading-[0.33px] font-bold">
        {activeTab === "Transaction" && "Overview"}
        {activeTab === "Wallet & Balance" && "Wallet & Balance"}
      </h2>
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
    </div>
  );
}
