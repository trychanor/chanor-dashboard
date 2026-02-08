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

type GetBalanceProps = {
  period: number;
};

type GetInflowOutflowProps = {
  period: number;
};

type GetProfitBreakdownProps = {
  period: number;
};

type GetProfitProps = {
  period: number;
};

type GetTransactionVolumeProps = {
  period: number;
};

export const getBalance = async ({ period }: GetBalanceProps) =>
  safeApiCall(
    api
      .get("analytics/balance", { searchParams: { period } })
      .json<ApiResponse<Balance>>(),
  );

export const getInflowOutflow = async ({ period }: GetInflowOutflowProps) =>
  safeApiCall(
    api
      .get("analytics/inflow-outflow", { searchParams: { period } })
      .json<ApiResponseWithMetadata<InflowOutflow, { period: string }>>(),
  );

export const getProfitBreakdown = async ({ period }: GetProfitBreakdownProps) =>
  safeApiCall(
    api
      .get("analytics/profit-breakdown", { searchParams: { period } })
      .json<ApiResponseWithMetadata<ProfitBreakdown, { period: string }>>(),
  );

export const getProfit = async ({ period }: GetProfitProps) =>
  safeApiCall(
    api
      .get("analytics/profit", { searchParams: { period } })
      .json<ApiResponseWithMetadata<Profit, { period: string }>>(),
  );

export const getTransactionVolume = async ({
  period,
}: GetTransactionVolumeProps) =>
  safeApiCall(
    api
      .get("analytics/transaction-volume", { searchParams: { period } })
      .json<ApiResponseWithMetadata<TransactionVolume, { period: string }>>(),
  );
