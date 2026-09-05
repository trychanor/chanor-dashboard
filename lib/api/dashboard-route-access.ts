import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const dashboardOrganizationId = process.env.CLERK_DASHBOARD_ORGANIZATION_ID;

export async function getDashboardRouteAccessError() {
  const { userId, orgId } = await auth();

  if (!userId) {
    return NextResponse.json(
      { data: null, error: "Authentication is required." },
      { status: 401 },
    );
  }

  if (!dashboardOrganizationId || orgId !== dashboardOrganizationId) {
    return NextResponse.json(
      { data: null, error: "You don't have access to this resource." },
      { status: 403 },
    );
  }

  return null;
}
