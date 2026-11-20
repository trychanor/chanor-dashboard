import {
  ActivitySource,
  AnalyticsPeriod,
  ApiResponseWithMetadata,
  User,
} from "@/types";
import { safeApiCall, api } from "../../../lib/http/http-client";

export type GetUsersActivityProps = {
  period: AnalyticsPeriod;
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
