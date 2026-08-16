import { ApiResponseWithMetadata, ActivitySource, User } from "@/types";
import { safeApiCall, api } from "../clients";

export type GetUsersActivityProps = {
  period: number;
};

export const getActivitySource = async ({ period }: GetUsersActivityProps) =>
  safeApiCall(() =>
    api
      .get("supervisors/analytics/activity-source", {
        searchParams: { period },
      })
      .json<ApiResponseWithMetadata<ActivitySource, { period: string }>>(),
  );

export const getUsers = async ({ period }: GetUsersActivityProps) =>
  safeApiCall(() =>
    api
      .get("supervisors/analytics/users", { searchParams: { period } })
      .json<ApiResponseWithMetadata<User, { period: string }>>(),
  );
