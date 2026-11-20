import { NextResponse } from "next/server";
import { getDashboardRouteAccessError } from "@/lib/routing/dashboard-route-access";
import { getSettlements } from "@/services/api/supervisor/general";

export const dynamic = "force-dynamic";

export async function GET() {
  const accessError = await getDashboardRouteAccessError();

  if (accessError) return accessError;

  const result = await getSettlements();

  return NextResponse.json(result, { status: result.error ? 502 : 200 });
}
