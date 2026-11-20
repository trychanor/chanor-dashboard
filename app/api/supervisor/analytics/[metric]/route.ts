import { NextRequest, NextResponse } from "next/server";
import { getDashboardRouteAccessError } from "@/lib/routing/dashboard-route-access";
import {
  getBalance,
  getInflowOutflow,
  getProfit,
  getProfitBreakdown,
  getTransactionVolume,
} from "@/services/api/supervisor/transactions-analytics";
import {
  getActivitySource,
  getUsers,
} from "@/services/api/supervisor/users-activity";
import { AnalyticsPeriod } from "@/types";

export const dynamic = "force-dynamic";

const analyticsRequests = {
  balance: getBalance,
  "inflow-outflow": getInflowOutflow,
  profit: getProfit,
  "profit-breakdown": getProfitBreakdown,
  "transaction-volume": getTransactionVolume,
  users: getUsers,
  "activity-source": getActivitySource,
};

const analyticsPeriods: AnalyticsPeriod[] = ["day", "week", "month", "year"];

function isAnalyticsPeriod(value: string | null): value is AnalyticsPeriod {
  return value !== null && analyticsPeriods.includes(value as AnalyticsPeriod);
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ metric: string }> },
) {
  const accessError = await getDashboardRouteAccessError();

  if (accessError) return accessError;

  const period = request.nextUrl.searchParams.get("period") ?? "month";
  const { metric } = await params;
  const requestAnalytics =
    analyticsRequests[metric as keyof typeof analyticsRequests];

  if (!requestAnalytics) {
    return NextResponse.json(
      { data: null, error: "The requested analytics resource does not exist." },
      { status: 404 },
    );
  }

  if (!isAnalyticsPeriod(period)) {
    return NextResponse.json(
      { data: null, error: "Period must be day, week, month, or year." },
      { status: 400 },
    );
  }

  const result = await requestAnalytics({ period });

  return NextResponse.json(result, { status: result.error ? 502 : 200 });
}
