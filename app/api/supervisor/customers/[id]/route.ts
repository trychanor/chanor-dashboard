import { NextRequest, NextResponse } from "next/server";
import { getDashboardRouteAccessError } from "@/lib/api/dashboard-route-access";
import { MAX_PAGE_SIZE, readPositiveInteger } from "@/lib/api/route-query";
import { getCustomer } from "@/lib/api/supervisor/customers";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const accessError = await getDashboardRouteAccessError();

  if (accessError) return accessError;

  const limit = readPositiveInteger(
    request.nextUrl.searchParams.get("limit"),
    20,
  );

  if (!limit || limit > MAX_PAGE_SIZE) {
    return NextResponse.json(
      { data: null, error: "Limit must be a positive integer." },
      { status: 400 },
    );
  }

  const { id } = await params;

  if (!id) {
    return NextResponse.json(
      { data: null, error: "A customer ID is required." },
      { status: 400 },
    );
  }

  const result = await getCustomer({ id, limit });

  return NextResponse.json(result, { status: result.error ? 502 : 200 });
}
