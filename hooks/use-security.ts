"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getJson } from "@/lib/http/browser-client";
import {
  GetPaginatedSecurityDataProps,
} from "@/services/api/supervisor/security";
import {
  mapFailedLogins,
  mapFraudAlerts,
  mapLockedAccounts,
  mapSecurityOverview,
} from "@/models/security.model";
import { ApiResponse, ApiResponseWithPagination, ApiResult } from "@/types";

function getApiDataOrThrow<T>(result: ApiResult<T>) {
  if (result.error) throw new Error(result.error);

  return result.data;
}

export const useSecurityOverview = () =>
  useQuery({
    queryKey: ["security-overview"],
    queryFn: async () =>
      mapSecurityOverview(
        getApiDataOrThrow(
          await getJson<ApiResponse<unknown>>("/api/supervisor/security/overview", {}),
        ),
      ),
  });

export const useFailedLogins = (params: GetPaginatedSecurityDataProps) =>
  useQuery({
    queryKey: ["failed-logins", params],
    queryFn: async () =>
      mapFailedLogins(
        getApiDataOrThrow(
          await getJson<ApiResponseWithPagination<unknown[]>>(
            "/api/supervisor/security/failed-logins",
            params,
          ),
        ),
      ),
    placeholderData: keepPreviousData,
  });

export const useLockedAccounts = (params: GetPaginatedSecurityDataProps) =>
  useQuery({
    queryKey: ["locked-accounts", params],
    queryFn: async () =>
      mapLockedAccounts(
        getApiDataOrThrow(
          await getJson<ApiResponseWithPagination<unknown[]>>(
            "/api/supervisor/security/locked-accounts",
            params,
          ),
        ),
      ),
    placeholderData: keepPreviousData,
  });

export const useFraudAlerts = (params: GetPaginatedSecurityDataProps) =>
  useQuery({
    queryKey: ["fraud-alerts", params],
    queryFn: async () =>
      mapFraudAlerts(
        getApiDataOrThrow(
          await getJson<ApiResponseWithPagination<unknown[]>>(
            "/api/supervisor/security/fraud-alerts",
            params,
          ),
        ),
      ),
    placeholderData: keepPreviousData,
  });
