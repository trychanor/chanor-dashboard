"use client";

import { useQuery } from "@tanstack/react-query";
import { getJson } from "@/lib/http/browser-client";
import {
  mapSettlementAccounts,
  mapSettlementReport,
} from "@/models/settlement.model";
import { AnalyticsPeriod, ApiResult } from "@/types";

function getApiDataOrThrow<T>(result: ApiResult<T>) {
  if (result.error) {
    throw new Error(result.error);
  }

  return result.data;
}

export const useSettlementAccounts = () =>
  useQuery({
    queryKey: ["settlement-accounts"],
    queryFn: async () =>
      mapSettlementAccounts(
        getApiDataOrThrow(await getJson<unknown>("/api/supervisor/settlements", {})),
      ),
  });

export const useSettlementReport = (period: AnalyticsPeriod) =>
  useQuery({
    queryKey: ["settlement-report", period],
    queryFn: async () =>
      mapSettlementReport(
        getApiDataOrThrow(
          await getJson<unknown>("/api/supervisor/settlement-report", { period }),
        ),
      ),
  });
