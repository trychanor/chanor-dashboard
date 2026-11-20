"use client";

import EmptyState from "@/app/components/ui/EmptyState";
import LineCharts from "@/app/components/ui/LineChart";
import { useInflowOutflow } from "@/hooks/use-analytics";
import { AnalyticsPeriod } from "@/types";

type ProfitOverviewChartProps = {
  additionalStyles?: string;
  period?: AnalyticsPeriod;
};

export default function ProfitOverviewChart({
  additionalStyles,
  period = "month",
}: ProfitOverviewChartProps) {
  const query = useInflowOutflow({ period });
  const trendData = query.data ?? [];

  if (query.isLoading) return <div className="h-72 animate-pulse rounded-lg bg-neutral-100" />;

  if (query.isError || trendData.length === 0) {
    return <EmptyState title="No transaction trend data" description="Transaction trends will appear here when available." className="min-h-72" />;
  }

  return <LineCharts data={trendData.map((item) => ({ name: item.date ?? "Unknown date", pv: item.inflow ?? 0, amt: item.outflow ?? 0 }))} additionalStyles={additionalStyles} />;
}
