"use client";

import { useState } from "react";
import { useTransactionViewStore } from "@/app/store/useTransactionViewStore";
import Tabs from "@/app/components/ui/Tabs";
import Transaction from "@/app/components/feature/transaction/Transaction";
import WalletAndBalance from "@/app/components/feature/wallet/WalletAndBalance";
import SecurityOverview from "@/app/components/feature/security/SecurityOverview";
import UserView from "@/app/components/feature/user-view/UserView";

export default function Page() {
  const { showAllTransactions } = useTransactionViewStore();
  const [activeTab, setActiveTab] = useState("Transaction");
  const tabs = [
    { key: "Transaction", label: "Transaction", content: <Transaction /> },
    {
      key: "Wallet & Balance",
      label: "Wallet & Balance",
      content: <WalletAndBalance />,
    },
    { key: "User View", label: "User View", content: <UserView /> },
    {
      key: "Security Overview",
      label: "Security Overview",
      content: <SecurityOverview />,
    },
  ];

  return (
    <div>
      <h2 className="text-2xl text-neutral-black font-semibold">
        {activeTab === "Transaction" && !showAllTransactions ? "Overview" : ""}
        {activeTab === "Wallet & Balance" && !showAllTransactions
          ? "Wallet & Balance"
          : ""}
        {activeTab === "User View" && !showAllTransactions ? "User View" : ""}
        {activeTab === "Security Overview" && !showAllTransactions
          ? "Security Overview"
          : ""}
        {showAllTransactions && "Transaction"}
      </h2>

      <Tabs
        tabs={tabs}
        activeTab={activeTab}
        onChange={setActiveTab}
        density="compact"
      />
    </div>
  );
}
