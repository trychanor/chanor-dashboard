"use client";

import Card from "@/app/components/ui/Card";
import {
  useBalance,
  useProfit,
  useTransactionVolume,
  useUsersAnalytics,
} from "@/hooks/use-analytics";
import { AnalyticsMetric } from "@/models/analytics.model";
import {
  formatCurrency,
  formatNumber,
  formatPercentage,
} from "@/utils/formatting.util";
import {
  FaArrowRightArrowLeft,
  FaArrowTrendUp,
  FaArrowUp,
  FaMoneyBillWave,
  FaPercent,
  FaUser,
  FaUserPlus,
} from "react-icons/fa6";
import { AnalyticsPeriod } from "@/types";

type OverviewCardProps = {
  label: string;
  metric: AnalyticsMetric;
  icon: React.ReactNode;
  formatValue: (value: number | null) => string;
};

function OverviewCard({ label, metric, icon, formatValue }: OverviewCardProps) {
  const hasChange = metric.change !== null;

  return (
    <Card
      height="118px"
      paddingClassName="p-3"
      header={
        <div className="flex items-center justify-between gap-3">
          <p className="text-[13px] font-medium text-neutral-800">{label}</p>
          {icon}
        </div>
      }
      main={
        <h2 className="text-xl font-semibold text-neutral-900">
          {formatValue(metric.value)}
        </h2>
      }
      footer={
        <div className="flex items-center gap-1 text-xs text-neutral-500">
          <FaArrowUp
            className={
              hasChange
                ? "size-3 text-green-primary"
                : "size-3 text-neutral-400"
            }
          />
          <span
            className={
              hasChange
                ? "font-medium text-green-primary"
                : "font-medium text-neutral-500"
            }
          >
            {formatPercentage(metric.change)}
          </span>
          <span>from the previous period</span>
        </div>
      }
    />
  );
}

function OverviewCardsSkeleton() {
  return (
    <div
      className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4"
      aria-busy="true"
    >
      {Array.from({ length: 7 }, (_, index) => (
        <div
          key={index}
          className="h-[118px] animate-pulse rounded-lg bg-neutral-100"
        />
      ))}
    </div>
  );
}

type OverviewCardsProps = {
  period: AnalyticsPeriod;
};

export default function OverviewCards({ period }: OverviewCardsProps) {
  const usersQuery = useUsersAnalytics({ period });
  const volumeQuery = useTransactionVolume({ period });
  const profitQuery = useProfit({ period });
  const balanceQuery = useBalance({ period });

  if (
    usersQuery.isLoading ||
    volumeQuery.isLoading ||
    profitQuery.isLoading ||
    balanceQuery.isLoading
  ) {
    return <OverviewCardsSkeleton />;
  }

  const unavailableMetric: AnalyticsMetric = { value: null, change: null };
  const users = usersQuery.data;
  const volume = volumeQuery.data;
  const profit = profitQuery.data;
  const balance = balanceQuery.data;

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      <OverviewCard
        label="Total Users"
        metric={users?.totalUsers ?? unavailableMetric}
        formatValue={formatNumber}
        icon={<FaUserPlus className="size-[18px] text-neutral-400" />}
      />
      <OverviewCard
        label="Active Users"
        metric={users?.activeUsers ?? unavailableMetric}
        formatValue={formatNumber}
        icon={<FaUser className="size-[18px] text-neutral-400" />}
      />
      <OverviewCard
        label="Total Inflow"
        metric={volume?.totalInflow ?? unavailableMetric}
        formatValue={formatCurrency}
        icon={<FaMoneyBillWave className="size-[18px] text-neutral-400" />}
      />
      <OverviewCard
        label="Total Outflow"
        metric={volume?.totalOutflow ?? unavailableMetric}
        formatValue={formatCurrency}
        icon={
          <FaArrowRightArrowLeft className="size-[18px] text-neutral-400" />
        }
      />
      <OverviewCard
        label="Company Profit"
        metric={profit?.companyProfit ?? unavailableMetric}
        formatValue={formatCurrency}
        icon={<FaArrowTrendUp className="size-[18px] text-neutral-400" />}
      />
      <OverviewCard
        label="Agent Commission Claimed"
        metric={balance?.totalAgentCommissionClaimed ?? unavailableMetric}
        formatValue={formatCurrency}
        icon={<FaPercent className="size-[18px] text-neutral-400" />}
      />
      <OverviewCard
        label="Total Net Profit"
        metric={profit?.netProfit ?? unavailableMetric}
        formatValue={formatCurrency}
        icon={<FaMoneyBillWave className="size-[18px] text-neutral-400" />}
      />
    </div>
  );
}
