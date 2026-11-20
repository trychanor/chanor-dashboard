"use client";

import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getJson } from "../lib/http/browser-client";
import { GetTransactionsProps } from "../services/api/supervisor/transactions";
import { ApiResult } from "@/types";
import {
  mapTransactionsResponse,
  TransactionListResponse,
} from "@/models/transaction.model";

function getApiDataOrThrow<T>(result: ApiResult<T>) {
  if (result.error) {
    throw new Error(result.error);
  }
  return result.data;
}

export const useTransactions = (params: GetTransactionsProps, refreshKey = 0) =>
  useQuery({
    queryKey: ["transactions", params, refreshKey],
    queryFn: async (): Promise<TransactionListResponse> =>
      mapTransactionsResponse(
        getApiDataOrThrow(
          await getJson<unknown>("/api/supervisor/transactions", params),
        ),
      ),
    placeholderData: keepPreviousData,
  });
