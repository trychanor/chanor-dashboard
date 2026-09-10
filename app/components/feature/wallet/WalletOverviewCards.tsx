"use client";

import Card from "@/app/components/ui/Card";
import { FaArrowUp, FaChartLine } from "react-icons/fa6";
import { useBalance } from "@/lib/hooks/use-analytics";
import Loading from "@/app/loading";

export default function WalletOverviewCards() {
  const period = 7;

  const { data: balanceData, isLoading } = useBalance({ period });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[118px]">
        <Loading />
      </div>
    );
  }

  const formatCurrency = (value: any) => {
    if (value === undefined || value === null) return "—";
    const num = Number(value);
    return isNaN(num) ? "—" : `₦${num.toLocaleString()}`;
  };

  // Cast to any because the real API shape is not fully typed yet
  const data = balanceData as any;

  const userBalance =
    data?.data?.userWalletBalance ??
    data?.data?.userBalance ??
    data?.data?.users ??
    data?.userWalletBalance ??
    "—";

  const merchantBalance =
    data?.data?.merchantWalletBalance ??
    data?.data?.merchantBalance ??
    data?.data?.merchants ??
    data?.merchantWalletBalance ??
    "—";

  const settlementBalance =
    data?.data?.settlementBalance ??
    data?.data?.providus ??
    data?.data?.settlement ??
    data?.settlementBalance ??
    "—";

  return (
    <div className="grid grid-cols-3 gap-3">
      <Card
        height="118px"
        paddingClassName="p-3"
        header={
          <div className="flex items-center justify-between">
            <p className="text-[13px] font-medium text-[#1a1a1a]">
              User Wallet Balance
            </p>
            <FaChartLine className="size-[18px] text-green-primary" />
          </div>
        }
        main={
          <h2 className="text-xl font-semibold text-[#1a1a1a]">
            {formatCurrency(userBalance)}
          </h2>
        }
        footer={
          <div className="flex items-center gap-1">
            <FaArrowUp className="w-4 h-4 text-green-primary" />
            <span className="text-xs font-medium text-green-primary">—</span>
            <span className="text-xs text-[#8E8E93]">from last month</span>
          </div>
        }
      />

      <Card
        height="118px"
        paddingClassName="p-3"
        header={
          <div className="flex items-center justify-between">
            <p className="text-[13px] font-medium text-[#1a1a1a]">
              Merchant Wallet Total
            </p>
            <FaChartLine className="size-[18px] text-green-primary" />
          </div>
        }
        main={
          <h2 className="text-xl font-semibold text-[#1a1a1a]">
            {formatCurrency(merchantBalance)}
          </h2>
        }
        footer={
          <div className="flex items-center gap-1">
            <FaArrowUp className="w-4 h-4 text-green-primary" />
            <span className="text-xs font-medium text-green-primary">—</span>
            <span className="text-xs text-[#8E8E93]">from last month</span>
          </div>
        }
      />

      <Card
        height="118px"
        paddingClassName="p-3"
        header={
          <div className="flex items-center justify-between">
            <p className="text-[13px] font-medium text-[#1a1a1a]">
              Providus Settlement Account
            </p>
            <FaChartLine className="size-[18px] text-green-primary" />
          </div>
        }
        main={
          <div className="flex flex-col justify-center h-full">
            <span className="text-xs text-[#8E8E93] mb-1">Total</span>
            <h2 className="text-xl font-semibold text-[#1a1a1a]">
              {formatCurrency(settlementBalance)}
            </h2>
          </div>
        }
        footer={
          <div className="flex items-center gap-1">
            <FaArrowUp className="w-4 h-4 text-green-primary" />
            <span className="text-xs font-medium text-green-primary">—</span>
            <span className="text-xs text-[#8E8E93]">from last month</span>
          </div>
        }
      />
    </div>
  );
}