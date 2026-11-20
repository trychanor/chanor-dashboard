"use client";

import type { ReactNode } from "react";
import Card from "@/app/components/ui/Card";
import { useBalance } from "@/hooks/use-analytics";
import {
  useSettlementAccounts,
  useSettlementReport,
} from "@/hooks/use-settlements";
import {
  formatCurrency,
  formatDate,
  formatPercentage,
  formatStatus,
} from "@/utils/formatting.util";
import { FaArrowUp, FaChartLine } from "react-icons/fa6";
import { AnalyticsPeriod } from "@/types";

function WalletCardsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3" aria-busy="true">
      {Array.from({ length: 3 }, (_, index) => (
        <div
          key={index}
          className="h-[118px] animate-pulse rounded-lg bg-neutral-100"
        />
      ))}
    </div>
  );
}

type WalletCardProps = {
  label: string;
  value: number | null;
  detail?: string;
  footer: ReactNode;
};

function WalletCard({ label, value, detail, footer }: WalletCardProps) {
  return (
    <Card
      height="118px"
      paddingClassName="p-3"
      header={
        <div className="flex items-center justify-between gap-3">
          <p className="text-[13px] font-medium text-neutral-800">{label}</p>
          <FaChartLine className="size-[18px] text-green-primary" />
        </div>
      }
      main={
        <div className="flex h-full flex-col justify-center">
          {detail && <span className="mb-1 text-xs text-neutral-500">{detail}</span>}
          <h2 className="text-xl font-semibold text-neutral-900">
            {formatCurrency(value)}
          </h2>
        </div>
      }
      footer={<div className="flex items-center gap-1 text-xs text-neutral-500">{footer}</div>}
    />
  );
}

type WalletOverviewCardsProps = {
  period: AnalyticsPeriod;
};

export default function WalletOverviewCards({ period }: WalletOverviewCardsProps) {
  const balanceQuery = useBalance({ period });
  const settlementAccountsQuery = useSettlementAccounts();
  const settlementReportQuery = useSettlementReport(period);

  if (
    balanceQuery.isLoading ||
    settlementAccountsQuery.isLoading ||
    settlementReportQuery.isLoading
  ) {
    return <WalletCardsSkeleton />;
  }

  if (
    balanceQuery.isError ||
    settlementAccountsQuery.isError ||
    settlementReportQuery.isError
  ) {
    return (
      <div className="flex min-h-[118px] items-center justify-between gap-4 rounded-lg border border-neutral-200 bg-white px-4 py-3">
        <div>
          <p className="text-sm font-medium text-neutral-800">
            Wallet summary is temporarily unavailable
          </p>
          <p className="mt-1 text-xs text-neutral-500">
            Please refresh the page to try again.
          </p>
        </div>
      </div>
    );
  }

  const balance = balanceQuery.data?.totalWalletBalance;
  const settlement = settlementReportQuery.data;
  const providers = settlementAccountsQuery.data ?? [];

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
      <WalletCard
        label="Total Wallet Balance"
        value={balance?.value ?? null}
        footer={
          <>
            <FaArrowUp className="size-3 text-green-primary" />
            <span className="font-medium text-green-primary">
              {formatPercentage(balance?.change)}
            </span>
            <span>from the previous period</span>
          </>
        }
      />
      <WalletCard
        label="Total Float"
        value={settlement?.totalFloat ?? null}
        footer={<span>Current operational position</span>}
      />
      <WalletCard
        label="Pending Settlement"
        value={settlement?.pendingAmount ?? null}
        footer={<span>Awaiting settlement completion</span>}
      />
      {settlement?.providerPositions.map((position) => (
        <WalletCard
          key={`${position.provider}-merchant-wallet`}
          label={`${formatStatus(position.provider)} Merchant Wallet`}
          value={position.merchantWalletBalance}
          footer={<span>Current merchant wallet balance</span>}
        />
      ))}
      {providers.map((provider) => (
        <WalletCard
          key={provider.provider}
          label={`${formatStatus(provider.provider)} Settlement Account`}
          detail={provider.accountNumber ? `Account ${provider.accountNumber}` : undefined}
          value={provider.balance}
          footer={
            provider.lastCheckedAt ? (
              <span>Last checked {formatDate(provider.lastCheckedAt, { includeTime: true })}</span>
            ) : (
              <span>Current provider balance</span>
            )
          }
        />
      ))}
    </div>
  );
}
