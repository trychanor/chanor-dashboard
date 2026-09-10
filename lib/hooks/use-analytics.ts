"use client";

import { useQuery } from "@tanstack/react-query";
import {
  getBalanceAction,
  getInflowOutflowAction,
  getProfitAction,
  getProfitBreakdownAction,
  getTransactionVolumeAction,
  getUsersAction,
  getActivitySourceAction,
} from "../actions/analytics";
import { GetTransactionsAnalyticsProps } from "../api/supervisor/transaction-analytics";
import { GetUsersActivityProps } from "../api/supervisor/users-activity";
import { ApiResult } from "@/types";

function getApiDataOrThrow<T>(result: ApiResult<T>) {
  if (result.error) {
    throw new Error(result.error);
  }
  return result.data;
}

export const useBalance = (params: GetTransactionsAnalyticsProps) =>
  useQuery({
    queryKey: ["balance", params],
    queryFn: async () => getApiDataOrThrow(await getBalanceAction(params)),
  });

export const useInflowOutflow = (params: GetTransactionsAnalyticsProps) =>
  useQuery({
    queryKey: ["inflow-outflow", params],
    queryFn: async () => getApiDataOrThrow(await getInflowOutflowAction(params)),
  });

export const useProfit = (params: GetTransactionsAnalyticsProps) =>
  useQuery({
    queryKey: ["profit", params],
    queryFn: async () => getApiDataOrThrow(await getProfitAction(params)),
  });

export const useProfitBreakdown = (params: GetTransactionsAnalyticsProps) =>
  useQuery({
    queryKey: ["profit-breakdown", params],
    queryFn: async () => getApiDataOrThrow(await getProfitBreakdownAction(params)),
  });

export const useTransactionVolume = (params: GetTransactionsAnalyticsProps) =>
  useQuery({
    queryKey: ["transaction-volume", params],
    queryFn: async () => getApiDataOrThrow(await getTransactionVolumeAction(params)),
  });

export const useUsersAnalytics = (params: GetUsersActivityProps) =>
  useQuery({
    queryKey: ["users-analytics", params],
    queryFn: async () => getApiDataOrThrow(await getUsersAction(params)),
  });

export const useActivitySource = (params: GetUsersActivityProps) =>
  useQuery({
    queryKey: ["activity-source", params],
    queryFn: async () => getApiDataOrThrow(await getActivitySourceAction(params)),
  });