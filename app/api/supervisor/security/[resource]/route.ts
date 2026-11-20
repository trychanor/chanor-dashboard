import { NextRequest, NextResponse } from "next/server";
import { getDashboardRouteAccessError } from "@/lib/routing/dashboard-route-access";
import { MAX_PAGE_SIZE, readPositiveInteger } from "@/lib/routing/route-query";
import {
  getFailedLogins,
  getFraudAlerts,
  getLockedAccounts,
  getSecurityOverview,
} from "@/services/api/supervisor/security";

export const dynamic = "force-dynamic";

const paginatedResources = {
  "failed-logins": getFailedLogins,
  "locked-accounts": getLockedAccounts,
  "fraud-alerts": getFraudAlerts,
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ resource: string }> },
) {
  const accessError = await getDashboardRouteAccessError();

  if (accessError) return accessError;

  const { resource } = await params;

  if (resource === "overview") {
    const result = await getSecurityOverview();
    return NextResponse.json(result, { status: result.error ? 502 : 200 });
  }

  const getResource =
    paginatedResources[resource as keyof typeof paginatedResources];

  if (!getResource) {
    return NextResponse.json(
      { data: null, error: "The requested security resource does not exist." },
      { status: 404 },
    );
  }

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

  const status = request.nextUrl.searchParams.get("status") || undefined;

  if (status && status.length > 100) {
    return NextResponse.json(
      { data: null, error: "The status filter is too long." },
      { status: 400 },
    );
  }

  const result = await getResource({ page, limit, status });

  return NextResponse.json(result, { status: result.error ? 502 : 200 });
}
