"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getJson } from "@/lib/http/browser-client";
import { GetWalletAlertsProps } from "@/services/api/supervisor/wallet-alerts";
import { mapWalletAlerts } from "@/models/security.model";
import { ApiResponseWithPagination, ApiResult } from "@/types";

function getApiDataOrThrow<T>(result: ApiResult<T>) {
  if (result.error) throw new Error(result.error);

  return result.data;
}

export const useWalletAlerts = (params: GetWalletAlertsProps) =>
  useQuery({
    queryKey: ["wallet-alerts", params],
    queryFn: async () =>
      mapWalletAlerts(
        getApiDataOrThrow(
          await getJson<ApiResponseWithPagination<unknown[]>>(
            "/api/supervisor/wallet-alerts",
            params,
          ),
        ),
      ),
    placeholderData: keepPreviousData,
  });
