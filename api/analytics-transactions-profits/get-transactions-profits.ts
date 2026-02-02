import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";

import { ky } from "@/api";
import { ApiResponse, Balance, ApiResponseWithMetadata, InflowOutflow, ProfitBreakdown, Profit, TransactionVolume } from "@/types";

type GetBalanceProps = {
  period: number,
}

type GetInflowOutflowProps = {
  period: number,
}

type GetProfitBreakdownProps = {
  period: number,
}

type GetProfitProps = {
  period: number,
}

type GetTransactionVolumeProps = {
  period: number,
}

export const getBalance = async ({ period }: GetBalanceProps) => {
  const res = await ky.get("analytics/balance",
    { searchParams: { period } }).json<ApiResponse<Balance>>();

  return res
};

export const useSuspenseGetBalance = (props: GetBalanceProps) => {
  return useSuspenseQuery(getBalanceQueryOptions(props));
};

export const getBalanceQueryOptions = (props: GetBalanceProps) => {
  const QUERY_KEY = "Balance"
  return queryOptions({
    queryFn: () => getBalance(props),
    queryKey: [QUERY_KEY, props],
  });
};


export const getInflowOutflow = async ({ period }: GetInflowOutflowProps) => {
  const res = await ky.get("analytics/inflow-outflow",
    { searchParams: { period } }).json<ApiResponseWithMetadata<InflowOutflow, { period: string }>>();

  return res
};

export const useSuspenseGetInflowOutflow = (props: GetInflowOutflowProps) => {
  return useSuspenseQuery(getInflowOutflowQueryOptions(props));
};

export const getInflowOutflowQueryOptions = (props: GetInflowOutflowProps) => {
  const QUERY_KEY = "Inflow Outflow"
  return queryOptions({
    queryFn: () => getInflowOutflow(props),
    queryKey: [QUERY_KEY, props],
  });
};


export const getProfitBreakdown = async ({ period }: GetProfitBreakdownProps) => {
  const res = await ky.get("analytics/profit-breakdown",
    { searchParams: { period } }).json<ApiResponseWithMetadata<ProfitBreakdown, { period: string }>>();

  return res
};

export const useSuspenseGetProfitBreakdown = (props: GetProfitBreakdownProps) => {
  return useSuspenseQuery(getProfitBreakdownQueryOptions(props));
};

export const getProfitBreakdownQueryOptions = (props: GetProfitBreakdownProps) => {
const QUERY_KEY = "Profit Breakdown"
  return queryOptions({
    queryFn: () => getProfitBreakdown(props),
    queryKey: [QUERY_KEY, props],
  });
};


export const getProfit = async ({ period }: GetProfitProps) => {
  const res = await ky.get("analytics/profit",
    { searchParams: { period } }).json<ApiResponseWithMetadata<Profit, { period: string }>>();

  return res
};

export const useSuspenseGetProfit = (props: GetProfitProps) => {
  return useSuspenseQuery(getProfitQueryOptions(props));
};

export const getProfitQueryOptions = (props: GetProfitProps) => {
const QUERY_KEY = "Profit"
  return queryOptions({
    queryFn: () => getProfit(props),
    queryKey: [QUERY_KEY, props],
  });
};


export const getTransactionVolume = async ({ period }: GetTransactionVolumeProps) => {
  const res = await ky.get("analytics/transaction-volume",
    { searchParams: { period } }).json<ApiResponseWithMetadata<TransactionVolume, { period: string }>>();

  return res
};

export const useSuspenseGetTransactionVolume = (props: GetTransactionVolumeProps) => {
  return useSuspenseQuery(getTransactionVolumeQueryOptions(props));
};

export const getTransactionVolumeQueryOptions = (props: GetTransactionVolumeProps) => {
const QUERY_KEY = "TransactionVolume"
  return queryOptions({
    queryFn: () => getTransactionVolume(props),
    queryKey: [QUERY_KEY, props],
  });
};
