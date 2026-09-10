"use server";

import { clerkClient } from "@clerk/nextjs/server";

type DashboardAccessResult = {
  allowed: boolean;
  organizationId: string | null;
};

const dashboardOrganizationId =
  process.env.CLERK_DASHBOARD_ORGANIZATION_ID;

export async function checkDashboardOrganizationAccess(
  email: string,
): Promise<DashboardAccessResult> {
  if (!dashboardOrganizationId) {
    console.error("CLERK_DASHBOARD_ORGANIZATION_ID is not configured.");
    return { allowed: false, organizationId: null };
  }

  try {
    const client = await clerkClient();
    const memberships = await client.organizations.getOrganizationMembershipList({
      organizationId: dashboardOrganizationId,
      emailAddress: [email.trim().toLowerCase()],
      limit: 1,
    });

    return {
      allowed: memberships.data.length > 0,
      organizationId: memberships.data.length > 0 ? dashboardOrganizationId : null,
    };
  } catch (error) {
    console.error("Could not verify dashboard access.", error);
    return { allowed: false, organizationId: null };
  }
}
