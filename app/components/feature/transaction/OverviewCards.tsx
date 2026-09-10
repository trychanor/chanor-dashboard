"use client";

import Card from "@/app/components/ui/Card";
import {
  ArrowRightLeft,
  ArrowUp,
  BadgePercent,
  Banknote,
  TrendingUp,
  User,
  UserPlus,
} from "lucide-react";
import {
  useUsersAnalytics,
  useTransactionVolume,
  useProfit,
  useBalance,
} from "@/lib/hooks/use-analytics";
import Loading from "@/app/loading";

export default function OverviewCards() {
  const period = 30;

  const usersQuery = useUsersAnalytics({ period });
  const volumeQuery = useTransactionVolume({ period });
  const profitQuery = useProfit({ period });
  const balanceQuery = useBalance({ period });

  // Detailed logs
  console.log("Users →", {
    data: usersQuery.data,
    isLoading: usersQuery.isLoading,
    isError: usersQuery.isError,
    error: usersQuery.error,
  });
  console.log("Volume →", {
    data: volumeQuery.data,
    isLoading: volumeQuery.isLoading,
    isError: volumeQuery.isError,
    error: volumeQuery.error,
  });
  console.log("Profit →", {
    data: profitQuery.data,
    isLoading: profitQuery.isLoading,
    isError: profitQuery.isError,
    error: profitQuery.error,
  });
  console.log("Balance →", {
    data: balanceQuery.data,
    isLoading: balanceQuery.isLoading,
    isError: balanceQuery.isError,
    error: balanceQuery.error,
  });

  const isLoading =
    usersQuery.isLoading ||
    volumeQuery.isLoading ||
    profitQuery.isLoading ||
    balanceQuery.isLoading;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[140px]">
        <Loading />
      </div>
    );
  }

  const usersData = usersQuery.data;
  const volumeData = volumeQuery.data;
  const profitData = profitQuery.data;
  const balanceData = balanceQuery.data;

  const formatNumber = (value: any) => {
    if (value === undefined || value === null) return "—";
    const num = Number(value);
    return isNaN(num) ? "—" : num.toLocaleString();
  };

  const formatCurrency = (value: any) => {
    if (value === undefined || value === null) return "—";
    const num = Number(value);
    return isNaN(num) ? "—" : `₦${num.toLocaleString()}`;
  };

  const totalUsers =
    usersData?.data?.totalUsers ??
    usersData?.data?.total ??
    usersData?.totalUsers ??
    "—";

  const activeUsers =
    usersData?.data?.activeUsers ??
    usersData?.data?.active ??
    usersData?.activeUsers ??
    "—";

  const totalDeposit =
    volumeData?.data?.totalDeposit ??
    volumeData?.data?.deposit ??
    balanceData?.data?.totalDeposit ??
    "—";

  const totalTransfer =
    volumeData?.data?.totalTransfer ??
    volumeData?.data?.transfer ??
    volumeData?.data?.totalTransfers ??
    "—";

  const companyProfit =
    profitData?.data?.companyProfit ??
    profitData?.data?.profit ??
    profitData?.data?.totalProfit ??
    "—";

  const totalCommission =
    profitData?.data?.totalCommission ??
    profitData?.data?.commission ??
    "—";

  const totalNetProfit =
    profitData?.data?.netProfit ??
    profitData?.data?.totalNetProfit ??
    "—";

  const totalTransaction =
    volumeData?.data?.totalTransactions ??
    volumeData?.data?.total ??
    volumeData?.data?.count ??
    "—";

  return (
    <div>
      <div className="grid grid-cols-4 gap-3">
        <Card
          height="118px"
          paddingClassName="p-3"
          header={
            <div className="flex items-center justify-between">
              <p className="text-[13px] text-[#1a1a1a]">Total Users</p>
              <UserPlus className="size-[18px] text-[#8E8E93]" />
            </div>
          }
          main={
            <h2 className="text-xl font-semibold text-[#1a1a1a]">
              {formatNumber(totalUsers)}
            </h2>
          }
          footer={
            <div className="flex">
              <ArrowUp className="w-4 h-4 text-green-primary" />
              <p className="text-xs text-dark-gray">
                <span className="text-green-primary">—</span> From last week
              </p>
            </div>
          }
        />

        <Card
          height="118px"
          paddingClassName="p-3"
          header={
            <div className="flex items-center justify-between">
              <p className="text-[13px] text-[#1a1a1a]">Active Users</p>
              <User className="size-[18px] text-[#8E8E93]" />
            </div>
          }
          main={
            <h2 className="text-xl font-semibold text-[#1a1a1a]">
              {formatNumber(activeUsers)}
            </h2>
          }
          footer={
            <div className="flex">
              <ArrowUp className="w-4 h-4 text-green-primary" />
              <p className="text-xs text-dark-gray">
                <span className="text-green-primary">—</span> From last week
              </p>
            </div>
          }
        />

        <Card
          height="118px"
          paddingClassName="p-3"
          header={
            <div className="flex items-center justify-between">
              <p className="text-[13px] text-[#1a1a1a]">Total Deposit</p>
              <Banknote className="size-[18px] text-[#8E8E93]" />
            </div>
          }
          main={
            <h2 className="text-xl font-semibold text-[#1a1a1a]">
              {formatCurrency(totalDeposit)}
            </h2>
          }
          footer={
            <div className="flex">
              <ArrowUp className="w-4 h-4 text-green-primary" />
              <p className="text-xs text-dark-gray">
                <span className="text-green-primary">—</span> From last week
              </p>
            </div>
          }
        />

        <Card
          height="118px"
          paddingClassName="p-3"
          header={
            <div className="flex items-center justify-between">
              <p className="text-[13px] text-[#1a1a1a]">Total Transfer</p>
              <ArrowRightLeft className="size-[18px] text-[#8E8E93]" />
            </div>
          }
          main={
            <h2 className="text-xl font-semibold text-[#1a1a1a]">
              {formatNumber(totalTransfer)}
            </h2>
          }
          footer={
            <div className="flex">
              <ArrowUp className="w-4 h-4 text-green-primary" />
              <p className="text-xs text-dark-gray">
                <span className="text-green-primary">—</span> From last week
              </p>
            </div>
          }
        />

        <Card
          height="118px"
          paddingClassName="p-3"
          header={
            <div className="flex items-center justify-between">
              <p className="text-[13px] text-[#1a1a1a]">Company Profit</p>
              <TrendingUp className="size-[18px] text-[#8E8E93]" />
            </div>
          }
          main={
            <h2 className="text-xl font-semibold text-[#1a1a1a]">
              {formatCurrency(companyProfit)}
            </h2>
          }
          footer={
            <div className="flex">
              <ArrowUp className="w-4 h-4 text-green-primary" />
              <p className="text-xs text-dark-gray">
                <span className="text-green-primary">—</span> From last week
              </p>
            </div>
          }
        />

        <Card
          height="118px"
          paddingClassName="p-3"
          header={
            <div className="flex items-center justify-between">
              <p className="text-[13px] text-[#1a1a1a]">Total Commission</p>
              <BadgePercent className="size-[18px] text-[#8E8E93]" />
            </div>
          }
          main={
            <h2 className="text-xl font-semibold text-[#1a1a1a]">
              {formatCurrency(totalCommission)}
            </h2>
          }
          footer={
            <div className="flex">
              <ArrowUp className="w-4 h-4 text-green-primary" />
              <p className="text-xs text-dark-gray">
                <span className="text-green-primary">—</span> From last week
              </p>
            </div>
          }
        />

        <Card
          height="118px"
          paddingClassName="p-3"
          header={
            <div className="flex items-center justify-between">
              <p className="text-[13px] text-[#1a1a1a]">Total Net Profit</p>
              <Banknote className="size-[18px] text-[#8E8E93]" />
            </div>
          }
          main={
            <h2 className="text-xl font-semibold text-[#1a1a1a]">
              {formatCurrency(totalNetProfit)}
            </h2>
          }
          footer={
            <div className="flex">
              <ArrowUp className="w-4 h-4 text-green-primary" />
              <p className="text-xs text-dark-gray">
                <span className="text-green-primary">—</span> From last week
              </p>
            </div>
          }
        />

        <Card
          height="118px"
          paddingClassName="p-3"
          header={
            <div className="flex items-center justify-between">
              <p className="text-[13px] text-[#1a1a1a]">Total Transaction</p>
              <ArrowRightLeft className="size-[18px] text-[#8E8E93]" />
            </div>
          }
          main={
            <h2 className="text-xl font-semibold text-[#1a1a1a]">
              {formatNumber(totalTransaction)}
            </h2>
          }
          footer={
            <div className="flex">
              <ArrowUp className="w-4 h-4 text-green-primary" />
              <p className="text-xs text-dark-gray">
                <span className="text-green-primary">—</span> From last week
              </p>
            </div>
          }
        />
      </div>
    </div>
  );
}