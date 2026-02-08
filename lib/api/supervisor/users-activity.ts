import { ApiResponseWithMetadata, ActivitySource, User } from "@/types";
import { safeApiCall, api } from "../clients";

type GetActivitySourceProps = {
  period: number;
};

type GetUsersProps = {
  period: number;
};

export const getActivitySource = async ({ period }: GetActivitySourceProps) =>
  safeApiCall(
    api
      .get("analytics/activity-source", { searchParams: { period } })
      .json<ApiResponseWithMetadata<ActivitySource, { period: string }>>(),
  );

export const getUsers = async ({ period }: GetUsersProps) =>
  safeApiCall(
    api
      .get("analytics/users", { searchParams: { period } })
      .json<ApiResponseWithMetadata<User, { period: string }>>(),
  );
