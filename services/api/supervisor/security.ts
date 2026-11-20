import { ApiResponse, ApiResponseWithPagination } from "@/types";
import { api, safeApiCall } from "../../../lib/http/http-client";

export type GetPaginatedSecurityDataProps = {
  page: number;
  limit: number;
  status?: string;
};

export const getSecurityOverview = async () =>
  safeApiCall(() =>
    api.get("supervisors/analytics/security").json<ApiResponse<unknown>>(),
  );

export const getFailedLogins = async ({
  page,
  limit,
}: GetPaginatedSecurityDataProps) =>
  safeApiCall(() =>
    api
      .get("supervisors/security/failed-logins", { searchParams: { page, limit } })
      .json<ApiResponseWithPagination<unknown[]>>(),
  );

export const getLockedAccounts = async ({
  page,
  limit,
}: GetPaginatedSecurityDataProps) =>
  safeApiCall(() =>
    api
      .get("supervisors/security/locked-accounts", { searchParams: { page, limit } })
      .json<ApiResponseWithPagination<unknown[]>>(),
  );

export const getFraudAlerts = async ({
  page,
  limit,
  status,
}: GetPaginatedSecurityDataProps) =>
  safeApiCall(() =>
    api
      .get("supervisors/security/fraud-alerts", {
        searchParams: { page, limit, status },
      })
      .json<ApiResponseWithPagination<unknown[]>>(),
  );
