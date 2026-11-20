"use client";

import { useQuery } from "@tanstack/react-query";
import { getJson } from "../lib/http/browser-client";
import { GetTransactionsAnalyticsProps } from "@/services/api/supervisor/transactions-analytics";
import { GetUsersActivityProps } from "../services/api/supervisor/users-activity";
import { ApiResult } from "@/types";
import {
  mapActivitySourceAnalytics,
  mapBalanceAnalytics,
  mapInflowOutflowAnalytics,
  mapProfitAnalytics,
  mapProfitBreakdownAnalytics,
  mapTransactionVolumeAnalytics,
  mapUsersAnalytics,
} from "@/models/analytics.model";

function getApiDataOrThrow<T>(result: ApiResult<T>) {
  if (result.error) {
    throw new Error(result.error);
  }
  return result.data;
}

export const useBalance = (params: GetTransactionsAnalyticsProps) =>
  useQuery({
    queryKey: ["balance", params],
    queryFn: async () =>
      mapBalanceAnalytics(
        getApiDataOrThrow(
          await getJson<unknown>("/api/supervisor/analytics/balance", params),
        ),
      ),
  });

export const useInflowOutflow = (params: GetTransactionsAnalyticsProps) =>
  useQuery({
    queryKey: ["inflow-outflow", params],
    queryFn: async () =>
      mapInflowOutflowAnalytics(
        getApiDataOrThrow(
          await getJson<unknown>(
            "/api/supervisor/analytics/inflow-outflow",
            params,
          ),
        ),
      ),
  });

export const useProfit = (params: GetTransactionsAnalyticsProps) =>
  useQuery({
    queryKey: ["profit", params],
    queryFn: async () =>
      mapProfitAnalytics(
        getApiDataOrThrow(
          await getJson<unknown>("/api/supervisor/analytics/profit", params),
        ),
      ),
  });

export const useProfitBreakdown = (params: GetTransactionsAnalyticsProps) =>
  useQuery({
    queryKey: ["profit-breakdown", params],
    queryFn: async () =>
      mapProfitBreakdownAnalytics(
        getApiDataOrThrow(
          await getJson<unknown>(
            "/api/supervisor/analytics/profit-breakdown",
            params,
          ),
        ),
      ),
  });

export const useTransactionVolume = (params: GetTransactionsAnalyticsProps) =>
  useQuery({
    queryKey: ["transaction-volume", params],
    queryFn: async () =>
      mapTransactionVolumeAnalytics(
        getApiDataOrThrow(
          await getJson<unknown>(
            "/api/supervisor/analytics/transaction-volume",
            params,
          ),
        ),
      ),
  });

export const useUsersAnalytics = (params: GetUsersActivityProps) =>
  useQuery({
    queryKey: ["users-analytics", params],
    queryFn: async () =>
      mapUsersAnalytics(
        getApiDataOrThrow(
          await getJson<unknown>("/api/supervisor/analytics/users", params),
        ),
      ),
  });

export const useActivitySource = (params: GetUsersActivityProps) =>
  useQuery({
    queryKey: ["activity-source", params],
    queryFn: async () =>
      mapActivitySourceAnalytics(
        getApiDataOrThrow(
          await getJson<unknown>(
            "/api/supervisor/analytics/activity-source",
            params,
          ),
        ),
      ),
  });
