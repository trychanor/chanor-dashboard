"use client";

import { useState } from "react";
import Tabs from "../_ui/Tabs";
import Transaction from "../_features/transaction/_components/Transaction";
import WalletAndBalance from "../_features/wallet/_components/WalletAndBalance";
import { useTransactionViewStore } from "../_store/useTransactionViewStore";

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
        {activeTab === "Transaction" && !showAllTransactions ? "Overview" : ""}
        {activeTab === "Wallet & Balance" && !showAllTransactions
          ? "Wallet & Balance"
          : ""}
        {showAllTransactions && "Transaction"}
      </h2>

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
    </div>
  );
}
