"use client";

import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getTransactionsAction } from "../actions/transactions";
import { GetTransactionsProps } from "../api/supervisor/transactions"; // adjust path if needed
import { ApiResult } from "@/types";

function getApiDataOrThrow<T>(result: ApiResult<T>) {
  if (result.error) {
    throw new Error(result.error);
  }
  return result.data;
}

export const useTransactions = (params: GetTransactionsProps) =>
  useQuery({
    queryKey: ["transactions", params],
    queryFn: async () => getApiDataOrThrow(await getTransactionsAction(params)),
    placeholderData: keepPreviousData,
  });