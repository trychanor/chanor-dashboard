import { NextRequest, NextResponse } from "next/server";
import { getDashboardRouteAccessError } from "@/lib/routing/dashboard-route-access";
import { MAX_PAGE_SIZE, readPositiveInteger } from "@/lib/routing/route-query";
import { getWalletAlerts } from "@/services/api/supervisor/wallet-alerts";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const accessError = await getDashboardRouteAccessError();

  if (accessError) return accessError;

  const page = readPositiveInteger(request.nextUrl.searchParams.get("page"), 1);
  const limit = readPositiveInteger(
    request.nextUrl.searchParams.get("limit"),
    20,
  );

  if (!page || !limit || limit > MAX_PAGE_SIZE) {
    return NextResponse.json(
      { data: null, error: "Page and limit must be positive integers." },
      { status: 400 },
    );
  }

  const result = await getWalletAlerts({ page, limit });

  return NextResponse.json(result, { status: result.error ? 502 : 200 });
}
