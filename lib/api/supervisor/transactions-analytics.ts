import {
  ApiResponse,
  Balance,
  ApiResponseWithMetadata,
  InflowOutflow,
  ProfitBreakdown,
  Profit,
  TransactionVolume,
} from "@/types";
import { safeApiCall, api } from "../clients";

export type GetTransactionsAnalyticsProps = {
  period: number
}

export const getBalance = async ({ period }: GetTransactionsAnalyticsProps) =>
  safeApiCall(() =>
    api
      .get("supervisors/analytics/balance", { searchParams: { period } })
      .json<ApiResponse<Balance>>(),
  );

export const getInflowOutflow = async ({ period }: GetTransactionsAnalyticsProps) =>
  safeApiCall(() =>
    api
      .get("supervisors/analytics/inflow-outflow", { searchParams: { period } })
      .json<ApiResponseWithMetadata<InflowOutflow, { period: string }>>(),
  );

export const getProfitBreakdown = async ({ period }: GetTransactionsAnalyticsProps) =>
  safeApiCall(() =>
    api
      .get("supervisors/analytics/profit-breakdown", {
        searchParams: { period },
      })
      .json<ApiResponseWithMetadata<ProfitBreakdown, { period: string }>>(),
  );

export const getProfit = async ({ period }: GetTransactionsAnalyticsProps) =>
  safeApiCall(() =>
    api
      .get("supervisors/analytics/profit", { searchParams: { period } })
      .json<ApiResponseWithMetadata<Profit, { period: string }>>(),
  );

export const getTransactionVolume = async ({
  period,
}: GetTransactionsAnalyticsProps) =>
  safeApiCall(() =>
    api
      .get("supervisors/analytics/transaction-volume", {
        searchParams: { period },
      })
      .json<ApiResponseWithMetadata<TransactionVolume, { period: string }>>(),
  );
