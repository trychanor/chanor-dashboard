import { NextRequest, NextResponse } from "next/server";
import { getDashboardRouteAccessError } from "@/lib/routing/dashboard-route-access";
import { MAX_PAGE_SIZE, readPositiveInteger } from "@/lib/routing/route-query";
import { getTransactions } from "@/services/api/supervisor/transactions";

export const dynamic = "force-dynamic";

function readOptionalFilter(value: string | null) {
  const filter = value?.trim();

  return filter ? filter : undefined;
}

export async function GET(request: NextRequest) {
  const accessError = await getDashboardRouteAccessError();

  if (accessError) return accessError;

  const page = readPositiveInteger(request.nextUrl.searchParams.get("page"), 1);
  const limit = readPositiveInteger(
    request.nextUrl.searchParams.get("limit"),
    20,
  );
  const search = readOptionalFilter(request.nextUrl.searchParams.get("search"));
  const status = readOptionalFilter(request.nextUrl.searchParams.get("status"));
  const type = readOptionalFilter(request.nextUrl.searchParams.get("type"));
  const service = readOptionalFilter(
    request.nextUrl.searchParams.get("service"),
  );

  if (!page || !limit || limit > MAX_PAGE_SIZE) {
    return NextResponse.json(
      { data: null, error: "Page and limit must be positive integers." },
      { status: 400 },
    );
  }

  if (
    [search, status, type, service].some((value) => value && value.length > 100)
  ) {
    return NextResponse.json(
      { data: null, error: "A filter value is too long." },
      { status: 400 },
    );
  }

  const result = await getTransactions({
    page,
    limit,
    search,
    status,
    type,
    service,
  });

  return NextResponse.json(result, { status: result.error ? 502 : 200 });
}
