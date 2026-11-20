import { NextRequest, NextResponse } from "next/server";
import { getDashboardRouteAccessError } from "@/lib/routing/dashboard-route-access";
import { getSettlementReport } from "@/services/api/supervisor/general";
import { AnalyticsPeriod } from "@/types";

export const dynamic = "force-dynamic";

const periods: AnalyticsPeriod[] = ["day", "week", "month", "year"];

export async function GET(request: NextRequest) {
  const accessError = await getDashboardRouteAccessError();

  if (accessError) return accessError;

  const period = request.nextUrl.searchParams.get("period") ?? "week";

  if (!periods.includes(period as AnalyticsPeriod)) {
    return NextResponse.json(
      { data: null, error: "Period must be day, week, month, or year." },
      { status: 400 },
    );
  }

  const result = await getSettlementReport(period as AnalyticsPeriod);

  return NextResponse.json(result, { status: result.error ? 502 : 200 });
}
