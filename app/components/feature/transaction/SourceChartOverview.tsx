"use client";

import EmptyState from "@/app/components/ui/EmptyState";
import PieCharts from "@/app/components/ui/PieChart";
import { useActivitySource } from "@/hooks/use-analytics";
import { AnalyticsPeriod } from "@/types";

type SourceChartOverviewProps = { period: AnalyticsPeriod };

function formatSourceName(source: string, sources: string[]) {
  const label = source.charAt(0).toUpperCase() + source.slice(1);

  if (sources.length > 1) {
    return `${label} (${sources
      .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
      .join(" + ")})`;
  }

  return label;
}

export default function SourceChartOverview({ period }: SourceChartOverviewProps) {
  const query = useActivitySource({ period });

  if (query.isLoading) return <div className="h-72 animate-pulse rounded-lg bg-neutral-100" />;

  const sourceData = query.data
    ?.filter((item) => item.source !== null && item.count !== null)
    .map((item) => ({
      name: formatSourceName(item.source ?? "Unknown source", item.sources),
      count: item.count ?? 0,
    })) ?? [];
  const totalActivity = sourceData.reduce((total, item) => total + item.count, 0);
  const channelData = sourceData.map((item) => ({
    name: item.name,
    value: totalActivity === 0 ? 0 : Number(((item.count / totalActivity) * 100).toFixed(1)),
  }));

  if (query.isError || channelData.length === 0) {
    return <EmptyState title="No activity source data" description="Channel activity will appear here when available." className="min-h-72" />;
  }

  return <PieCharts data={channelData} valueSuffix="%" />;
}
